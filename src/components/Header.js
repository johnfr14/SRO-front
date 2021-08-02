import React from "react";
import { Button, Login } from "./index";

const Header = () => (
  <div className="flex flex-col justify-between px-6 py-8 space-y-8 md:space-y-0 md:flex-row md:px-10 md:py-10">
    <div className="flex flex-row items-center justify-between">
      <Button target={"/"}>XSRO</Button>
      <Button target={"/"} buttonStyle className={"md:hidden"}>
        Create NFT
      </Button>
    </div>
    <div className="flex flex-row items-center justify-around text-sm sm:space-x-5 sm:mx-auto md:mx-0">
      <Button target={"/"}>Marketplace</Button>
      <Button target={"/"}>Dashboard</Button>
      <Button target={"/"}>Community</Button>
      <Button target={"/"} className={"hidden md:block"}>
        Ressources
      </Button>
      <Button target={"/"} buttonStyle className={"hidden md:block"}>
        Create NFT
      </Button>
      {/* Test add "noLogged" to see the button*/}
      <Login noLogged />
    </div>
  </div>
);

export default Header;
