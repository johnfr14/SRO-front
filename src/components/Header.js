import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => (
  <div className="flex flex-col justify-between px-6 py-8 space-y-8 md:space-y-0 md:flex-row md:px-10 md:py-10">
    <div className="flex flex-row items-center justify-between">
      <NavLink
        to="/"
        className="text-white hover:text-primary-200 transition duration-300 bg-gradient-to-br rounded-xl hover:opacity-75"
      >
        XSRO
      </NavLink>
      <NavLink
        to="/"
        className="text-black px-8 py-3 transition duration-300 bg-gradient-to-br  from-primary-200 to-primary-200 rounded-xl hover:opacity-75 md:hidden"
      >
        Create NFT
      </NavLink>
    </div>
    <div className="flex flex-row items-center justify-around text-sm sm:space-x-12 sm:mx-auto md:mx-0">
      <NavLink
        to="/"
        className="text-white hover:text-primary-200 transition duration-300 bg-gradient-to-br rounded-xl hover:opacity-75"
      >
        Marketplace
      </NavLink>
      <NavLink
        to="/"
        className="text-white hover:text-primary-200 transition duration-300 bg-gradient-to-br rounded-xl hover:opacity-75"
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/"
        className="text-white hover:text-primary-200 transition duration-300 bg-gradient-to-br rounded-xl hover:opacity-75"
      >
        Community
      </NavLink>
      <NavLink
        to="/"
        className="text-white hover:text-primary-200 transition duration-300 bg-gradient-to-br rounded-xl hover:opacity-75"
      >
        Ressources
      </NavLink>
      <NavLink
        to="/"
        className="hidden text-black px-8 py-3 transition duration-300 bg-gradient-to-br  from-primary-200 to-primary-200 rounded-xl hover:opacity-75 md:block"
      >
        Create NFT
      </NavLink>
    </div>
  </div>
);

export default Header;
