import { createContext, useContext } from "react"
import { useContract } from "web3-hooks"; 
import { MarketplaceAddress, MarketplaceAbi } from '../contracts/Marketplace';
import { SRO721Address, SRO721Abi } from "../contracts/SRO721";
import { xSROAddress, xSROAbi } from "../contracts/xSRO";

export const ContractContext = createContext()

export const ContractContextProvider = ({children}) => {
  const marketplace = useContract(MarketplaceAddress, MarketplaceAbi)
  const sro721 = useContract(SRO721Address, SRO721Abi)
  const xsro = useContract(xSROAddress, xSROAbi)
  
  return (
    <ContractContext.Provider value={{ marketplace, sro721, xsro }}>
      {children}
    </ContractContext.Provider>
  )
}

export const useContracts = () => {
  const context = useContext(ContractContext)
  if (context === undefined) {
    throw new Error(`You try to use UserContext outside of its provider.`)
  }
  return context
}

