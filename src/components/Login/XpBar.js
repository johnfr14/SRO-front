import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import "../../css/quests.css";

function XpBar() {
  const styleBar = {
    height: "4px",
  };

  return (
    <>
      <div className="mt-2 mb-4 px-4 py-2 border-dotted border-4 border-light-blue-500">
        <div className="h-1 relative rounded-full ">
          <div className="bg-gray-300 w-full mb-4" style={styleBar}>
            <div className="bg-yellow-400 w-4/6 h-full" />
          </div>
        </div>
        <div className="flex justify-between dark:text-alt mt-1">
          <span>Lv. 4</span>
          <span>230 / 2000</span>
        </div>
      </div>
      <Menu as="div" className=" relative">
        {({ open }) => (
          <>
            <div className="px-5 mt-5 mb-3 gamification">
              <Menu.Button className="">
                <div
                  className={
                    "text-black px-2 py-1 from-primary-200 to-primary-200 transition duration-300 bg-gradient-to-br rounded-md"
                  }
                >
                  Quests
                </div>
              </Menu.Button>
              <div
                className={
                  "text-black px-2 py-1 from-primary-200 to-primary-200 transition duration-300 bg-gradient-to-br rounded-md"
                }
              >
                Rewards
              </div>
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
                className="origin-top-right absolute w-72 right-0 mt-2 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div>
                  <div className="px-4 py-2">
                    <p className="leading-6 mt-1 mb-3 font-black">
                      Daily Quests
                    </p>
                    <div className="quests">
                      <p className="quests__info">
                        <span>Go XSRO</span>
                        <br />
                        <span className="text-alt">Reward: 120 xp</span>
                      </p>
                      <div className="">
                        <button className="text-black px-2 py-1 from-primary-200 to-primary-200 transition duration-300 bg-gradient-to-br rounded-md">
                          Soon
                        </button>
                      </div>
                    </div>
                    <p className="leading-6 mt-1 mb-3 font-black">
                      Weekly Quests
                    </p>
                    <div className="quests">
                      <p className="quests__info">
                        <span>Déposite NFT</span>
                        <br />
                        <span className="text-alt">Reward: 500 xp</span>
                      </p>
                      <div className="">
                        <button className="text-black px-2 py-1 from-primary-200 to-primary-200 transition duration-300 bg-gradient-to-br rounded-md">
                          Soon
                        </button>
                      </div>
                      <p className="quests__info">
                        <span>Sell or Buy NFT</span>
                        <br />
                        <span className="text-alt">Reward: 750 xp</span>
                      </p>
                      <div className="">
                        <button className="text-black px-2 py-1 from-primary-200 to-primary-200 transition duration-300 bg-gradient-to-br rounded-md">
                          Soon
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </>
  );
}

export default XpBar;
