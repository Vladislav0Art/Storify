import React, { Component } from 'react';

import './Cat.css';
import './Cat-media.css';

export class Cat extends Component {
  render(props) {
    return (
      <div 
        onClick={() => this.props.sortFunc(this.props.nameId, 'cats__elem-active', '.cats__elem')} 
        className={ `${(this.props.defaultClass !== '' ? this.props.defaultClass : '')} cats__elem` } 
        id={this.props.nameId}
      >{this.props.content}</div>
    );
  }
}

export default Cat;
