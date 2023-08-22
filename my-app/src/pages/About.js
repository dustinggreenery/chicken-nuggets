import React from "react";
import "./About.css";
import Header from "../components/header";


function App() {
    return (
        <div className="About">
            <Header />
            <header className="About-header">
                <header className="About-title-color">
                    <p className="About-title">About us!</p>
                </header>
                <p className="About-subheading">Chicken Nuggets first started when our founder, Matthias, saw the injustice in the purchaser-vendor relationship.</p>
            </header>
        </div>
    );
}

export default App;