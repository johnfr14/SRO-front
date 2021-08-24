import React, {useState, useEffect} from "react";
import { previewDefault } from "../../images";

const PreviewFile = ({watch}) => {
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
        <h2 className="text-2xl text-white font-semibold text-center pt-1 pb-4">
          Preview NFT
        </h2>
        <div className="flex flex-col items-center ">
          <img
            className="flex justify-center px-4 py-5 w-48 "
            src={preview || previewDefault}
            alt="NFT Upload"
          />
        </div>
        <p className="text-small text-center text-gray-500">
          Upload file to preview your brand new NFT
        </p>
      </div>
    </>
  );
};

export default PreviewFile;
