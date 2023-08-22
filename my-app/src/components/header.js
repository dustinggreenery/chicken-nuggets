
import "./header.css";
import { ConnectButton } from "web3uikit";
import React from 'react';

const OptionsMenu = [
    {
        title: 'New Contract',
        path: '/Contract'
    }, 
    {
        title: 'Find Contract',
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
                <a className={"Header-title"} href={"/"}>Chicken Nuggets</a>
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
