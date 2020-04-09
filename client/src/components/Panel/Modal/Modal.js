import React, { Component } from 'react';

import "./Modal.css";

export class Modal extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: null
    };
  }


  updateState = async (e, id, updatePost, closeModal) => {
    e.preventDefault();

    const formData = new FormData(document.querySelector('.form-update-type'));

    const cat = document.getElementById('modal-cat').value,
          name = document.getElementById('modal-name').value,
          descr = document.getElementById('modal-descr').value,
          href = document.getElementById('modal-href').value,
          cost = document.getElementById('modal-cost').value;

      if(cat && name && descr && href && cost) {

        await this.setState({
          ...this.state,
          data: formData
        });
  

        // sending state up to Panel.js
        updatePost(this.state.data, id);
        closeModal();
      }
  }


  render(props) {

    return (
      <form className="edit-form form-update-type" action="/" method="PUT" encType="multipart/form-data">
          
        <div className="form-group">
          <label className="form-label" htmlFor="modal-cat">Catigory of a product:</label>
          <input className="form-input" id="modal-cat" name="cat" type="text" defaultValue={this.props.item.cat}></input>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="modal-name">Name of a product:</label>
          <input className="form-input" id="modal-name" name="name" type="text" defaultValue={this.props.item.name}></input>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="modal-descr">Description of a product:</label>
          <textarea className="form-area form-input" id="modal-descr" name="descr" type="text" defaultValue={this.props.item.descr} />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="modal-img">Image of a product:</label>
          <input className="form-input" id="modal-img" name="img" type="file"></input>
          <p>Currently used image: {this.props.item.img.originalname}</p>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="modal-href">Link for the marketplace of a product:</label>
          <input className="form-input" id="modal-href" name="href" type="text" defaultValue={this.props.item.href}></input>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="modal-cost">Cost of a product:</label>
         <input className="form-input" id="modal-cost" name="cost" type="number" defaultValue={this.props.item.cost}></input>
        </div>

        <div className="form-group btn-group">
          <button onClick={(e) => { this.updateState(e, this.props.item._id, this.props.updatePost, this.props.closeModal); }} className="modal-btn" type="submit">Change</button>

          <button className="modal-btn" onClick={this.props.closeModal}>Close modal</button>
        </div>
      </form>
    );
  }
}

export default Modal;
