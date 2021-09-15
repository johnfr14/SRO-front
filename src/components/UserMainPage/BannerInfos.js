import { Link } from "react-router-dom";
import { Button } from "../index";
import "../../css/userProfil.css";
import { bannerTest, userDefault } from "../../images/";

const BannerInfos = ({ data }) => {
  const styleBanner = {
    backgroundImage: `url('${bannerTest}')`,
  };

  return (
    <>
      <div>
        <div className="hexXXI h-36 md:h-60">
          <div className="rounded-lg GOhXc">
            <div className="jSjmbm" style={styleBanner} />
          </div>
          <div className="bYqeUY left-5">
            <div className="dWVFoH">
              <div className="cNAXjx">
                <img
                  alt=""
                  className="kffNNE"
                  src={data.avatar || userDefault}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center text-white mt-16">
        <div className="w-full">
          <div className="items-center relative">
            <div className="mb-10 absolute top-5 right-0">
              <Button target={"/settings"} buttonStyle>
                Edit Profile
              </Button>
            </div>
            <div className="ml-3">
              <p className="font-bold text-4xl text-purple-600">{data.username}</p>
              <p className=" ">{data.address}</p>
              {/* <div className="flex items-center ">
                <p>Twitter: </p>
                <p className="text-gray-500 ml-2">@{data.twitterUsername}</p>
              </div> */}
            </div>

            <div className="px-3 mt-3">
              <p className="text-yellow-400">Bio :</p>
              <p>{data.bio}</p>
            </div>

            <div className=" flex mt-3">
              <div className="flex items-center ">
                <i className="fas fa-link"></i>
                {/* <p className="ml-2">
                  <Link
                    className="from-primary-200 hover:underline"
                    target="_blank"
                    rel="noopener"
                    to="#"
                  >
                    {data.twitterUsername}
                  </Link>
                </p> */}
                <p className="ml-3 text-yellow-400">Site : </p>
                <p className="ml-2">
                  <Link
                    className="from-primary-200 hover:underline"
                    target="_blank"
                    rel="noopener"
                    to="#"
                  >
                    {data.portfolio}
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex items-center ml-3 text-yellow-400">
              <p>Twitter : </p>
              <p className="text-gray-500 ml-2">@{data.twitterUsername}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerInfos;
