import React, { useEffect, useState } from "react";
import { NftViewBuy, TabZoneBuyNft } from "./index";
import { Button, ButtonOnClick } from "../Button";
import { NameTag } from "../Tags";
import { userData } from "../../dataFunctions/fetchData";
import {
  ModFixedPrice,
  ModCreateSale,
  ModPurchase,
  ModRemoveSale,
  ModEditPrice,
} from "../Modal";
import { SRO721Address } from "../../contracts/SRO721";
import { defaultCardData } from "../../dataFunctions/fetchData";
import { SubstrAdress } from "../../dataFunctions/fetchData";

const linkToNameTag2 = "/";

const NameTagTitle2 = "Collection: SRO";

const Nft = ({
  mediaURL,
  nftId,
  nftTitle,
  nftNumberOfCopie,
  nftDescription,
  priceNft,
  SymboleNft,
  Royalties,
  ownerAddress,
  user,
  sale,
  nft,
}) => {
  const [open, setOpen] = useState({
    createSale: false,
    removeSale: false,
    editPrice: false,
    buyNft: false,
  });
  const [nextStep, setNextStep] = useState({
    nftId: nftId,
    collection: SRO721Address,
    token: "ETH",
    price: null,
    isNext: false,
  });
  const [owner, setOwner] = useState(defaultCardData.owner)
  const [fetch, setFetch] = useState (true)

  useEffect(() => {
    if (fetch) {
      userData(ownerAddress).then(result => setOwner(result))
      setFetch(false)
    }
  }, [ownerAddress, fetch])
  return (
    <>
      <ModFixedPrice
        open={open}
        setOpen={setOpen}
        setNextStep={setNextStep}
        nextStep={nextStep}
      />
      <ModCreateSale nextStep={nextStep} setNextStep={setNextStep} />
      <ModPurchase
        open={open}
        setOpen={setOpen}
        sale={sale}
        nft={nft}
        user={user}
      />
      <ModRemoveSale
        open={open}
        setOpen={setOpen}
        sale={sale}
        nft={nft}
        user={user}
      />
      <ModEditPrice
        open={open}
        setOpen={setOpen}
        sale={sale}
        nft={nft}
        user={user}
      />
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row">
          <div className=" flex content-center items-center justify-center mx-auto max-w-screen-lg px-8">
            <NftViewBuy mediaURL={mediaURL} />
          </div>
          <div className="relative bg-gray-900 shadow-xl rounded-md border-2 border-gray-200 border-opacity-25 md:max-w-lg">
            <div className="">
              <div className="pt-12 items-center justify-center py-2 pl-4">
                <h1 className="pb-8 text-purple-500 text-center font-bold text-4xl">
                  {nftTitle}
                </h1>
                {/* <div className="flex ">
                  <h3 className="text-yellow-300 font-bold ">Number : </h3>
                  <p className="pl-4 text-gray-300">{nftId}</p>
                </div> */}
                <div className="flex text-left">
                  <h3 className="text-yellow-300 font-bold">Owner : </h3>
                  <p className="pl-4 text-gray-300">{owner.username + ` ${SubstrAdress(ownerAddress)}` || SubstrAdress(ownerAddress)}</p>
                </div>
                <div className="flex  text-left ">
                  <h3 className="text-yellow-300 font-bold">
                    Number of copie :{" "}
                  </h3>
                  <p className="pl-4 text-gray-300">{nftNumberOfCopie}</p>
                </div>
                <div className=" text-left ">
                  <h3 className="text-yellow-300 font-bold">Description : </h3>
                  <div className="p-3">
                    <p className="text-gray-300 mb-3">{nftDescription}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-around mx-2">
                {owner && <div className="mb-3 md:mb-0 m-2">
                  <NameTag
                    linkToNameTag={owner.fullAddress}
                    userIcon={owner.avatar}
                    NameTagTitle={owner.username}
                  />
                </div>}
                <div className="mb-3 md:mb-0 m-2">
                  <NameTag
                    linkToNameTag={linkToNameTag2}
                    NameTagTitle={NameTagTitle2}
                  />
                </div>
              </div>
              <div className="flex items-center justify-center mb-5 mt-8">
                <div className="  px-5 py-3 text-center bg-gray-700 text-white  font-bold rounded-lg text-sm">
                  {Royalties}% of sales will go to creator
                </div>
              </div>
              <div className="">
                <TabZoneBuyNft />
              </div>
              {sale.length > 0 ? (
                <div className="flex items-center justify-center mb-5 mt-8 space-x-10">
                  {ownerAddress === user.fullAddress.toLowerCase() ? (
                    <>
                      <ButtonOnClick
                        onClick={() => setOpen({ ...open, editPrice: true })}
                        buttonStyle
                      >
                        Edit price
                      </ButtonOnClick>
                      <ButtonOnClick
                        onClick={() => setOpen({ ...open, removeSale: true })}
                        buttonRemove
                      >
                        Remove sale
                      </ButtonOnClick>
                    </>
                  ) : (
                    <>
                      <ButtonOnClick
                        onClick={() => setOpen({ ...open, buyNft: true })}
                        buttonStyle
                      >
                        Buy for {priceNft} {SymboleNft}
                      </ButtonOnClick>
                      <ButtonOnClick >
                        <div className="flex">
                          <p className="text-yellow-400">Make a bid :</p>
                          <p className="ml-1 text-purple-500">Coming Soon</p>
                        </div>
                      </ButtonOnClick>                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center mb-5 mt-8 space-x-10">
                  {ownerAddress === user.fullAddress.toLowerCase() ? (
                    <ButtonOnClick
                      onClick={() => setOpen({ ...open, createSale: true })}
                      buttonStyle
                    >
                      Put on sale
                    </ButtonOnClick>
                  ) : (
                    <ButtonOnClick >
                      <div className="flex">
                        <p className="text-yellow-400">Make a bid :</p>
                        <p className="ml-1 text-purple-500">Coming Soon</p>
                      </div>
                    </ButtonOnClick>
                  )}
                  {/* <Button target={""} buttonStyle>
                    Coming Soon
                  </Button> */}
                </div>
              )}
              <div className="flex items-center justify-center mb-5 mt-8 space-x-10">
                {ownerAddress === user.fullAddress.toLowerCase() ? (
                  <>
                    {/* <Button target={""} buttonStyle>
                      Start Auction(Coming Soon)
                    </Button> */}
                    <ButtonOnClick >
                      <div className="flex">
                        <p className="text-yellow-400">Start Auction :</p>
                        <p className="ml-1 text-purple-500">Coming Soon</p>
                      </div>
                    </ButtonOnClick>
                  </>
                ) : (
                  <>
                    {/* <Button target={""} buttonStyle>
                      Place a bid(Coming Soon)
                    </Button> */}
                    <Button target={"/"} buttonStyle>
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nft;
