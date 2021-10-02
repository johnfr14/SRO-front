import {createContext, useContext, useEffect, useReducer} from "react"
import { Web3Context } from "web3-hooks";
import { userReducer } from "../reducers/userReducer"
import { userData } from "../dataFunctions/fetchData";
import { useContracts } from './ContractContext'
import { ethers } from 'ethers'

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
  const { xsro } = useContracts()
  const [web3State] = useContext(Web3Context);  
  const [userState, dispatch] = useReducer(userReducer, initialState)
  
  useEffect(() => {
    const getAccount = async () => {
      try {
        dispatch({type: 'FETCH_INIT'})
        const data = await userData(web3State.account)
        const balanceXsro = await  xsro.balanceOf(web3State.account)
        dispatch({
          type: 'UPDATE_PROFILE',
          payload: {...data,
            balance: {
              xsro: ethers.utils.formatEther(balanceXsro),
              eth: web3State.balance.toString(),
            }
          }
        })
        } catch (e) {
          dispatch({type: 'FETCH_FAILURE', payload: e.message})
        }
    }
    if(!web3State.account.startsWith("0x000")) {
        getAccount()
    }
  }, [web3State, xsro]) 

  
  return (
    <UserContext.Provider value={{ userState, dispatch }}>
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

