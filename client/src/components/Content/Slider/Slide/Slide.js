import React, { Component } from 'react';

export class Slide extends Component {
  render(props) {
    return (
      <div className="slider__elem">
        <div className="slider__elem-content">
          <h4 className="slider__elem-title">{this.props.good}</h4>
          <p className="slider__elem-parag">{this.props.descr}</p>

          {
            this.props.href ?
              <a href={this.props.href} className="slider__elem-link">More</a>
            :
              null
          }
        </div>
    
        <div className="slider__elem-bg"></div>

        <div className="slider__image">
          <img className="slider__image-img" src={this.props.src} alt={this.props.alt} />
        </div>
      </div>
    );
  }
}

export default Slide;
