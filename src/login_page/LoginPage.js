import React, {useContext } from 'react'

import { Link } from 'react-router-dom';

import {
    Box,
    Stack,
    Heading,
    Text,
    Container,
    Input,
    Button,
    SimpleGrid,
    HStack,
  } from '@chakra-ui/react';

import { AuthContext } from '../contexts/auth';


  const LoginPage = () => {
    const { setEmail, setPassword, email, password, handleLogin } = useContext(AuthContext)
    

    return (
        <Box position={'relative'}>
          <Container
            as={SimpleGrid}
            maxW={'7xl'}
            columns={{ base: 1, md: 2 }}
            spacing={{ base: 10, lg: 32 }}
            py={{ base: 10, sm: 20, lg: 32 }}>
            <Stack spacing={{ base: 10, md: 20 }}>
              <Heading
                lineHeight={1.1}
                fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
                Ghost Portfolio{' '}
                
              </Heading>
              <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
              Bem vindo! Esta é uma versão de demonstração do aplicativo, por favor, tenha isso em mente. Desde já, muito obrigado por participar!
            </Text>
            </Stack>
            <Stack
              bg={'gray.50'}
              rounded={'xl'}
              p={{ base: 4, sm: 6, md: 8 }}
              spacing={{ base: 8 }}
              maxW={{ lg: 'lg' }}>
              <Stack spacing={4}>
                <Heading
                  color={'gray.800'}
                  lineHeight={1.1}
                  fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                  Entre para acessar
                  <Text
                    as={'span'}
                    bgGradient="linear(to-r, red.400,pink.400)"
                    bgClip="text">
                    !
                  </Text>
                </Heading>
                <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                  Tenha acesso ao aplicativo de gestão de portfólio, faça seu cadastro ou entre com as suas credenciais para acessar
                </Text>
              </Stack>
              <Box as={'form'} mt={10}>
                <Stack spacing={4}>
                  <Input
                    type={'email'}
                    placeholder="email"
                    bg={'gray.100'}
                    border={0}
                    color={'gray.500'}
                    _placeholder={{
                      color: 'gray.500',
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    type={'password'}
                    placeholder="senha"
                    bg={'gray.100'}
                    border={0}
                    color={'gray.500'}
                    _placeholder={{
                      color: 'gray.500',
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Stack>
                <Button
                  fontFamily={'heading'}
                  mt={8}
                  w={'full'}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  color={'white'}
                  _hover={{
                    bgGradient: 'linear(to-r, red.400,pink.400)',
                    boxShadow: 'xl',
                  }}
                  onClick={handleLogin}
                >
                  Entrar
                </Button>
                <HStack justify={'center'} mt={8} >
                  <Box>
                      <Link style={{ color: 'blue', textDecorationLine: 'underline', fontSize: '13px' }}
                        to="/forgotpassword">
                        Não conseguiu entrar?
                      </Link>
                  </Box>
                  <Box >
                    <Text style={{ fontSize: '13px' }}>|</Text>
                  </Box>
                  <Box>
                    <Link style={{ color: 'blue', textDecorationLine: 'underline', fontSize: '13px' }}
                        to="/signup">
                      <Text >Criar uma conta</Text>
                    </Link>
                  </Box>
                </HStack>
              </Box>
            </Stack>
          </Container>
        </Box>
      );
}

export default LoginPage