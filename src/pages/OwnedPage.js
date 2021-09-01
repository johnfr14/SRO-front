import Layout from "../components/Layout";
import { Container, BannerInfos, TabZone } from "../components/index";
import { userData } from "../data/fetchData"
import { useUser } from "../context/UserContext"
import { useRouteMatch } from "react-router-dom";
import { useState, useEffect } from "react";

function OwnedPage() {
  const { userState } = useUser() 
  const [data, setData] = useState({address: null})
  const match = useRouteMatch("/user/:address");

  useEffect(() => {
    const fetch = async() => {
      const address = match.params.address.length === 42 ? match.params.address : userState.data.fullAddress
      setData(await userData(address.toLowerCase()))
    }
    if (data === undefined || (data.fullAddress !== match.params.address.toLowerCase())) {
      fetch()
    }
  }, [match.params.address, data, userState])
  
  return (
    <>
       <Layout>
        {data.fullAddress === match.params.address.toLowerCase() && 
        <>
          <Container children={<BannerInfos data={data} />} />
          <Container children={<TabZone user={data}/>} /> 
        </>}
      </Layout>
    </>
  );
}

export default OwnedPage;
