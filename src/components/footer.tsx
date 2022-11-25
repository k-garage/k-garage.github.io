import React from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: React.ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box style={{ marginTop: "3rem" }}>
      <Container maxW={"6xl"} py={4}>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 3, md: 30 }}
          justifyContent={"end"}
        >
          <Link href={""} textAlign="center">
            More About us
          </Link>
          <Link href={"/"} textAlign="center">
            Blog
          </Link>
          <Link href={"mailto: skg4078@snu.ac.kr"} textAlign="center">
            Contact
          </Link>
        </Stack>
      </Container>
      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ md: "space-between" }}
          align={{ md: "center" }}
        >
          <Text>© 2022 K-Garage. All rights reserved</Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton label={"Github"} href={"https://github.com/k-garage"}>
              <FaGithub />
            </SocialButton>
            <SocialButton
              label={"LinkedIn"}
              href={"https://www.linkedin.com/company/k-garage"}
            >
              <FaLinkedin />
            </SocialButton>
            {/* <SocialButton label={'Instagram'} href={'https://www.instagram.com/XXXX'}>
              <FaInstagram />
            </SocialButton> */}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
