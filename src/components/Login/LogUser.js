import { Fragment, useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Web3Context, useContract } from "web3-hooks";
import { xSROAddress, xSROAbi } from "../../contracts/xSRO";
import { ethers } from "ethers";

import { Divider } from "../index";
import { XpBar } from "./index";

import { userDefault } from "../../images/";
import { useUser } from "../../context/UserContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function LogUser() {
  const { userState } = useUser();
  const [web3State] = useContext(Web3Context);
  const xsro = useContract(xSROAddress, xSROAbi);
  const [userBalance, setUserBalance] = useState();

  let balance = web3State.balance;
  let balanceXsro = userBalance;
  let balanceRoundedETH = Math.round(balance * 10000) / 10000;
  let balanceRoundedXsro = Math.round(balanceXsro * 100) / 100;

  const profile = [
    {
      name: "My items",
      url: `/user/${web3State.account}`,
    },
    {
      name: "Edit profile",
      url: "/settings",
    },
    {
      name: "Dark Themes",
      url: "/",
    },
    {
      name: "Disconnect",
      url: "/",
    },
  ];

  // xsro user balance
  useEffect(() => {
    if (xsro) {
      const getInfo = async () => {
        try {
          const balance = await xsro.balanceOf(web3State.account);
          setUserBalance(ethers.utils.formatEther(balance));
        } catch (e) {
          console.error(e.message);
        }
      };
      getInfo();
    }
  }, [xsro, web3State.account, web3State.balance]);

  return (
    <div>
      <>
        {/* Profile dropdown */}
        <Menu as="div" className="ml-3 relative z-10">
          {({ open }) => (
            <>
              <div>
                <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={userState.data.avatar || userDefault}
                    alt=""
                  />
                </Menu.Button>
              </div>
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <XpBar />
                  <div>
                    <p className="ml-4 mb-1 text-lg leading-6 font-medium text-gray-900 text-left">
                      User
                    </p>
                    <p className="ml-4 text-left">
                      Balance : {balanceRoundedETH} ETH
                    </p>
                    <p className="ml-4 text-left">
                      Balance : {balanceRoundedXsro} XSRO
                    </p>
                  </div>
                  <Divider className="mt-3 mb-2 bg-black" />
                  {profile.map((item, index) => (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        <NavLink
                          to={item.url}
                          key={index}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-black-700"
                          )}
                        >
                          {item.name}
                        </NavLink>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </>
    </div>
  );
}
