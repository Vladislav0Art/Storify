import React, { Component } from 'react';

class SlideForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: null,
      error: null
    };
  }


  
  updateState = async (e, createSlide) => {
    e.preventDefault();

    const formData = new FormData(document.querySelector('.form-post-type-slide'));

    const title = document.getElementById('title').value,
          descr = document.getElementById('descr').value,
          img = document.getElementById('img').files[0],
          alt = document.getElementById('alt').value;

    
      if(title && descr && img && alt) {
        await this.setState({
          ...this.state,
          form: formData
        });

        document.getElementById('title').value = '';
        document.getElementById('descr').value = '';
        document.getElementById('img').value = '';
        document.getElementById('alt').value = '';
        document.getElementById('href').value = '';
    
        // sending state up to Panel.js
        createSlide(this.state.form);
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
      <form className="edit-form form-post-type-slide" action="/" method="POST" encType="multipart/form-data">
          
        <div className="form-group">
          <label className="form-label" htmlFor="title">Write title of a slide:</label>
          <input className="form-input" id="title" name="title" type="text" required></input>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="descr">Write description of a slide:</label>
          <input className="form-input" id="descr" name="descr" type="text" required></input>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="img">Upload image of a product:</label>
          <input className="form-input" id="img" name="img" type="file" required></input>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="alt">Create alternative text for a slide:</label>
          <input className="form-input" id="alt" name="alt" type="text" required></input>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="href">Put link to the resourse for a slide:</label>
          <input className="form-input" id="href" name="href" type="text"></input>
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

export default SlideForm;
