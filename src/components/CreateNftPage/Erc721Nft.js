import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { PreviewFile, UploadFile } from ".";
//import { SwitchToggle, TokenPrice } from "../";
import classnames from "classnames";
import { ToastContainer, toast } from "react-toastify";
import { pinOnIpfs } from "../../ipfs/ipfs";
import "react-toastify/dist/ReactToastify.css";
import "../../css/toast.css";
import { useContracts } from "../../context/ContractContext"; // instance des contracts

const Erc721Nft = () => {
  const { sro721 } = useContracts();
  const { userState } = useUser();
  // const [isToggledPrice, setIsToggledPrice] = useState(false);
  // const [isToggled, setIsToggled] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let history = useHistory();

  const onSubmit = async (data) => {
    // loading on ?
    setLoading(true);
    try {
      const uriHash =
        `https://gateway.pinata.cloud/ipfs/` +
        (await pinOnIpfs(watch().file[0]));
      const royalties = data.royalties || 0;
      const title = data.title;
      const description = data.description;
      const tx = await sro721.create(royalties, title, description, uriHash);
      await tx.wait();
      toast.success(`Nft minted \n`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        history.push(`/user/${userState.data.fullAddress}`);
      }, 2000);
    } catch (e) {
      toast.error(e.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-h-screen pt-2 font-mono my-16 text-white"
      >
        <div className="container mx-auto">
          <h1 className="text-5xl text-yellow-400 text-center font-bold pb-10">
            Create single collectible
          </h1>
          <div className="mb-5">
            <UploadFile
              register={register}
              watch={watch().file}
              errors={errors.file}
            />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div>
              <PreviewFile watch={watch().file || 0} />
            </div>

            {/* Future Extension */}

            {/* <div className="flex">
              <div className="md:pl-5 ">
                <div className="">
                  <h2 className="text-2xl font-semibold pt-4 pb-1">
                    Put on marketplace
                  </h2>
                  <SwitchToggle
                    isToggled={isToggledPrice}
                    onToggle={() => setIsToggledPrice(!isToggledPrice)}
                  />
                  <p className="block tracking-wide text-xs mb-2 mt-2">
                    Put your new NFT on XSRO marketplace
                  </p>
                  <TokenPrice register={register} watch={watch} errors={errors} />
                </div>
                <div className="">
                  <h2 className="text-2xl font-semibold pt-4 pb-1">
                    Unlock once purchased
                  </h2>
                  <SwitchToggle
                    isToggled={isToggled}
                    onToggle={() => setIsToggled(!isToggled)}
                  />
                  <input
                    className="appearance-none block mt-2 w-full bg-gray-900  border border-gray-400 shadow-inner rounded-md py-3 px-4  leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                    placeholder="Digital key, linkto file..."
                    {...register("key")}
                  />
                  <label className="block tracking-wide  text-xs mb-2 mt-2">
                    Content will be unlocked after successful transaction
                  </label>
                </div>
              </div>
            </div> */}
          </div>
          <div className="container mx-auto max-w-screen-lg h-full">
            <div className=" relative h-full flex flex-col bg-gray-900 shadow-xl rounded-md mt-3 border-2 border-gray-200 border-opacity-25 p-5 ">
              <div className="items-center justify-center">
                <label className="block uppercase tracking-wide text-2xl text-yellow-400 font-bold mb-2 mt-5">
                  Title
                </label>
                <div className="">
                  <input
                    className="appearance-none block w-full bg-gray-900  border border-gray-400 shadow-inner rounded-md py-3 px-4  leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                    placeholder="Title NFT"
                    {...register("title", { required: true })}
                  />
                </div>
                {errors.title && (
                  <p className="text-xs text-red-500 mt-2">
                    "Title" is required
                  </p>
                )}
              </div>
              <div className="items-center justify-center">
                <label className="block uppercase tracking-wide text-2xl font-bold mb-2 mt-5">
                  <p className="flex text-yellow-400"> Decription <p className="pl-1 text-purple-500 text-sm">(Optional)</p></p>
                </label>
                <div className="">
                  <input
                    className="appearance-none block w-full bg-gray-900 border border-gray-400 shadow-inner rounded-md py-3 px-4  leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                    placeholder="Descriptif NFT"
                    {...register("description")}
                  />
                </div>
              </div>
              <div className="items-center justify-center">
                <label className="block uppercase tracking-wide text-yellow-400 text-2xl font-bold mb-2 mt-5">
                  Royalties
                </label>
                <div className="">
                  <input
                    className="appearance-none block w-full bg-gray-900  border border-gray-400 shadow-inner rounded-md py-3 px-4  leading-tight focus:outline-none  focus:border-gray-500"
                    type="number"
                    min="0"
                    max="50"
                    placeholder="10 %"
                    {...register("royalties", { required: true })}
                  />
                  {errors.royalties && (
                    <p className="text-xs text-red-500 mt-2">
                      "Royalties" is required
                    </p>
                  )}
                </div>
                <p className="block tracking-wide text-xs mb-2 mt-2">
                  <p className="flex text-yellow-400">Suggested : <p className="pl-1 text-gray-400">0%, 10%, 20%, 30%. Maximum is 50%</p></p>
                </p>
              </div>
              <div className="flex items-center justify-center my-8">
                {loading ? (
                  <p>Send transaction to create your NFT...</p>
                ) : (
                  <input
                    type="submit"
                    className={classnames(
                      "transition duration-300 bg-gradient-to-br rounded-xl hover:opacity-75",
                      "text-black px-8 py-3 from-primary-200 to-primary-200" ||
                      "text-white hover:text-primary-200"
                    )}
                    value="Create item"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Erc721Nft;
