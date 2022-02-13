import axios from "axios";
import { ethers } from "ethers";
import { MarketplaceAddress } from "../contracts/Marketplace";
import { userDefault } from "../images";

export const defaultCardData = {
  id: null,
  metadata: {
    author: null,
    timestamp: null,
    royalties: null,
    likes: null,
    title: null,
    description: null,
    url: null
  },
  sale: {
    status: null,
    nftId: null,
    price: null,
    seller: null,
    collection: null,
  },
  owner: {
  fullAddress: null,
  address: null,
  id: null,
  username: null,
  bio: null,
  url: null,
  twitterUsername: null,
  portfolio: null,
  avatar: userDefault,
  },
  creator: {
  fullAddress: null,
  address: null,
  id: null,
  username: null,
  bio: null,
  url: null,
  twitterUsername: null,
  portfolio: null,
  avatar: userDefault,
},
}

//------------- General --------------//

export const SubstrAdress = (dataAdress) => {
  return dataAdress.substr(0, 6) + "..." + dataAdress.substr(-4);
};

export const userData = async (address) => {
  try {
  const user = await axios
    .get(`https://bdd-sro.herokuapp.com/user/${address}`)
    .then((result) => result.data.payload);

  const data = {
    fullAddress: address,
    address: address.substr(0, 6) + "..." + address.substr(-4),
    id: user.profile.id,
    username: user.profile.username,
    bio: user.profile.bio,
    url: user.profile.url,
    twitterUsername: user.profile.twitterUsername,
    portfolio: user.profile.portfolio,
    avatar: user.profile.avatar,
  };
  return data;
} catch (e) {
  console.error(e.message)
}
};

export const pinOnIpfs = async (file) => {
  try {
    let formatData = new FormData();
    formatData.append("file", file);

    const hash = await axios.post(`https://api.pinata.cloud/pinning/pinFileToIPFS`, formatData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formatData._boundary}`,
          pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
          pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_KEY,
        },
      })
      .then((result) => result.data.IpfsHash);

    return hash
  } catch (e) {
    throw new Error(e.message)
  }
}

//------------- ALGORYTHME Cardlist --------------//

// src/components/UserMainPage/CardList.js

export const fetchData = async (index, user, card, nftMetadata) => {
  try {
    switch (index) {
      case 0:
        return await fetchLastNftOnSale(user, card, nftMetadata);
      case 1:
        return await getNftOnSale(user, card, nftMetadata);
      case 2:
        return await getNftOwned(user, card);
      case 3:
        return await getNftCreated(user, card);
      default:
        return "error";
    }
  } catch (error) {
    console.error(error.message)    
  }
}

export const fetchLastNftOnSale = async(user, card, nftMetadata) => {
  try {
    let isLiked =  nftMetadata.liked.every(elem => elem.userAddress !== user.fullAddress.toLowerCase())
    isLiked = !isLiked
    const creatorData = await userData(nftMetadata.author.id);
    const ownerData = await userData(nftMetadata.owner.id)
    return {id: card.nftId.toString(), metadata: nftMetadata, sale: {...card, price: ethers.utils.formatEther(card.price)}, owner: ownerData, creator: creatorData, isLiked: isLiked }
  } catch (e){
    console.error(e)
  }
}

export const getNftOnSale = async (user, card, nftMetadata) => {
  try {
    let isLiked =  nftMetadata.liked.every(elem => elem.userAddress !== user.fullAddress.toLowerCase())
    isLiked = !isLiked
    const creator = await userData(nftMetadata.author.id);
    const owner = await userData(nftMetadata.owner.id);
    return { sale: {...card, price: ethers.utils.formatEther(card.price)}, owner: owner, creator: creator, isLiked: isLiked }
  } catch (error) {
    console.error(error.message)    
  }
};

export const getNftOwned = async (user, nftMetadata) => {
  try{
    let isLiked =  nftMetadata.liked.every(elem => elem.userAddress !== user.fullAddress.toLowerCase())
    isLiked = !isLiked
    const creator = await userData(nftMetadata.author.id);
    const owner = await userData(nftMetadata.owner.id);
    return {...defaultCardData, owner: owner, creator: creator, isLiked: isLiked}
  } catch (error) {
    console.error(error.message)
  }
};

export const getNftCreated = async (user, nftMetadata) => {
  try {
    let isLiked =  nftMetadata.liked.every(elem => elem.userAddress !== user.fullAddress.toLowerCase())
    isLiked = !isLiked
    const owner = await userData(nftMetadata.owner.id);
    const creator = await userData(nftMetadata.author.id);
    return {...defaultCardData, owner: owner, creator: creator, isLiked: isLiked}
  } catch (error) {
    console.error(error.message)    
  }
};

// src/pages/NftPage.js

//---------- NFT Page----------//
export const fetchApprovedNft = async (id, sro721) => {
  const address = await sro721.getApproved(id);
  return address
};

export const fetchApprovedXsro = async (xsro, userAddress) => {
  const amount = await xsro.allowance(userAddress, MarketplaceAddress)
  return amount.toString() 
}