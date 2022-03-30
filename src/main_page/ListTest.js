import React from "react";
import {
  chakra,
  Flex,
  useColorModeValue,
  Button,
  useBreakpointValue,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";

export default function App() {
  const data = [
    { name: "Segun Adebayo", email: "sage@chakra.com" },
    { name: "Josef Nikolas", email: "Josef@mail.com" },
    { name: "Lazar Nikolov", email: "Lazar@mail.com" },
    { name: "Abraham", email: "abraham@anu.com" },
  ];
  const dataColor = useColorModeValue("white", "gray.800");
  const bg = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("gray.100", "gray.700");

  return (
    <Flex
      w="full"
      bg="gray.600"
      p={3}
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        direction={{ base: "column" }}
        w="full"
        bg={{ md: bg }}
        shadow="lg"
      >

            <Flex
              direction={{ base: "row", md: "column" }}
              bg={dataColor}
            >
              <SimpleGrid
                spacingY={3}
                columns={{ base: 1, md: 3 }}
                w={{ base: 120, md: "full" }}
                textTransform="uppercase"
                bg={bg2}
                color={"gray.500"}
                py={{ base: 1, md: 4 }}
                px={{ base: 2, md: 10 }}
                fontSize="md"
                fontWeight="hairline"
              >


              </SimpleGrid>
              <SimpleGrid
                spacingY={3}
                columns={{ base: 1, md: 3 }}
                w="full"
                py={2}
                px={10}
                fontWeight="hairline"
              >
                
                <chakra.span
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  
                </chakra.span>
                <Flex justify={{ md: "end" }}>

                </Flex>
              </SimpleGrid>
            </Flex>
          );
      </Stack>
    </Flex>
  );
}
