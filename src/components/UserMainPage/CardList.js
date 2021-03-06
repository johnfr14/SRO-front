import { lazy, useEffect, useState, memo } from "react";
import { useUser } from '../../context/UserContext'
import { onSale, onSaleOwned, created, owned, nfts } from "../../TheGraph/api";

const Card = lazy(() => import("../Card/Card"));
const Noitems = lazy(() => import("../UserMainPage/Noitems"));

const CardList = ({ idx, marketPlace }) => {
  const { userState } = useUser()
  const [data, setData] = useState([]);
  const [dataNFTS, setNfts] = useState([]);

  useEffect(() => {
    nfts().then(result => setNfts(result))
    switch (idx) {
      case 0: 
        onSale().then(result => setData(result))
        break
      case 1:
        onSaleOwned(userState.data.fullAddress).then(result => setData(result))
        break
      case 2:
        owned(userState.data.fullAddress).then(result => setData(result))
        break
      case 3:
        created(userState.data.fullAddress).then(result => setData(result))
        break
      default:
    }
  }, [idx, userState.data.fullAddress]);
  return (
    <>
      {data.length > 0 && dataNFTS.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-x-10 xl-grid-cols-4 gap-y-5 gap-x-6 ">
          {data.map((data, index) => (
            <Card key={index} idx={idx} user={userState.data} data={data} dataNFTS={dataNFTS} />
          ))}
        </div>
      ) : (
        <Noitems marketPlace={marketPlace} />
      )}
    </>
  );
};

export default memo(CardList);
