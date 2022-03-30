import React, { useState, useEffect } from "react";
import axios from 'axios';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Button,
  Input,
  Box,
  Select,
  RadioGroup,
  Radio,
  HStack,
  Spacer,
  FormControl,
  FormHelperText,
  FormLabel,
  useToast,
} from "@chakra-ui/react";

export default function AddModal({ isOpen, onClose, setLoadingError }) {
    const [type, setType] = useState('1');
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [pricePurchasedAt, setPricePurchasedAt] = useState("");
    const [numberOfCoins, setNumberOfCoins] = useState("");
    const [coins, setCoins] = useState([]);
    const toast = useToast();

    useEffect(()=>{
        axios.get(process.env.REACT_APP_COINS)
        .then((response)=> {
          setCoins(response.data);      
        }).catch(error => console.log(error));   
      }, [isOpen]);
    
    const nofilteredCoins = coins.filter(coin=>
        coin.name
    )
    
    const token = localStorage.getItem('token')

    const addTransaction = async () => {
        
        const options = {
            url: `${process.env.REACT_APP_BASE_URL}/transactions`,
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            data: {
                name: name,
                type: type,
                amount: amount * 100,
                price_purchased_at: pricePurchasedAt,
                time_created: Date.now() / 1000,
                no_of_coins: numberOfCoins,
            }
        };
        axios(options)
            .then(response => {
                onClose();
            console.log(response.data)
            setName('')
            setAmount('')
            setPricePurchasedAt('')
            setNumberOfCoins('')
            setName('')
            window.location.reload(false);
            })
        
        .catch (error => {
            console.error(error);
            toast({
                title: 'Não foi possivel adicionar a transação!',
                description: "Verifique as informações e tente novamente.",
                status: 'error',
                duration: 9000,
                isClosable: true,
              });
        });
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="xl" overS >
            
                <ModalContent>
                    <ModalHeader>Insira uma Transação</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={10} mt="10px">
                        <FormControl as='fieldset' isRequired> 
                            <FormLabel as='legend' style={{fontWeight: "bold"}}>Criptomoeda:</FormLabel> 
                            <Select
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                focusBorderColor="tomato"
                                placeholder="Escolha a criptomoeda"
                                > 
                                { nofilteredCoins.map(coin => {
                                    return <option
                                    key={coin.id}
                                    name={coin.name}
                                    >{coin.name}</option>;
                                    
                                })}
                            </Select>
                            <FormHelperText>Selecione uma criptomoeda da lista</FormHelperText>
                        </FormControl>
                        <FormControl as='fieldset' isRequired> 
                            <FormLabel as='legend' style={{fontWeight: "bold"}}>Valor:</FormLabel> 
                            {type === '1' ?
                                <Input
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Total da compra (EM DÓLARES)"
                                /> :
                                <Input
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Total da venda (EM DÓLARES)"
                                />
                            }
                            <FormHelperText >Sempre utilize pontos para separar casas decimais (Exemplo: 25.58)</FormHelperText>
                        </FormControl>
                        <FormControl as='fieldset' isRequired>
                                <FormLabel as='legend' style={{fontWeight: "bold"}}>Preço:</FormLabel>
                                {type === '1' ?
                                    <Input
                                        value={pricePurchasedAt}
                                        onChange={(e) => setPricePurchasedAt(e.target.value)}
                                        placeholder="Preço da criptomoeda (EM DÓLARES)"
                                    /> :
                                    <Input
                                        value={pricePurchasedAt}
                                        onChange={(e) => setPricePurchasedAt(e.target.value)}
                                        placeholder="Campo calculado automaticamente."
                                        isDisabled
                                    />
                                }
                            <FormHelperText >Sempre utilize pontos para separar casas decimais (Exemplo: 25.58)</FormHelperText>
                        </FormControl>
                        <FormControl as='fieldset' isRequired>
                            <FormLabel as='legend' style={{fontWeight: "bold"}}>Quantidade de criptomoedas:</FormLabel>
                            <Input
                            value={numberOfCoins}
                            onChange={(e) => setNumberOfCoins(e.target.value)}
                            placeholder="Quantidade de Moedas"
                            />
                            <FormHelperText >Sempre utilize pontos para separar casas decimais (Exemplo: 0.008)</FormHelperText>
                        </FormControl>
                        <Box>
                            <RadioGroup 
                            value={type}
                            onChange={setType}
                            >    
                                <HStack spacing={5} direction="row">
                                    <Radio colorScheme="green" value='1' onSelect={setType}>Compra</Radio>
                                    <Spacer />
                                    <Radio colorScheme="red" value='2' onSelect={setType}>Venda</Radio>
                                </HStack>
                            </RadioGroup>
                        </Box>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                        bg="tomato"
                        color="white"
                        mr={3}
                        size="lg"
                        onClick={addTransaction}
                        >
                        Adicionar Transação
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>    
        
    );
}