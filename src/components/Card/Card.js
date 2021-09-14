import { useEffect, useState, Suspense, lazy, memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { defaultCardData, fetchLastNftOnSale, getNftOnSale, getNftCreated, getNftOwned } from "../../dataFunctions/fetchData"

import { ProfilList, DotMenu } from "./";
import { useContracts } from "../../context/ContractContext";
import { useUser } from "../../context/UserContext";
import { getLikedNft } from "../../dataFunctions/fetchData";
import { SRO721Address } from "../../contracts/SRO721";
import "../../css/card.css";
import "../../css/toast.css";


const MediaCard = lazy(() => import("../Card/MediaCard"));
const imgUrl = "https://img.rarible.com/prod/image/upload/prod-itemImages/0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d:7371"

const SubstrAdress = (dataAdress) => {
  return dataAdress.substr(0, 6) + "..." + dataAdress.substr(-4);
};

const Card = ({
  idx,
  user,
  data,
}) => {
  const { sro721, marketplace } = useContracts();
  const { userState } = useUser();
  const [nft, setNft] = useState(defaultCardData)
  const [likeState, setLikeState] = useState({
    isLiked: false,
    amountLike: "",
  });

  const handleLikeButton = async () => {
    try {
      const tx = await sro721.like(nft.id);
      await tx.wait();
      setLikeState({
        isLiked: !likeState.isLiked,
        amountLike: !likeState.isLiked
          ? likeState.amountLike + 1
          : likeState.amountLike - 1,
      });
    } catch (e) {
      console.error(e.message);
      toast.error(e.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const fetchData = useCallback(async (index) => {
    if(sro721 !== null && marketplace !== null && fetch) {
      switch(index) {
        case 0:
          return setNft(await fetchLastNftOnSale(sro721, data))
        case 1: 
          return setNft(await getNftOnSale(data, user, marketplace, sro721))
        case 2: 
          return setNft(await getNftOwned(user, sro721));
        case 3: 
          return setNft(await getNftCreated(user, sro721));
        default: 
          return "error"
      }
    }
  },
    [marketplace, sro721, user, setNft, data],
  );
  const fetchLike = useCallback(async () => {
    setLikeState({
      isLiked: await getLikedNft(userState.data.fullAddress, data.nftId, sro721),
      amountLike: nft.metadata.likes,
    });
  }, [nft, userState, setLikeState, sro721, data]);

  useEffect(() => {
    if (likeState.amountLike === "") {
      fetchLike();
      fetchData(idx)
    }
  }, [idx, likeState, fetchData, fetchLike]);

  return (
    <div className="max-w-xs bg-gray-900 shadow-lg rounded-xl p-2 border-2 border-gray-200 border-opacity-25 pb-5 relative">
      <div className="iHLBIg">
        <div className="flex bAGyCr">
          <ProfilList
            tipDataAdressCollection={SubstrAdress("0xa4D174cF992ABf58A0E95D1f5A95443699640A8E")}
            userIconCollection={imgUrl}
            linkToProfilCollection={"SRO"}
            tipDataAdressCreator={nft.creator.address ? nft.creator.address : ''}
            userIconCreator={nft.creator.avatar}
            linkToProfilCreator={nft.creator.fullAddress}
            tipDataAdressOwner={nft.owner.address}
            userIconOwner={nft.owner.avatar}
            linkToProfilOwner={nft.owner.fullAddress}
          />
        </div>
        <div className="z-10">
          <DotMenu />
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="">
          <div className="relative h-62 w-full mb-3 p-2">
            <div className="absolute flex flex-col top-0 right-0 p-3">
              <button
                onClick={handleLikeButton}
                className="transition ease-in duration-300 bg-gray-800  hover:text-yellow-500 shadow hover:shadow-md text-gray-500 rounded-full w-8 h-8 text-center p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill={likeState.isLiked ? "red" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <p children={nft.metadata.likes}></p>
              </button>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <MediaCard mediaURL={nft.metadata.url} linkTo={`/${SRO721Address}/${nft.id}`} altName={nft.metadata.title} />
            </Suspense>
          </div>
          <div className="flex-auto justify-evenly ml-4 mr-4">
            <div className="flex flex-wrap ">
              <div className="flex items-center w-full justify-between min-w-0 ">
                <Link
                  to={`/${SRO721Address}/${nft.id}`}
                  className="text-lg mr-auto cursor-pointer text-gray-200 hover:text-yellow-500 truncate font-black"
                >
                  {nft.metadata.title}
                </Link>
              </div>
            </div>
            <div className=" text-white font-semibold mt-1">
              {nft.sale.price + ' SRO'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Card);
