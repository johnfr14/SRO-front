import Layout from "../components/Layout";
import { Container, BannerInfos, TabZone } from "../components/index";
import { userData } from "../data/fetchData"
import { Web3Context } from "web3-hooks";
import { useRouteMatch } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

function OwnedPage() {
  const [web3State] = useContext(Web3Context); 
  const [data, setData] = useState()
  const match = useRouteMatch("/user/:address");
  console.log(match)

  useEffect(() => {
    const fetch = async() => {
      const address = match.params.address.length === 42 ? match.params.address : web3State.account
      setData(await userData(address.toLowerCase()))
    }
    if (data === undefined || (data.address !== match.params.address && match.params.address.length === 41)) {
      fetch()
    }
  }, [match.params.address, data, web3State])
  
  return (
    <>
       <Layout>
        {data && 
        <>
          <Container children={<BannerInfos data={data} />} />
          <Container children={<TabZone user={data}/>} /> 
        </>}
      </Layout>
    </>
  );
}

export default OwnedPage;
