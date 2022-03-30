import React from "react";
import { 
  Container, 
  Text, 
  VStack, 
  HStack,
  Flex,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Summary({
  portfolioCost,
  portfolioValue,
  absoluteGain,
  totalGainPercent,
  btcEq,
  usd,
  brlPortValue,
}) {

  const dataColor = useColorModeValue("white", "gray.800");
  const bg = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("gray.100", "gray.700");
    return (
      <Flex
      direction={{ base: "column" }}
      p={3}
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        direction={{ base: "column" }}
        
        bg={{ md: bg }}

      >
        <HStack spacing={6}>
          <Container 
          fontWeight="extrabold"
          rounded="md"
          shadow="dark-lg"
          bgGradient="linear(to-r, green.300, green.400, green.500)"

          >
            <VStack width={40}>
              <Text fontSize="2xl">
                 $ {Number(usd).toLocaleString()}
              </Text>
              <Text fontSize="xs" size="md">
                USD / BRL
              </Text>
            </VStack>
          </Container>
          <Container 
          fontWeight="extrabold"
          rounded="md"
          shadow="dark-lg"
          bgGradient="linear(to-r, blue.300, blue.400, blue.500)"
          >
            <VStack width={40}>
              <Text fontSize="2xl">
                 R$ {Number(brlPortValue).toFixed(2).toLocaleString()}
              </Text>
              <Text fontSize="xs" size="md">
                Total em Reais
              </Text>
            </VStack>
          </Container>
          <Container 
          fontWeight="extrabold"
          rounded="md"
          shadow="dark-lg"
          bgGradient="linear(to-r, blue.300, blue.400, blue.500)"
          >
            <VStack width={40}>
              <Text fontSize="2xl">
                 {Number(btcEq.toFixed(6)).toLocaleString()} BTC
              </Text>
              <Text fontSize="xs" size="md">
                Portfólio em Bitcoin
              </Text>
            </VStack>
          </Container>
          <Container 
          fontWeight="extrabold"
          rounded="md"
          shadow="dark-lg"
          bgGradient="linear(to-r, blue.300, blue.400, blue.500)"
          >
            <VStack width={40}>
              <Text fontSize="2xl">
                 $ {Number(portfolioCost.toFixed(2)).toLocaleString()}
              </Text>
              <Text fontSize="xs" size="md">
                Investimento Inicial
              </Text>
            </VStack>
          </Container>
          <Container 
          fontWeight="extrabold"
          rounded="md"
          shadow="dark-lg"
          bgGradient="linear(to-r, blue.300, blue.400, blue.500)"
          >
            <VStack width={40}>
              <Text fontSize="2xl">
                 $ {Number(portfolioValue.toFixed(2)).toLocaleString()}
              </Text>
              <Text fontSize="xs" size="md">
                Saldo Atual
              </Text>
            </VStack>
          </Container>
          {absoluteGain < 0 ?
          <Container 
          fontWeight="extrabold"
          rounded="md"
          shadow="dark-lg"
          bgGradient="linear(to-r, blue.300, blue.400, blue.500)"
          >
            <VStack width={40}>
              <Text fontSize="2xl" color="red.200">
                 $ {Number(absoluteGain.toFixed(2)).toLocaleString()}
              </Text>
              <Text fontSize="xs" size="md" >
                Lucro / Prejuízo
              </Text>
            </VStack>
          </Container> :
          <Container 
          fontWeight="extrabold"
          rounded="md"
          shadow="dark-lg"
          bgGradient="linear(to-r, blue.300, blue.400, blue.500)"
          >
            <VStack width={40}>
              <Text fontSize="2xl" color="green.800">
                 $ {Number(absoluteGain.toFixed(2)).toLocaleString()}
              </Text>
              <Text fontSize="xs" size="md" >
                Lucro / Prejuízo
              </Text>
            </VStack>
          </Container>}
          {totalGainPercent < 0 ?
          <Container 
          fontWeight="extrabold"
          rounded="md"
          shadow="dark-lg"
          bgGradient="linear(to-r, blue.300, blue.400, blue.500)"
          >
            <VStack width={40}>
              <Text fontSize="2xl" color="red.200">
                  {totalGainPercent.toFixed(2).replace(".", ",")} %
              </Text>
              <Text fontSize="xs" size="md" >
                Lucro / Prejuízo %
              </Text>
            </VStack>
          </Container> :
          <Container 
          fontWeight="extrabold"
          rounded="md"
          shadow="dark-lg"
          bgGradient="linear(to-r, blue.300, blue.400, blue.500)"
          >
            <VStack width={40}>
              <Text fontSize="2xl" color="green.800">
                  {totalGainPercent.toFixed(2).replace(".", ",")} %
              </Text>
              <Text fontSize="xs" size="md" >
                Lucro / Prejuízo %
              </Text>
            </VStack>
          </Container>}
        </HStack>
        </Stack>
        </Flex>
    );
}