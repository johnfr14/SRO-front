import { lazy, useEffect, useState, memo } from "react";
import { useContracts } from "../../context/ContractContext";
import { fetchCardList } from "../../dataFunctions/fetchData";

const Card = lazy(() => import("../Card/Card"));
const Noitems = lazy(() => import("../UserMainPage/Noitems"));

const CardList = ({ idx, user, marketPlace }) => {
  const { marketplace, sro721 } = useContracts();
  const [data, setData] = useState([]);
  const [fetch, setFetch] = useState(true);


  useEffect(() => {
    if (sro721 !== null && marketplace !== null && fetch) {
      fetchCardList(idx, user, sro721, marketplace).then(result => setData(result));
      setFetch(false)
    }
  }, [idx, user, sro721, marketplace, fetch]);

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
