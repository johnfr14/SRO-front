import { useEffect, useState, Suspense, lazy, memo } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  defaultCardData,
  SubstrAdress,
  fetchData,
} from "../../dataFunctions/fetchData";
import { ProfilList, DotMenu } from "./";
import { useContracts } from "../../context/ContractContext";
import { SRO721Address } from "../../contracts/SRO721";
import { logoSRO } from "../../images";
import "../../css/card.css";
import "../../css/toast.css";
const MediaCard = lazy(() => import("../Card/MediaCard"));

const Card = ({ idx, user, data }) => {
  const { sro721, marketplace } = useContracts();
  const [nft, setNft] = useState(defaultCardData);

  const handleLikeButton = async () => {
    try {
      const tx = await sro721.like(nft.id);
      await tx.wait();
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

  useEffect(() => {
    if (sro721 !== null && marketplace !== null) {
      fetchData(idx, user, data, sro721, marketplace)
      .then((result) => setNft(result));
    }
  }, [idx, marketplace, sro721, data, user]);

  return (
    <div className="max-w-xs bg-gray-900 shadow-lg rounded-xl p-2 border-2 border-gray-200 border-opacity-25 pb-5 relative">
      <div className="iHLBIg">
        <div className="flex bAGyCr">
          <ProfilList
            tipDataAdressCollection={SubstrAdress(
              "0x176703E8e80E6405728F0b44eeaE7c0d17Bb4F53"
            )}
            userIconCollection={logoSRO}
            linkToProfilCollection={"SRO"}
            tipDataAdressCreator={
              nft.creator.address ? nft.creator.address : ""
            }
            userIconCreator={nft.creator.avatar}
            linkToProfilCreator={nft.creator.fullAddress}
            tipDataAdressOwner={nft.owner.address}
            userIconOwner={nft.owner.avatar}
            linkToProfilOwner={nft.owner.fullAddress}
          />
        </div>
        <div className="dotMenu">
          <DotMenu />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="">
          <div className="relative h-62 w-full mb-3 p-2 like">
            <div className="absolute flex flex-col top-0 right-0 p-3">
              <button
                onClick={handleLikeButton}
                className="transition ease-in duration-300 bg-gray-800  hover:text-yellow-400 shadow hover:shadow-md text-gray-500 rounded-full w-8 h-8 text-center p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill={nft.metadata.isLiked ? "red" : "none"}
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
              <MediaCard
                mediaURL={nft.metadata.url}
                linkTo={nft.id === null ? "/" : `/${SRO721Address}/${nft.id}`}
                altName={nft.metadata.title}
              />
            </Suspense>
          </div>
          <div className="flex-auto justify-evenly ml-4 mr-4">
            <div className="flex flex-wrap ">
              <div className="flex items-center w-full justify-between min-w-0 ">
                <Link
                  to={nft.id === null ? "/" : `/${SRO721Address}/${nft.id}`}
                  className="text-lg mr-auto cursor-pointer text-gray-200 hover:text-yellow-400 truncate font-black"
                >
                  <div className="text-yellow-400 text-2xl">
                    {nft.metadata.title}
                  </div>
                </Link>
              </div>
            </div>
            <div className="mt-1">
              <p className="flex text-sm">
                <div className="">
                  <p>
                    {nft.sale.price === null ? (
                      ""
                    ) : (
                      <p className="flex text-purple-500">
                        Price :{" "}
                        <p className="pl-1 text-gray-300">
                          {nft.sale.price} xSRO
                        </p>
                      </p>
                    )}
                  </p>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Card);
