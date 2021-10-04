import { toast } from "react-toastify";
import axios from "axios";
import { ethers } from "ethers";
import { pinOnIpfs, userData } from "./fetchData";
import { MarketplaceAddress } from "../contracts/Marketplace";

//---------- General ----------//
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

 // src/components/EditProfilePage/SettingInfo.js
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

// src/components/CreateNftPage/Erc721.js
export const handleCreateNft = async (userState, data, watch, sro721, setLoading, history) => {
  setLoading(true);
  try {
    const uriHash =
      `https://gateway.pinata.cloud/ipfs/` +
      (await pinOnIpfs(watch().file[0]));
    const royalties = data.royalties || 0;
    const title = data.title;
    const description = data.description;
    const tx = await sro721.create(royalties, title, description, uriHash);
    await tx.wait();
    toast.success(`Nft minted \n`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      history.push(`/user/${userState.data.fullAddress}`);
    }, 2000);
  } catch (e) {
    toast.error(e.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  } finally {
    setLoading(false);
  }
}



//---------- Modal buttons ----------//

export const initialStateModal = {
  error: false,
  loading: false,
  isOnSale: false,
  isEdited: false,
  isRemoved: false,
  isBought: false,
  newPrice: false,
  setIsApproved: false,
}

export const handleApproveNft = async (sro721, nextStep, modal, setModal) => {
  try {
    setModal({...modal, loading: true});
    const tx = await sro721.approve(MarketplaceAddress, nextStep.nftId);
    await tx.wait();
    setModal({...modal, loading: false});
    setModal({...modal, setIsApproved: true});
    toast.success(`Nft approved successfully \n`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  } catch (e) {
    setModal({...modal, loading: false});
    setModal({...modal, error: true});
    toast.error(e.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  }
}

export const handleCreateSale = async (marketplace, nextStep, setNextStep, modal, setModal) => {
  try {
    setModal({...modal, loading: true});
    const tx = await marketplace.createSale(
      nextStep.collection,
      nextStep.nftId,
      ethers.utils.parseEther(nextStep.price)
    );
    await tx.wait();
    setModal({...modal, loading: false});
    setModal({...modal, isOnSale: true});
    toast.success(`Sale created sucessfully`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      setNextStep({ ...nextStep, isNext: false });
    }, 2000);
  } catch (e) {
    setModal({...modal, error: true});
    setModal({...modal, loading: false});
    toast.error(e.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  }
};

export const handleEdit = async (sale, marketplace, modal, setModal, open, setOpen) => {
  try {
    setModal({...modal, loading: true});
    const tx = await marketplace.setPrice(sale.saleId, ethers.utils.parseEther(modal.newPrice))
    await tx.wait()
    setModal({...modal, loading: false});
    toast.success(`New price Edited successfully ! \n`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    setModal({...modal, isEdited: true});
    setTimeout(() => {
      setOpen({ ...open, editPrice: false })
    }, 2000);
  } catch (e) {
    setModal({...modal, loading: false});
    setModal({...modal, error: true});
    toast.error(e.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  }
}

export const handleRemove = async (sale, marketplace, modal, setModal, open, setOpen) => {
  try {
    setModal({...modal, loading: true});
    const tx = await marketplace.removeSale(sale.saleId)
    await tx.wait()
    setModal({...modal, loading: false});
    toast.success(`New price Edited successfully ! \n`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    setModal({...modal, isRemoved: true});
    setTimeout(() => {
      setOpen({ ...open, removeSale: false })
    }, 2000);
  } catch (e) {
    setModal({...modal, loading: false});
    setModal({...modal, error: true});
    toast.error(e.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  }
}

export const handleApproveXsro = async (xsro, sale, modal, setModal) => {
  try {
    setModal({...modal, loading: true});
    const tx = await xsro.approve(
      MarketplaceAddress,
      ethers.utils.parseEther(sale.price)
    );
    await tx.wait();
    setModal({...modal, loading: false});
    setModal({...modal, isApproved: true});
    toast.success(`Nft approved successfully \n`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  } catch (e) {
    setModal({...modal, loading: false});
    setModal({...modal, error: true});
    toast.error(e.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  }
}

export const handleBuy = async (sale, marketplace, modal, setModal, open, setOpen) => {
  try {
    setModal({...modal, loading: true});
    const tx = await marketplace.buyNft(sale.saleId);
    await tx.wait()
    setModal({...modal, loading: false});
    toast.success(`Nft bought successfully ! \n`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    setModal({...modal, isBought: true});
    setTimeout(() => {
      setOpen({ ...open, removeSale: false })
    }, 2000);
  } catch (e) {
    setModal({...modal, loading: false});
    setModal({...modal, error: true});
    toast.error(e.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  }
}