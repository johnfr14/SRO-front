import { useContext } from "react";
import { AvatarSettings } from "./index";
import { useForm } from "react-hook-form";
import { useUser } from "../../context/UserContext";
import { Web3Context } from "web3-hooks";
import classnames from "classnames";
import axios from "axios";
const FormData = require("form-data");

require("dotenv").config();

const PINATA_API_KEY = process.env.REACT_APP_PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.REACT_APP_PINATA_SECRET_KEY;

// @TODO: toast pour l'update du profil ( dans la fonction "onSubmit()")
const SettingsInfo = ({ data }) => {
  const [web3State] = useContext(Web3Context);
  const { dispatch } = useUser();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    try {
      let avatar = data.avatar;
      if (watch().avatar.length !== 0) {
        let formatData = new FormData();
        formatData.append("file", watch().avatar[0]);
        console.log(formatData);
        avatar = await axios
          .post(`https://api.pinata.cloud/pinning/pinFileToIPFS`, formatData, {
            headers: {
              "Content-Type": `multipart/form-data; boundary=${formatData._boundary}`,
              pinata_api_key: PINATA_API_KEY,
              pinata_secret_api_key: PINATA_SECRET_KEY,
            },
          })
          .then((result) => result.data.IpfsHash);
      } else {
        avatar = avatar === null ? null : data.avatar.split("/").pop();
      }

      console.log(avatar);

      const result = await axios.post(
        `https://bdd-sro.herokuapp.com/edit_profile/${web3State.account}`,
        {
          data: {
            username: watch().username || null,
            bio: watch().bio || null,
            url: watch().url || null,
            twitterUsername: watch().twitterUsername || null,
            portfolio: watch().portfolio || null,
            avatar: avatar,
          },
        }
      );
      console.log(result);
      //toast ici
      dispatch({ type: "UPDATE_PROFILE", payload: result.data.payload });
    } catch (e) {
      //toast ici
      console.error(e);
    }
  };

  return (
    <div className="mb-20">
      <div className="">
        <div>
          <h2 className=" text-white text-center font-bold ">Edit Profile</h2>
          <p className="text-white text-center my-8  pb-10 ">
            You can set preferred display name, create your branded profile URL
            and manage other personal settings
          </p>
        </div>
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)} className="">
            {data.id && (
              <div className="flex flex-col md:flex-row justify-center">
                <AvatarSettings
                  register={register}
                  watch={watch().avatar || 0}
                  avatar={data.avatar}
                />
                <div className="md:ml-24">
                  <div className="items-center ">
                    <label className="block uppercase tracking-wide text-white text-xl font-bold mb-2 mt-5">
                      Display name
                    </label>
                    <div className="">
                      <input
                        className="appearance-none block w-full bg-gray-900 text-white border border-gray-400 shadow-inner rounded-md py-3 px-4  leading-tight focus:outline-none  focus:border-gray-500"
                        type="text"
                        placeholder="Enter your display name"
                        defaultValue={data.username}
                        value={watch().username}
                        {...register("username")}
                      />
                    </div>
                  </div>
                  <div className="items-center justify-center">
                    <label className="block uppercase tracking-wide text-white text-xl font-bold mb-2 mt-5">
                      Bio
                    </label>
                    <div className="">
                      <input
                        className="appearance-none block w-full bg-gray-900 text-white border border-gray-400 shadow-inner rounded-md py-3 px-4  leading-tight focus:outline-none  focus:border-gray-500"
                        type="text"
                        placeholder="Tell about yourself in a few words"
                        defaultValue={data.bio}
                        value={watch().bio}
                        {...register("bio")}
                      />
                    </div>
                  </div>
                  <div className="items-center justify-center">
                    <label className="block uppercase tracking-wide text-white text-xl font-bold mb-2 mt-5">
                      Custom URL
                    </label>
                    <div className="flex flex-col md:flex-row mb-4">
                      <div className="flex -mr-px mb-2 md:mb-0">
                        <span className="items-center leading-normal bg-gray-600 text-white rounded border border-gray-600 shadow-inner py-3 px-4 whitespace-no-wrap text-grey-dark ">
                          https://sarahro.io/users/
                        </span>
                      </div>
                      <input
                        type="text"
                        className="appearance-none block w-full bg-gray-900 text-white border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                        placeholder="Enter your custom URL"
                        defaultValue={data.url}
                        value={watch().url}
                        {...register("url", { pattern: /^[A-Za-z0-9]+$/i })}
                      />
                      {errors.url &&
                        "Wrong syntaxe, only alphabet character accepted (a)"}
                    </div>
                  </div>
                  <div className="items-center justify-center">
                    <label className="block uppercase tracking-wide text-white text-xl font-bold mb-2 mt-5">
                      Twitter Username
                    </label>
                    <p className="block uppercase tracking-wide text-white text-xs mb-3">
                      Link your Twitter account to gain more trust on the
                      marketplace
                    </p>
                    <input
                      className="appearance-none block w-full bg-gray-900 text-white border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      type="text"
                      placeholder="@pseudo"
                      defaultValue={data.twitterUsername}
                      value={watch().twitterUsername}
                      {...register("twitterUsername")}
                    />
                  </div>
                  <div className="items-center justify-center">
                    <label className="block uppercase tracking-wide text-white text-xl font-bold mb-2 mt-5">
                      Personal site or portfolio
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-900 text-white border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      type="text"
                      placeholder="https://"
                      defaultValue={data.portfolio}
                      value={watch().portfolio}
                      {...register("portfolio")}
                    />
                  </div>
                  <div className="flex items-center justify-center mb-5 mt-8">
                    <input
                      type="submit"
                      className={classnames(
                        "transition duration-300 bg-gradient-to-br rounded-xl hover:opacity-75",
                        "text-black px-8 py-3 from-primary-200 to-primary-200" ||
                          "text-white hover:text-primary-200"
                      )}
                      value="Update profile"
                    />
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsInfo;
