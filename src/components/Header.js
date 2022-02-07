import React from "react";
import classnames from "classnames";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Web3Context } from "web3-hooks";
import { Button, Login } from "./index";

const Header = () => {
  const [web3State] = useContext(Web3Context);

  return (
    <div className="flex flex-col justify-between px-6 py-8 space-y-8 md:space-y-0 md:flex-row md:px-10 md:py-10">
      <div className="flex flex-row items-center justify-between">
        <Button target={"/"} className="text-yellow-400 text-3xl">Training marketplace</Button>
        <Login noLogged className={"md:hidden"} />
      </div>
      <div className="flex flex-row items-center justify-around sm:space-x-5 sm:mx-auto md:mx-0">
        <Button target={"/"}>Marketplace</Button>
        <Button target={`/user/${web3State.account}`}>Dashboard</Button>
        <NavLink className="text-white hover:text-primary-200 " to={{ pathname: "https://swap.sarahro.io/" }} target="_blank">Swap xSRO</NavLink>

        {!web3State.isLogged ? <Login noLogged className={"hidden md:block"} /> :
        web3State.chainId === 4 ? <Button target={"/create/erc721"} buttonStyle className={"hidden md:block"}>Create NFT</Button> :
        <Button wrongNetwork>Wrong network<br/><i className={classnames("text-xs text-yellow-200")}>Connect to Rinkeby</i></Button>}
      </div>
    </div>
  )
};

export default Header;
