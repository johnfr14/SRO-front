import React from "react";

const TokenPrice = ({ register, watch, errors }) => {
  return (
    <div className="text-white">
      <div className="flex text-sm appearance-none mt-2 w-full bg-gray-900  border border-gray-400 shadow-inner rounded-md py-3 px-4  leading-tight focus:outline-none  focus:border-gray-500">
        <input
          type="number"
          min="0"
          className="flex-1  
                      text-white  bg-gray-900 
                      outline-none"
          placeholder="Enter price for one piece"
          {...register("price", { min: 0 })}
        />
        <select
          className="text-sm    bg-gray-900 text-white whitespace-no-wrap   w-20"
          {...register("token")}
        >
          <option >XSRO</option>
          <option disabled>ETH (soon)</option>
          <option disabled>SRO (soon)</option>
        </select>
      </div>
      {errors.token && (
        <p style={{ color: "red" }}>Price must be a positive number</p>
      )}
      <div className="text-xs ">
        <p className="pt-4">Service fee 2.5%</p>
        <p className="flex text-yellow-400">
          You will receive : <p className="ml-1 text-white">{watch().price * 0.975} {watch().token}</p>
        </p>
      </div>
    </div>
  );
};

export default TokenPrice;
