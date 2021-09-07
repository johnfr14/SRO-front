import { TipProfil } from "./index";
import "../../css/card.css";

const ProfilList = ({
  tipDataAdressCollection,
  userIconCollection,
  linkToProfilCollection,
  tipDataAdressCreator,
  userIconCreator,
  linkToProfilCreator,
  tipDataAdressOwner,
  userIconOwner,
  linkToProfilOwner,
}) => {
  console.log(tipDataAdressCreator);
  const tip_DataAdress_Collection = "Collection: " + tipDataAdressCollection;
  const tip_DataAdress_Creator = "Creator:" + tipDataAdressCreator;

  const tip_DataAdress_Owner = "Owner:" + tipDataAdressOwner;

  return (
    <>
      <TipProfil
        tipData={tip_DataAdress_Collection}
        userIcon={userIconCollection}
        linkTo={linkToProfilCollection}
      />
      <TipProfil
        tipData={tip_DataAdress_Creator}
        userIcon={userIconCreator}
        linkTo={linkToProfilCreator}
      />
      <TipProfil
        tipData={tip_DataAdress_Owner}
        userIcon={userIconOwner}
        linkTo={linkToProfilOwner}
      />
    </>
  );
};

export default ProfilList;
