import React from 'react'
import { Link } from "react-router-dom";

import {
    chakra,
    Flex,
    HStack,
    useColorModeValue,
    Box,
    useDisclosure,
    Spacer,
    IconButton,
    VStack,
    useColorMode,
    Image,
    Text,
    Button,
  } from "@chakra-ui/react";

import { BiListOl } from "react-icons/bi"
import { GiUnplugged } from "react-icons/gi";
import { AiOutlinePlus } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";

import Logo from '../Logo.png';

const NavBar = ({ onLogout, onClick }) => {
    const bg = useColorModeValue("white", "gray.800");
    const mobileNav = useDisclosure();
    const { toggleColorMode: toggleMode } = useColorMode();
    const text = useColorModeValue("dark", "light");
    const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  
  
  
    const MobileNavContent = (
      <VStack
        pos="absolute"
        top={0}
        left={0}
        right={0}
        display={mobileNav.isOpen ? "flex" : "none"}
        flexDirection="column"
        p={2}
        pb={4}
        m={2}
        bg={bg}
        spacing={3}
        rounded="sm"
        shadow="sm"
      >
      </VStack>
    );

  return (
    <React.Fragment>
    <chakra.header h="full" bg={bg} w="full" px={{ base: 2, sm: 4 }} py={4} shadow="md">
      <Flex alignItems="center" justifyContent="space-between" mx="auto">
        <Link to="/">
        <Image src={Logo} alt="Logo" boxSize='60px' />
        </Link>
        <Box display={{ base: "none", md: "inline-flex" }}>
          <HStack spacing={1}>
            <Link to="/">
            <Box role="group">
            <Text
                fontWeight="extrabold"
                fontSize='3xl'
                bg={bg}
                alignItems="center"
                bgGradient="linear(to-r, pink.500, pink.300, blue.500)"
                bgClip="text"

              >
                Ghost Portfolio
              </Text>
              <Text>(Versão Demo)</Text>
            </Box>
            </Link>
          </HStack>
        </Box>
        <Spacer />
        <HStack 
        spacing={3} 
        display={mobileNav.isOpen ? "none" : "flex"}
        alignItems="center"
        >
          <Button 
          colorScheme="teal" 
          leftIcon={<AiOutlinePlus />}
          onClick={onClick}
          >Nova Transação</Button>
          <Link to="/transactions">
            <Button 
            variant="solid"
            colorScheme="purple"
            leftIcon={<BiListOl />}
            >Histórico</Button>
          </Link>
          <Button 
          colorScheme="red" 
          leftIcon={<GiUnplugged />}
          onClick={onLogout}
          >Logout</Button>
          <IconButton
              size="md"
              fontSize="lg"
              aria-label={`Switch to ${text} mode`}
              variant="ghost"
              color="current"
              ml={{ base: "0", md: "3" }}
              onClick={toggleMode}
              icon={<SwitchIcon />}
              isRound="true"
          />            
        </HStack>
      </Flex>
      {MobileNavContent}
    </chakra.header>
  </React.Fragment>
  );
}

export default NavBar