import { Web3Context } from "web3-hooks";
import { useContext, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { metamaskIcon } from "../../images/";

function LogWallet({ className }) {
  let [isOpen, setIsOpen] = useState(false);
  const [web3State, login] = useContext(Web3Context);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (!!web3State.isLogged) {
      closeModal();
    }
  }, [web3State.isLogged]);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="text-black px-8 py-3 from-primary-200 to-primary-200 transition duration-300 bg-gradient-to-br rounded-xl hover:opacity-75"
      >
        Connect wallet
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Login
                </Dialog.Title>
                <div className="mt-4">
                  <div className="relative grid gap-8 bg-white pt-2">
                    <button
                      onClick={() => login()}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                        <img
                          src={metamaskIcon}
                          alt="Metamask"
                          className="align-self-center"
                        />
                      </div>
                      <div className="ml-4">
                        <p className="font-heading font-semibold">Metamask</p>
                        <p className="text-sm text-gray-500">
                          Connect using browser wallet
                        </p>
                      </div>
                    </button>
                  </div>
                  <div className="pt-10 bg-gray-50">
                    <span className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">
                        Don't have wallet?
                      </span>
                    </span>
                    <Link
                      to={{
                        pathname: "https://metamask.io/download.html",
                      }}
                      target="_blank"
                      className="flow-root transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      Download here
                    </Link>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default LogWallet;
