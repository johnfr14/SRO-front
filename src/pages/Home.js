import Layout from "../components/Layout";
import { Container, MarketPlace } from "../components/index";

function IndexPage() {
  return (
    <>
      <Layout>
        <Container children={<MarketPlace />} />
      </Layout>
    </>
  );
}

export default IndexPage;
