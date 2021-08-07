import React from 'react'
import { PreviewFile, NftPrice, UnlockToggle, UploadFile } from '.'

const Erc721Nft = () => {
  return (
    <div className="min-h-screen pt-2 font-mono my-16 ">
      <div className="container mx-auto">
        <h2 className="text-5xl text-white text-center font-bold pb-10">Create single collectible</h2>
        <UploadFile />
        <PreviewFile />
        <NftPrice />
        <UnlockToggle />
      </div>



    </div>
  )
}

export default Erc721Nft
