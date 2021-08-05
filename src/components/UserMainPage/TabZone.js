import { useState } from "react";
import { Tab } from "@headlessui/react";

import { Noitems } from "./index";
import { Card } from "../index";

import "../../css/userTab.css";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TabZone() {
  let [categories] = useState({
    On_sale: [
      {
        id: 1,
        name: "On sale",
        component: <Card />,
      },
    ],
    Owned: [
      {
        id: 1,
        name: "Owned",
        component: "",
      },
    ],
    Created: [
      {
        id: 1,
        name: "Created",
        component: <Noitems />,
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
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel key={idx} className={classNames("text-white")}>
              <ul>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="relative p-3 rounded-md hover:bg-coolGray-100"
                  >
                    <h3 className="text-sm font-medium leading-5">
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
}
