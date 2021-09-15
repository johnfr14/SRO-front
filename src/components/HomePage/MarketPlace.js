import React from "react";
import { CardList } from "../UserMainPage";

const MarketPlace = () => {
  return (
    <>
      <div>
        <div className="md:mx-8">
          <h2 className="text-5xl text-yellow-400 text-center font-bold pb-10">
            Market Place
          </h2>
          <CardList idx={0} marketPlace />
        </div>
      </div>
    </>
  );
};

export default MarketPlace;
