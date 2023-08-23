import React from "react";
import "./Contract.css";
import Header from "../components/header";
import ContractButton from "../components/contracts-button";


function App() {
    return (
        <div className="Contract-page">
          <Header />
          <header className="Contract-header">
              <ContractButton />
          </header>
        </div>
    );
}

export default App;