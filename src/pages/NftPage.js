import React from "react";
import Layout from "../components/Layout";
import { Container, Nft } from "../components/index";

const MediaDemo =
  "https://img.rarible.com/prod/image/upload/t_preview/prod-itemImages/0xd07dc4262bcdbf85190c01c996b4c06a461d2430:8207";

const nftNumber = "#1";
const nftName = "NFTSROPOWAAA";
const nftNumberOfCopie = "1";
const nftDescription = "Its the Best NFT for TO THE MOON with SRO TEAM  !!!!";
let nftTitle = `${nftNumber} - ${nftName}`;
let priceNft = 10;
let SymboleNft = "SRO";
let Royalties = 10;

const BuyNft = () => {
  return (
    <>
      <Layout>
        <Container
          children={
            <Nft
              mediaURL={MediaDemo}
              nftNumber={nftNumber}
              nftName={nftName}
              nftTitle={nftTitle}
              nftNumberOfCopie={nftNumberOfCopie}
              nftDescription={nftDescription}
              priceNft={priceNft}
              SymboleNft={SymboleNft}
              Royalties={Royalties}
            />
          }
        />
      </Layout>
    </>
  );
};

export default BuyNft;
