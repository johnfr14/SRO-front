import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { TokenPrice } from "..";
import { ButtonOnClick } from "../Button";

export default function ModFixedPrice({isOpen, setOpen, setNextStep, isNextStep}) {
  const cancelButtonRef = useRef(null);

  const handlePriceButton = () => {
    setNextStep(!isNextStep)
    setOpen(!isOpen)
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => setOpen(!isOpen)}
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
                            Fixed price
                          </h2>
                          <p className="text-sm font-bold">
                            Enter new price. Your NFT will be pushed in top of
                            marketplace
                          </p>
                        </div>
                      </div>
                      <div className="pt-7 px-7">
                        <TokenPrice />
                      </div>
                      <div className="flex items-center justify-center pt-4 pb-3 pr-5 ">
                        <div className="pt-5 pl-5">
                          <ButtonOnClick onClick={handlePriceButton} buttonStyle>
                            Next step
                          </ButtonOnClick>
                        </div>
                      </div>
                      <div className="flex items-center justify-center pt-3 pb-3">
                        <button 
                          onClick={() => setOpen(!isOpen)}
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
