import Layout from "../components/Layout";
import { Container, BannerInfos, TabZone } from "../components/index";
import { userData } from "../dataFunctions/fetchData"
import { useUser } from "../context/UserContext"
import { useRouteMatch } from "react-router-dom";
import { useState, useEffect } from "react";
import { ethers } from 'ethers'

function OwnedPage() {
  const { userState } = useUser() 
  const [data, setData] = useState()
  const match = useRouteMatch("/user/:address");

  useEffect(() => {
    const fetch = async() => {
      const address = ethers.utils.isAddress(match.params.address) ? match.params.address : userState.data.fullAddress
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
