import {
  Image,
  Box,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";

import { Notebook } from "../lib/types";
import "./blogcard.css";

const BlogPostWithImage = ({
  notebook: { author, title, abstract, tag, name, image, createdDate },
  onclickfunc,
}: {
  notebook: Notebook;
  onclickfunc: () => void;
}) => {
  const imgfile =
    typeof image == "string"
      ? `/${image}`
      : "https://via.placeholder.com/400x300";

  //console.log(imgfile);
  return (
    <motion.div
      style={{ cursor: "pointer" }}
      whileHover={{
        scale: 1.05,
        zIndex: 100,
        position: "relative",
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.9 }}
      onTapStart={onclickfunc}
    >
      <Box
        //maxWidth={["100%", "100%", "45%", "100%", "100%"]}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
        maxH={"550px"}
        minH={"550px"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <Box
          h={"210px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
          maxH={"210px"}
          minH={"210px"}
        >
          <Image
            src={
              // if iamge is not none, then use image
              imgfile

              //`../images/${image}`
            }
            width="100%"
            height="100%"
            objectFit={"cover"}
          />
        </Box>
        <Stack>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            {tag}
          </Text>
          <Heading
            id="cardtitle"
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
            height={"4rem"}
            onClick={onclickfunc}
            cursor="pointer"
          >
            {title}
          </Heading>
          <Text color={"gray.500"} height={"60px"}>
            {abstract.slice(0, 100) + (abstract.length > 100 ? "..." : "")}
          </Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>{author}</Text>
            <Text color={"gray.500"}>{createdDate}</Text>
          </Stack>
        </Stack>
      </Box>
    </motion.div>
  );
};

export default BlogPostWithImage;
