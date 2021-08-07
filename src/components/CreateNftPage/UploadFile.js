import React from 'react'
import { Button } from "../index";

const UploadFile = () => {
  return (
    <div>
      <div className="container mx-auto max-w-screen-lg h-full">
        <div aria-label="File Upload Modal" className="relative h-full flex flex-col bg-gray-900 shadow-xl rounded-md" >
          <div className="h-full overflow-auto py-5 px-24 w-full h-full flex flex-col">
            <h1 className="text-2xl text-white font-semibold text-center pt-1 pb-4">
              Upload File
            </h1>
            <div className="border-dashed border-2 border-gray-400 py-10 px-0 flex flex-col justify-center items-center">
              <p className="mb-3 font-semibold text-white flex flex-wrap justify-center">
                PNG, GIF, WEBP, MP4 or MP3. Max 100mb.
              </p>
              <Button target={<input type="file" />} buttonStyle>
                Upload a file
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadFile
