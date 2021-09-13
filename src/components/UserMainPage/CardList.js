import { Suspense, lazy, useEffect, useState } from "react";
import { userTest } from "../../images/";
import { ethers } from "ethers"
import { SRO721Address } from "../../contracts/SRO721";
import { useContracts } from '../../context/ContractContext';
import { fetchLastNftOnSale, getNftCreated, getNftOnSale, getNftOwned } from '../../dataFunctions/fetchData';

const Card = lazy(() => import("../Card/Card"));
const Noitems = lazy(() => import("../UserMainPage/Noitems"));

const SubstrAdress = (dataAdress) => {
  return dataAdress.substr(0, 6) + "..." + dataAdress.substr(-4);
};

const cardMediaTest =
  "https://img.rarible.com/prod/image/upload/t_preview/prod-itemImages/0xd07dc4262bcdbf85190c01c996b4c06a461d2430:8207";

const cardMediaTest2 =
  "https://img.rarible.com/prod/image/upload/t_avatar_big/prod-collections/0x1b0338f498963d90744ab59a916344a3af9f1fed/avatar/Qma2S5KsdS9P7wLZkctoymT8r2SriwZdTQfTPWxBg3Mgu1";

const cardMediaTest3 =
  "https://img.rarible.com/prod/image/upload/prod-itemImages/0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d:7371";

const defaultData = [
  {
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/en/e/ed/Leonardo_%28Teenage_Mutant_Ninja_Turtles%29.jpg",
    name: "Leonardo",
    price: "0.05",
    unity: "ETH",
    linkToNFT: "/",

    linkToProfilCollection: "/",
    linkToProfilCreator: "/",
    linkToProfilOwner: "/",

    userIconCollection: userTest,
    userIconCreator: cardMediaTest,
    //userIconOwner: "",

    tipDataAdressCollection: "SRO",
    tipDataAdressCreator: "0x0000000000000000000000000000000000000000",
    tipDataAdressOwner: "0x0000000000000000000000000000000000000000",
  },
  {
    imgUrl:
      "https://img.rarible.com/prod/image/upload/prod-itemImages/0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d:7371",
    name: "Leonardo",
    price: "0.05",
    unity: "ETH",
    linkToNFT: "/",

    linkToProfilCollection: "/",
    linkToProfilCreator: "/",
    linkToProfilOwner: "/",

    //userIconCollection: "",
    userIconCreator: cardMediaTest2,
    userIconOwner: cardMediaTest3,

    tipDataAdressCollection: "SRO",
    tipDataAdressCreator: "0x0000000000000000000000000000000000000000",
    tipDataAdressOwner: "0x0000000000000000000000000000000000000000",
  },
];

const CardList = ({ idx, user }) => {
  const { marketplace, sro721 } = useContracts()
  const [data, setData] = useState([])
  const [fetch, setFetch] = useState(true)
  console.log(
    `Tab: ${idx === 1 ? "nftOnSale" : idx === 2 ? "nft owned" : "nft created"}`,
    data
  );

  useEffect(() => {
    const fetchNft = async (index) => {
      switch(index) {
        case 0: 
          return setData(await fetchLastNftOnSale(marketplace, sro721, data))
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

    if(sro721 !== null && marketplace !== null && fetch) {
      setFetch(false)
      fetchNft(idx)
    }
  }, [marketplace, sro721, data, idx, fetch, user])

  return (
    <>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-x-10 xl-grid-cols-4 gap-y-5 gap-x-6 ">
          {data.map((data, index) => (
            <Suspense fallback={<div>Loading...</div>}>
              <Card
                id={data.id}
                key={index}
                imgUrl={data.metadata.url || defaultData.imgUrl}
                name={data.metadata.title || defaultData.name}
                amountLike={data.metadata.likes}
                price={data.sale.price !== null ? ethers.utils.formatEther(data.sale.price) : 'not on sale'}
                unity={data.sale.price > 0 ? "SRO" : ''}
                linkToNFT={`/${SRO721Address}/${data.id}`}
                linkToProfilCollection={"SRO"}
                linkToProfilCreator={data.creator.fullAddress}
                linkToProfilOwner={data.owner.fullAddress}
                userIconCollection={defaultData.imgUrl}
                userIconCreator={data.creator.avatar}
                userIconOwner={data.owner.avatar}
                tipDataAdressCollection={SubstrAdress(
                  "0xa4D174cF992ABf58A0E95D1f5A95443699640A8E"
                )}
                tipDataAdressCreator={data.creator.address}
                tipDataAdressOwner={data.owner.address}
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

export default CardList;
