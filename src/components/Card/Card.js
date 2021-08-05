import { Link } from "react-router-dom";
import { ProfilList, DotMenu, MediaCard } from "./index";
import "../../css/card.css";

import { userTest } from "../../images/";

const Card = () => {
  {
    /* const styleCardMedia = {
    backgroundImage: `url('${cardMedia}')`,
  };
  */
  }

  return (
    <div className="max-w-xs bg-gray-900 shadow-lg rounded-xl p-2 border-2 border-gray-200 border-opacity-25 pb-5 relative">
      <div className="iHLBIg">
        <div className="flex bAGyCr">
          <ProfilList tipData="Collection: SRO" linkTo="/" />
          <ProfilList tipData="Owner: 0x00000" userIcon={userTest} linkTo="/" />
        </div>
        <div className="z-10">
          <DotMenu />
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="">
          <div className="relative h-62 w-full mb-3 p-2">
            <div className="absolute flex flex-col top-0 right-0 p-3">
              <button className="transition ease-in duration-300 bg-gray-800  hover:text-yellow-500 shadow hover:shadow-md text-gray-500 rounded-full w-8 h-8 text-center p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
            {/* MediaCardJS */}
            <MediaCard />
          </div>
          <div className="flex-auto justify-evenly ml-4 mr-4">
            <div className="flex flex-wrap ">
              <div className="flex items-center w-full justify-between min-w-0 ">
                <h2 className="text-lg mr-auto cursor-pointer text-gray-200 hover:text-yellow-500 truncate font-black	">
                  Name Name Name Name Name Name Name
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
