import React from 'react'
import { ProfilList } from '../..'

const CollectionNft = "Collection: SRO"
const CollectionName = "Collection: SRO"

const CollectionCard = () => {


  return (
    <div className="">
      <div className="bg-gray-900 flex justify-center items-center">
        <div className="flex bg-gray-600 rounded-lg">
          <div className=" py-1 px-2 flex w-52  border-t-8 border-b-8 border-yellow-300 rounded-lg">
            <ProfilList tipData={CollectionNft} linkTo="/" />
            <h2 className="flex pl-2 justify-center items-center text-center text-white text-xl">{CollectionName}</h2>
          </div>
        </div >
      </div>
      <div className="bg-gray-900 flex justify-center items-center">
      </div>

    </div>

  )
}

export default CollectionCard
