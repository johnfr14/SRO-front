import { useEffect, useState, useContext, useRef } from "react";
import { Tab } from "@headlessui/react";

import { CardList } from "./index";

import "../../css/userTab.css";
import { useContracts } from "../../context/ContractContext";
import { Web3Context } from "web3-hooks";
import { ethers } from "ethers";
import useIsMounted from '../../hooks/useIsMounted'

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TabZone() {
  const { sro721 } = useContracts()
  const isMounted = useRef(useIsMounted())
  const [web3state] = useContext(Web3Context)
  const [nftOnSale, setNftOnSale] = useState(null)
  const [nftOwned, setNftOwned] = useState(null)
  const [nftCreated, setNftCreated] = useState(null)
  
  console.log('nft created', nftCreated)
  console.log('nft owned',nftOwned)

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
        component: <CardList nft={nftCreated} />,
      },
    ],
  });

  useEffect(() => {
    // nftCreated
    const getNftCreated = async() => {
      const nftIds = await sro721.getNftCreatedByAddress(web3state.account).then((result) => result.toString().split(','));
      const nfts = [];
      if (nftIds.length > 0) {
        for(let i = 0; i < nftIds.length; i++ ) {
          nfts.push({id: nftIds[i], metadata: await sro721.getNftById(nftIds[i])})
        };
      }
      setNftCreated(nfts)
    }
    // nftOwned
    const getNftOwned = async() => {
      const totalSupply = await sro721.totalSupply()
      const Owned = []
      for(let i = 1; i <= totalSupply; i++) {
        const owner = await sro721.ownerOf(i).then(address => address.toLowerCase())
        if(owner === web3state.account) {
          console.log(i)
          Owned.push(await sro721.getNftById(i))
        }
      }
      setNftOwned(Owned)
    }

    if(sro721 !== null) {
      getNftCreated()
      getNftOwned()
    }
  }, [sro721, web3state.account, isMounted])

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
          {nftOnSale && <Tab.Panel>
            <CardList nft={nftOnSale} />
          </Tab.Panel>}
          {nftOwned && <Tab.Panel>
            <CardList nft={nftOwned} />
          </Tab.Panel>}
          {nftCreated && <Tab.Panel>
            <CardList nft={nftCreated} />
          </Tab.Panel>}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
