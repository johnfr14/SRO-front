import React, { useState, useEffect } from "react";
import { previewDefault } from "../../images";

const PreviewFile = ({ watch }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (watch.length > 0) {
      setPreview(URL.createObjectURL(watch[0]));
    }
  }, [watch]);
  return (
    // Add Card pour le Previews
    <>
      <div className="max-w-xs bg-gray-900 shadow-lg rounded-xl p-2 border-2 border-gray-200 border-opacity-25 pb-3 relative">
        <h1 className="text-3xl text-purple-500 font-semibold text-center pt-1">
          Preview NFT
        </h1>
        <div className="flex flex-col items-center ">
          <img
            className="flex justify-center px-4 py-5 w-48 "
            src={preview || previewDefault}
            alt="NFT Upload"
          />
        </div>
        <p className="text-sm text-center text-gray-400">
          Upload file to preview your brand new NFT
        </p>
      </div>
    </>
  );
};

export default PreviewFile;
