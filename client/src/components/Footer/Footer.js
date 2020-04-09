import React, { Component } from 'react';

import './Footer.css';
import './Footer-media.css';

export class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="footer__content">

          <div className="footer__title">
            <a href="/">Storify</a>
          </div>

          <div className="footer__links">
            <a href="https://vk.com/" className="footer__link"><i className="fab fa-vk"></i></a>
            <a href="https://www.facebook.com/" className="footer__link"><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/" className="footer__link"><i className="fab fa-instagram"></i></a>
          </div>

          <div className="footer__nav">
            <ul className="footer__menu">
              <li className="footer__menu-item"><a href="#special">Special Offers</a></li>
              <li className="footer__menu-item"><a href="#brand-new">New Products</a></li>
              <li className="footer__menu-item"><a href="#all">Product Catalog</a></li>
            </ul>
          </div>

        </div>

      </div>
    );
  }
}

export default Footer;
