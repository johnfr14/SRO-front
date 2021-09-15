import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { Button } from "..";

export default function ModCheckout() {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full border border-gray-600">
              <div className="bg-black bg-opacity-90 px-4 sm:p-6 ">
                <div className="bg-gradient-to-b  flex justify-center items-center py-5">
                  <div className="rounded-lg">
                    <div className="">
                      <div className="">
                        <div className="text-white text-center">
                          <h2 className="text-5xl font-bold py-4">Checkout</h2>
                          <p className="text-sm font-bold">
                            You are about to purchase TITRE NFT from AUTHOR
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <div className="pt-5 px-7">
                          <input
                            className="appearance-none block w-full bg-gray-900 text-white border  shadow-inner rounded-md py-3 px-4  leading-tight focus:outline-none  focus:border-gray-500"
                            type="text"
                            placeholder="1"
                          />
                          <p className="text-xs text-white pt-2">
                            Enter quantity. 1 available
                          </p>
                        </div>
                        <div className="pt-5 px-7">
                          <div className="flex">
                            <select
                              className="text-sm border rounded-l px-4 py-2 bg-gray-300 whitespace-no-wrap"
                              onChange={""}
                            >
                              <option>ETH</option>
                              <option>XSRO</option>
                              <option>SRO</option>
                            </select>
                            <input
                              type="text"
                              className="flex-shrink flex-grow flex-auto leading-normal w-px bg-gray-900 text-white border border-gray-400 shadow-inner rounded-md py-3 px-4 focus:outline-none  focus:border-gray-500"
                              placeholder="10"
                            />
                          </div>
                          <p className="text-xs text-white pt-2">
                            Price per edition
                          </p>
                        </div>
                      </div>
                      <div className="pt-5 ml-4 text-left text-white ">
                        <p>Balance : xx XSRO</p>
                        <p>Service fee : xx XSRO</p>
                        <p>Total Price : xx XSRO</p>
                        <p>You will pay : xx XSRO</p>
                      </div>
                      <div className="flex items-center justify-center pt-4 pb-3 pr-5 ">
                        <div className="pt-5 pl-5">
                          <Button target={""} buttonStyle>
                            Proceed to payement
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-center pt-3 pb-3">
                        <a
                          href="#fs-sale"
                          className="  px-5 py-3 text-center text-white hover:bg-gray-200 hover:text-black font-bold rounded-lg text-sm"
                        >
                          Cancel
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden">
                <button type="button" ref={cancelButtonRef} />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
