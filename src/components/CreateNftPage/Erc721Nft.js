import React, { useState } from 'react'
import { PreviewFile, UploadFile } from '.'
import { SwitchToggle, TokenPrice, Button } from '../index'


const Erc721Nft = () => {

  const [isToggledPrice, setIsToggledPrice] = useState(false)
  const [isToggled, setIsToggled] = useState(false)


  return (
    <div className="min-h-screen pt-2 font-mono my-16 ">
      <div className="container mx-auto">
        <h2 className="text-5xl text-white text-center font-bold pb-10">Create single collectible</h2>
        <div className="">
          <UploadFile />
        </div>
        <div className="flex items-center justify-center" >
          <PreviewFile />
          <div className="flex">
            <div className="pl-5 text-white">
              <div className="">
                <h2 className="text-2xl font-semibold pt-4 pb-1">Put on marketplace</h2>
                <SwitchToggle isToggled={isToggledPrice} onToggle={() => setIsToggledPrice(!isToggledPrice)} />
                <p className="block tracking-wide  text-xs mb-2 mt-2">
                  Put your new NFT on XSRO marketplace
                </p>
                <TokenPrice />
              </div>
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
            </div>
          </div>
        </div>
        <div className="container mx-auto max-w-screen-lg h-full">
          <div className=" relative h-full flex flex-col bg-gray-900 shadow-xl rounded-md mt-3 border-2 border-gray-200 border-opacity-25 pb-3 relative">
            <div className=" ml-24 items-center justify-center">
              <label className="block uppercase tracking-wide text-white text-xl font-bold mb-2 mt-5">
                Title
              </label>
              <div className="pr-24">
                <input
                  className="appearance-none block w-full bg-gray-900 text-white border border-gray-400 shadow-inner rounded-md py-3 px-4  leading-tight focus:outline-none  focus:border-gray-500"
                  type="text"
                  placeholder="Title NFT"
                />
              </div>
              <p className="text-xs text-red-500 mt-2">"Title" is required</p>
            </div>
            <div className=" ml-24 items-center justify-center">
              <label className="block uppercase tracking-wide text-white text-xl font-bold mb-2 mt-5">
                Decription (Optional)
              </label>
              <div className="pr-24">
                <input
                  className="appearance-none block w-full bg-gray-900 text-white border border-gray-400 shadow-inner rounded-md py-3 px-4  leading-tight focus:outline-none  focus:border-gray-500"
                  type="text"
                  placeholder="Descriptif NFT"
                />
              </div>
            </div>
            <div className=" ml-24 items-center justify-center">
              <label className="block uppercase tracking-wide text-white text-xl font-bold mb-2 mt-5">
                Royalties
              </label>
              <div className="pr-24">
                <input
                  className="appearance-none block w-full bg-gray-900 text-white border border-gray-400 shadow-inner rounded-md py-3 px-4  leading-tight focus:outline-none  focus:border-gray-500"
                  type="text"
                  placeholder="10 %"
                />
              </div>
              <p className="block tracking-wide text-white text-xs mb-2 mt-2">
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
    </div >
  )
}

export default Erc721Nft
