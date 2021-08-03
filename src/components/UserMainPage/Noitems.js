import { Button } from "../index";
import "../../css/noItems.css";

const Noitems = () => {
  return (
    <>
      <div class="flex jCiuZr">
        <div class="enzXjY">
          <div class="cMDrWL">
            <span class="gHDLfe">No items found</span>
            <span class="cnmfyd">
              Come back soon! Or try to browse something for you on our
              marketplace
            </span>
            <div class="iNCLVq">
              <Button target={"/"} buttonStyle>
                Browse marketplace
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Noitems;
