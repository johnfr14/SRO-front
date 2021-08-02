import { Divider } from "./index";

function Hero() {
  return (
    <>
      <div>
        <div className="md:mx-8">
          <p className="mb-2 text-3xl font-bold text-left text-white">
            TOP liked
          </p>
        </div>
        <Divider className="ml:mx-8 mb-2" />
      </div>
      <div>
        <div className="md:mx-8">
          <p className="mb-2 text-3xl font-bold text-left text-white">
            Market Place
          </p>
        </div>
      </div>
    </>
  );
}

export default Hero;
