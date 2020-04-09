import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Login.css';

export class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      login: null,
      password: null,
      err: null,
      success: false
    }
  }


  // sending data to server for login
  sendData = () => {

    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    this.setState({
      ...this.state,
      login,
      password
    });

    axios.post('/secret/adminlogin', {
      login,
      password
    })
      .then(res => {
        console.log(res);

        this.setState({
          ...this.state,
          success: true
        });

      })
      .catch(err => {
        console.error(err);

        this.setState({
          ...this.state,
          err: err.response.data
        });

      });

  }


  render(props) {
    return (
      <div className="container">

        <div className="login-wrapper">
          <Link to="/">
            <div className="login-logo">Storify</div>
          </Link>

          <div className="login">
            <div className="login-form" >

              <div className="login-group">           
                <label htmlFor="login">Login:</label>
                <input id="login" name="login" type="text" required></input>
              </div>

              <div className="login-group">           
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" required></input>
              </div>

              <input onClick={this.sendData} className="login-submit" type="submit" required></input>

            </div>

            <div className="login-error">{this.state.err ? this.state.err : null}</div>

            {
              this.state.success ? 
              <Link to="/secret/adminpanel">
                <button className="admin-btn">Go to admin panel</button>
              </Link>
              : 
              null
            }
      
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
