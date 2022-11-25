const fs = require("fs");

const must_have_keys = ["author", "tag", "title", "abstract", "image"];

const parseMetadata = (content) => {
  const metadata = {};
  content.split("\n").forEach((line) => {
    const key = line.split(":")[0];
    const value = line.split(":").slice(1).join(":").trim();
    metadata[key] = value;
  });

  /*
  author: Vender La
tag: Tutorial
title: Example Markdown 123456123456123456123456123456
abstract:  This contains Example markdown
image: sin_cos.png
  */

  must_have_keys.forEach((key) => {
    if (!metadata[key]) {
      throw new Error(`${key} is missing`);
    }
  });
  // strip, make lowercase, and replace spaces with dashes for tag
  metadata["tag"] = metadata["tag"].toLowerCase().replace(/\s/g, "-");

  return metadata;
};

const afterdivs = (htmlContent) => {
  const divs = htmlContent.split("</div>");
  const afdiv = divs.slice(3);
  const afdivStr = afdiv.join("</div>");
  return afdivStr;
};

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  // read html files from ./src/notebooks/
  const notebooks = fs.readdirSync("./src/notebooks/compiled_htmls");
  const all_notebooks = [];
  const tag_notebook_li = { all: [] };

  notebooks.forEach((notebook) => {
    const filepath = `./src/notebooks/compiled_htmls/${notebook}`;
    const name = notebook.split(".")[0];
    const tocContent = fs.readFileSync(
      `./src/notebooks/meta/${name}.json`,
      "utf8"
    );
    const tocJson = JSON.parse(tocContent);
    const fileCreatedDate = fs.statSync(filepath).birthtime;
    const createdDate = fileCreatedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const metadata = {
      type: notebook.split(".")[1],
    };

    let content = fs.readFileSync(filepath, "utf8");
    if (metadata.type === "html") {
      Object.assign(
        metadata,
        parseMetadata(content.split("<p>")[1].split("</p>")[0])
      );
      content = afterdivs(content);
    } else if (metadata.type === "md") {
      Object.assign(metadata, parseMetadata(content.split("\n\n")[0]));
      content = content.split("\n\n").slice(1).join("\n\n");
    } else {
      console.log("Unknown file type");
    }

    const args = {
      createdDate,
      name: `/notes/${name}`,
      ...metadata,
    };

    const tag = metadata.tag;
    if (tag) {
      if (!tag_notebook_li[tag]) {
        tag_notebook_li[tag] = [];
      }
      tag_notebook_li[tag].push(args);
    }

    tag_notebook_li["all"].push(args);

    all_notebooks.push(args);
    createPage({
      path: `/notes/${name}`,
      component: require.resolve("./src/templates/notebooksTemplates.tsx"),
      context: {
        route: `/notes/${name}`,
        args,
        content,
        tocList: tocJson["TOC"],
      },
    });
  });

  tagset = Object.keys(tag_notebook_li);

  createPage({
    path: `/`,
    component: require.resolve("./src/templates/index.tsx"),
    context: {
      allNotebooks: all_notebooks,
      tagset: tagset,
    },
  });

  // create page per tag
  Object.keys(tag_notebook_li).forEach((tag) => {
    createPage({
      path: `/tags/${tag}`,
      component: require.resolve("./src/templates/tagPage.tsx"),
      context: {
        tag,
        allNotebooks: tag_notebook_li[tag],
        tagset,
      },
    });
  });
};
