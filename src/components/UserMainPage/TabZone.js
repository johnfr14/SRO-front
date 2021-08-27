import { useEffect, useState, useContext } from "react";
import { Tab } from "@headlessui/react";

import { CardList } from "./index";

import "../../css/userTab.css";
import { useContracts } from "../../context/ContractContext";
import { Web3Context } from "web3-hooks";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const defaultData = {
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/en/e/ed/Leonardo_%28Teenage_Mutant_Ninja_Turtles%29.jpg",
    name: "Leonardo",
    price: "0.05",
    unity: "ETH",
    linkToNFT: "/",

    linkToProfilCollection: "/",
    linkToProfilCreator: "/",
    linkToProfilOwner: "/",

    userIconCollection: userTest,
    userIconCreator: cardMediaTest,
    //userIconOwner: "",

    tipDataAdressCollection: "SRO",
    tipDataAdressCreator: "0x0000000000000000000000000000000000000000",
    tipDataAdressOwner: "0x0000000000000000000000000000000000000000",
  }

export default function TabZone() {
  const { sro721 } = useContracts()
  const [web3state] = useContext(Web3Context)
  const [nft, setNft] = useState(defaultData)

  console.log('nft owned', nftOwned)
  console.log('nft created', nftCreated)


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
    // nftCreated
    const getNftCreated = async() => {
      const nftIds = await sro721.getNftCreatedByAddress(web3state.account).then((result) => result.toString().split(','));
      const nfts = [];
      if (nftIds[0] !== '') {
        for(let i = 0; i < nftIds.length; i++ ) {
          nfts.push({id: nftIds[i], metadata: await sro721.getNftById(nftIds[i]),  })
        };
      }
      setNft({nftOwned: nftOwned, nftCreated: nftCreated, user: userState})
    }
    const getNftOwned = async() => {
      const totalSupply = await sro721.totalSupply()
      const Owned = []
      for(let i = 1; i <= totalSupply; i++) {
        const owner = await sro721.ownerOf(i).then(address => address.toLowerCase())
        if(owner === web3state.account) {
          Owned.push(await sro721.getNftById(i))
        }
      }
      setNftOwned(Owned)
    }

    if(sro721 !== null) {
      getNftCreated()
      getNftOwned()
    }
  }, [sro721, web3state.account])

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
          {nft &&
          <Tab.Panel>
            <CardList idx={1} data={nft} />
          </Tab.Panel>}
          {nft &&
          <Tab.Panel>
            <CardList idx={2} data={nft} />
          </Tab.Panel>}
          {nft &&
          <Tab.Panel>
            <CardList idx={3} data={nft}  />
          </Tab.Panel>}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
