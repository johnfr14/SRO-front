import React from "react";
import ReactDOM from "react-dom";
import { Web3Provider } from "web3-hooks";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Web3Provider>
        <App />
      </Web3Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);