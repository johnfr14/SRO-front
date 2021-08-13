import React from "react";
import Layout from "../components/Layout";
import { Container, NftSale } from "../components/index";

const SaleNft = () => {
  return (
    <Layout>
      <Container children={<NftSale />} className="h-screen" />
    </Layout>
  )
}

export default SaleNft
