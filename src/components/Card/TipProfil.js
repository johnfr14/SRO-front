import { Link } from "react-router-dom";
import { userDefault } from "../../images";
import "../../css/card.css";

const TipProfil = ({ tipData, linkTo, userIcon = userDefault }) => {
  return (
    <>
      <div className="has-tooltip cqhhpO">
        <span className="tooltip rounded shadow-lg p-1 bg-black text-white mt-8 hidden md:block">
          {tipData}
        </span>
        <Link to={{pathname: linkTo === null ? "/" : `/user/${linkTo}`, state: linkTo}} className="cvuikC">
          <img
            className="avatar h-10 w-10 rounded-full border-2 border-opacity-40 border-black bgKYbJ"
            src={userIcon}
            alt="S"
          />
        </Link>
      </div>
    </>
  );
};

export default TipProfil;
