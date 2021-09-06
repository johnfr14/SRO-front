import React, {useState} from "react";
import { NftViewBuy, TabZoneBuyNft } from "./index";
import { Button, ButtonOnClick } from "../Button";
import { NameTag } from "../Tags";
import { ModFixedPrice, ModCreateSale } from "../Modal";
import { SRO721Address } from "../../contracts/SRO721";

// import { userTest } from "../../images";

// const linkToNameTag1 = "/user";
// const userIcon1 = userTest;
// const NameTagTitle1 = "Owner";

const linkToNameTag2 = "/";

const NameTagTitle2 = "Collection: SRO";

const Nft = ({
  mediaURL,
  nftId,
  nftName,
  nftTitle,
  nftNumberOfCopie,
  nftDescription,
  priceNft,
  SymboleNft,
  Royalties,
  owner,
  user,
}) => {
  const [open, setOpen] = useState(false);
  const [nextStep, setNextStep] = useState({nftId: nftId, collection: SRO721Address, token: 'ETH', price: null, isNext: false});

  return (
    <>
      <ModFixedPrice isOpen={open} setOpen={setOpen} setNextStep={setNextStep} nextStep={nextStep}/>
      <ModCreateSale nextStep={nextStep} setNextStep={setNextStep} />
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row">
          <div className=" flex content-center items-center justify-center mx-auto max-w-screen-lg px-8">
            <NftViewBuy mediaURL={mediaURL} />
          </div>
          <div className="relative bg-gray-900 shadow-xl rounded-md border-2 border-gray-200 border-opacity-25 md:max-w-lg">
            <div className="">
              <div className="pt-12 items-center justify-center py-2 pl-4">
                <h1 className="pb-5 text-gray-300 text-center font-bold text-2xl">
                  {nftTitle}
                </h1>
                <div className="flex ">
                  <h3 className="text-yellow-300 font-bold ">Number : </h3>
                  <p className="pl-4 text-gray-300">{nftId}</p>
                </div>
                <div className="flex text-left">
                  <h3 className="text-yellow-300 font-bold">Name : </h3>
                  <p className="pl-4 text-gray-300">{nftName}</p>
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
                <div className="mb-3 md:mb-0 m-2">
                  <NameTag
                    linkToNameTag={owner.fullAddress}
                    userIcon={owner.avatar}
                    NameTagTitle={owner.username}
                  />
                </div>
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
              <div className="flex items-center justify-center mb-5 mt-8 space-x-10">
                {owner.fullAddress.toLowerCase() === user.fullAddress ? (
                  <ButtonOnClick onClick={() => setOpen(!open)} target={""} buttonStyle>
                    Put on sale
                  </ButtonOnClick>
                ) : (
                  <ButtonOnClick buttonStyle>
                    Buy for {priceNft} {SymboleNft}
                  </ButtonOnClick>
                )}
                <Button target={""} buttonStyle>
                  Coming Soon
                </Button>
              </div>
              <div className="flex items-center justify-center mb-5 mt-8 space-x-10">
                {owner.fullAddress.toLowerCase() === user.fullAddress ? (
                  <>
                    <Button target={""} buttonStyle>
                      Start Auction(Coming Soon)
                    </Button>
                  </>
                ) : (
                  <>
                    <Button target={""} buttonStyle>
                      Place a bid
                    </Button>
                    <Button target={""} buttonStyle>
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
