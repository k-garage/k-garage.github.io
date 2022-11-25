import React, { useEffect, useState } from "react";
import { HStack, Stack } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { PageProps } from "gatsby";

import {
  Container,
  useColorMode,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share";

import { motion } from "framer-motion";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  dracula,
  materialLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";

import SimpleSidebar from "../components/navbar";
import Header from "../components/header";
import Footer from "../components/footer";

const DARK_THEME = "#471717";

const variants = {
  open: { opacity: 1, y: 0, zIndex: 100 },
  closed: { opacity: 0, y: "100vh", zIndex: 100 },
};

const _hacky_bundle = String.raw`
<link
rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.13.6/katex.min.css"
></link>
<script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.13.6/katex.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.13.6/contrib/auto-render.min.js"></script>
<script src="https://requirejs.org/docs/release/2.3.5/minified/require.js"></script>
<style type="text/css">
pre { line-height: 125%;}
td.linenos .normal { color: inherit; background-color: transparent; padding-left: 5px; padding-right: 5px; }
span.linenos { color: inherit; background-color: transparent; padding-left: 5px; padding-right: 5px; }
td.linenos .special { color: #000000; background-color: #ffffc0; padding-left: 5px; padding-right: 5px; }
span.linenos.special { color: #000000; background-color: #ffffc0; padding-left: 5px; padding-right: 5px; }
.katex-display > .katex {
    max-width: 100%;
}
.katex-display > .katex > .katex-html {
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    padding-left: 2px;
    padding-right: 2px;
}
</style>`;

const _katex_foot = String.raw`
<script>
window.addEventListener( "pageshow", function ( event ) {
  var historyTraversal = event.persisted || 
                         ( typeof window.performance != "undefined" && 
                              window.performance.navigation.type === 2 );
  if ( historyTraversal ) {
    // Handle page restore.
    window.location.reload();
  }
});
renderMathInElement(document.body, {
  delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false},
        {left: '\\(', right: '\\)', display: false},
        {left: '\\[', right: '\\]', display: true}
    ],
  strict : "ignore",
  });
</script>
`;

type NotebookTemplateContext = {
  route: string;
  args: {
    author: string;
    title: string;
    abstract: string;
    tag: string;
    type: string;
  };
  content: string;
  tocList: string[];
};

const NotebookTemplate = (props: PageProps<{}, NotebookTemplateContext>) => {
  const [isOpen, setIsOpen] = useState(true);
  const { colorMode, toggleColorMode } = useColorMode();

  const {
    pageContext: {
      route,
      args: { author, tag, title, abstract, type },
      content,
      tocList,
    },
  } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div>
        <div dangerouslySetInnerHTML={{ __html: _hacky_bundle }} />
      </div>
      {/* <Helmet>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css"
          integrity="sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ"
          crossOrigin="anonymous"
        />
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.js"
          integrity="sha384-VQ8d8WVFw0yHhCk5E8I86oOhv48xLpnDZx5T9GogA/Y84DcCKWXDmSDfn13bzFZY"
          crossOrigin="anonymous"
        ></script>
        <link rel="stylesheet" href="/global.css" />
        <script type="module" src="/katex.js" />
      </Helmet> */}
      <motion.nav
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 1.0 }}
      ></motion.nav>
      <SimpleSidebar tocList={tocList}>
        <Header />
        <Button
          position="sticky"
          float="right"
          right="1rem"
          top="1rem"
          onClick={toggleColorMode}
        >
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>

        <Stack
          align="center"
          spacing="5"
          py="10"
          marginTop="3em"
          marginLeft="0.5em"
        >
          <Heading as="h1">{title}</Heading>
          <Text maxWidth="45ch" textAlign="left">
            Written by <strong>{author} </strong>
          </Text>
          <Text maxWidth="45ch" textAlign="left">
            <strong>Topic</strong> {tag}
          </Text>
          <Text maxWidth="45ch" textAlign="left">
            <div dangerouslySetInnerHTML={{ __html: abstract }} />
          </Text>
        </Stack>

        <Container maxW="container.md">
          {type === "html" ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <ReactMarkdown
              rehypePlugins={[rehypeRaw, rehypeKatex]}
              remarkPlugins={[remarkMath, remarkGfm]}
              children={content}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, "")}
                      language={match[1]}
                      style={colorMode === "light" ? materialLight : dracula}
                      PreTag="div"
                      {...props}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            />
          )}
          <Text fontSize="md" color="gray.500" marginTop={"30px"}>
            Did you love this post? Share it with your friends!
          </Text>
          <HStack p="15px">
            <FacebookShareButton url={route}>
              <FacebookIcon size={40} round={true} />
            </FacebookShareButton>

            {/* <LinkedinShareButton url={path}>
              <LinkedinIcon size={40} round={true} />
            </LinkedinShareButton> */}

            <RedditShareButton url={route} title={title}>
              <RedditIcon size={40} round={true} />
            </RedditShareButton>

            <WhatsappShareButton url={route} title={title}>
              <WhatsappIcon size={40} round={true} />
            </WhatsappShareButton>
          </HStack>
        </Container>

        <Footer />
      </SimpleSidebar>
      <div dangerouslySetInnerHTML={{ __html: _katex_foot }} />
    </div>
  );
};

export default NotebookTemplate;
