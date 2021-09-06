import React from "react";
import Layout from "../components/Layout";
import { useState, useEffect } from 'react'
import { useRouteMatch } from "react-router-dom";
import { Container, Nft } from "../components/index";
import { useContracts } from "../context/ContractContext";
import { useUser } from '../context/UserContext'
import { userData } from '../dataFunctions/fetchData'

const MediaDemo =
  "https://img.rarible.com/prod/image/upload/t_preview/prod-itemImages/0xd07dc4262bcdbf85190c01c996b4c06a461d2430:8207";

// const nftNumber = "#1";
// const nftName = "NFTSROPOWAAA";
const nftNumberOfCopie = "1";
// const nftDescription = "Its the Best NFT for TO THE MOON with SRO TEAM  !!!!";
// let nftTitle = `${nftNumber} - ${nftName}`;
let priceNft = 10;
let SymboleNft = "SRO";
// let Royalties = 10;

const BuyNft = () => {
  const { userState } = useUser()
  const { sro721 } = useContracts();
  const [nft, setNft] = useState()
  const match = useRouteMatch("/:address/:id");

  useEffect(() => {
    const fetch = async() => {
      const fetchNft = await sro721.getNftById(match.params.id)
      const owner = await userData(fetchNft.author)
      const uri = await sro721.tokenURI(match.params.id)
      setNft({data: {...fetchNft, url: uri}, owner: owner})
    }

    if(sro721 !== null) {
      fetch()
    }
  }, [sro721, userState, match.params.id])

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
              priceNft={priceNft}
              SymboleNft={SymboleNft}
              Royalties={nft.data.royalties}
              owner={nft.owner}
              user={userState.data}
            />
          }
        />}
      </Layout>
    </>
  );
};

export default BuyNft;
