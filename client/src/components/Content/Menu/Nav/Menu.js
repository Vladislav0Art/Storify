import React, { Component } from 'react';
import Item from '../Item/Item'

import './Menu.css';
import './Menu-media.css';

export class Menu extends Component {

  state = {
    isOpened: false
  };

  toggleMenu = () => {
    this.setState({
      isOpened: !this.state.isOpened
    });
  }

  render() {
    return (
      <div className="nav__wrapper">
        <div className="container">
          <div className="top__wrapper">
              <div className="top__logo">
                  <h3 className="top__text"><a href="/">STORIFY</a></h3>
              </div>

              <div className="trigger" onClick={ this.toggleMenu }>
                  <span className="trigger__elem"></span>
                  <span className="trigger__elem"></span>
                  <span className="trigger__elem"></span>
              </div>

              <nav className={this.state.isOpened ? 'nav nav-show': 'nav'}>
                  
                <div className="closer" onClick={ this.toggleMenu }>
                    <span className="closer__elem"></span>
                    <span className="closer__elem"></span>
                </div>

                <div className="nav__menu">
                    <Item 
                      className="nav__item" 
                      href="#special" 
                      iconClass="fas fa-home" 
                      content="Special Offers"
                     />
                    
                    <Item 
                      className="nav__item" 
                      href="#brand-new" 
                      iconClass="fas fa-list-alt"
                      content="New Products"
                    />
                    
                    <Item 
                      className="nav__item" 
                      href="#all" 
                      iconClass="fas fa-clipboard-check"
                      content="Product Catalog"
                    />
                    
                </div>

              </nav>
              
            </div>
          </div>
      </div>

    );
  }
}

export default Menu;
