import { Card, Noitems } from "../index";
import { userTest } from "../../images/";

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

const CardList = ({ nft }) => {
  console.log(nft)
  return (
    <>
      {nft && 
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-x-10 xl-grid-cols-4 gap-y-5 gap-x-6 ">
          {nft.map((data) => (
            <Card
              key={data.id + data.index || defaultData.name + data.index}
              imgUrl={data.metada.imgUrl || defaultData.imgUrl}
              name={data.metada.name || defaultData.name}
              price={data.metada.price || defaultData.price}
              unity={data.metada.unity || defaultData.unity}
              linkToNFT={data.metada.linkToNFT || defaultData.linkToNFT}
              linkToProfilCollection={data.metada.linkToProfilCollection || defaultData.linkToProfilCollection}
              linkToProfilCreator={data.metada.linkToProfilCreator || defaultData.linkToProfilCreator}
              linkToProfilOwner={data.metada.linkToProfilOwner || defaultData.linkToProfilOwner}
              userIconCollection={data.metada.userIconCollection || defaultData.userIconCollection}
              userIconCreator={data.metada.userIconCreator || defaultData.userIconCreator}
              userIconOwner={data.metada.userIconOwner || defaultData.userIconOwner}
              tipDataAdressCollection={data.metada.tipDataAdressCollection || defaultData.tipDataAdressCollection}
              tipDataAdressCreator={data.metada.tipDataAdressCreator || defaultData.tipDataAdressCreator}
              tipDataAdressOwner={data.metada.tipDataAdressOwner || defaultData.tipDataAdressOwner}
            />
          )) || <Noitems />}
        </div> }
    </>
  );
};

export default CardList;
