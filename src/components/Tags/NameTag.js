import React from "react";
import { Link } from "react-router-dom";
import { userDefault } from "../../images/";

const NameTag = ({
  linkToNameTag = "/",
  userIcon = userDefault,
  NameTagTitle,
}) => {
  return (
    <div className="">
      <div className="bg-gray-900 flex justify-center items-center">
        <div className="flex bg-gray-700 rounded-lg">
          <div className=" py-1 px-2 flex w-52 rounded-lg">
            <Link to={linkToNameTag}>
              <img
                className="avatar h-10 w-10 rounded-full border-2 border-opacity-40 border-black"
                src={userIcon}
                alt={userIcon}
              />
            </Link>
            <p className="flex pl-2 justify-center items-center text-center text-white ">
              <Link to={linkToNameTag}>{NameTagTitle}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameTag;
