import Layout from "../components/Layout";
import { Container, BannerInfos, TabZone } from "../components/index";
import { userData } from "../data/fetchData"
import { Web3Context } from "web3-hooks";
import { useRouteMatch } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

function OwnedPage() {
  const [web3State] = useContext(Web3Context); 
  const [data, setData] = useState({address: null})
  const match = useRouteMatch("/user/:address");

  useEffect(() => {
    const fetch = async() => {
      const address = match.params.address.length === 42 ? match.params.address : web3State.account
      setData(await userData(address.toLowerCase()))
    }
    if (data === undefined || (data.fullAddress !== match.params.address)) {
      fetch()
    }
  }, [match.params.address, data, web3State])
  
  return (
    <>
       <Layout>
        {data.fullAddress === match.params.address && 
        <>
          <Container children={<BannerInfos data={data} />} />
          <Container children={<TabZone user={data}/>} /> 
        </>}
      </Layout>
    </>
  );
}

export default OwnedPage;
