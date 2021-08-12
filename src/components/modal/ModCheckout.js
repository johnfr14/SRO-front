import React from 'react'
import { Button } from '..'

const ModCheckout = () => {
  const handleDestinationChange = (event) => {
    console.log(`Vous avez choisi ${event.target.value}`);
  };
  return (
    <div className="bg-gradient-to-b from-black to-gray-700 flex justify-center items-center py-5">
      <div className="bg-gray-700 rounded-lg">
        <div className="w-96 border-t-8 border-b-8 border-yellow-300 rounded-lg">
          <div className="">
            <div className="text-white text-center">
              <h2 className="text-5xl font-bold py-4">Checkout</h2>
              <p className="text-sm font-bold">You are about to purchase TITRE NFT from AUTHOR</p>
            </div>
          </div>
          <div className="">
            <div className="pt-5 px-7">
              <input
                className="appearance-none block w-full bg-gray-900 text-white border border-gray-400 shadow-inner rounded-md py-3 px-4  leading-tight focus:outline-none  focus:border-gray-500"
                type="text"
                placeholder="1"
              />
              <p className="text-xs text-white pt-2">Enter quantity. 1 available</p>
            </div>
            <div className="pt-5 px-7">
              <div className="flex">
                <select className="text-sm border border-2 rounded-l px-4 py-2 bg-gray-300 whitespace-no-wrap" onChange={handleDestinationChange}>
                  <option>ETH</option>
                  <option>XSRO</option>
                  <option>SRO</option>
                </select>
                <input
                  type="text"
                  className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 bg-gray-900 text-white border border-gray-400 shadow-inner rounded-md py-3 px-4 focus:outline-none  focus:border-gray-500"
                  placeholder="10"
                />
              </div>
              <p className="text-xs text-white pt-2">Price per edition</p>
            </div>
          </div>
          <div className="pt-5 ml-4 text-left text-white ">
            <p >Balance : xx XSRO</p>
            <p >Service fee : xx XSRO</p>
            <p >Total Price : xx XSRO</p>
            <p >You will pay : xx XSRO</p>
          </div>
          <div className="flex items-center justify-center pt-4 pb-3 pr-5 ">
            <div className="pt-5 pl-5">
              <Button target={""} buttonStyle>Proceed to payement</Button>
            </div>
          </div>
          <div className="flex items-center justify-center pt-3 pb-3">
            <a href="#fs-sale" className="  px-5 py-3 text-center bg-gray-400 text-white hover:bg-gray-200 hover:text-black font-bold rounded-lg text-sm">Cancel</a>
          </div>
        </div>
      </div>
    </div >
  )
}

export default ModCheckout
