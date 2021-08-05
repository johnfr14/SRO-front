import React from "react";
import { Button } from "../components";
import Layout from "../components/Layout";
import { userDefault } from "../images/";

const EditProfile = () => {
  return (
    <>
      <Layout>
        <div className="bg-gray-200 min-h-screen pt-2 font-mono my-16">
          <div className="container mx-auto">
            <div className="inputs w-full max-w-2xl p-6 mx-auto">
              <h2 className="text-2xl text-gray-900">Edit Profile</h2>
              <p className="text-gray-900">
                You can set preferred display name, create your branded profile
                URL and manage other personal settings
              </p>
              <div className="py-3 center mx-auto">
                <div className="bg-white px-4 py-5 rounded-lg shadow-lg text-center w-48">
                  <div className="mb-4">
                    <img
                      className="w-auto mx-auto rounded-full object-cover object-center"
                      src={userDefault}
                      alt="Avatar Upload"
                    />
                  </div>
                  <label className="cursor-pointer mt-6">
                    <span className="mt-2 text-base leading-normal px-4 py-2 bg-blue-500 text-white text-sm rounded-full">
                      Select Avatar
                    </span>
                    <input type="file" className="hidden" accept="accept" />
                  </label>
                  <p className="mt-3 text-sm">
                    We recommend an image of at least 400x400. Gifs work too.
                  </p>
                </div>
              </div>
              <form className="mt-6 border-t border-gray-400 pt-4">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-full px-3 mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Display name
                    </label>
                    <input
                      className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      type="text"
                      placeholder="Enter your display name"
                      required
                    />
                  </div>
                  <div className="w-full md:w-full px-3 mb-6">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-text-1"
                    >
                      Custom URL
                    </label>
                    <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                      <div className="flex -mr-px">
                        <span className="flex items-center leading-normal bg-grey-lighter rounded rounded-r-none border border-gray-400 shadow-inner rounded-md py-3 px-5 whitespace-no-wrap text-grey-dark text-sm">
                          https://sarahro.io/users/
                        </span>
                      </div>
                      <input
                        type="text"
                        className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 focus:outline-none  focus:border-gray-500"
                        placeholder="Enter your custom URL"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-full px-3 mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Bio
                    </label>
                    <textarea
                      className="rounded-md border leading-normal resize-none w-full h-20 py-2 px-3 appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      type="text"
                      placeholder="Tell about yourself in a few words"
                      required
                    />
                  </div>
                  <div className="w-full md:w-full px-3 mb-6">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-text-1"
                    >
                      Twitter Username
                    </label>
                    <p className="block uppercase tracking-wide text-gray-700 text-xs mb-2">
                      Link your Twitter account to gain more trust on the
                      marketplace
                    </p>
                    <input
                      className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      id="grid-text-1"
                      type="text"
                      placeholder="@pseudo"
                      required
                    />
                  </div>
                  <div className="w-full md:w-full px-3 mb-6">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-text-1"
                    >
                      Personal site or portfolio
                    </label>
                    <input
                      className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      id="grid-text-1"
                      type="text"
                      placeholder="https://"
                      required
                    />
                  </div>
                  <div className="w-full md:w-full px-3 mb-6">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-text-1"
                    >
                      email address
                    </label>
                    <p className="block uppercase tracking-wide text-gray-700 text-xs mb-2">
                      Your email for marketplace notifications
                    </p>
                    <input
                      className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      id="grid-text-1"
                      type="text"
                      placeholder="Enter email"
                      required
                    />
                  </div>
                </div>
              </form>
              <label className="cursor-pointer mt-6">
                <span className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3">
                  Update profile
                </span>
                <input type="submit" className="hidden" />
              </label>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default EditProfile;
