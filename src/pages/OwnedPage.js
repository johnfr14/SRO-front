import Layout from "../components/Layout";
import { Container, BannerInfos } from "../components/index";

function OwnedPage() {
  return (
    <>
      <Layout>
        <Container children={<BannerInfos />} />
      </Layout>
    </>
  );
}

export default OwnedPage;
