import React from "react";
import { Button } from "../index";

const UploadFile = () => {
  return (
    <div>
      <div className="container mx-auto max-w-screen-lg h-full text-white">
        <div
          aria-label="File Upload Modal"
          className="h-full flex flex-col bg-gray-900 shadow-xl rounded-md mt-3 border-2 border-gray-200 border-opacity-25 pb-3 relative"
        >
          <div className="overflow-auto py-5 px-2 md:px-24 w-full h-full flex flex-col">
            <h1 className="text-2xl  font-semibold text-center pt-1 pb-4">
              Upload File
            </h1>
            <div className="border-dashed border-2 border-gray-400 py-10 px-5 flex flex-col justify-center items-center">
              <p className="mb-3 font-semibold  flex flex-wrap justify-center">
                PNG, GIF, WEBP, MP4 or MP3. Max 100mb.
              </p>
              <Button target={<input type="file" />} buttonStyle>
                Upload a file
              </Button>
            </div>
            <p className="text-xs text-red-500 mt-2">"File" is required</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
