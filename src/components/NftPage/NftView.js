import { MediaCard } from "../index";
import "../../css/card.css";

const NftView = ({ mediaURL }) => {
  return (
    <div>
      <MediaCard mediaURL={mediaURL} />
    </div>
  );
};

export default NftView;
