import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Tab } from "@headlessui/react";

import { CardList } from "./index";

import "../../css/userTab.css";
import { useContracts } from "../../context/ContractContext";
import { UserData } from "../../data/UserData"
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
    // nft created
    const getNftCreated = async() => {
      const nftIds = await sro721.getNftCreatedByAddress(web3State.account).then((result) => result.toString().split(','));
      const nfts = [];
      if (nftIds[0] !== '') {
        for(let i = 0; i < nftIds.length; i++ ) {
          const ownerOf = await sro721.ownerOf(i + 1 ).then(address => address.toLowerCase())
          const profileOfOwner = await axios.get(`https://bdd-sro.herokuapp.com/user/${ownerOf}`)
          const owner = UserData(profileOfOwner.data.payload, ownerOf)
          const metadata = await sro721.getNftById(i)
          const url = await sro721.tokenURI(i + 1)
          nfts.push({id: nftIds[i], metadata: {...metadata, url: url}, owner: owner, creator: user})
        };
      }
      return nfts 
    }
    // nft owned
    const getNftOwned = async() => {
      const totalSupply = await sro721.totalSupply()
      const owned = []
      for(let i = 1; i <= totalSupply; i++) {
        const owner = await sro721.ownerOf(i).then(address => address.toLowerCase())
        if(owner === web3State.account) {
          const metadata = await sro721.getNftById(i)
          const result = await axios.get(`https://bdd-sro.herokuapp.com/user/${metadata.author}`)
          const data = UserData(result.data.payload, metadata.author)
          const url = await sro721.tokenURI(i)
          owned.push({id: i, metada: {...metadata, url: url}, owner: user, creator: data })
        }
      }
      return owned
    }
    // nft on sale (soon)
    const getNftOnSale = async() => {
      const OnSale = null;
      return OnSale
    }
    
    const fetchNft = async() => {
      const nftOnSale = await getNftOnSale()
      const nftOwned = await getNftOwned()
      const nftCreated = await getNftCreated()
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

        {Object.keys(nft.created).length === 3 && <Tab.Panels className="mt-2">
      
          <Tab.Panel>
            <CardList idx={1} data={nft.onSale} />
          </Tab.Panel>
       
          <Tab.Panel>
            <CardList idx={2} data={nft.owned} />
          </Tab.Panel>
         
          <Tab.Panel>
            <CardList idx={3} data={nft.created}  />
          </Tab.Panel>
          
        </Tab.Panels>}
      </Tab.Group>
    </div>
  );
}
