import '@fontsource/raleway/400.css'
import '@fontsource/open-sans/700.css'
import React, { useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';

import {
    ChakraProvider,
    VStack,
    Text,
    useDisclosure,
    chakra,
    HStack,
    Spinner,
    Flex
  } from "@chakra-ui/react";

  import theme from './theme'

import NavBar from './NavBar';
import ListTable from "./ListTable";
import Summary from "./Summary";
import Visualization from './Visualization';
import AddModal from './AddModal';

import { getRollups, getTransactions } from '../services/api';
import { AuthContext } from '../contexts/auth';

const Home = () => {
    const { logout } = useContext(AuthContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [rollups, setRollups] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [portfolioCost, setPortfolioCost] = useState(0);
    const [portfolioValue, setPortfolioValue] = useState(0);
    const [absoluteGain, setAbsoluteGain] = useState(0.0001);
    const [totalGainPercent, setTotalGainPercent] = useState(0);
    const [btcEq, setBtcEq ] = useState(0);
    const [ brlPortValue, setBrlPortValue ] = useState(0);
    const [usd, setUsd] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [ loadingError, setLoadingError ] = useState(false);


    const loadRollups = async () => {
        try {
            setLoading(true)
            const response = await getRollups();
            setRollups(response.data);
            let costAccumulator = 0;
            let valueAccumulator = 0;
            let btcEquivalence = 0;
            let cotacao_usd = 0;
            let portfolioBrl =0;
            response.data.forEach((item) => {
                costAccumulator += item["total_cost"];
                valueAccumulator += item["total_equity"];
                btcEquivalence += item["total_equity"] / item["bitcoin_lp"];
                cotacao_usd = item["usd_cot"];
                portfolioBrl += item["brl_conv_total"];
            });
            let absoluteGain = valueAccumulator - costAccumulator;

            setPortfolioCost(costAccumulator);
            setPortfolioValue(valueAccumulator);
            setAbsoluteGain(absoluteGain);
            isNaN(setTotalGainPercent((absoluteGain / costAccumulator) * 100) || 0);
            setBtcEq(btcEquivalence)
            setUsd(cotacao_usd)
            setBrlPortValue(portfolioBrl)
            setLoading(false)
        } catch (err) {
            console.error(err);
            setLoadingError(true)
        }

    };

    const loadTransactions = async () => {
        setLoading(true)
        const response = await getTransactions();
        setTransactions(response.data)
        setLoading(false)
    }

    useEffect(() =>{
        (async () => await loadRollups())();
        (async () => await loadTransactions())();
    }, []);

    if (loadingError){
        return (
            
            <VStack >
                <HStack mt="300px" >
                    <Text>Erro ao carregar os dados. <Link style={{ color: 'blue', textDecorationLine: 'underline' }} to="/">Voltar</Link></Text>
                </HStack>
            </VStack>
            
        )
    }

    const handleLogout = () => {
        logout();
        
    }

    if (loading){
        return (
        <VStack>
            <HStack mt="300px">
            <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
            />

            </HStack>
        </VStack>
        )
    }
    
    return (
        <ChakraProvider theme={theme}>
            <NavBar onLogout={handleLogout} onClick={onOpen}></NavBar>
            <AddModal isOpen={isOpen} onClose={onClose} setLoadingError={setLoadingError} ></AddModal>
            <VStack spacing={7} mb="30px">
                <chakra.h1
                    textAlign={'center'}
                    fontSize={'4xl'}
                    py={10}
                    fontWeight={'bold'}>
                    DASHBOARD
                </chakra.h1>
                <Summary 
                    portfolioCost={portfolioCost}
                    portfolioValue={portfolioValue}
                    absoluteGain={absoluteGain}
                    totalGainPercent={totalGainPercent}
                    btcEq={btcEq}
                    usd={usd}
                    brlPortValue={brlPortValue}
                ></Summary> 
            </VStack>
            <ListTable rollups={rollups} ></ListTable>
            <Visualization rollups={rollups}></Visualization>
        </ChakraProvider>
    );
}

export default Home