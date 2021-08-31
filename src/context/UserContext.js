import {createContext, useContext, useEffect, useReducer, useState} from "react"
import { Web3Context } from "web3-hooks";
import { userReducer } from "../reducers/userReducer"
import { UserData } from "../data/fetchData";
import IPFS from "ipfs-core";
const pinataSDK = require('@pinata/sdk');


export const UserContext = createContext()

const initialState = { 
  data: {
    address: null,
    name: null,
    bio: null,
    url: null,
    twitterName: null,
    portfolio: null,
    avatar: null,
  },
  loading: false,
  error: "",
}

export const UserContextProvider = ({children}) => {
  const [web3State] = useContext(Web3Context);  
  const [userState, dispatch] = useReducer(userReducer, initialState)
  const [ipfs, setIpfs] = useState(null)
  const [pinata, setPinata] = useState(null)
  
  useEffect(() => {
    const getAccount = async () => {
      try {
        dispatch({type: 'FETCH_INIT'})
        const data = UserData(web3State.account)
        dispatch({type: 'FETCH_SUCCESS', payload: data})
        const ipfs = await IPFS.create()
        const pinata = pinataSDK(process.env.REACT_APP_PINATA_API_KEY, process.env.REACT_APP_PINATA_SECRET_KEY);
        
        setPinata(pinata)
        setIpfs(ipfs)
        } catch (e) {
          dispatch({type: 'FETCH_FAILURE', payload: e.message})
        }
    }
    if(!web3State.account.startsWith("0x000")) {
        getAccount()
    }
  }, [web3State.account]) 

  
  return (
    <UserContext.Provider value={{ userState, dispatch, ipfs, pinata}}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error(`You try to use UserContext outside of its provider.`)
  }
  return context
}

