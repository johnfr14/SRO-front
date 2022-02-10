import { lazy, useEffect, useState, memo } from "react";
import { useUser } from '../../context/UserContext'
import { getNftOnSale, onSaleOwned, created, owned, nfts } from "../../TheGraph/api";

const Card = lazy(() => import("../Card/Card"));
const Noitems = lazy(() => import("../UserMainPage/Noitems"));

const CardList = ({ idx, marketPlace }) => {
  const { userState } = useUser()
  const [cardList, setCardList] = useState([]);
  const [allNfts, setAllNfts] = useState([]);

  useEffect(() => {
    nfts().then(result => setAllNfts(result))
    switch (idx) {
      case 0: 
        getNftOnSale().then(result => setCardList(result))
        break
      case 1:
        onSaleOwned(userState.data.fullAddress).then(result => setCardList(result))
        break
      case 2:
        owned(userState.data.fullAddress).then(result => setCardList(result))
        break
      case 3:
        created(userState.data.fullAddress).then(result => setCardList(result))
        break
      default:
    }
  }, [idx, userState.data.fullAddress]);
  return (
    <>
      {cardList.length > 0 && allNfts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-x-10 xl-grid-cols-4 gap-y-5 gap-x-6 ">
          {cardList.map((data, index) => (
            <Card key={index} idx={idx} user={userState.data} card={data} nftMetadata={allNfts.find(nft => nft.id === data.nftId.toString())} />
          ))}
        </div>
      ) : (
        <Noitems marketPlace={marketPlace} />
      )}
    </>
  );
};

export default memo(CardList);
