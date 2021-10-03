import React from "react";
import Layout from "../components/Layout";
import { useState, useEffect } from 'react'
import { useRouteMatch } from "react-router-dom";
import { Container, Nft } from "../components/index";
import { useContracts } from "../context/ContractContext";
import { useUser } from '../context/UserContext'
import { fetchNft } from "../dataFunctions/fetchData";

const MediaDemo =
  "https://img.rarible.com/prod/image/upload/t_preview/prod-itemImages/0xd07dc4262bcdbf85190c01c996b4c06a461d2430:8207";
const nftNumberOfCopie = "1";
let SymboleNft = "SRO";

const BuyNft = () => {
  const { userState } = useUser()
  const { sro721, marketplace } = useContracts();
  const [nft, setNft] = useState()
  const match = useRouteMatch("/:address/:id");

  useEffect(() => {
    if(sro721 !== null) {
      fetchNft(sro721, marketplace, match.params.id).then((result) => setNft(result))
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
              priceNft={nft.sale.status === '1' ? nft.sale.price: 'not for sale'}
              SymboleNft={SymboleNft}
              Royalties={nft.data.royalties}
              owner={nft.owner}
              user={userState.data}
              sale={nft.sale}
              nft={nft.data}
            />
          }
        />}
      </Layout>
    </>
  );
};

export default BuyNft;
