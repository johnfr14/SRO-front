import React from "react";
import Layout from "../components/Layout";
import { useState, useEffect } from 'react'
import { useRouteMatch } from "react-router-dom";
import { Container, Nft } from "../components/index";
import { useContracts } from "../context/ContractContext";
import { useUser } from '../context/UserContext'
import { userData } from '../dataFunctions/fetchData'
import { SRO721Address } from "../contracts/SRO721";
import { ethers } from "ethers"
const MediaDemo =
  "https://img.rarible.com/prod/image/upload/t_preview/prod-itemImages/0xd07dc4262bcdbf85190c01c996b4c06a461d2430:8207";

// const nftNumber = "#1";
// const nftName = "NFTSROPOWAAA";
const nftNumberOfCopie = "1";
// const nftDescription = "Its the Best NFT for TO THE MOON with SRO TEAM  !!!!";
// let nftTitle = `${nftNumber} - ${nftName}`;
let SymboleNft = "SRO";
// let Royalties = 10;

const BuyNft = () => {
  const { userState } = useUser()
  const { sro721, marketplace } = useContracts();
  const [nft, setNft] = useState()
  const match = useRouteMatch("/:address/:id");

  useEffect(() => {
    const fetch = async() => {
      let sale = null;
      if (await marketplace.isOnSale(SRO721Address, match.params.id)) {
        const saleId = await marketplace.getSaleId(SRO721Address, match.params.id)
        const result = await marketplace.getSale(saleId)
        sale = {
          status: result[0].toString(),
          id: result[1],
          price: ethers.utils.formatEther(result[2]),
          seller: result[3],
          collection: result[4],
        }
      } 
      const fetchNft = await sro721.getNftById(match.params.id)
      const owner = await sro721.ownerOf(match.params.id)
      const ownerData = await userData(owner.toLowerCase())
      const uri = await sro721.tokenURI(match.params.id)

      setNft({data: {...fetchNft, url: uri}, owner: ownerData, sale: sale})
    }

    if(sro721 !== null) {
      fetch()
    }
  }, [sro721, marketplace, match.params.id])


  return (
    <>
      <Layout>
        {nft && <Container
          children={
            <Nft
              mediaURL={nft.data.url || MediaDemo}
              nftId={match.params.id}
              nftName={nft.owner.username}
              nftTitle={nft.data.title}
              nftNumberOfCopie={nftNumberOfCopie}
              nftDescription={nft.data.description}
              priceNft={nft.sale !== null ? nft.sale.price: 'not for sale'}
              SymboleNft={SymboleNft}
              Royalties={nft.data.royalties}
              owner={nft.owner}
              user={userState.data}
              sale={nft.sale}
            />
          }
        />}
      </Layout>
    </>
  );
};

export default BuyNft;
