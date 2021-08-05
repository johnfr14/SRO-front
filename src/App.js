import { Switch, Route, Redirect } from "react-router-dom";
import { EditProfile, HomePage, OwnedPage } from "./pages";
import "./App.css";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/user" component={OwnedPage} />
        <Route exact path="/settings" component={EditProfile} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
