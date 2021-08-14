import React from 'react'
import { Divider } from "../index";

const MarketPlace = () => {
  return (
    <>
      <div>
        <div className="md:mx-8">
          <h2 className="mb-2 text-3xl font-bold text-left text-white">
            TOP liked
          </h2>
        </div>
        <Divider className="ml:mx-8 mb-2" />
      </div>
      <div>
        <div className="md:mx-8">
          <h2 className="mb-2 text-3xl font-bold text-left text-white">
            Market Place
          </h2>
        </div>
      </div>
    </>
  )
}

export default MarketPlace
