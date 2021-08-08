import React from 'react'

const NftPrice = () => {
  const handleDestinationChange = (event) => {
    console.log(`Vous avez choisi ${event.target.value}`);
  };

  return (
    <>
      <h2 className="text-2xl text-white font-semibold pt-4 pb-4">Price</h2>
      <div className="flex">
        <select class="text-sm border border-2 rounded-l px-4 py-2 bg-gray-300 whitespace-no-wrap" onChange={handleDestinationChange}>
          <option>ETH</option>
          <option>XSRO</option>
          <option>SRO</option>
        </select>
        <input
          type="text"
          className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 bg-gray-900 text-white border border-gray-400 shadow-inner rounded-md py-3 px-4 focus:outline-none  focus:border-gray-500"
          placeholder="Enter price for one piece"
        />
      </div>
      <p className="text-xs text-white pt-4">Service fee 2.5%</p>
      <p className="text-xs text-white py-4">You will receive xxx ETH $XXX</p>
    </>
  );
}

export default NftPrice

