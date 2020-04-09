import React, { Component } from 'react';

class SlideUpdateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: null,
      error: null
    };
  }

  
  updateState = async (e, id, updateSlide, closeModal) => {
    e.preventDefault();

    const formData = new FormData(document.querySelector('.form-update-type-slide'));

    const title = document.getElementById('title').value,
          descr = document.getElementById('descr').value,
          alt = document.getElementById('alt').value;

    
      if(title && descr && alt) {
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
        updateSlide(this.state.form, id);
        // closing modal
        closeModal();
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
      <form className="edit-form form-update-type-slide" action="/" method="PUT" encType="multipart/form-data">
            
        <div className="form-group">
          <label className="form-label" htmlFor="title">Update title of a slide:</label>
          <input className="form-input" id="title" name="title" type="text" defaultValue={this.props.item.title} required></input>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="descr">Update description of a slide:</label>
          <input className="form-input" id="descr" name="descr" type="text" defaultValue={this.props.item.descr} required></input>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="img">Upload image of a product:</label>
          <input className="form-input" id="img" name="img" type="file" required></input>
          <p>Currently used image: {this.props.item.img.originalname}</p>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="alt">Update alternative text for a slide:</label>
          <input className="form-input" id="alt" name="alt" type="text" defaultValue={this.props.item.alt} required></input>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="href">Update link to the resourse for a slide:</label>
          <input className="form-input" id="href" name="href" defaultValue={this.props.item.href} type="text"></input>
        </div>

        {
          this.state.error ? 
            <div className="form-error">
              <span className="form-error-msg">{this.state.error}</span>
            </div>
          :
            null
        }

        <button onClick={(event) => { this.updateState(event, this.props.item._id, this.props.onClick, this.props.closeModal) }} className="submit-btn" type="submit">Update</button>
      </form>
    );
  }
}

export default SlideUpdateForm;
