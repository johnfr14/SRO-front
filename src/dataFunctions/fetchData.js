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

//------------- General --------------//
const getLikedNft = async (user, id, sro721) => {
  try {
    const isLiked = await sro721.isLiked(user, id);
    return isLiked;
  } catch (error) {
    console.error(error.message)    
  }
};

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
export const fetchCardList = async (index, user, sro721, marketplace) => {
  
  try{
    switch (index) {
      case 0:
        //market place
        const totalSales = await marketplace.totalSale();
        const sales = [];
        for (let i = totalSales; i > 0; i--) {
          sales.push(marketplace.getSale(i));
        }
  
        const datas = [];
        await Promise.all(sales).then((result) =>
          result.forEach((element) => {
            return element[0] === 1
              ? datas.push({
                  status: element[0],
                  nftId: element[1].toString(),
                  price: element[2],
                  seller: element[3],
                  collections: element[4],
                })
              : "";
          })
        );
        return datas;
      case 1:
        //Tab on sale
        const tabOnSale = []
        const balance = await sro721.balanceOf(user.fullAddress)
        for (let i = 0; i < balance; i++) {
          tabOnSale.push(sro721.tokenOfOwnerByIndex(user.fullAddress, i).then((result) => result.toString()))
        }
  
        const onSales = [];
        await Promise.all(tabOnSale).then(async (tabOnSale) => {
          for (const nft of tabOnSale) {
            if (await marketplace.isOnSale(SRO721Address, nft)) {
              onSales.push({...defaultCardData, id: nft, owner: user})
            }
          }
        })  
        return onSales;
      case 2:
        //Tab owned
        const tabOwned = []
        const balanceOwner = await sro721.balanceOf(user.fullAddress);
        for (let i = 0; i < balanceOwner; i++) {
          tabOwned.push(sro721.tokenOfOwnerByIndex(user.fullAddress, i).then((result) => result.toString()))
        }
        const owned = [];
        await Promise.all(tabOwned).then(async (tabOwned) => {
          for (const nft of tabOwned) {
            if (await marketplace.isOnSale(SRO721Address, nft)) {
              owned.push({...defaultCardData, id: nft, owner: user})
            }
          }
        })
        return owned;
      case 3:
        //Tab created
        const tabCreated = [];
        await sro721.getNftByAuthorTotal(user.fullAddress).then( async(result) => {
          for (let i = 0; i < result; i++) {
            tabCreated.push(sro721.getNftByAuthorAt(user.fullAddress, i).then((result) => result.toString()));
          }
        })
        const created = []
        await Promise.all(tabCreated).then(async (tabCreated) => {
          for (const nft of tabCreated) {
            created.push({...defaultCardData, id: nft, owner: user})
          }
        })
        return created;
      default:
        return "error";
    }
  } catch (e) {
    console.error(e.message)
  }
}

export const fetchData = async (index, user, data, sro721, marketplace) => {
  try {
    switch (index) {
      case 0:
        return await fetchLastNftOnSale(sro721, data);
      case 1:
        return await getNftOnSale(user, data.id, marketplace, sro721);
      case 2:
        return await getNftOwned(user, data.id, sro721);
      case 3:
        return await getNftCreated(user, data.id, sro721);
      default:
        return "error";
    }
  } catch (error) {
    console.error(error.message)    
  }
}

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

export const getNftOnSale = async (user, id, marketplace, sro721) => {
  try {
    const metadata = await sro721.getNftById(id);
    const saleId = await marketplace.getSaleId(SRO721Address, id)
    const sale = await marketplace.getSale(saleId)
    const creator = await userData(metadata.author.toLowerCase());
    const url = await sro721.tokenURI(id);
    const isLiked = await getLikedNft(user.fullAddress, id, sro721)
    return {id: id, metadata: {...metadata, url: url, isLiked: isLiked }, sale: {...sale, price: ethers.utils.formatEther(sale.price)}, owner: user, creator: creator}
  } catch (error) {
    console.error(error.message)    
  }
};

export const getNftOwned = async (user, id, sro721) => {
  try{
    const metadata = await sro721.getNftById(id);
    const data = await userData(metadata.author.toLowerCase());
    const url = await sro721.tokenURI(id);
    const isLiked = await getLikedNft(user.fullAddress, id, sro721)
    return {...defaultCardData, id: id, metadata: { ...metadata, url: url, isLiked: isLiked }, owner: user, creator: data}
  } catch (error) {
    console.error(error.message)
  }
};

export const getNftCreated = async (user, id, sro721) => {
  try {
    const ownerOf = await sro721
    .ownerOf(id)
    .then((address) => address.toLowerCase());
    const owner = await userData(ownerOf);
    const metadata = await sro721.getNftById(id);
    const url = await sro721.tokenURI(id);
    const isLiked = await getLikedNft(user.fullAddress, id, sro721)
    return {...defaultCardData, id: id, metadata: { ...metadata, url: url, isLiked: isLiked }, owner: owner, creator: user}
  } catch (error) {
    console.error(error.message)    
  }
};

// src/pages/NftPage.js
export const fetchNft = async(sro721, marketplace, id) => {
  try {
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
  } catch (error) {
    console.error(error.message)
  }
}