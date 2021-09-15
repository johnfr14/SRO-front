import { useState, lazy } from "react";
import { Tab } from "@headlessui/react";

import "../../css/userTab.css";

const CardList = lazy(() => import("./CardList"));

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
              <CardList idx={1} user={user} />
          </Tab.Panel>

          <Tab.Panel>
              <CardList idx={2} user={user} />
          </Tab.Panel>

          <Tab.Panel>
              <CardList idx={3} user={user} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
