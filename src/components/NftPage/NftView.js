import { MediaCard } from "../index";
import "../../css/card.css";
import { useRouteMatch } from "react-router-dom";

const NftView = ({ mediaURL }) => {
  const match = useRouteMatch("/:address/:id");
  return (
    <div>
      <MediaCard linkTo={`${match.url}`} mediaURL={mediaURL} />
    </div>
  );
};

export default NftView;
