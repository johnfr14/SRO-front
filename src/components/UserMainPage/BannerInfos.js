import { Link } from "react-router-dom";
import { Button } from "../index";
import "../../css/userProfil.css";
import { bannerTest, userTest } from "../../images/";

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
                <img alt="" className="kffNNE" src={userTest} />
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
              <p className="font-bold text-lg">{data.username}</p>
              <p className=" ">{data.address}</p>
              <p className="text-gray-500">@Name</p>
            </div>

            <div className="px-3 mt-3">
              <p>BIOGRAPHIE</p>
            </div>

            <div className=" flex mt-3">
              <div className="flex items-center ">
                <i className="fas fa-link"></i>
                <p className="ml-2">
                  <Link
                    className="from-primary-200 hover:underline"
                    target="_blank"
                    rel="noopener"
                    href="#"
                  >
                    @twitter
                  </Link>
                </p>
                <p className="ml-2">
                  <Link
                    className="from-primary-200 hover:underline"
                    target="_blank"
                    rel="noopener"
                    href="#"
                  >
                    @site
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerInfos;
