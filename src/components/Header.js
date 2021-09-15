import React from "react";
import { useContext } from "react"
import { Web3Context } from "web3-hooks";
import { Button, Login } from "./index";

const Header = () => {
  const [web3State] = useContext(Web3Context);

  return (
    <div className="flex flex-col justify-between px-6 py-8 space-y-8 md:space-y-0 md:flex-row md:px-10 md:py-10">
      <div className="flex flex-row items-center justify-between">
        <Button target={"/"} className="text-yellow-400 text-3xl">SarahRo - [xSRO]</Button>
        <Login noLogged className={"md:hidden"} />
      </div>
      <div className="flex flex-row items-center justify-around sm:space-x-5 sm:mx-auto md:mx-0">
        <Button target={"/"}>Marketplace</Button>
        <Button target={`/user/${web3State.account}`}>Dashboard</Button>
        <Button target={"/"}>Docs</Button>
        {/* <Button target={"/"} className={"hidden md:block"}>
          Ressources
        </Button> */}
        <Button target={"/create/erc721"} buttonStyle className={"hidden md:block"}>
          Create NFT
        </Button>
        {/* Test add "noLogged" to see the button*/}
        <Login noLogged={!web3State.isLogged ? true : false} className={"hidden md:block"} />
      </div>
    </div>
  )
};

export default Header;
