import React, { Component, Fragment } from 'react';

import './Error.css'

export class Error extends Component {
  render(props) {
    return (
      <Fragment>
        <p className="error-msg">{this.props.message}</p>
      </Fragment>
    );
  }
}

export default Error;
