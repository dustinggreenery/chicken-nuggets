import { Component } from 'react';
import './header.css'
import ContractButton from './contracts-button';

class Header extends Component{
    render(){
        return (
        <div className="Header">
            <header className="Header-header">
                <p className="Header-title" >
                Chicken Nuggets
                </p>
                <ContractButton />

            </header>
        </div>
        );
    }
}
  
  
  export default Header;