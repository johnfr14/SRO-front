import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { TokenPrice } from "..";
import { ButtonOnClick } from "../Button";

export default function ModFixedPrice({ open, setOpen, setNextStep, nextStep }) {
  const cancelButtonRef = useRef(null);
  const { register, watch, formState: { errors } } = useForm();

  const handlePriceButton = () => {
    setNextStep({
      ...nextStep,
      token: watch().token,
      price: watch().price,
      isNext: true,
    });
    setOpen({ ...open, createSale: false });
  };

  return (
    <Transition.Root show={open.createSale} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => setOpen({ ...open, createSale: false })}
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
              <div className="px-4 sm:p-6 ">
                <div className="bg-gradient-to-b  flex justify-center items-center py-5">
                  <div className=" rounded-lg">
                    <div className="">
                      <div className="">
                        <div className="text-white text-center">
                          <h2 className="text-5xl text-yellow-400 font-bold py-4">
                            Fixed price
                          </h2>
                          <p className="text-sm font-bold">
                            Enter new price. Your NFT will be pushed in top of
                            marketplace
                          </p>
                        </div>
                      </div>
                      <div className="pt-7">
                        <TokenPrice
                          register={register}
                          watch={watch}
                          errors={errors}
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="py-5 ">
                          <ButtonOnClick
                            onClick={handlePriceButton}
                            buttonStyle
                          >
                            Next step
                          </ButtonOnClick>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() =>
                            setOpen({ ...open, createSale: false })
                          }
                          className="px-5 py-3 text-center bg-gray-400 text-black hover:bg-gray-200 hover:text-black font-bold rounded-lg text-sm"
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
