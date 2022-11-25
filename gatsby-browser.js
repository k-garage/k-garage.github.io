import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import theme from "./src/theme";

export const wrapPageElement = ({ element }) => {
  return <ChakraProvider theme={theme}>{element}</ChakraProvider>;
};
