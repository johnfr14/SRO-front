import React from "react";
import { AvatarSettings } from "./index";
import { Button } from "../index";

const SettingsInfo = () => {
  return (
    <div className="mb-20">
      <div className="container mx-auto">
        <h2 className="text-5xl text-white text-center font-bold ">
          Edit Profile
        </h2>
        <p className="text-white text-center my-8  pb-10 ">
          You can set preferred display name, create your branded profile URL
          and manage other personal settings
        </p>
        <div className="flex  items-center  ">
          <AvatarSettings />
          <div className="container mx-auto max-w-screen-lg h-full">
            <div className=" relative h-full flex flex-col bg-gray-900 shadow-xl rounded-md mt-3 border-2 border-gray-200 border-opacity-25 pb-3">
              <div className=" ml-24 items-center justify-center">
                <label className="block uppercase tracking-wide text-white text-xl font-bold mb-2 mt-5">
                  Display name
                </label>
                <div className="pr-24">
                  <input
                    className="appearance-none block w-full bg-gray-900 text-white border border-gray-400 shadow-inner rounded-md py-3 px-4  leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                    placeholder="Enter your display name"
                  />
                </div>
              </div>
              <div className=" ml-24 items-center justify-center">
                <label className="block uppercase tracking-wide text-white text-xl font-bold mb-2 mt-5">
                  Bio
                </label>
                <div className="pr-24">
                  <input
                    className="appearance-none block w-full bg-gray-900 text-white border border-gray-400 shadow-inner rounded-md py-3 px-4  leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                    placeholder="Tell about yourself in a few words"
                  />
                </div>
              </div>
              <div className=" ml-24 mr-24 items-center justify-center">
                <label className="block uppercase tracking-wide text-white text-xl font-bold mb-2 mt-5">
                  Custom URL
                </label>
                <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                  <div className="flex -mr-px">
                    <span className="flex items-center leading-normal bg-gray-600 text-white rounded rounded-r-none border border-gray-600 shadow-inner py-3 px-5 whitespace-no-wrap text-grey-dark ">
                      https://sarahro.io/users/
                    </span>
                  </div>
                  <input
                    type="text"
                    className="flex-shrink flex-grow flex-auto leading-normal w-px bg-gray-900 text-white border border-gray-400 shadow-inner rounded-md py-3 px-4 focus:outline-none  focus:border-gray-500"
                    placeholder="Enter your custom URL"
                  />
                </div>
              </div>
              <div className=" ml-24 mr-24 items-center justify-center">
                <label className="block uppercase tracking-wide text-white text-xl font-bold mb-2 mt-5">
                  Twitter Username
                </label>
                <p className="block uppercase tracking-wide text-white text-xs mb-3">
                  Link your Twitter account to gain more trust on the
                  marketplace
                </p>
                <input
                  className="appearance-none block w-full bg-gray-900 text-white border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                  type="text"
                  placeholder="@pseudo"
                />
              </div>
              <div className=" ml-24 mr-24 items-center justify-center">
                <label className="block uppercase tracking-wide text-white text-xl font-bold mb-2 mt-5">
                  Personal site or portfolio
                </label>
                <input
                  className="appearance-none block w-full bg-gray-900 text-white border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                  type="text"
                  placeholder="https://"
                />
              </div>
              <div className="flex items-center justify-center mb-5 mt-8">
                <Button target={""} buttonStyle>
                  Update Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsInfo;
