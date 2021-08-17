import axios from "axios";
import {createContext, useContext, useEffect, useReducer} from "react"
import { Web3Context } from "web3-hooks";
import { userReducer } from "../reducers/userReducer"

export const UserContext = createContext()

const initialState = {
  user: {
    address: "",
    name: "",
    bio: "",
    url: "",
    twitterName: "",
    portfolio: "",
  },
  loading: false,
  error: "",
}

export const UserContextProvider = ({children}) => {
  const [web3State] = useContext(Web3Context);  
  const [userState, dispatch] = useReducer(userReducer, initialState)

  useEffect(() => {
    const getAccount = async () => {
        try {
          const result = await axios.get(`http://localhost:5000/user_by_address/${web3State.account}`)
          console.log(result)
          dispatch({type: 'FETCH_SUCCESS', payload: result})
        } catch (e) {
            dispatch({type: 'FETCH_FAILURE', payload: e.message})
        }
    }

    if(!web3State.account.startsWith("0x000")) {
        dispatch({type: 'FETCH_INIT'})
        getAccount()
    }
  }, [web3State.account]) 

  
  return (
    <UserContext.Provider value={{ userState, dispatch}}>
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
