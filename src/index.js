import React from "react";
import ReactDOM from "react-dom";
import { Web3Provider } from "web3-hooks";
import App from "./App";
import "./index.css";
import { UserContextProvider } from "./context/UserContext";
import { ContractContextProvider } from "./context/ContractContext";


ReactDOM.render(
  <React.StrictMode>
    <Web3Provider>
      <ContractContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </ContractContextProvider>
    </Web3Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
