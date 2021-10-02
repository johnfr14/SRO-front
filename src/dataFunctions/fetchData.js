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

// General
const getLikedNft = async (user, id, sro721) => {
  const isLiked = await sro721.isLiked(user, id);
  return isLiked;
};

// NFT NftPage
export const fetchNft = async(sro721, marketplace, id) => {
  let sale = {status: '0'};
  if (await marketplace.isOnSale(SRO721Address, id)) {
    const saleId = await marketplace.getSaleId(SRO721Address, id)
    const result = await marketplace.getSale(saleId)
    sale = {
      status: result[0].toString(),
      nftId: result[1].toString(),
      saleId: saleId,
      price: ethers.utils.formatEther(result[2]),
      seller: result[3],
      collection: result[4],
    }
  } 
  const fetchNft = await sro721.getNftById(id)
  const owner = await sro721.ownerOf(id)
  const ownerData = await userData(owner.toLowerCase())
  const uri = await sro721.tokenURI(id)

  return {data: {...fetchNft, url: uri}, owner: ownerData, sale: sale}
}

// NFT OwnedPage
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

// Home(MarketPlace)
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

// ipfs
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