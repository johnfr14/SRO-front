import { Link } from "react-router-dom";
import ProgressiveImage from "react-progressive-image-loading";
import { brokenLink } from "../../images/";

import "../../css/mediaCard.css";

const MediaCard = ({ linkTo, mediaURL, altName }) => {
  return (
    <>
      {mediaURL ? (
        <div className="flex mt-4 jCiuZr">
          <div className="flex relative dxFZky">
            <Link to={linkTo} className="bzdSnS">
              <ProgressiveImage
                preview={brokenLink}
                src={mediaURL}
                transitionTime={500}
                transitionFunction="ease"
                render={(src) => (
                  <img src={src} className="gnBPmJ bvMJFo" alt={altName} />
                )}
              />
            </Link>
          </div>
        </div>
      ) : (
        <Link to={linkTo} className="flex">
          <div className="flex erAkNO">
            <div className="flex hasEYd">
              <div className="cObiVj relative">
                <div className="iriXCP">
                  <div className="cOnpMn">
                    <svg
                      viewBox="0 0 128.2 128.2"
                      fill="none"
                      width="60"
                      height="60"
                      xlmns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M111.8,59.1c-0.3-0.5-0.7-0.8-1.2-0.9l-9.8-2.5c-1.1-0.3-2.2,0.4-2.4,1.5l-2.2,8.9L87.7,64c0,0,0,0,0,0l-0.4-0.1   c-0.5-0.1-1.1,0-1.5,0.2c-0.5,0.3-0.8,0.7-0.9,1.2l-2.2,8.9l-8.9-2.2c-1.1-0.3-2.2,0.4-2.4,1.5L69,82.3l-8.9-2.2   c-0.5-0.1-1.1,0-1.5,0.2c-0.5,0.3-0.8,0.7-0.9,1.2l-0.2,0.8c0,0,0,0,0,0l-2.3,9.4c-0.3,1.1,0.4,2.2,1.5,2.4l38.8,9.7   c0.5,0.1,0.9,0.2,1.4,0.2c2.5,0,4.8-1.7,5.4-4.2l9.8-39.2C112.2,60.1,112.1,59.6,111.8,59.1z M74.7,76.3l8.7,2.2   c0.5,0.2,1.2,0.1,1.7-0.2c0.5-0.3,0.9-0.9,0.9-1.5l1.7-6.9l5.6,7.4l-2.8,11.2l-17.8-4.5L74.7,76.3z M98.4,98.8   c-0.2,0.9-1.1,1.4-1.9,1.2l-36.9-9.2l1.4-5.5l30.6,7.7c0.1,0,0.3,0.1,0.4,0.1c0,0,0,0,0,0c0,0,0.1,0,0.1,0c0.1,0,0.2,0,0.4-0.1   c0,0,0.1,0,0.1,0c0.2,0,0.3-0.1,0.4-0.2c0.5-0.3,0.8-0.7,0.9-1.2l3.5-14.1c0.1-0.6,0-1.2-0.3-1.7l-4.9-6.4l4.8,1.2   c1.1,0.3,2.2-0.4,2.4-1.5l2.2-8.9l6,1.5L98.4,98.8z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M57.5,75.9c1.1,0,2-0.9,2-2l0-9.2h9.1c1.1,0,2-0.9,2-2v-9.1h9.1c1.1,0,2-0.9,2-2l0-9.2h8.2c1.1,0,2-0.9,2-2V22.7   c0-3.1-2.5-5.6-5.6-5.6H22.6c-3.1,0-5.6,2.5-5.6,5.6v58.2c0,3.1,2.5,5.6,5.6,5.6h23.7c1.1,0,2-0.9,2-2v-8.5L57.5,75.9z M66.6,60.7   h-9.1c-1.1,0-2,0.9-2,2l0,9.2l-24.7,0l0-6.1l7.8-5.9l6.8,3.9c0.8,0.4,1.7,0.3,2.4-0.3l14.9-14.4l3.9,3.1V60.7z M44.3,82.4H22.6   c-0.9,0-1.6-0.7-1.6-1.6V22.7c0-0.9,0.7-1.6,1.6-1.6h63.7c0.9,0,1.6,0.7,1.6,1.6v15.8h-8.1c-1.1,0-2,0.9-2,2l0,9.2h-8l-5.9-4.7   c-0.8-0.6-1.9-0.6-2.6,0.1L46.1,59.6l-6.6-3.8c-0.7-0.4-1.6-0.4-2.2,0.1l-9.7,7.3c-0.5,0.4-0.8,1-0.8,1.6l0,9.1c0,0,0,0,0,0l0,0.1   c0,0.5,0.2,1,0.6,1.4c0.4,0.4,0.9,0.6,1.4,0.6h15.5V82.4z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M37.3,47.4c5,0,9-4.1,9-9c0-5-4.1-9-9-9c-5,0-9,4.1-9,9C28.2,43.3,32.3,47.4,37.3,47.4z M37.3,33.3c2.8,0,5,2.3,5,5   c0,2.8-2.3,5-5,5c-2.8,0-5-2.3-5-5C32.2,35.5,34.5,33.3,37.3,33.3z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default MediaCard;
