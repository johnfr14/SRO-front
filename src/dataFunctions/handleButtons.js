import { toast } from "react-toastify";
  
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