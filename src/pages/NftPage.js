import React from "react";
import Layout from "../components/Layout";
import { useState, useEffect } from 'react'
import { useRouteMatch } from "react-router-dom";
import { Container, Nft } from "../components/index";
import { useUser } from '../context/UserContext'
import { getNftById } from "../TheGraph/api"

const MediaDemo =
  "https://img.rarible.com/prod/image/upload/t_preview/prod-itemImages/0xd07dc4262bcdbf85190c01c996b4c06a461d2430:8207";
const nftNumberOfCopie = "1";
let SymboleNft = "SRO";

const BuyNft = () => {
  const { userState } = useUser()
  const [nft, setNft] = useState()
  const [fetch, setFetch] = useState(true)
  const match = useRouteMatch("/:address/:id");

  useEffect(() => {
    if(fetch) {
      getNftById(match.params.id).then((result) => setNft(result))
    }
  }, [match.params.id, setFetch, fetch])
  return (
    <>
      <Layout>
        {nft && <Container
          children={
            <Nft
              mediaURL={nft.url || MediaDemo}
              nftId={match.params.id}
              nftTitle={nft.title}
              nftNumberOfCopie={nftNumberOfCopie}
              nftDescription={nft.description}
              priceNft={nft.status === '1' ? nft.sale.price: 'not for sale'}
              SymboleNft={SymboleNft}
              Royalties={nft.royalties}
              ownerAddress={nft.owner.id}
              user={userState.data}
              sale={nft.sale}
              nft={nft}
            />
          }
        />}
      </Layout>
    </>
  );
};

export default BuyNft;
