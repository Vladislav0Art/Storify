import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import './NewGood.css';
import './NewGood-media.css';

export class NewGood extends Component {

  render(props) { 
    return (
      <div className={`newgoods__elem ${this.props.cat}`}>
        <div className="newgoods__block">
            <h4 className="newgoods__elem-title">{this.props.good}</h4>
            <p className="newgoods__elem-parag">
              {this.props.descr}        
            </p>
            <div className="newgoods__elem-bg"></div>
            <img className="newgoods__elem-img" src={`/uploads/${this.props.img.filename}`} alt={this.props.alt} />

            {/* <Link to={this.props.href}>
              <span className="newgoods__elem-btn">{this.props.cost}</span>
            </Link> */}

            <a href={this.props.href} className="newgoods__elem-btn">{`Buy it for ${this.props.cost}`}</a>

        </div>
      </div>
    );
  }
}

export default NewGood;
