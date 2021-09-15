import { toast } from "react-toastify";
import { MarketplaceAddress } from "../contracts/Marketplace";

export const handleApproveNft = async(sro721, nftId, setLoading, setIsApproved) => {
    try {
        setLoading(true)
        const tx = await sro721.approve(MarketplaceAddress, nftId)
        await tx.wait()
        setLoading(false)
        setIsApproved(true)
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
        setLoading(false)
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


export const handleCreateSaleButton = async (setLoading, marketPlace, collectionAddress, nftId, price) => {
    try {
        setLoading(true)
        const tx = await marketPlace.createSale(collectionAddress, nftId, price)
        await tx.wait()
        setLoading(false)
        toast.success(`Sale created sucessfully`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
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
    }
}

export const handleSetPriceButton = async (setLoading, marketPlace, saleId, newPrice) => {
    try {
        setLoading(true)
        const tx = await marketPlace.setSale(saleId, newPrice)
        await tx.wait()
        setLoading(false)
        toast.success(`New price edited`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
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
    }
}

export const handleRemoveSaleButton = async (setLoading, marketPlace, saleId) => {
    try {
        setLoading(true)
        const tx = await marketPlace.removeSale(saleId)
        await tx.wait()
        setLoading(false)
        toast.success(`New price edited`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
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
    }
}

export const handleBuyNftButton = async (setLoading, marketplace, saleId) => {
    try {
        setLoading(true)
        const tx = await marketplace.buyNft(saleId)
        await tx.wait()
        setLoading(false)
        toast.success(`Nft bought sucessfully`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
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
    }
}