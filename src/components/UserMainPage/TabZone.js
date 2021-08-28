import { useEffect, useState, useContext } from "react";
import { Tab } from "@headlessui/react";

import { CardList } from "./index";

import "../../css/userTab.css";
import { useContracts } from "../../context/ContractContext";
import { getNftCreated, getNftOnSale, getNftOwned } from "../../data/fetchData"
import { Web3Context } from "web3-hooks";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// const defaultData = {
//     imgUrl:
//       "https://upload.wikimedia.org/wikipedia/en/e/ed/Leonardo_%28Teenage_Mutant_Ninja_Turtles%29.jpg",
//     name: "Leonardo",
//     price: "0.05",
//     unity: "ETH",
//     linkToNFT: "/",

//     linkToProfilCollection: "/",
//     linkToProfilCreator: "/",
//     linkToProfilOwner: "/",

//     // userIconCollection: userTest,
//     // userIconCreator: cardMediaTest,
//     //userIconOwner: "",

//     tipDataAdressCollection: "SRO",
//     tipDataAdressCreator: "0x0000000000000000000000000000000000000000",
//     tipDataAdressOwner: "0x0000000000000000000000000000000000000000",
//   }

export default function TabZone({ user }) {
  const { sro721 } = useContracts()
  const [web3State] = useContext(Web3Context);
  const [nft, setNft] = useState({created: {}})

  let [categories] = useState({
    On_sale: [
      {
        id: 1,
        name: "On sale",
        component: <CardList />,
      },
    ],
    Owned: [
      {
        id: 1,
        name: "Owned",
        component: <CardList />,
      },
    ],
    Created: [
      {
        id: 1,
        name: "Created",
        component: <CardList />,
      },
    ],
  });
  
  useEffect(() => {
      const fetchNft = async() => {
      const nftOnSale = await getNftOnSale( )
      const nftOwned = await getNftOwned(web3State.account, sro721, user)
      const nftCreated = await getNftCreated(web3State.account, sro721, user)
      console.log(nftOwned)
      setNft({onSale: nftOnSale, owned: nftOwned, created: nftCreated})
    }
    
    if(sro721 !== null) {
      fetchNft()
    }
  }, [sro721, user, web3State.account])

  return (
    <div className="w-full px-2 py-16 sm:px-0">
      <Tab.Group>
        <div className="flex">
          <Tab.List className="hPGlPu lhlpVE">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "py-2.5 text-sm leading-5 font-medium text-white rounded-lg w-auto relative",
                    "",
                    selected
                      ? "selected"
                      : "text-gray-600 hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                <span>{category}</span>
                <div className="cAtPEH" />
              </Tab>
            ))}
          </Tab.List>
        </div>

        <Tab.Panels className="mt-2">
      
          <Tab.Panel>
            {nft.onSale && <CardList idx={1} data={nft.onSale} />}
          </Tab.Panel>
       
          <Tab.Panel>
            {nft.owned && <CardList idx={2} data={nft.owned} />}
          </Tab.Panel>
         
          <Tab.Panel>
            {nft.created && <CardList idx={3} data={nft.created} />}
          </Tab.Panel>
          
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
