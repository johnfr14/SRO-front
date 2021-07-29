import Layout from "../components/Layout";
import { Container, Hero } from "../components/index";

function IndexPage() {
  return (
    <>
      <Layout>
        <Container children={<Hero />} className="h-screen" />
      </Layout>
    </>
  );
}

export default IndexPage;
