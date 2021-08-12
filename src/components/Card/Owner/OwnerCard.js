import React from 'react'
import { ProfilList } from '../..'

import { userTest } from "../../../images";

const OwnerNft = "Owner: 0x00000"
const OwnerName = "Owner: Name"

const OwnerCard = (linkToProfil) => {


  return (
    <div className="">
      <div className="bg-gray-900 flex justify-center items-center">
        <div className="flex bg-gray-600 rounded-lg">
          <div className=" py-1 px-2 flex w-52  border-t-8 border-b-8 border-yellow-300 rounded-lg">
            <ProfilList
              tipData={OwnerNft}
              userIcon={userTest}
              linkTo={linkToProfil}
            />
            <h2 className="flex pl-2 justify-center items-center text-center text-white text-xl">{OwnerName}</h2>
          </div>
        </div >
      </div>
    </div>

  )
}

export default OwnerCard
