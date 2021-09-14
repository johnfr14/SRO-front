import axios from "axios";
import { ethers } from "ethers";
import { SRO721Address } from "../contracts/SRO721";
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


// nft created
export const getNftCreated = async (user, sro721) => {
  const nfts = [];
  await sro721.getNftByAuthorTotal(user.fullAddress).then( async(result) => {
    for (let i = 0; i < result; i++) {
      const nft = await sro721.getNftByAuthorAt(user.fullAddress, i).then((result) => result.toString())
      nfts.push(nft);
    }
  })
  const created = []
  if (nfts[0] !== "") {
    for (let i = 0; i < nfts.length; i++) {
      const ownerOf = await sro721
        .ownerOf(nfts[i])
        .then((address) => address.toLowerCase());
      const owner = await userData(ownerOf);
      const metadata = await sro721.getNftById(nfts[i]);
      const url = await sro721.tokenURI(nfts[i]);
      const isLiked = await getLikedNft(user.fullAddress, nfts[i], sro721)
      created.push({
        id: nfts[i],
        metadata: { ...metadata, url: url, isLiked: isLiked },
        sale: {
          status: null,
          nftId: null,
          price: null,
          seller: null,
          collection: null,
        },
        owner: owner,
        creator: user,
      });
    }
    return created
  }
};
// nft owned
export const getNftOwned = async (user, sro721) => {
  const owned = []
  const balance = await sro721.balanceOf(user.fullAddress);
  for (let i = 0; i < balance; i++) {
    const nftId = await sro721.tokenOfOwnerByIndex(user.fullAddress, i).then((result) => result.toString())
    const metadata = await sro721.getNftById(nftId);
    const data = await userData(metadata.author.toLowerCase());
    const url = await sro721.tokenURI(nftId);
    const isLiked = await getLikedNft(user.fullAddress, nftId, sro721)
    owned.push({
      id: nftId,
      metadata: { ...metadata, url: url, isLiked: isLiked },
      sale: {
        status: null,
        nftId: null,
        price: null,
        seller: null,
        collection: null,
      },
      owner: user,
      creator: data,
    })
  }
  return owned
};

export const getNftOnSale = async (user, marketplace, sro721) => {
  const nftOwned = []
  const balance = await sro721.balanceOf(user.fullAddress)
  for (let i = 0; i < balance; i++) {
    nftOwned.push(await sro721.tokenOfOwnerByIndex(user.fullAddress, i).then((result) => result.toString()))
  }

  const onSale = [];
  for (const nft of nftOwned) {
    if(await marketplace.isOnSale(SRO721Address, nft)){
      const metadata = await sro721.getNftById(nft);
      const saleId = await marketplace.getSaleId(SRO721Address, nft)
      const sale = await marketplace.getSale(saleId)
      const data = await userData(metadata.author.toLowerCase());
      const url = await sro721.tokenURI(nft);
      const isLiked = await getLikedNft(user.fullAddress, nft, sro721)
      onSale.push({id: nft, metadata: {...metadata, url: url, isLiked: isLiked}, sale: {...sale, price: ethers.utils.formatEther(sale.price)}, creator: data, owner: user})
    }
  }
  return onSale
};

export const fetchLastNftOnSale = async(sro721, sale) => {
  try {
    const metadata = await sro721.getNftById(sale.nftId)
    const url = await sro721.tokenURI(sale.nftId);
    const creatorData = await userData(metadata.author.toLowerCase());
    const owner = await sro721.ownerOf(sale.nftId);
    const ownerData = await userData(owner.toLowerCase())
    return {id: sale.nftId.toString(), metadata: {...metadata, url: url}, sale: {...sale, price: ethers.utils.formatEther(sale.price)}, owner: ownerData, creator: creatorData}
  } catch (e){
    console.error(e)
  }
}
const getLikedNft = async (user, id, sro721) => {
  const isLiked = await sro721.isLiked(user, id);
  return isLiked;
};

export const userData = async (address) => {
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
};

