import React from "react";
import { Button } from "./index";

const Header = () => (
  <div className="flex flex-col justify-between px-6 py-8 space-y-8 md:space-y-0 md:flex-row md:px-10 md:py-10">
    <div className="flex flex-row items-center justify-between">
      <Button target={"/"}>XSRO</Button>
      <Button target={"/"} buttonStyle className={"md:hidden"}>
        Create NFT
      </Button>
    </div>
    <div className="flex flex-row items-center justify-around text-sm sm:space-x-12 sm:mx-auto md:mx-0">
      <Button target={"/"}>Marketplace</Button>
      <Button target={"/"}>Dashboard</Button>
      <Button target={"/"}>Community</Button>
      <Button target={"/"}>Ressources</Button>
      <Button target={"/"} buttonStyle className={"hidden md:block"}>
        Create NFT
      </Button>
    </div>
  </div>
);

export default Header;
