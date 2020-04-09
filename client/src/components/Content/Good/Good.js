import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import './Good.css';
import './Good-media.css';

export class Good extends Component {


  render(props) {
    //console.log(this.props);

    return (
        <div className={`goods__elem ${this.props.cat}`} style={props}>
          <div className="goods__block">

            <h4 className=" goods__elem-title">{this.props.good}</h4>
            <p className="goods__elem-parag">
              {this.props.descr}
            </p>
            <div className="goods__elem-bg"></div>
            <img className="goods__elem-img" src={`/uploads/${this.props.img.filename}`} alt={this.props.alt} />
            <span className="goods__elem-price">{this.props.cost}</span>

            {/* <Link to={this.props.href}>
              <span className="goods__elem-btn">Buy now</span>
            </Link> */}

            <a href={this.props.href} className="goods__elem-btn">Buy now</a>

          </div>
        </div>
      )
  }
}

export default Good;
