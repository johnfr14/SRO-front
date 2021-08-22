import Layout from "../components/Layout";
import { Container, BannerInfos, TabZone } from "../components/index";
import {UserData} from "../data/UserData"

function OwnedPage() {
  const data = UserData()
  return (
    <>
      <Layout>
        <Container children={<BannerInfos data={data} />} />
        <Container children={<TabZone />} />
      </Layout>
    </>
  );
}

export default OwnedPage;
