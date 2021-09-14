import React from "react";
import { CardList } from "../UserMainPage";

const MarketPlace = () => {
  return (
    <>
      <div>
        <div className="md:mx-8">
          <h2 className="mb-2 text-3xl font-bold text-left text-white">
            Market Place
          </h2>
          <CardList idx={0} marketPlace />
        </div>
      </div>
    </>
  );
};

export default MarketPlace;
