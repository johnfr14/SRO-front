import { lazy, useEffect, useState, memo, useCallback } from "react";
import { useContracts } from "../../context/ContractContext";
import {
  getNftCreated,
  getNftOwned,
  getNftOnSale,
} from "../../dataFunctions/fetchData";

const Card = lazy(() => import("../Card/Card"));
const Noitems = lazy(() => import("../UserMainPage/Noitems"));

const CardList = ({ idx, user, marketPlace }) => {
  const { marketplace, sro721 } = useContracts();
  const [data, setData] = useState([]);
  const [fetch, setFetch] = useState(true);

  const fetchData = useCallback(
    async (index) => {
      if (sro721 !== null && marketplace !== null && fetch) {
        setFetch(false);
        switch (index) {
          case 0:
            const totalSales = await marketplace.totalSale();
            const sales = [];
            for (let i = totalSales; i > 0; i--) {
              sales.push(marketplace.getSale(i));
            }

            const datas = [];
            await Promise.all(sales).then((result) =>
              result.forEach((element) => {
                return element[0] === 1
                  ? datas.push({
                      status: element[0],
                      nftId: element[1].toString(),
                      price: element[2],
                      seller: element[3],
                      collections: element[4],
                    })
                  : "";
              })
            );
            return setData(datas);
          case 1:
            return setData(await getNftOnSale(user, marketplace, sro721));
          case 2:
            return setData(await getNftOwned(user, sro721));
          case 3:
            return setData(await getNftCreated(user, sro721));
          default:
            return "error";
        }
      }
    },
    [marketplace, sro721, user, fetch]
  );

  useEffect(() => {
    fetchData(idx);
  }, [idx, fetchData]);

  return (
    <>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-x-10 xl-grid-cols-4 gap-y-5 gap-x-6 ">
          {data.map((data, index) => (
            <Card key={index} idx={idx} user={user} data={data} />
          ))}
        </div>
      ) : (
        <Noitems marketPlace={marketPlace} />
      )}
    </>
  );
};

export default memo(CardList);
