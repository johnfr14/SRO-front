import React from "react";
import classnames from "classnames";
import { CardList } from "../UserMainPage";
import { Container, Text, Center, Box } from "@chakra-ui/react";
import { Button } from "../index";
import { Web3Context } from "web3-hooks";

const MarketPlace = () => {
  const [web3State] = React.useContext(Web3Context);  
  console.log(web3State)
  return (
    <>
      <div>
          {web3State.isWeb3 && web3State.balance <= 0 && <Box maxW='md' borderWidth='1px' borderRadius='lg'>
            <Container p='0.5rem' textAlign={'center'} textColor={'white'}>
              <p>👇 Don't have ETH ? Get some here 👇</p>
              <Center m={'0.5rem'}>
                <Button buttonStyle to={"https://faucets.chain.link/rinkeby"}target='_blank'>Get 0.1 ETH</Button>
              </Center>
              <Text fontWeight={'bold'}>Network: <Text as='i' className={classnames("text-yellow-300")}>Ethereum rinkeby</Text></Text>  
              <Text fontWeight={'bold'}>Testnet account address: <Text as='i' className={classnames("text-yellow-300")}>{web3State.account}</Text></Text> 
            </Container>
          </Box>}
        <div className="md:mx-8">
          <h2 className="text-5xl text-yellow-400 text-center font-bold pb-10">
            Market Place
          </h2>
          <CardList idx={0} marketPlace />
        </div>
      </div>
    </>
  );
};

export default MarketPlace;
