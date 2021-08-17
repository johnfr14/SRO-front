import React, { useEffect } from "react";
import { useContext } from "react"
import { Web3Context } from "web3-hooks";
import { Button, Login } from "./index";
import axios from "axios";

const Header = () => {
  const [web3State] = useContext(Web3Context);
  
  // useEffect(() => {
  //   const onFetch = async () => {
  //     try {
  //       const result = await axios.get(`/user_by_address/${web3State.account}`)
  //       console.log(result)
  //     } catch (e) {
  //       console.error(e)
  //     }
  //   }
   
  //   if (!web3State.account.startsWith("0x000")) {
  //     onFetch()
  //   }

  // }, [web3State.account])

  return (
  <div className="flex flex-col justify-between px-6 py-8 space-y-8 md:space-y-0 md:flex-row md:px-10 md:py-10">
    <div className="flex flex-row items-center justify-between">
      <Button target={"/"}>XSRO</Button>
      <Login noLogged className={"md:hidden"} />
    </div>
    <div className="flex flex-row items-center justify-around text-sm sm:space-x-5 sm:mx-auto md:mx-0">
      <Button target={"/"}>Marketplace</Button>
      <Button target={"/user"}>Dashboard</Button>
      <Button target={"/"}>Community</Button>
      <Button target={"/"} className={"hidden md:block"}>
        Ressources
      </Button>
      <Button target={"/create/erc721"} buttonStyle className={"hidden md:block"}>
        Create NFT
      </Button>
      {/* Test add "noLogged" to see the button*/}
      <Login noLogged={ !web3State.isLogged ? true : false } className={"hidden md:block"} />
    </div>
  </div>
  )
  };

export default Header;
