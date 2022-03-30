import React from "react";
import axios from "axios";

import { 
  Tr, 
  Td, 
  Image, 
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  Portal,
  HStack,
  Text,
  VStack,
 } from "@chakra-ui/react";

import { FaTrash } from 'react-icons/fa';

export default function ListItem({ crypto }) {
    const name = crypto["name"]

    const token = localStorage.getItem('token')

    const deleteCoin = async () => {

        const options = {
            url: process.env.REACT_APP_API_TRANSACTION,
            method: 'DELETE',
            headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}` 
            },
            data: {
                name: name,
            }
          };
          axios(options)
          window.location.reload(false);
    };     

  return (
    <Tr >
      <Td><Image boxSize={[10, 20, 30]}   src={crypto["image"]}/></Td>  
      <Td>{crypto["name"]}</Td>
      <Td>{crypto["symbol"]}</Td>
      <Td isNumeric >$ {crypto["live_price"].toLocaleString()}</Td>
      {crypto["variation24h"] < 0 ? 
          (<Td isNumeric color={'red'} > {crypto["variation24h"].toFixed(2).replace(".", ",")}%</Td>)
       : (<Td isNumeric color={'green'} > {crypto["variation24h"].toFixed(2).replace(".", ",")}%</Td>)}
      <Td isNumeric> {crypto["coins"].toFixed(9).toString().replace(".", ",")}</Td>
      <Td isNumeric>$ {crypto["total_cost"].toLocaleString()}</Td>
      <Td isNumeric>$ {crypto["total_equity"].toLocaleString()}</Td>
      <Td isNumeric>$ {crypto["average_p"].toFixed(2).toLocaleString()}</Td>
      {crypto["p_l"] < 0 ?
      (<Td isNumeric color={'red'}>$ {crypto["p_l"].toFixed(2).replace(".", ",")}</Td>)
      : (<Td isNumeric color={'green'}>$ {crypto["p_l"].toFixed(2).replace(".", ",")}</Td>)
      }
      {crypto["p_l_p"] < 0 ?
      (<Td isNumeric color={'red'}> {crypto["p_l_p"].toFixed(2)}%</Td>)
      : (<Td isNumeric color={'green'}> {crypto["p_l_p"].toFixed(2)}%</Td>)}
      <Popover>
        <PopoverTrigger>
          <Td> <IconButton icon={ <FaTrash /> } isRound  /> </Td>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader fontSize='15px' style={{color: "red"}}>Você tem certeza que deseja apagar? </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
                <VStack spacing={3}>
                <Text>Isso excluirá todo histórico também. Certifique-se que exportou todo o conteúdo</Text>
                <Button colorScheme="red" onClick={() => deleteCoin(crypto["name"])}>Deletar</Button>
                </VStack>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </Tr>
  );
}