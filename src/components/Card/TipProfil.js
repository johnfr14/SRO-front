import { Link } from "react-router-dom";
import { userDefault } from "../../images";
import "../../css/card.css";

const TipProfil = ({
  tipData = "Owner : ...",
  linkTo = "/",
  userIcon = userDefault,
}) => {
  return (
    <>
      <div className="has-tooltip cqhhpO">
        <span className="tooltip rounded shadow-lg p-1 bg-black text-white -mt-8">
          {tipData}
        </span>
        <Link to={linkTo === null ? '/' : linkTo} className="cvuikC">
          <img
            className="avatar h-10 w-10 rounded-full border-2 border-opacity-40 border-black bgKYbJ"
            src={userIcon}
            alt={userIcon}
          />
        </Link>
      </div>
    </>
  );
};

export default TipProfil;
