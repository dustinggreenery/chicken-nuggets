import React from "react";
import "./App.css";
import Header from "./components/header";
import ContractButton from "./components/contracts-button";
import { Link } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Header />
            <header className="App-header">
                <p className="App-title">Make a new contract</p>
                <p className="App-subheading">Fast. Secure. Easy. Delicious?</p>
                <Link to ='/contract'>
                    <ContractButton />
                </Link>
            </header>
        </div>
    );
}

export default App;
