import React, { Component } from 'react';

import './Form.css';
import './Form-media.css';

export class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: null,
      error: null
    };
  }

  updateState = async (e, createPost) => {
    e.preventDefault();

    const formData = new FormData(document.querySelector('.form-post-type'));

    const cat = document.getElementById('cat').value,
          name = document.getElementById('name').value,
          descr = document.getElementById('descr').value,
          img = document.getElementById('img').files[0],
          href = document.getElementById('href').value,
          cost = document.getElementById('cost').value;

    
      if(cat && name && descr && img && href && cost) {
        await this.setState({
          ...this.state,
          form: formData
        });
    
        // sending state up to Panel.js
        createPost(this.state.form);
      }
      // if the fields are empty
      else {
        this.setState({
          ...this.state,
          error: 'Fields must be filled!'
        });
      }
  }

  render(props) {
    return (
      <form className="edit-form form-post-type" action="/" method="POST" encType="multipart/form-data">
        
        <div className="form-group">
          <label className="form-label" htmlFor="cat">Write catigory of a product:</label>
          <input className="form-input" id="cat" name="cat" type="text" required></input>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="name">Write name of a product:</label>
          <input className="form-input" id="name" name="name" type="text" required></input>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="descr">Write description of a product:</label>
          <textarea className="form-area form-input" id="descr" name="descr" type="text" required></textarea>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="img">Upload image of a product:</label>
          <input className="form-input" id="img" name="img" type="file" required></input>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="href">Put link for the marketplace of a product:</label>
          <input className="form-input" id="href" name="href" type="text" required></input>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="cost">Create cost of a product:</label>
          <input className="form-input" id="cost" name="cost" type="number" required></input>
        </div>

        {
          this.state.error ? 
            <div className="form-error">
              <span className="form-error-msg">{this.state.error}</span>
            </div>
          :
            null
        }

        <button onClick={(event) => { this.updateState(event, this.props.onClick) }} className="submit-btn" type="submit">Post</button>
      </form>
    );
  }
}

export default Form;
