import React from "react";
import "./App.css";
import Header from "./components/header";
import ContractButton from "./components/contracts-button";

function App() {
    return (
        <div className="App">
            <Header />
            <header className="App-header">
                <p className="App-title">Make a new contract</p>
                <p className="App-subheading">Fast. Secure. Easy. Delicious?</p>
                <ContractButton />
            </header>
        </div>
    );
}

export default App;
