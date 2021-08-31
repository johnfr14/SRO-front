import { Switch, Route, Redirect } from "react-router-dom";
import {
  NftPage,
  CreateErc721,
  EditProfile,
  HomePage,
  OwnedPage,
} from "./pages";
import "./App.css";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/user/:address" component={OwnedPage} />
        <Route exact path="/settings" component={EditProfile} />
        <Route exact path="/create/erc721" component={CreateErc721} />
        <Route exact path="/:adresse:id" component={NftPage} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
