import React, { useContext, useEffect, useState } from "react";
import {
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  chakra,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import TrasactionItem from "./TrasactionItem";
import axios from "axios";
import NavBarTrans from "./NavBarTrans";

import { AuthContext } from "../contexts/auth";


export default function TransactionsTable() {
  const { logout } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);

  const token = localStorage.getItem('token')
  axios.defaults.headers.Authorization = `Bearer ${token}` 

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/transactions`)
      .then((response) => {
        setTransactions(response.data);
      });

  }, [])

  return (
    <>
    <NavBarTrans onLogout={logout}></NavBarTrans>
      <VStack spacing={10} mt={10}>
      <chakra.h1
            textAlign={'center'}
            fontSize={'4xl'}
            py={10}
            fontWeight={'bold'}>
            Histórico de Transações
        </chakra.h1>
        <Flex
          
          bg={useColorModeValue("gray.100", "gray.800")}
          p={50}
          alignItems="center"
          justifyContent="center"
        >
        <Table size="lg" variant="striped" colorScheme="blackAlpha" width={5} >
          <TableCaption>Essas são todas as transações efetuadas na plataforma</TableCaption>
          <Thead>
            <Tr>
              <Th>Criptomoeda</Th>
              <Th>Tipo de Transação</Th>
              <Th>Valor</Th>
              <Th>Preço de compra</Th>
              <Th>Qtd de Criptomoedas</Th>
              <Th>Data da Transação</Th>
              <Th>Lucro / Prejuízo</Th>
            </Tr>
          </Thead>
          <Tbody fontSize='15px' >
            {transactions.map((tran, index) => {
              return (
                <TrasactionItem key={index} transaction={tran}></TrasactionItem>
              );
            })}
          </Tbody>
        </Table>
        </Flex>
      </VStack>
    </>
  );
}