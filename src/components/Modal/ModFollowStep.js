import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { Button, LoaderIcon } from "..";
import { deleteIcon, checkmarkIcon } from "../../images";

export default function ModCheckout({nextStep, setNextStep}) {

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={nextStep} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => setNextStep(!nextStep)}
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
                  <div className=" rounded-lg">
                    <div className="">
                      <div className="">
                        <div className="text-white text-center">
                          <h2 className="text-5xl font-bold py-4">
                            Follow steps
                          </h2>
                          <h3 className="text-3xl font-bold">Mint</h3>
                          <p className="text-xs">
                            Send transaction to create your NFT
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center pt-4 pb-3 pr-5 ">
                        <div className=" pr-5 ">
                          <img alt="" className="w-7 " src={deleteIcon} />
                        </div>
                        <div className="pr-5">
                          <Button target={""} buttonStyle>
                            Try again
                          </Button>
                        </div>
                      </div>
                      <div className="">
                        <div className="text-white text-center">
                          <h3 className="text-3xl font-bold">Approve</h3>
                          <p className="text-xs">
                            This transaction is conducted only once per
                            collection
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center pt-4 pb-3 pr-5 ">
                        <div className=" pr-5 ">
                          <img alt="" className="w-7 " src={checkmarkIcon} />
                        </div>
                        <div className="pr-5">
                          <Button target={""} buttonStyle>
                            Start
                          </Button>
                        </div>
                      </div>
                      <div className="">
                        <div className="text-white text-center">
                          <h3 className="text-3xl font-bold">
                            Set fixed price
                          </h3>
                          <p className="text-xs">
                            Sign message to set fixed price
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center pt-4 pb-3 pr-5 ">
                        <LoaderIcon />
                        <div className="pr-5">
                          <Button target={""} buttonStyle>
                            In-progress
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-center pt-3 pb-3">
                        <button onClick={() => setNextStep(!nextStep)}
                          className="  px-5 py-3 text-center bg-gray-400 text-white hover:bg-gray-200 hover:text-black font-bold rounded-lg text-sm"
                        >
                          Cancel
                        </button>
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
