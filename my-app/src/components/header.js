import { Component } from "react";
import "./header.css";
import { ConnectButton } from "web3uikit";

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <header className="Header-header">
                    <p className="Header-title">Chicken Nuggets</p>
                    <ConnectButton moralisAuth={false} />
                </header>
            </div>
        );
    }
}

export default Header;
