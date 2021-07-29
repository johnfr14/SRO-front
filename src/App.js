import { Switch, Route, Redirect } from "react-router-dom";
import { HomePage } from "./pages";
import "./App.css";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
