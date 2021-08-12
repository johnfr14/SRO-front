import React from "react";
import Layout from "../components/Layout";
import { Container, NftBuy } from "../components/index";

const BuyNft = () => {
  return (
    <>
      <Layout>
        <Container children={<NftBuy />} className="h-screen" />
      </Layout>
    </>
  )
}

export default BuyNft
