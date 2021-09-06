import React, { useState } from "react";

const TokenPrice = ({ register, watch, errors}) => {

  return (
    <div className="text-white">
      <div className="flex">
        <select
          className="text-sm border rounded-l px-4 py-2 bg-gray-300 text-gray-900 whitespace-no-wrap"
          {...register('token')}
        >
          <option>ETH</option>
          <option disabled>XSRO (soon)</option>
          <option disabled>SRO (soon)</option>
        </select>
        <input
          type="number"
          min="0"
          className="flex-shrink flex-grow flex-auto leading-normal w-px bg-gray-900  border border-gray-400 shadow-inner rounded-md py-3 px-4 focus:outline-none  focus:border-gray-500"
          placeholder="Enter price for one piece"
          {...register('price', {min: 0})}
        />
      </div>
      {errors.token && (
        <p style={{ color: "red" }}>Price must be a positive number</p>
      )}
      <div className="text-xs ">
        <p className="pt-4">Service fee 2.5%</p>
        <p>You will receive {watch().price * 0.975} {watch().token} $XXX</p>
      </div>
    </div>
  );
};

export default TokenPrice;
