import { MediaCard } from "../index";
import "../../css/card.css";

const cardMedia =
  "https://img.rarible.com/prod/image/upload/t_preview/prod-itemImages/0xd07dc4262bcdbf85190c01c996b4c06a461d2430:8207";

const NftViewBuy = ({
  mediaURL = cardMedia,
  linkToNFT,
}) => {
  return (
    <div className="">
      <MediaCard mediaURL={mediaURL} linkTo={linkToNFT} />
    </div>
  );
};

export default NftViewBuy;
