import React from "react";
import { NftViewSale, TabZoneSaleNft } from "./index";
import { Button } from "../index";
import { NameTag } from "../Tags";

const nftNumber = "#1";
const nftName = "NFTSROPOWAAA";
const nftNumberOfCopie = "1";
const nftDescription =
  "Its the Best NFT for TO THE MOON with SRO TEAM  Test de longueur text-gray-300!!!!!!";
let nftTitle = `${nftNumber} - ${nftName}`;

const NftSale = () => {
  return (
    <div className="container mx-auto">
      <div className="flex">
        <div className="container mx-auto max-w-screen-lg pt-20 h-screen">
          <NftViewSale />
        </div>
        <div className="container mx-auto max-w-screen-lg pl-20 pr-12">
          <div className=" relative h-full bg-gray-900 shadow-xl rounded-md border-2 border-gray-200 border-opacity-25  ">
            <div className="pt-12 items-center justify-center">
              <h2 className="pb-5 text-5xl text-gray-300 text-center font-bold ">
                {nftTitle}
              </h2>
              <div className="flex py-2 pl-4 text-2xl  ">
                <h3 className="text-yellow-300 font-bold ">Number : </h3>
                <p className="pl-4 text-gray-300">{nftNumber}</p>
              </div>
              <div className="flex py-2 pl-4 text-2xl text-left">
                <h3 className="text-yellow-300 font-bold">Name : </h3>
                <p className="pl-4 text-gray-300">{nftName}</p>
              </div>
              <div className="flex py-2 pl-4 text-2xl text-left ">
                <h3 className="text-yellow-300 font-bold">
                  Number of copie :{" "}
                </h3>
                <p className="pl-4 text-gray-300">{nftNumberOfCopie}</p>
              </div>
              <div className="py-2 pl-4 text-2xl text-left ">
                <h3 className="text-yellow-300 font-bold">Description : </h3>
                <div class="p-3">
                  <p class="text-gray-300 mb-3">{nftDescription}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-10">
              <div className="pl-4">
                <NameTag />
              </div>
              <div className="">
                <NameTag />
              </div>
              <div className="pr-4">
                <NameTag />
              </div>
            </div>
            <div className="flex items-center justify-center mb-5 mt-8">
              <a
                href="#royalties"
                className="  px-5 py-3 text-center bg-gray-400 text-white hover:bg-gray-200 hover:text-black font-bold rounded-lg text-sm"
              >
                10% of sales will go to creator
              </a>
            </div>
            <div>
              <TabZoneSaleNft />
            </div>
            <div className="flex items-center justify-center mb-5 mt-8 space-x-10">
              <Button target={""} buttonStyle>
                Put on sale
              </Button>
              <Button target={""} buttonStyle>
                Start Auction(Coming Soon)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftSale;
