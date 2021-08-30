import React from "react";
import classnames from "classnames";

const UploadFile = ({ register, watch, errors }) => {  
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
              {watch && 
                <>
                  {(watch.length > 0 && <p>{watch[0].name}</p>) 
                  || 
                  <p className="mb-3 font-semibold  flex flex-wrap justify-center">
                    PNG, GIF, WEBP, MP4 or MP3. Max 100mb.
                  </p>}
                </>
              }
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                name="file"
                accept="image/png, image/jpeg"
                {...register("file", {required: true})}
              />
              <label
                className={classnames(
                  "transition duration-300 bg-gradient-to-br rounded-xl hover:opacity-75",
                  "text-black px-8 py-3 from-primary-200 to-primary-200" ||
                  "text-white hover:text-primary-200"
                  )}
                  style={{ cursor: "pointer" }}
                  htmlFor="file"
                  >
                Input File
              </label>
              {errors &&(
                <p className="text-xs text-red-500 mt-2">
                  "File" is required
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
