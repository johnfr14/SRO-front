import { useForm } from "react-hook-form";
import { AvatarSettings } from "./index";
import classnames from "classnames";
import "react-toastify/dist/ReactToastify.css";
import "../../css/toast.css";
import { useUser } from "../../context/UserContext";
import { handleSettingProfileButton } from "../../dataFunctions/handleButtons"
require("dotenv").config();

// @TODO: toast pour l'update du profil ( dans la fonction "onSubmit()")
const SettingsInfo = () => {
  const { userState, dispatch } = useUser()
  const {register, watch, handleSubmit, formState: { errors }} = useForm();

  const onSubmit = () => handleSettingProfileButton(userState, dispatch, watch);

  return (
    <div className="mb-20 NotificationCustom">
      
      <div className="">
        <div>
          <h2 className="text-5xl text-yellow-400 text-center font-bold pb-10">Edit Profile</h2>
          <p className="text-gray-400 text-center my-8  pb-10 ">
            You can set preferred display name, create your branded profile URL
            and manage other personal settings
          </p>
        </div>
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)} className="">
            {userState.data.fullAddress && (
              <div className="flex flex-col md:flex-row justify-center">
                <AvatarSettings
                  register={register}
                  watch={watch().avatar || 0}
                  avatar={userState.data.avatar}
                />
                <div className="md:ml-24">
                  <div className="items-center ">
                    <label className="block uppercase tracking-wide text-yellow-400 text-xl font-bold mb-2 mt-5">
                      Display name
                    </label>
                    <div className="">
                      <input
                        className="appearance-none block w-full bg-gray-900 text-gray-300 border border-gray-400 shadow-inner rounded-md py-3 px-4  leading-tight focus:outline-none  focus:border-gray-500"
                        type="text"
                        placeholder="Enter your display name"
                        defaultValue={userState.data.username}
                        value={watch().username}
                        {...register("username")}
                      />
                    </div>
                  </div>
                  <div className="items-center justify-center">
                    <label className="block uppercase tracking-wide text-yellow-400 text-xl font-bold mb-2 mt-5">
                      Bio
                    </label>
                    <div className="">
                      <input
                        className="appearance-none block w-full bg-gray-900 text-gray-300 border border-gray-400 shadow-inner rounded-md py-3 px-4  leading-tight focus:outline-none  focus:border-gray-500"
                        type="text"
                        placeholder="Tell about yourself in a few words"
                        defaultValue={userState.data.bio}
                        value={watch().bio}
                        {...register("bio")}
                      />
                    </div>
                  </div>
                  <div className="items-center justify-center">
                    <label className="block uppercase tracking-wide text-yellow-400 text-xl font-bold mb-2 mt-5">
                      <p className="flex text-yellow-400">Custom URL<span className="pl-1 text-purple-500 text-xs">(Coming Soon)</span></p>
                    </label>
                    <div className="flex flex-col md:flex-row mb-4">
                      <div className="flex -mr-px mb-2 md:mb-0">
                        <span className="items-center leading-normal bg-gray-800 text-gray-400 rounded border border-gray-600 shadow-inner py-3 px-4 whitespace-no-wrap text-grey-dark ">
                          https://apps.sarahro.io/users/
                        </span>
                      </div>
                      <input
                        type="text"
                        className="appearance-none block w-full bg-gray-900 text-gray-300 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                        placeholder="Enter your custom URL"
                        defaultValue={userState.data.url}
                        value={watch().url}
                        {...register("url", { pattern: /^[A-Za-z0-9]+$/i })}
                      />
                      {errors.url &&
                        "Wrong syntaxe, only alphabet character accepted (a)"}
                    </div>
                  </div>
                  <div className="items-center justify-center">
                    <label className="block uppercase tracking-wide text-yellow-300 text-xl font-bold mb-2 mt-5">
                      Twitter Username
                    </label>
                    <p className="block uppercase tracking-wide text-gray-400 text-xs mb-3">
                      Link your Twitter account to gain more trust on the marketplace
                    </p>
                    <div className="flex -mr-px mb-2 md:mb-0">
                      <span className="flex items-center leading-normal bg-gray-800 text-gray-400 rounded border border-gray-600 shadow-inner py-3 px-4 whitespace-no-wrap text-grey-dark ">
                        @
                      </span>

                      <input
                        className="flex appearance-none block w-full bg-gray-900 text-gray-300 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                        type="text"
                        placeholder="@pseudo"
                        defaultValue={userState.data.twitterUsername}
                        value={watch().twitterUsername}
                        {...register("twitterUsername")}
                      />
                    </div>
                  </div>
                  <div className="items-center justify-center">
                    <label className="block uppercase tracking-wide text-yellow-400 text-xl font-bold mb-2 mt-5">
                      Personal site or portfolio
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-900 text-gray-300 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      type="text"
                      placeholder="https://"
                      defaultValue={userState.data.portfolio}
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
