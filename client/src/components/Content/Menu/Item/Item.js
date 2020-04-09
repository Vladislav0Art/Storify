import React, { Component } from 'react';

export class Item extends Component {
  render(props) {
    return (
    <div className={this.props.className}>
      <a href={this.props.href}>
        <i className={this.props.iconClass}></i> { this.props.content }
      </a>
    </div>
    );
  }
}

export default Item;
