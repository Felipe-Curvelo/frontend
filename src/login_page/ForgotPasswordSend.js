import React, { useState } from 'react';

import axios from 'axios';

import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
    useToast
  } from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const toast = useToast();
    const [email, setEmail ] = useState("");
    const navigate = useNavigate();

    
  const handleReset = (e) => {
    e.preventDefault()
    const options = {
      url: `${process.env.REACT_APP_BASE_URL}/reset_password`,
      method: 'POST',
      headers: { 
          "Content-Type": "application/json",
      },
      data: {
          email: email,
      }
    }
    axios(options)
      .then(response => {
        console.log('email enviado!')
        setEmail('')
        toast({
          title: 'Email Enviado!',
          description: response.data.message,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        navigate("/")
      })
      .catch(error => {
        toast({
          title: 'Email não encontrado!',
          description: error.response.data.error,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      })
  };  

  return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
        >
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Esqueceu sua senha?
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={useColorModeValue('gray.800', 'gray.400')}>
            Insira um endereço de email válido para receber a senha
          </Text>
          <FormControl id="email">
            <Input
              value={email}
              placeholder="seuemail@exemplo.com.br"
              _placeholder={{ color: 'gray.500' }}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
            onClick={handleReset}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Resetar Senha
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }
  export default ForgotPassword