import React from 'react'
import { Button } from "../../index";

const FollowSteps = () => {
  return (
    <div class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
      <div class="absolute bg-black opacity-80 inset-0 z-0"></div>
      <div class="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-gray-900 ">
        <div class="">
          <div class="text-center p-5 flex-auto justify-center">
            <h2 class="text-4xl text-white font-bold py-2 ">Follow steps</h2>
            <h3 class="text-2xl text-white font-bold py-2 ">Mint</h3>
            <p class="text-sm text-white px-8">Send transaction to create your NFT</p>
          </div>
          <div class="p-3  mt-2 text-center space-x-4 md:block">
            <Button target={""} buttonStyle>
              Try again
            </Button>
          </div>
        </div>
        <div class="">
          <div class="text-center p-5 flex-auto justify-center">
            <h3 class="text-2xl text-white font-bold py-2 ">Approve</h3>
            <p class="text-sm text-white px-8">This transaction is conducted only once per collection</p>
          </div>
          <div class="p-3  mt-2 text-center space-x-4 md:block">
            <Button target={""} buttonStyle>
              Start
            </Button>
          </div>
        </div>
        <div class="">
          <div class="text-center p-5 flex-auto justify-center">
            <h3 class="text-2xl text-white font-bold py-2 ">Set fixed price</h3>
            <p class="text-sm text-white px-8">Sign message to set fixed price</p>
          </div>
          <div class="p-3  mt-2 text-center space-x-4 md:block">
            <Button target={""} buttonStyle>
              In-progress
            </Button>
          </div>
        </div>
        <div class="p-3  mt-2 text-center space-x-4 md:block">
          <Button target={""} >
            CANCEL
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FollowSteps
