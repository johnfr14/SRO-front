import { Switch, Route, Redirect } from "react-router-dom";
import { BuyNft, CreateErc721, EditProfile, HomePage, OwnedPage, SaleNft } from "./pages";
import "./App.css";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/user" component={OwnedPage} />
        <Route exact path="/settings" component={EditProfile} />
        <Route exact path="/create/erc721" component={CreateErc721} />
        <Route exact path="/token/buy" component={BuyNft} />
        <Route exact path="/token/sale" component={SaleNft} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
