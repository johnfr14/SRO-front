import React from "react";
import ReactDOM from "react-dom";
import { Web3Provider } from "web3-hooks";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import { UserContextProvider } from "./context/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Web3Provider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </Web3Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
