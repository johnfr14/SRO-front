import React from 'react'
import { LoaderIcon } from '..'

const ModPurchase = () => {
  return (
    <div className="bg-gradient-to-b from-black to-gray-700 flex justify-center items-center py-5">
      <div className="bg-gray-700 rounded-lg">
        <div className="w-96 border-t-8 border-b-8 border-yellow-300 rounded-lg">
          <div className="">
            <div className="pt-3 pl-5">
              <LoaderIcon />
            </div>
            <div className="text-white text-center">
              <h2 className="text-5xl font-bold py-3">Purchase</h2>
              <p className="text-xs">Send Transaction to purchase asset</p>
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

export default ModPurchase
