import { useContext } from 'react';
import { useUser } from '../context/UserContext';
import { Web3Context } from "web3-hooks";



export const UserData = () => {
  const [ web3State ] = useContext(Web3Context);
  const { userState } = useUser();

  const data = {
    address: web3State.account.substr(0, 6) + "..." + web3State.account.substr(-4),
    id: userState.profile.id,
    username: userState.profile.username,
    bio: userState.profile.bio,
    url: userState.profile.url,
    twitterUsername: userState.profile.twitterUsername,
    portfolio: userState.profile.portfolio,
    avatar: userState.profile.avatar !== null ? `https://ipfs.io/ipfs/${userState.profile.avatar}` : null,
  }
  
  return data
}