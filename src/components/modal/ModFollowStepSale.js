import React from 'react'
import { Button, LoaderIcon } from '..'
import { deleteIcon } from "../../images";

const ModFollowStepSale = () => {
  return (
    <div className="bg-gradient-to-b from-black to-gray-700 flex justify-center items-center py-5">
      <div className="bg-gray-700 rounded-lg">
        <div className="w-96 border-t-8 border-b-8 border-yellow-300 rounded-lg">
          <div className="">
            <div className="text-white text-center">
              <h2 className="text-5xl font-bold py-4">Follow steps</h2>
              <h3 className="text-3xl font-bold">Approve collection</h3>
              <p className="text-xs">This transaction is conducted only once per collection</p>
            </div>
          </div>
          <div className="flex items-center justify-center pt-4 pb-3 pr-5 ">
            <div className=" pr-5 ">
              <img alt="" className="w-7 " src={deleteIcon} />
            </div>
            <div className="pr-5">
              <Button target={""} buttonStyle>Try again</Button>
            </div>
          </div>
          <div className="">
            <div className="text-white text-center">
              <h3 className="text-3xl font-bold">Set Price</h3>
              <p className="text-xs">Sign message to set fixed price</p>
            </div>
          </div>
          <div className="flex items-center justify-center pt-4 pb-3 pr-5 ">
            <LoaderIcon />
            <div className="pr-5">
              <Button target={""} buttonStyle>In-progress</Button>
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

export default ModFollowStepSale
