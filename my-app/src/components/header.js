
import "./header.css";
import { ConnectButton } from "web3uikit";
import React from 'react';
import logo from "../ch.png"

const OptionsMenu = [
    {
        title: 'New Order',
        path: '/Contract'
    }, 
    {
        title: 'Find Order',
        path: '/Find'
    },
    {
        title: `About us`,
        path: '/About'
    }

]

function Header(){
    return ( 
        <div className="Header">
        
                 <img className="logo" width="50" height="50"  src={logo} />
                <a className={"Header-title"} href={"/"}>
                    <p>Chicken Nuggets</p>
                </a>
                <ConnectButton moralisAuth={false} className={"Connect-button"}/>
                <ul className={"Option-menu"} >
                    {OptionsMenu.map((item, index) => {
                        return(
                            <li key={index}>
                                <a className={"Options-links"} href={item.path} >
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
      
        </div>
    );   
}

export default Header;
