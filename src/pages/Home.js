import Layout from "../components/Layout";
import { Container, MarketPlace } from "../components/index";

function IndexPage() {
  return (
    <>
      <Layout>
        <Container children={<MarketPlace />} className="h-screen" />
      </Layout>
    </>
  );
}

export default IndexPage;
