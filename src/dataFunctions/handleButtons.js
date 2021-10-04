import { toast } from "react-toastify";
import { pinOnIpfs, userData } from "./fetchData";
import axios from "axios";
  
export const handleLikeButton = async (nft, sro721) => {
    try {
      const tx = await sro721.like(nft.id);
      await tx.wait();
      return {...nft, metadata: {...nft.metadata, likes: !nft.isLiked ? nft.metadata.likes + 1 : nft.metadata.likes - 1  }, isLiked: !nft.isLiked}
    } catch (e) {
      console.error(e.message);
      toast.error(e.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        })
    };
};

export const handleSettingProfileButton = async(userState, dispatch, watch) => {
  try {
    let avatar = userState.data.avatar;
    if (watch().avatar.length !== 0) {
      avatar = await pinOnIpfs(watch().avatar[0]);
    } else {
      avatar = avatar === null ? null : userState.data.avatar.split("/").pop();
    }
    dispatch({ type: "FETCH_INIT" });
    await axios.post(
      `https://bdd-sro.herokuapp.com/edit_profile/${userState.data.fullAddress}`,
      {
        data: {
          username: watch().username || null,
          bio: watch().bio || null,
          url: watch().url || null,
          twitterUsername: watch().twitterUsername || null,
          portfolio: watch().portfolio || null,
          avatar: `https://gateway.pinata.cloud/ipfs/${avatar}`,
        },
      }
    );
    const newData = await userData(userState.data.fullAddress);
    dispatch({ type: "UPDATE_PROFILE", payload: newData });

    toast.success("Profile Updated", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    //after updating data it redirect to the dashboard
  } catch (e) {
    toast.error(e.message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  }
}