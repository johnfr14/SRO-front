import { useState } from "react";
import { Tab } from "@headlessui/react";

import "../../css/userTab.css";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TabZoneBuyNft = () => {
  let [categories] = useState({
    Owners: [
      {
        id: 1,
        name: "Owners",
        component: "Coming Soon",
      },
    ],
    Bids: [
      {
        id: 1,
        name: "Bids",
        component: "Coming Soon",
      },
    ],
    Details: [
      {
        id: 1,
        name: "Détails",
        component: "Coming Soon",
      },
    ],
    History: [
      {
        id: 1,
        name: "History",
        component: "Coming Soon",
      },
    ],
  });

  return (
    <div className="">
      <Tab.Group>
        <div className="flex">
          <Tab.List className="hPGlPu lhlpVE space-x-14 pl-4 pr-4 ">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "py-2.5   leading-5 font-medium text-white rounded-lg w-auto relative",
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
            <Tab.Panel
              key={idx}
              className={classNames("text-white text-center py-2")}
            >
              <ul>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="relative p-3 rounded-md hover:bg-coolGray-100"
                  >
                    <h3 className="text-sm text-purple-500 font-medium leading-5">
                      {post.component}
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
};

export default TabZoneBuyNft;
