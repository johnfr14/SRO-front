import React from 'react'
import { AvatarSettings } from './index'
import { Button } from "../index";

const SettingsInfo = () => {
  return (
    <div className="min-h-screen pt-2 font-mono my-16 ">
      <div className="container mx-auto">
        <h2 className="text-5xl text-white text-center font-bold p-1">Edit Profile</h2>
        <p className="text-white text-center p-8">
          You can set preferred display name, create your branded profile
          URL and manage other personal settings
        </p>
        <AvatarSettings />
        <div className="">
          <label className="block uppercase tracking-wide text-white text-xl font-bold mb-2 mt-5">
            Display name
          </label>
          <input
            className="appearance-none block w-full bg-gray-900 text-white border border-gray-400 shadow-inner rounded-md py-3 px-4  leading-tight focus:outline-none  focus:border-gray-500"
            type="text"
            placeholder="Enter your display name"
          />
        </div>
        <div className="">
          <label className="block uppercase tracking-wide text-white text-xl font-bold mb-2 mt-5">
            Custom URL
          </label>
          <div className="flex flex-wrap items-stretch w-full mb-4 relative">
            <div className="flex -mr-px">
              <span className="flex items-center leading-normal bg-gray-900 text-white rounded rounded-r-none border border-gray-400 shadow-inner rounded-md py-3 px-5 whitespace-no-wrap text-grey-dark ">
                https://sarahro.io/users/
              </span>
            </div>
            <input
              type="text"
              className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 bg-gray-900 text-white border border-gray-400 shadow-inner rounded-md py-3 px-4 focus:outline-none  focus:border-gray-500"
              placeholder="Enter your custom URL"
            />
          </div>
        </div>
        <div className="">
          <label className="block uppercase tracking-wide text-white text-xl font-bold mb-2 mt-5">
            Bio
          </label>
          <textarea
            className="rounded-md border leading-normal resize-none w-full h-20 py-2 px-3 appearance-none block w-full bg-gray-900 text-white border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
            type="text"
            placeholder="Tell about yourself in a few words"
          />
        </div>
        <div className="">
          <label className="block uppercase tracking-wide text-white text-xl font-bold mb-2 mt-5">
            Twitter Username
          </label>
          <p className="block uppercase tracking-wide text-white text-xs mb-3">
            Link your Twitter account to gain more trust on the marketplace
          </p>
          <input
            className="appearance-none block w-full bg-gray-900 text-white border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
            type="text"
            placeholder="@pseudo"
          />
        </div>
        <div className="">
          <label className="block uppercase tracking-wide text-white text-xl font-bold mb-2 mt-5">
            Personal site or portfolio
          </label>
          <input
            className="appearance-none block w-full bg-gray-900 text-white border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
            type="text"
            placeholder="https://"
          />
        </div>
        <div className="">
          <label className="block uppercase tracking-wide text-white text-xl font-bold mb-2 mt-5">
            email address
          </label>
          <p className="block uppercase tracking-wide text-white text-xs mb-3">
            Your email for marketplace notifications
          </p>
          <input
            className="appearance-none block w-full bg-gray-900 text-white border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
            type="text"
            placeholder="Enter email"
          />
        </div>
        <div className="mt-10">
          <Button target={""} buttonStyle>
            Update Profile
          </Button>
        </div>
      </div>
    </div>

  )
}

export default SettingsInfo
