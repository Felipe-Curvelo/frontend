import React from "react";
import {
  Flex,
  useColorModeValue,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";


import ListItem from "./ListItem";

export default function ListTable({ rollups }) {
  const dataColor = useColorModeValue("white", "gray.800");
  const bg = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("gray.100", "gray.700");
  

  return (
    <Flex
      w="full"
      alignItems="center"
      justifyContent="center"
      shadow="lg"
    >
      <Stack
        direction={{ base: "column" }}
        w="full"
        bg={{ md: bg }}
      >
        <Flex
              direction={{ base: "row", md: "column" }}
              bg={dataColor}
            >

      <Table
        w="full"
        bg={useColorModeValue("white", "gray.800")}
        display={{
          base: "block",
          md: "table",
        }}
        sx={{
          "@media print": {
            display: "table",
          },
        }}

      >
        <Thead 
        spacingY={3}
        columns={{ base: 1, md: 3 }}
        textTransform="uppercase"
        bg={bg2}
        color={"gray.500"}
        py={{ base: 1, md: 4 }}
        px={{ base: 2, md: 10 }}
        fontSize="md"
        fontWeight="hairline"
        >
          <Tr>
            <Th></Th>  
            <Th>Criptomoeda</Th>
            <Th></Th> 
            <Th>Preço Atual</Th>
            <Th>24h%</Th>
            <Th>Qtd de Moeda</Th>
            <Th>Investimento Inicial</Th>
            <Th>Investimento Atual</Th>
            <Th>Preço Médio</Th>
            <Th>Lucro / Prejuízo</Th>
            <Th>Lucro / Prejuízo (%)</Th>
            <Th></Th>              
          </Tr>
        </Thead>
        <Tbody
            spacingY={3}
            columns={{ base: 1, md: 3 }}
            w="full"
            py={2}
            px={10}
            fontWeight="hairline"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"        
        >
          {rollups.map((coin, index) => {
            return (
              <ListItem key={index} crypto={coin}></ListItem>
            );
          })}
        </Tbody>
      </Table>
      </Flex>
      </Stack>
    </Flex>
  );
}