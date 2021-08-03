import { Switch, Route, Redirect } from "react-router-dom";
import { HomePage, OwnedPage } from "./pages";
import "./App.css";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/user" component={OwnedPage} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
