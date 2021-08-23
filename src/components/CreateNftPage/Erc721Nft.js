import React, { useState } from "react";
import { PreviewFile, UploadFile } from ".";
import { SwitchToggle, TokenPrice, Button } from "../index";

const Erc721Nft = () => {
  const [isToggledPrice, setIsToggledPrice] = useState(false);
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className="min-h-screen pt-2 font-mono my-16 text-white">
      <div className="container mx-auto">
        <h1 className="text-5xl  text-center font-bold pb-10">
          Create single collectible
        </h1>
        <div className="mb-5">
          <UploadFile />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div>
            <PreviewFile />
          </div>
          <div className="flex">
            <div className="md:pl-5 ">
              <div className="">
                <h2 className="text-2xl font-semibold pt-4 pb-1">
                  Put on marketplace
                </h2>
                <SwitchToggle
                  isToggled={isToggledPrice}
                  onToggle={() => setIsToggledPrice(!isToggledPrice)}
                />
                <p className="block tracking-wide text-xs mb-2 mt-2">
                  Put your new NFT on XSRO marketplace
                </p>
                <TokenPrice />
              </div>
              <div className="">
                <h2 className="text-2xl font-semibold pt-4 pb-1">
                  Unlock once purchased
                </h2>
                <SwitchToggle
                  isToggled={isToggled}
                  onToggle={() => setIsToggled(!isToggled)}
                />
                <input
                  className="appearance-none block mt-2 w-full bg-gray-900  border border-gray-400 shadow-inner rounded-md py-3 px-4  leading-tight focus:outline-none  focus:border-gray-500"
                  type="text"
                  placeholder="Digital key, linkto file..."
                />
                <label className="block tracking-wide  text-xs mb-2 mt-2">
                  Content will be unlocked after successful transaction
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto max-w-screen-lg h-full">
          <div className=" relative h-full flex flex-col bg-gray-900 shadow-xl rounded-md mt-3 border-2 border-gray-200 border-opacity-25 p-5 ">
            <div className="items-center justify-center">
              <label className="block uppercase tracking-wide  text-xl font-bold mb-2 mt-5">
                Title
              </label>
              <div className="">
                <input
                  className="appearance-none block w-full bg-gray-900  border border-gray-400 shadow-inner rounded-md py-3 px-4  leading-tight focus:outline-none  focus:border-gray-500"
                  type="text"
                  placeholder="Title NFT"
                />
              </div>
              <p className="text-xs text-red-500 mt-2">"Title" is required</p>
            </div>
            <div className="items-center justify-center">
              <label className="block uppercase tracking-wide  text-xl font-bold mb-2 mt-5">
                Decription (Optional)
              </label>
              <div className="">
                <input
                  className="appearance-none block w-full bg-gray-900 border border-gray-400 shadow-inner rounded-md py-3 px-4  leading-tight focus:outline-none  focus:border-gray-500"
                  type="text"
                  placeholder="Descriptif NFT"
                />
              </div>
            </div>
            <div className="items-center justify-center">
              <label className="block uppercase tracking-wide  text-xl font-bold mb-2 mt-5">
                Royalties
              </label>
              <div className="">
                <input
                  className="appearance-none block w-full bg-gray-900  border border-gray-400 shadow-inner rounded-md py-3 px-4  leading-tight focus:outline-none  focus:border-gray-500"
                  type="text"
                  placeholder="10 %"
                />
              </div>
              <p className="block tracking-wide text-xs mb-2 mt-2">
                Suggested: 0%, 10%, 20%, 30%. Maximum is 50%
              </p>
            </div>
            <div className="flex items-center justify-center my-8">
              <Button target={""} buttonStyle>
                Create Item
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Erc721Nft;
