import axios from "axios";

// nft created
export const getNftCreated = async(userAddress, sro721, creatorData) => {
  const nftIds = await sro721.getNftCreatedByAddress(userAddress).then((result) => result.toString().split(','));
  const nfts = [];
  if (nftIds[0] !== '') {
    for(let i = 0; i < nftIds.length; i++ ) {
      const ownerOf = await sro721.ownerOf(i + 1 ).then(address => address.toLowerCase())
      const profileOfOwner = await axios.get(`https://bdd-sro.herokuapp.com/user/${ownerOf}`)
      const owner = UserData(profileOfOwner.data.payload, ownerOf)
      const metadata = await sro721.getNftById(i)
      const url = await sro721.tokenURI(i + 1)
      nfts.push({id: nftIds[i], metadata: {...metadata, url: url}, owner: owner, creator: creatorData})
    };
  }
  return nfts 
}
// nft owned
export const getNftOwned = async(userAddress, sro721, ownerData) => {
  const totalSupply = await sro721.totalSupply()
  const owned = []
  for(let i = 1; i <= totalSupply; i++) {
    const owner = await sro721.ownerOf(i).then(address => address.toLowerCase())
    if(owner === userAddress) {
      const metadata = await sro721.getNftById(i)
      const result = await axios.get(`https://bdd-sro.herokuapp.com/user/${metadata.author.toLowerCase()}`)
      const data = UserData(result.data.payload, metadata.author)
      const url = await sro721.tokenURI(i)
      owned.push({id: i, metadata: {...metadata, url: url}, owner: ownerData, creator: data })
    }
  }
  return owned
}

export const getNftOnSale = async() => {
  const OnSale = null;
  return OnSale
}


export const UserData = (user, address) => {
 
  const data = {
    address: address.substr(0, 6) + "..." + address.substr(-4),
    id: user.profile.id,
    username: user.profile.username,
    bio: user.profile.bio,
    url: user.profile.url,
    twitterUsername: user.profile.twitterUsername,
    portfolio: user.profile.portfolio,
    avatar: user.profile.avatar,
  }
  
  return data
}