import React, { useState } from "react";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useContracts } from "../../context/ContractContext";
import { ButtonOnClick } from "../Button";
import { toast } from "react-toastify";
import { LoaderIcon } from "..";
import { deleteIcon, checkmarkIcon } from "../../images";
import classnames from "classnames";
import { MarketplaceAddress } from "../../contracts/Marketplace";
import { ethers } from "ethers";

const ModPurchase = ({ open, setOpen, sale, nft, user }) => {
  const cancelButtonRef = useRef(null);
  const { marketplace, xsro } = useContracts();
  const [isApproved, setIsApproved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //Function to approve
  const handleApproveButton = async () => {
    try {
      setLoading(true);
      const tx = await xsro.approve(
        MarketplaceAddress,
        ethers.utils.parseEther(sale.price)
      );
      await tx.wait();
      setLoading(false);
      setIsApproved(true);
      toast.success(`Amount approved \n`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } catch (e) {
      setLoading(false);
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
  };

  const handleBuyButton = async () => {
    try {
      setLoading(true);
      const tx = await marketplace.buyNft(sale.saleId);
      await tx.wait();
      setLoading(false);
      toast.success(`Nft bougth successfully \n`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        setOpen({ ...open, buyNft: false });
      }, 2000);
    } catch (e) {
      setLoading(false);
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
  };

  return (
    <Transition.Root show={open.buyNft} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => setOpen({ ...open, buyNft: false })}
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
                          <h2 className="text-5xl text-yellow-400 font-bold py-4">Checkout</h2>
                          <p className="text-sm font-bold">
                            You are about to purchase{" "}
                            <i className="text-yellow-400 mr-1"> {nft.title}</i>
                            from {" "}
                            <i className="text-purple-500 mr-1"> {nft.author}</i>
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
                          <div className="flex text-xs text-yellow-400 pt-2">
                            Enter quantity : <p className="ml-1 text-white"> 1 available </p>
                          </div>
                        </div>
                      </div>
                      <div className="pt-5 ml-4 text-left">
                        <div className="flex text-yellow-400">Balance : <p className="ml-2 text-white">{user.balance.xsro} XSRO</p></div>
                        <div className="flex text-yellow-400">Service fee : <p className="ml-2 text-white">{(sale.price * 0.025).toFixed(5)} XSRO</p></div>
                        <div className="flex text-yellow-400">Total Price : <p className="ml-2 text-white">{sale.price} XSRO</p></div>
                      </div>

                      {/*Approve xsro*/}

                      <div className="flex items-center justify-center pt-4 pb-3">
                        {isApproved ? (
                          <>
                            <div className=" mr-2 ">
                              <img
                                alt=""
                                className="w-5 "
                                src={checkmarkIcon}
                              />
                            </div>
                            <div className="pr-5">
                              <button
                                disabled={true}
                                className={classnames(
                                  "bg-green-100 rounded-xl",
                                  "text-black px-8 py-3"
                                )}
                              >
                                Appoved
                              </button>
                            </div>
                          </>
                        ) : loading ? (
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
                            <div className="">
                              <ButtonOnClick
                                onClick={handleApproveButton}
                                buttonStyle
                              >
                                Approve xsro
                              </ButtonOnClick>
                            </div>
                          </>
                        )}
                      </div>

                      {/*Buy NFT*/}

                      <div className="flex items-center justify-center pt-4 pb-3">
                        {isApproved ? (
                          loading ? (
                            <div className="flex items-center justify-center pt-4 pb-3">
                              <LoaderIcon />
                              <div className="">
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
                                <div className="mr-2">
                                  {" "}
                                  <img
                                    alt=""
                                    className="w-7 "
                                    src={deleteIcon}
                                  />{" "}
                                </div>
                              )}
                              <div className=" ">
                                <ButtonOnClick
                                  onClick={handleBuyButton}
                                  buttonStyle
                                >
                                  Buy for {sale.price} XSRO
                                </ButtonOnClick>
                              </div>
                            </>
                          )
                        ) : (
                          <div className="">
                            <button
                              disabled={true}
                              className={classnames(
                                "bg-gray-200 rounded-xl",
                                "text-black px-8 py-3 from-primary-200 to-primary-200"
                              )}
                            >
                              Buy for {sale.price} XSRO
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-center pt-3 pb-3">
                        <a
                          href="#fs-sale"
                          onClick={() => setOpen({ ...open, buyNft: false })}
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
};

export default ModPurchase;
