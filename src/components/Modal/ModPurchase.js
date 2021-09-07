import React, {useState} from 'react'
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useContracts } from "../../context/ContractContext";
import { ButtonOnClick } from "../Button";
import { toast } from "react-toastify";
import { LoaderIcon } from "..";

const ModPurchase = ({open, setOpen, sale}) => {
  const { marketplace } = useContracts()
  const cancelButtonRef = useRef(null);
  const [loading, setLoading] = useState(false)

  const handleBuyButton = async() => {
    try {
      setLoading(true)
      const tx = await marketplace.buyNft(sale.id)
      await tx.wait()
      setLoading(false)
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
        setOpen({...open, buyNft: false})
      }, 2000);
  } catch (e) {
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

  return (
    <Transition.Root show={open.buyNft} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => setOpen({...open, buyNft: false})}
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
                            Quick recap
                          </h2>
                          <p className="text-sm font-bold">
                            Enter new price. Your NFT will be pushed in top of
                            marketplace
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center pt-4 pb-3 pr-5 ">
                        <div className="pt-5 pl-5">
                          {loading && <LoaderIcon />}
                          <ButtonOnClick loading={loading} onClick={handleBuyButton} buttonStyle>
                            {loading ? 'In progress' : 'Buy'}
                          </ButtonOnClick>
                        </div>
                      </div>
                      <div className="flex items-center justify-center pt-3 pb-3">
                        <button 
                          onClick={() => setOpen({...open, buyNft: false})}
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


export default ModPurchase
