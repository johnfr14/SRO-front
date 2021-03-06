import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useContracts } from "../../context/ContractContext";
import { MarketplaceAddress } from "../../contracts/Marketplace";
import { LoaderIcon } from "..";
import classnames from "classnames";
import { deleteIcon, checkmarkIcon } from "../../images";
import { ButtonOnClick } from "../Button";
import { fetchApprovedNft } from "../../dataFunctions/fetchData";
import { handleApproveNft, handleCreateSale, initialStateModal } from "../../dataFunctions/handleButtons";

export default function ModCreateSale({ nextStep, setNextStep }) {
  const { marketplace, sro721 } = useContracts();
  const [modal, setModal] = useState(initialStateModal)
  const cancelButtonRef = useRef(null);

  const handleApprovebutton = () =>  handleApproveNft(sro721, nextStep, modal, setModal)
  const handleCreateSaleButton = () => handleCreateSale(marketplace, nextStep, setNextStep, modal, setModal)

  useEffect(() => {
    fetchApprovedNft(nextStep.nftId, sro721)
    .then(result => setModal({...initialStateModal, isApproved: result === MarketplaceAddress}));
  }, [nextStep.nftId, sro721]);

  return (
    <Transition.Root show={nextStep.isNext} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => setNextStep({ ...nextStep, isNext: false })}
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
              <div className=" px-4 sm:p-6 ">
                <div className="bg-gradient-to-b  flex justify-center items-center py-5">
                  <div className=" rounded-lg">
                    <div className="">
                      <h2 className="text-5xl text-yellow-400 font-bold py-4">
                        Follow steps
                      </h2>
                      <div className="">
                        <div className="text-center">
                          <h3 className="text-3xl mb-2 font-bold text-white">Approve</h3>
                          <p className="text-gray-400 text-xs">
                            This transaction is conducted only once per
                            collection
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-center pt-4 pb-3">
                        {modal.isApproved ? (
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
                                Approved
                              </button>
                            </div>
                          </>
                        ) : modal.loading ? (
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
                            <div className="">
                              <ButtonOnClick
                                onClick={handleApprovebutton}
                                buttonStyle
                              >
                                Start
                              </ButtonOnClick>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="">
                        <div className="text-white text-center">
                          <h3 className="text-3xl mb-2 font-bold text-white">
                            Set fixed price
                          </h3>
                          <p className="text-gray-400 text-xs">
                            Sign message to set fixed price
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center pt-4 pb-3">
                        {modal.isApproved ? (
                          modal.isOnSale ? (
                            <>
                              <div className=" pr-5 ">
                                <img
                                  alt=""
                                  className="w-7 "
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
                                  Created !
                                </button>
                              </div>
                            </>
                          ) : modal.loading ? (
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
                              {modal.error && (
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
                                  onClick={handleCreateSaleButton}
                                  buttonStyle
                                >
                                  Create Sale
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
                              Create Sale
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-center pt-3 pb-3">
                        <button
                          onClick={() =>
                            setNextStep({ ...nextStep, isNext: false })
                          }
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
