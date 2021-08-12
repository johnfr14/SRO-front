import React from 'react'
import { Button, TokenPrice } from '..'

const ModFixedPrice = () => {
  const handleDestinationChange = (event) => {
    console.log(`Vous avez choisi ${event.target.value}`);
  };
  return (
    <div className="bg-gradient-to-b from-black to-gray-700 flex justify-center items-center py-5">
      <div className="bg-gray-700 rounded-lg">
        <div className="w-96 border-t-8 border-b-8 border-yellow-300 rounded-lg">
          <div className="">
            <div className="text-white text-center">
              <h2 className="text-5xl font-bold py-4">Fixed price</h2>
              <p className="text-sm font-bold">Enter new price. Your NFT will be pushed in top of marketplace</p>
            </div>
          </div>
          <div className="pt-7 px-7">
            <TokenPrice />
          </div>
          <div className="flex items-center justify-center pt-4 pb-3 pr-5 ">
            <div className="pt-5 pl-5">
              <Button target={""} buttonStyle>Next step</Button>
            </div>
          </div>
          <div className="flex items-center justify-center pt-3 pb-3">
            <a href="#fs-sale" className="  px-5 py-3 text-center bg-gray-400 text-white hover:bg-gray-200 hover:text-black font-bold rounded-lg text-sm">Cancel</a>
          </div>
        </div>
      </div>
    </div >
  )



};

export default ModFixedPrice
