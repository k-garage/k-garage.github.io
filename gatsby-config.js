module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "simoryu blog",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        jsxPragma: `jsx`,
        allExtensions: true,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "notebooks",
        path: "./src/notebooks/",
      },
    },
    "gatsby-plugin-mdx",
    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        /**
         * @property {boolean} [resetCSS=true]
         * if false, this plugin will not use `<CSSReset />
         */
        resetCSS: true,
        /**
         * @property {boolean} [isUsingColorMode=true]
         * if false, this plugin will not use <ColorModeProvider />
         */
        isUsingColorMode: true,
      },
    },
  ],
};
