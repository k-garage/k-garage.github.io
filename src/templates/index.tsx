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

type IndexTemplateContext = {
  allNotebooks: Notebook[];
  tagset: string[];
};

const variants = {
  open: { opacity: 1, y: 0, zIndex: 100, display: "block" },
  closed: { opacity: 0, y: "400vh", zIndex: 100, display: "block" },
  vanished: { opacity: 0, y: "400vh", zIndex: 100, display: "none" },
};

const IndexTemplate = (props: PageProps<{}, IndexTemplateContext>) => {
  const [isOpen, setIsOpen] = useState("open");
  const { colorMode, toggleColorMode } = useColorMode();

  const { pageContext } = props;
  const { allNotebooks, tagset } = pageContext;

  useEffect(() => {
    // after 1 second delay set isOpen to closed

    // another 1 second delay set isOpen to vanished

    const timer = setTimeout(() => {
      setIsOpen("closed");
    }, 200);

    const timer2 = setTimeout(
      () => {
        setIsOpen("vanished");
      },

      1000
    );

    const repeater = setInterval(() => {
      setIsOpen("vanished");
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearInterval(repeater);
    };
  }, []);

  return (
    <div>
      <motion.nav
        animate={isOpen}
        variants={variants}
        transition={{ duration: 1.0 }}
      >
        {/* blue background */}
        <div
          style={{
            //backgroundColor: "#060922",
            height: "400vh",
            width: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 100,
            opacity: 1.0,
          }}
        />
      </motion.nav>
      <motion.nav
        animate={isOpen === "open" ? "closed" : "open"}
        variants={variants}
        transition={{ duration: 1.0 }}
      >
        <SimpleSidebar tocList={null} tagList={tagset}>
          <Button
            position="sticky"
            float="right"
            right="1rem"
            top="1rem"
            onClick={toggleColorMode}
          >
            Toggle {colorMode === "light" ? "Dark" : "Light"}
          </Button>
          <Container maxW={{ md: "container.md", "2xl": "container.xl" }}>
            <Stack align="center" spacing="5" py="10">
              <Heading as="h1">K Garage Blog</Heading>
              <Text maxWidth="45ch" textAlign="center">
                Collection of notes and blog posts on math, physics, computer
                science, machine learning and many more
              </Text>
            </Stack>
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
      </motion.nav>
    </div>
  );
};

export default IndexTemplate;
