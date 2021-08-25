import { useEffect, useState, useContext, useRef } from "react";
import { Tab } from "@headlessui/react";

import { CardList } from "./index";

import "../../css/userTab.css";
import { useContracts } from "../../context/ContractContext";
import { Web3Context } from "web3-hooks";
import useIsMounted from '../../hooks/useIsMounted'

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TabZone() {
  const { sro721 } = useContracts()
  const isMounted = useRef(useIsMounted())
  const [web3state] = useContext(Web3Context)
  const [nftCreated, setNftCreated] = useState([])

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
    const getNft = async() => {
      console.log(await sro721.getNftCreatedByAddress(web3state.account).then((result) => result.toString().split(',')))
      const nftIds = await sro721.getNftCreatedByAddress(web3state.account).then((result) => result.toString().split(','));
      const nfts = [];
      if (nftIds.length > 0) {
        for(let i = 0; i < nftIds.length; i++ ) {
          console.log(nftIds[i])
          nfts.push({id: nftIds[i], metadata: await sro721.getNftById(nftIds[i])})
        };
      }
      console.log(nfts)
      setNftCreated(nfts)
    }
    if(sro721 !== null) {
      getNft()
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
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel key={idx} className={classNames("text-white")}>
              <ul>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="relative p-3 rounded-md hover:bg-coolGray-100"
                  >
                    <h3 className="text-sm font-medium leading-5">
                      {post.component || 0}
                    </h3>
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
