import React from 'react'
import { userDefault } from "../../images";
import { Button } from "../index";

const AvatarSettings = () => {
  return (
    <>
      <div className="max-w-xs bg-gray-900 shadow-lg rounded-xl p-2 mt-3 border-2 border-gray-200 border-opacity-25 pb-3 relative">
        <div className="flex flex-col items-center ">
          <img
            className="flex justify-center px-4 py-5 w-48 "
            src={userDefault}
            alt="Avatar Upload"
          />
        </div>
        <div className="flex flex-col ">
          <div className="relative h-62 w-full mb-3 p-2">
            <div className="text-center pt-5">
              <Button target={""} buttonStyle>
                Select Avatar
              </Button>
              <p className="mt-3 text-sm text-white pt-5">
                We recommend an image of at least 400x400.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AvatarSettings
