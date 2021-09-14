import { Button } from "../index";
import "../../css/noItems.css";

const Noitems = ({ marketPlace }) => {
  return (
    <>
      <div className="flex jCiuZr">
        <div className="enzXjY">
          <div className="cMDrWL">
            <span className="gHDLfe">No items found</span>
            <span className="cnmfyd">
              Come back soon! Or try to browse something for you on our
              marketplace
            </span>
            {!marketPlace ? (
              <div className="iNCLVq">
                <Button target={"/"} buttonStyle>
                  Browse marketplace
                </Button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Noitems;
