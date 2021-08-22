import React from "react";

const TokenPrice = () => {
  const handleDestinationChange = (event) => {
    console.log(`Vous avez choisi ${event.target.value}`);
  };

  return (
    <div>
      <div className="flex">
        <select
          className="text-sm border rounded-l px-4 py-2 bg-gray-300 whitespace-no-wrap"
          onChange={handleDestinationChange}
        >
          <option>ETH</option>
          <option>XSRO</option>
          <option>SRO</option>
        </select>
        <input
          type="text"
          className="flex-shrink flex-grow flex-auto leading-normal w-px bg-gray-900 text-white border border-gray-400 shadow-inner rounded-md py-3 px-4 focus:outline-none  focus:border-gray-500"
          placeholder="Enter price for one piece"
        />
      </div>
      <div className="text-xs text-white">
        <p className="pt-4">Service fee 2.5%</p>
        <p>You will receive xxx ETH $XXX</p>
      </div>
    </div>
  );
};

export default TokenPrice;
