import React, { useState } from 'react'
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useContracts } from "../../context/ContractContext";
import { ButtonOnClick } from "../Button";
import { LoaderIcon } from "..";
import { deleteIcon, checkmarkIcon } from "../../images";
import classnames from "classnames";
import { handleEdit, initialStateModal } from '../../dataFunctions/handleButtons';

const ModEditPrice = ({ open, setOpen, sale, nft }) => {
  const { marketplace } = useContracts()
  const cancelButtonRef = useRef(null);
  const [modal, setModal] = useState(initialStateModal)

  const handleEditButton = () => handleEdit(sale, marketplace, modal, setModal, open, setOpen)

  return (
    <Transition.Root show={open.editPrice} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => setOpen({ ...open, editPrice: false })}
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
                          <h2 className="text-5xl text-yellow-400 font-bold py-4">Edit Price</h2>
                          <div className="text-sm font-bold">
                            You are about to edit price for the NFT
                            <p className="text-yellow-400">{nft.title}</p>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <div className="pt-5 px-7">
                          <input
                            className="appearance-none block w-full bg-gray-900 text-white border  shadow-inner rounded-md py-3 px-4  leading-tight focus:outline-none  focus:border-gray-500"
                            type="text"
                            placeholder="1"
                            onChange={(e) => setModal({...modal, newPrice: e.target.value})}
                          />
                          <p className="flex justify-center mt-3 text-left text-yellow-400">Current price : <span className="ml-1 text-white"> {sale.price} XSRO</span></p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center pt-4 pb-3">
                        {modal.loading ? (
                          <div className="flex ">
                            <LoaderIcon />
                            <div className="pr-5">
                              <button
                                disabled={true}
                                className={classnames(
                                  "transition duration-300 bg-gradient-to-br rounded-xl hover:opacity-75",
                                  "text-black px-8 py-3 from-primary-200 to-primary-200" ||
                                  "text-white hover:text-primary-200"
                                )}
                              >
                                In progress...
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            {modal.error && (
                              <div className="  ">
                                {" "}
                                <img
                                  alt=""
                                  className="w-4 mr-2"
                                  src={deleteIcon}
                                />{" "}
                              </div>
                            )}
                            {modal.isEdited && (
                              <div className="  ">
                                {" "}
                                <img
                                  alt=""
                                  className="w-4 mr-2"
                                  src={checkmarkIcon}
                                />{" "}
                              </div>
                            )}
                            <div className="">
                              <ButtonOnClick
                                onClick={handleEditButton}
                                buttonStyle
                                buttonSuccess={modal.isEdited}
                              >
                                Set new price
                              </ButtonOnClick>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex items-center justify-center pt-3 pb-3">
                        <a
                          href="#fs-sale"
                          onClick={() => setOpen({ ...open, editPrice: false })}
                          className="  px-5 py-3 text-center text-white hover:bg-gray-200 hover:text-black font-bold rounded-lg text-sm"
                        >
                          Cancel
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ModEditPrice
