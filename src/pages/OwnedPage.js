import Layout from "../components/Layout";
import { Container, BannerInfos, TabZone } from "../components/index";
import { useUser } from "../context/UserContext"

function OwnedPage() {
  const { userState } = useUser()
  return (
    <>
      <Layout>
        <Container children={<BannerInfos data={userState.data} />} />
        {userState.data.address && <Container children={<TabZone user={userState.data}/>} />}
      </Layout>
    </>
  );
}

export default OwnedPage;
