import React, { useEffect, useState } from "react";
import { userDefault } from "../../images";
import classnames from "classnames";

const AvatarSettings = ({ register, watch, avatar }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (watch.length > 0) {
      setPreview(URL.createObjectURL(watch[0]));
    }
  }, [watch]);

  return (
    <>
      <div className="max-w-xs bg-gray-900 shadow-lg rounded-xl p-2 mt-3 border-2 border-gray-200 border-opacity-25 pb-3">
        <div className="flex flex-col items-center ">
          <img
            className="flex justify-center px-4 py-5 w-48 "
            src={preview || avatar || userDefault}
            alt="Avatar Upload"
          />
        </div>
        <div className="flex flex-col ">
          <div className="relative h-62 w-full mb-3 p-2">
            <div className="text-center pt-5">
              <input
                style={{ display: "none" }}
                type="file"
                id="avatar"
                name="avatar"
                accept="image/png, image/jpeg"
                {...register("avatar")}
              />
              <label
                className={classnames(
                  "transition duration-300 bg-gradient-to-br rounded-xl hover:opacity-75",
                  "text-black px-8 py-3 from-primary-200 to-primary-200" ||
                  "text-white hover:text-primary-200"
                )}
                style={{ cursor: "pointer" }}
                htmlFor="avatar"
              >
                Select Avatar
              </label>
              <p className="mt-3 text-sm text-gray-400 pt-5">
                We recommend an image of at least 400x400.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AvatarSettings;
