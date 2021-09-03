import axios from "axios";

// nft created
export const getNftCreated = async (user, sro721) => {
  const nftIds = await sro721
    .getNftCreatedByAddress(user.fullAddress)
    .then((result) => result.toString().split(","));
  const nfts = [];
  if (nftIds[0] !== "") {
    for (let i = 0; i < nftIds.length; i++) {
      const ownerOf = await sro721
        .ownerOf(nftIds[i])
        .then((address) => address.toLowerCase());
      const owner = await userData(ownerOf);
      const metadata = await sro721.getNftById(nftIds[i]);
      const url = await sro721.tokenURI(nftIds[i]);
      nfts.push({
        id: nftIds[i],
        metadata: { ...metadata, url: url },
        owner: owner,
        creator: user,
      });
    }
  }
  return nfts;
};
// nft owned
export const getNftOwned = async (user, sro721) => {
  const totalSupply = await sro721.totalSupply();
  const owned = [];
  for (let i = 1; i <= totalSupply; i++) {
    const owner = await sro721
      .ownerOf(i)
      .then((address) => address.toLowerCase());
    if (owner === user.fullAddress) {
      const metadata = await sro721.getNftById(i);
      const data = await userData(metadata.author.toLowerCase());
      const url = await sro721.tokenURI(i);
      owned.push({
        id: i,
        metadata: { ...metadata, url: url },
        owner: user,
        creator: data,
      });
    }
  }
  return owned;
};

export const getNftOnSale = async () => {
  const OnSale = [];
  return OnSale;
};

export const getLikedNft = async (user, id, sro721) => {
  const isLiked = await sro721.hasLiked(user, id);
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
