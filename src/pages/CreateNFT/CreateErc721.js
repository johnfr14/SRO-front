import React from 'react'
import Layout from "../../components/Layout";
import { Container, Erc721Nft } from "../../components/index";

const CreateErc721 = () => {
  return (
    <Layout>
      <Container children={<Erc721Nft />} />
    </Layout>
  )
}

export default CreateErc721
