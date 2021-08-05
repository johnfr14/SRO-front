import { Link } from "react-router-dom";

const cardMedia =
  "https://img.rarible.com/prod/image/upload/t_preview/prod-itemImages/0xd07dc4262bcdbf85190c01c996b4c06a461d2430:8207";

const MediaCard = ({ linkTo = "/" }) => {
  return (
    <>
      <Link to={linkTo} className="p-1">
        <img
          src={cardMedia}
          alt=""
          className="w-full object-fill rounded-2xl "
        />
      </Link>
    </>
  );
};

export default MediaCard;
