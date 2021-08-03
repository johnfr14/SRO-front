import Layout from "../components/Layout";
import { Container, BannerInfos, TabZone } from "../components/index";

function OwnedPage() {
  return (
    <>
      <Layout>
        <Container children={<BannerInfos />} />
        <Container children={<TabZone />} />
      </Layout>
    </>
  );
}

export default OwnedPage;
