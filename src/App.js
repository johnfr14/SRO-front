import { Switch, Route, Redirect } from "react-router-dom";
import { CreateErc721, EditProfile, HomePage, OwnedPage } from "./pages";
import test from "./pages/test"
import "./App.css";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/user" component={OwnedPage} />
        <Route exact path="/settings" component={EditProfile} />
        <Route exact path="/create/erc721" component={CreateErc721} />
        <Route exact path="/test" component={test} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
