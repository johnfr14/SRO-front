import React, {useState} from 'react'
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useContracts } from "../../context/ContractContext";
import { ButtonOnClick } from "../Button";
import { toast } from "react-toastify";
import { LoaderIcon } from "..";
import { deleteIcon, checkmarkIcon } from "../../images";
import classnames from "classnames";
import { ethers } from 'ethers'

const ModEditPrice = ({open, setOpen, sale, nft, user}) => {
  const cancelButtonRef = useRef(null);
  const { marketplace } = useContracts()
  const [isEdited, setIsEdited] = useState(false)
  const [newPrice, setNewPrice] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)


  const handleEditButton = async() => {
    try {
      setLoading(true)
      const tx = await marketplace.setPrice(sale.saleId, ethers.utils.parseEther(newPrice))
      await tx.wait()
      setLoading(false)
      toast.success(`Nft removed successfully \n`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
      });
      setIsEdited(true)
      setTimeout(() => {
        setOpen({...open, editPrice: false})
      }, 2000);
    } catch (e) {
        setLoading(false)
        setError(true);
        toast.error(e.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }
  }

  return (
    <Transition.Root show={open.editPrice} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => setOpen({...open, editPrice: false})}
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
                          <h2 className="text-5xl font-bold py-4">Remove</h2>
                          <p className="text-sm font-bold">
                            You are about to remove <i style={{color: 'yellow'}}>{nft.title}</i> from the marketplace
                          </p>
                        </div>
                      </div>
                     
                      <div className="">
                        <div className="pt-5 px-7">
                          <input
                            className="appearance-none block w-full bg-gray-900 text-white border  shadow-inner rounded-md py-3 px-4  leading-tight focus:outline-none  focus:border-gray-500"
                            type="text"
                            placeholder="1"
                            onChange={(e) => setNewPrice(e.target.value)}
                          />
                          <p style={{color: 'white'}}>actual price: {sale.price} XSRO</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center pt-4 pb-3">
                        {loading ? (
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
                            {error && (
                              <div className="  ">
                                {" "}
                                <img
                                  alt=""
                                  className="w-4 mr-2"
                                  src={deleteIcon}
                                  />{" "}
                              </div>
                            )}
                            {isEdited && (
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
                                buttonSuccess={isEdited}
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
                          onClick={() => setOpen({...open, editPrice: false})}
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
