import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import { SimpleGrid } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { navigate, PageProps } from "gatsby";
import { motion } from "framer-motion";

import {
  Container,
  useColorMode,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";

import SimpleSidebar from "../components/navbar";
import BlogPostWithImage from "../components/blogcard";
import { Notebook } from "../lib/types";

type TagPageContext = {
  allNotebooks: Notebook[];
  tag: string;
  tagset: string[];
};

const TagPage = (props: PageProps<{}, TagPageContext>) => {
  const { pageContext } = props;
  const { allNotebooks, tag, tagset } = pageContext;

  return (
    <div>
      <SimpleSidebar tocList={null} tagList={tagset}>
        {/* <Button
            position="sticky"
            float="right"
            right="1rem"
            top="1rem"
            onClick={toggleColorMode}
          >
            Toggle {colorMode === "light" ? "Dark" : "Light"}
          </Button> */}
        <Container maxW={{ md: "container.md", "2xl": "container.xl" }}>
          <Heading as="h1">{tag.toUpperCase()}</Heading>
        </Container>
        <Container maxW={{ md: "container.md", "2xl": "container.xl" }}>
          <SimpleGrid columns={{ base: 1, md: 2, "2xl": 3 }} spacing="10px">
            {allNotebooks.map((notebook) => (
              <div>
                <BlogPostWithImage
                  notebook={notebook}
                  onclickfunc={() => {
                    navigate(notebook.name + "/index.html?v=2");
                  }}
                />
              </div>
            ))}
          </SimpleGrid>
        </Container>
        <Footer />
      </SimpleSidebar>
    </div>
  );
};

export default TagPage;
