import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useContracts } from "../../context/ContractContext";
import { MarketplaceAddress } from "../../contracts/Marketplace";

import { LoaderIcon } from "..";
import classnames from "classnames";
import { deleteIcon, checkmarkIcon } from "../../images";
import { ButtonOnClick } from "../Button";
import { toast } from "react-toastify";

export default function ModCheckout({nextStep, setNextStep}) {
  const { marketplace, sro721 } = useContracts()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isApproved, setIsApproved] = useState(false)
  const cancelButtonRef = useRef(null);

  //Function to approve
  const handleApproveNft = async() => {
    try {
        setLoading(true)
        const tx = await sro721.approve(MarketplaceAddress, nextStep.nftId)
        await tx.wait()
        setLoading(false)
        setIsApproved(true)
        toast.success(`Nft minted \n`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    } catch (e) {
        setLoading(false)
        setError(true)
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
  //Function to create
  const handleCreateSaleButton = async() => {
    try {
        setLoading(true)
        const tx = await marketplace.createSale(nextStep.collection, nextStep.nftId, nextStep.price)
        await tx.wait()
        setLoading(false)
        toast.success(`Sale created sucessfully`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    } catch (e) {
        console.log(e.message)
        setError(true)
        setLoading(false)
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

  useEffect(() => {
      const fetchApprovedNft = async() => {
        const address = await sro721.getApproved(nextStep.nftId)
        setIsApproved(address === MarketplaceAddress)  
      }
      fetchApprovedNft()
  }, [nextStep.nftId, sro721])

  return (
    <Transition.Root show={nextStep.isNext} as={Fragment}>
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
                      <h2 className="text-white text-5xl font-bold py-4">
                        Follow steps
                      </h2>
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
                       {isApproved ?
                       <>
                            <div className=" pr-5 ">
                            <img alt="" className="w-7 " src={checkmarkIcon} />
                            </div>
                            <div className="pr-5">
                            <button disabled={true} className={classnames("bg-green-100 rounded-xl", "text-black px-8 py-3")} >
                                Appoved
                            </button>
                            </div>
                        </> : loading ?
                        <div className="flex items-center justify-center pt-4 pb-3 pr-5 ">
                            <LoaderIcon />
                            <div className="pr-5">
                            <button disabled={true} className={classnames("transition duration-300 bg-gradient-to-br rounded-xl hover:opacity-75",
                                                                        "text-black px-8 py-3 from-primary-200 to-primary-200" ||
                                                                        "text-white hover:text-primary-200")} >
                              In progress...
                            </button>
                            </div>
                        </div> : 
                        <>
                            {error && <div className=" pr-5 "> <img alt="" className="w-7 " src={deleteIcon} /> </div>}
                            <div className="pr-5">
                                <ButtonOnClick onClick={handleApproveNft} buttonStyle>
                                    Start
                                </ButtonOnClick>
                            </div>
                        </>  
                        }
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
                      {isApproved ? loading ?
                        <div className="flex items-center justify-center pt-4 pb-3 pr-5 ">
                            <LoaderIcon />
                            <div className="pr-5">
                            <button disabled={true} className={classnames("transition duration-300 bg-gradient-to-br rounded-xl hover:opacity-75",
                                                                        "text-black px-8 py-3 from-primary-200 to-primary-200" ||
                                                                        "text-white hover:text-primary-200")} >
                              In progress...
                            </button>
                            </div>
                        </div> :
                        <>
                            {error && <div className=" pr-5 "> <img alt="" className="w-7 " src={deleteIcon} /> </div>}
                            <div className=" pr-5 ">
                                <ButtonOnClick onClick={handleCreateSaleButton} buttonStyle>
                                    Create Sale
                                </ButtonOnClick>
                            </div>
                        </>
                        : 
                        <div className="pr-5">
                            <button disabled={true} className={classnames("bg-gray-200 rounded-xl", "text-black px-8 py-3 from-primary-200 to-primary-200")} >
                                Create Sale
                            </button>
                        </div>}
                      </div>
                      <div className="flex items-center justify-center pt-3 pb-3">
                        <button onClick={() => setNextStep({...nextStep, isNext: false})}
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
