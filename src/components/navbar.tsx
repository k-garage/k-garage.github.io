import React, { useCallback, useEffect, useState } from "react";
import { Image, Box, Flex, Link, Tag } from "@chakra-ui/react";
import { Toc } from "../lib/types";
import { motion } from "framer-motion";
import { navigate } from "gatsby";

const TocComponent = ({
  tocList,
  depth,
}: {
  tocList: Toc[] | Toc | null;
  depth: number;
}) => {
  const [boldtext, setBoldtext] = useState(false);

  const yScrollEvent = useCallback(() => {
    const scroll = document
      .getElementById(tocList["link"]?.slice(1))
      ?.getBoundingClientRect();
    //console.log(scroll);
    setBoldtext(scroll?.top <= 400);
  }, [tocList]);

  useEffect(() => {
    window.addEventListener("scroll", yScrollEvent);
    return () => {
      window.removeEventListener("scroll", yScrollEvent);
    };
  }, [yScrollEvent]);

  // if list, then recurse
  if (tocList instanceof Array) {
    return (
      <ul
        style={{
          listStyleType: "none",
          marginTop: "0.2rem",
          fontSize: `${1.1 - depth * 0.1}rem`,
        }}
      >
        {tocList.map((item) => (
          <TocComponent tocList={item} depth={depth + 1} />
        ))}
      </ul>
    );
  }

  // if empty or null, then return
  if (!tocList) return null;

  // if item, then return
  return (
    <li style={{ marginTop: "0.5rem" }}>
      <a
        href={tocList["link"]}
        className="toc-a"
        style={{
          fontWeight: boldtext ? "bold" : "normal",
          fontSize: `${1.1 - tocList["depth"] * 0.1}rem`,
          paddingLeft: `${tocList["depth"] * 0.5}rem`,
        }}
      >
        {tocList["name"]}
      </a>
    </li>
  );
};

export default function SimpleSidebar({ children, tocList, tagList }) {
  return (
    <Box minH="100vh">
      <Box
        display={{ base: "none", xl: "flex" }}
        w={{ base: "full", md: 60 }}
        pos="fixed"
        h="full"
        flexDirection="column"
        alignItems="start"
        justifyContent="flex-start"
        marginTop="10vh"
      >
        {tocList ? <TocComponent tocList={tocList} depth={0} /> : null}
        {tagList ? (
          <div
            style={{
              listStyleType: "none",
              margin: "3.0rem auto",
            }}
          >
            {tagList.map((item) => (
              <motion.div
                style={{
                  marginTop: "1.0rem",
                  padding: "0.2rem",
                  cursor: "pointer",
                }}
                whileHover={{
                  scale: 1.2,
                  zIndex: 100,
                  position: "relative",
                  color: "black",
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.9 }}
                onTapStart={() => {
                  navigate(`/tags/${item}`);
                }}
              >
                <Tag
                  width="100%"
                  backgroundColor={"white"}
                  boxShadow="lg"
                  fontSize={"1.5rem"}
                  alignItems="center"
                  justifyContent="center"
                  padding={".5rem 1rem"}
                >
                  {item.toUpperCase()}
                </Tag>
              </motion.div>
            ))}
          </div>
        ) : null}
      </Box>
      <Box ml={{ base: 0 }} p="4">
        {children}
      </Box>
    </Box>
  );
}
