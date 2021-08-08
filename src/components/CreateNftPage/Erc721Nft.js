import React, { useState } from 'react'
import { PreviewFile, NftPrice, SwitchToggle, UploadFile } from '.'
import { Button } from "../index";

const Erc721Nft = () => {

  const [isToggledPrice, setIsToggledPrice] = useState(false)
  const [isToggled, setIsToggled] = useState(false)


  return (
    <div className="min-h-screen pt-2 font-mono my-16 ">
      <div className="container mx-auto">
        <h2 className="text-5xl text-white text-center font-bold pb-10">Create single collectible</h2>
        <UploadFile />
        <PreviewFile />
        <div className="">
          <h2 className="text-2xl text-white font-semibold pt-4 pb-1">Put on marketplace</h2>
          <SwitchToggle isToggled={isToggledPrice} onToggle={() => setIsToggledPrice(!isToggledPrice)} />
          <p className="block tracking-wide text-white text-xs mb-2 mt-2">
            Put your new NFT on XSRO marketplace
          </p>
        </div>
        <NftPrice />
        <div className="">
          <h2 className="text-2xl text-white font-semibold pt-4 pb-1">Unlock once purchased</h2>
          <SwitchToggle isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} />
          <input
            className="appearance-none block mt-2 w-full bg-gray-900 text-white border border-gray-400 shadow-inner rounded-md py-3 px-4  leading-tight focus:outline-none  focus:border-gray-500"
            type="text"
            placeholder="Digital key, linkto file..."
          />
          <label className="block tracking-wide text-white text-xs mb-2 mt-2">
            Content will be unlocked after successful transaction
          </label>
        </div>
        <div className="">
          <label className="block uppercase tracking-wide text-white text-xl font-bold mb-2 mt-5">
            Title
          </label>
          <input
            className="appearance-none block w-full bg-gray-900 text-white border border-gray-400 shadow-inner rounded-md py-3 px-4  leading-tight focus:outline-none  focus:border-gray-500"
            type="text"
            placeholder="Title NFT"
          />
          <p className="text-xs text-red-500 mt-2">"Title" is required</p>
        </div>
        <div className="">
          <label className="block uppercase tracking-wide text-white text-xl font-bold mb-2 mt-5">
            Decription (Optional)
          </label>
          <input
            className="appearance-none block w-full bg-gray-900 text-white border border-gray-400 shadow-inner rounded-md py-3 px-4  leading-tight focus:outline-none  focus:border-gray-500"
            type="text"
            placeholder="Descriptif NFT"
          />
        </div>
        <div className="">
          <label className="block uppercase tracking-wide text-white text-xl font-bold mb-2 mt-5">
            Royalties
          </label>
          <input
            className="appearance-none block w-full bg-gray-900 text-white border border-gray-400 shadow-inner rounded-md py-3 px-4  leading-tight focus:outline-none  focus:border-gray-500"
            type="text"
            placeholder="10 %"
          />
          <p className="block tracking-wide text-white text-xs mb-2 mt-2">
            Suggested: 0%, 10%, 20%, 30%. Maximum is 50%
          </p>
        </div>
        <div className="mt-10">
          <Button target={""} buttonStyle>
            Create item
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Erc721Nft
