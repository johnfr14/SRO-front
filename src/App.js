import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import ModWrongNetwork from "./components/Modal/ModWrongNetwork";

import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const OwnedPage = lazy(() => import("./pages/OwnedPage"));
const EditProfile = lazy(() => import("./pages/EditProfile"));
const CreateErc721 = lazy(() => import("./pages/CreateErc721"));
const NftPage = lazy(() => import("./pages/NftPage"));

function App() {
  return (
    <>
      <ModWrongNetwork />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/user/:address" component={OwnedPage} />
            <Route exact path="/settings" component={EditProfile} />
            <Route exact path="/create/erc721" component={CreateErc721} />
            <Route exact path="/:adresse/:id" component={NftPage} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
