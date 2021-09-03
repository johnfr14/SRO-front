import React from "react";

const TokenPrice = ({ register = "", errors, setPrice }) => {
  const handleDestinationChange = (event) => {
    console.log(`Vous avez choisi ${event.target.value}`);
  };

  return (
    <div className="text-white">
      <div className="flex">
        <select
          className="text-sm border rounded-l px-4 py-2 bg-gray-300 text-gray-900 whitespace-no-wrap"
          onChange={handleDestinationChange}
        >
          <option>ETH</option>
          <option>XSRO</option>
          <option>SRO</option>
        </select>
        <input
          type="number"
          min="0"
          className="flex-shrink flex-grow flex-auto leading-normal w-px bg-gray-900  border border-gray-400 shadow-inner rounded-md py-3 px-4 focus:outline-none  focus:border-gray-500"
          placeholder="Enter price for one piece"
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      {errors && (
        <p style={{ color: "red" }}>Price must be a positive number</p>
      )}
      <div className="text-xs ">
        <p className="pt-4">Service fee 2.5%</p>
        <p>You will receive xxx ETH $XXX</p>
      </div>
    </div>
  );
};

export default TokenPrice;
