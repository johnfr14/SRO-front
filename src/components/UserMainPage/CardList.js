import { Suspense, lazy, useEffect, useState, memo, useCallback } from "react";
import { ethers } from "ethers"
import { useContracts } from '../../context/ContractContext';
import {  getNftCreated, getNftOwned, getNftOnSale } from '../../dataFunctions/fetchData';

const Card = lazy(() => import("../Card/Card"));
const Noitems = lazy(() => import("../UserMainPage/Noitems"));


// const cardMediaTest =
//   "https://img.rarible.com/prod/image/upload/t_preview/prod-itemImages/0xd07dc4262bcdbf85190c01c996b4c06a461d2430:8207";

// const cardMediaTest2 =
//   "https://img.rarible.com/prod/image/upload/t_avatar_big/prod-collections/0x1b0338f498963d90744ab59a916344a3af9f1fed/avatar/Qma2S5KsdS9P7wLZkctoymT8r2SriwZdTQfTPWxBg3Mgu1";

// const cardMediaTest3 =
//   "https://img.rarible.com/prod/image/upload/prod-itemImages/0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d:7371";


const CardList = ({ idx, user }) => {
  const { marketplace, sro721 } = useContracts()
  const [data, setData] = useState([])
  const [fetch, setFetch] = useState(true)
  console.log(
    `Tab: ${idx === 1 ? "nftOnSale" : idx === 2 ? "nft owned" : "nft created"}`,
    data
  );
  
  const fetchData = useCallback(async (index) => {
    if(sro721 !== null && marketplace !== null && fetch) {
      setFetch(false)
      switch(index) {
        case 0:
          const totalSales = await marketplace.totalSale()
          const sales = []
          for (let i = totalSales; i > 0; i--) {
            sales.push(marketplace.getSale(i))
          }
          const datas = []
          await Promise.all(sales).then(result => result.forEach(element => {
            return element[0] === 2 ? datas.push({
                status: element[0],
                nftId: element[1].toString(),
                price: ethers.utils.formatEther(element[2]),
                seller: element[3],
                collections: element[4],
              }) : ''
            })
          )
          return setData(datas)
        case 1: 
          return setData(await getNftOnSale(user, marketplace, sro721))
        case 2: 
          return setData(await getNftOwned(user, sro721));
        case 3: 
          return setData(await getNftCreated(user, sro721));
        default: 
          return "error"
      }
    }
  },
    [marketplace, sro721, user, fetch],
  );

  useEffect(() => {
    fetchData(idx)
  }, [idx, fetchData])

  return (
    <>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-x-10 xl-grid-cols-4 gap-y-5 gap-x-6 ">
          {data.map((data, index) => (
            <Suspense fallback={<div>Loading...</div>}>
              <Card
                key={index}
                idx={idx}
                user={user}
                data={data}
              /> 
            </Suspense>
          ))}
        </div>
      ) : (
        <Noitems />
      )}
    </>
  );
};

export default memo(CardList);
