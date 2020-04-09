import React, { Component } from 'react';
import axios from 'axios';

import Command from '../Command/Command';
import Item from '../Item/Item';
import Form from '../Form/Form';
import Modal from '../Modal/Modal';
import SlideItem from '../SlideItem/SlideItem';
import SlideForm from '../SlideForm/SlideForm';
import SlideUpdateForm from '../SlideUpdateForm/SlideUpdateForm';

import './Panel.css';

export class Panel extends Component {
  constructor(props) {
    super(props);

    this.state = {
			goods: [],
			slides: [],
			err: null,
			success: null,
			formVisibility: false,
			slideFormVisibility: false,
			modalVisibility: false,
			modalSlideVisibility: false,
			modalItem: null,
			modalSlide: null
    };
  }
	
	// if button delete or update was pushed
  specifyClickForGoods = (e) => {
		const target = e.target;
		const item = target.parentNode;
		const container = item.parentNode;

		// finding the index of item in the container ('.items')
		let itemIndex = -1;
		for(let i = 0; i < container.children.length; i++) {
			if(container.children[i] === item) {
				itemIndex = i;
				break;
			}
		}
		
		// id of the item
		const itemId = this.state.goods[itemIndex]._id;

    if(target.classList.contains('delete')) {
			// path for the route
			const url = `/api/goods/${itemId}`;

			this.deletePost(url, itemId, itemIndex);

    }
    else if(target.classList.contains('update')) {
			// find item in the state
			const item = this.state.goods.find((elem) => {
				return elem._id.toString() === itemId.toString();
			});

			this.setState({
				...this.state,
				modalItem: item,
				modalItemIndex: itemIndex,
				modalVisibility: !this.state.modalVisibility
			});
    }
    else 
      return;

	}


	// --- METHODS FOR PRODUCTS ---

	// get all items from db
	getGoods = () => {
		axios.get('/api/goods')
			.then(res => {
				if(res.data.length === 0) {

					this.setState({
						...this.state,
						err: 'No products were found!'
					});

				} else {

					this.setState({
						...this.state,
						goods: res.data
					});

				}

			})
			.catch(err => {

				this.setState({
					...this.state,
					err: err.message
				});
				
			});
	}
		


	// it is passed to post-form and gets data for item
	createPost = (data) => {
		axios.post('/api/goods', data)
			.then((res) => {
				this.setState({
					...this.state,
					success: res.data,
					formVisibility: !this.state.formVisibility
				});

				// refreshing the goods array in the state after posting into the db
				this.getGoods();

			})
			.catch(err => {

				this.setState({
					...this.state,
					err: err.message
				});

			});

	}
	


	// updates post in the db
	updatePost = (data, id) => {
		const url = `/api/goods/${id}`;
		axios.put(url, data)
			.then((res) => {

				this.setState({
					...this.state,
					success: res.data
				});

				// refreshing the goods array in the state after updating the db
				this.getGoods();

			})
			.catch((err) => {

				this.setState({
					...this.state,
					err: err.message
				});

			});

	}


	
	// delete item from db
	deletePost = (url, id, itemIndex) => {
		axios.delete(url, { data: { id } })
			.then(res => {
				const newGoods = [];
				this.state.goods.forEach((item, index) => {
					if(index !== itemIndex) {
						newGoods.push(item);
					}
				});

        this.setState({
          ...this.state,
					success: res.data,
					goods: newGoods
				});
				
			})
			.catch(err => {

				this.setState({
          ...this.state,
          err: err.message
				});

			});
	}



	// --- METHODS FOR SLIDES ---

	specifyClickForSlides = (e) => {
		const target = e.target;
		const slide = target.parentNode;
		const container = slide.parentNode;

		// finding the index of slide in the container ('.slides')
		let slideIndex = -1;
		for(let i = 0; i < container.children.length; i++) {
			if(container.children[i] === slide) {
				slideIndex = i;
				break;
			}
		}
		
		// id of the slide
		const slideId = this.state.slides[slideIndex]._id;

    if(target.classList.contains('delete')) {
			// path for the route
			const url = `/api/slides/${slideId}`;

			this.deleteSlide(url, slideId, slideIndex);
    }
    else if(target.classList.contains('update')) {
			// find slide in the state
			const slideForUpdate = this.state.slides.find((elem) => {
				return elem._id.toString() === slideId.toString();
			});

			this.setState({
				...this.state,
				modalSlide: slideForUpdate,
				modalSlideVisibility: !this.state.modalSlideVisibility
			});
		}
		
    else return;
	}



	// getting all slides from db
	getSlides = () => {
		axios.get('/api/slides')
			.then(res => {

				if(res.data.length === 0) {
					this.setState({
						...this.state,
						err: 'No slides were found!'
					});
				}

				else {
					this.setState({
						...this.state,
						slides: res.data
					});
				}
			})
			.catch(err => {
				this.setState({
					...this.state,
					err: err.message
				});
			});
	}


	// creating new slide and push it to db
	createSlide = (data) => {
		axios.post('/api/slides', data)
			.then((res) => {
				this.setState({
					...this.state,
					success: res.data,
					slideFormVisibility: !this.state.slideFormVisibility
				});

				// refreshing the goods array in the state after posting into the db
				this.getSlides();

			})
			.catch(err => {

				this.setState({
					...this.state,
					err: err.message
				});

			});
	}


	// delete slide from db
	deleteSlide = (url, id, slideIndex) => {
		axios.delete(url)
		.then(res => {
			const newSlides = [];

			// updating state (all slides except the deleted one)
			this.state.slides.forEach((slide, index) => {
				if(index !== slideIndex) {
					newSlides.push(slide);
				}
			});

			this.setState({
				...this.state,
				success: res.data,
				slides: newSlides
			});
			
		})
		.catch(err => {

			this.setState({
				...this.state,
				err: err.message
			});

		});
	}


	updateSlide = (data, id) => {

		const url = `/api/slides/${id}`;
		axios.put(url, data)
			.then((res) => {
				this.setState({
					...this.state,
					success: res.data
				});

				// refreshing the goods array in the state after updating the db
				this.getSlides();

			})
			.catch((err) => {

				this.setState({
					...this.state,
					err: err.message
				});

			});

	}



	// show/close forms
	toggleForm = () => {
		this.setState({
			...this.state,
			formVisibility: !this.state.formVisibility
		});
	}

	toggleSlideForm = () => {
		this.setState({
			...this.state,
			slideFormVisibility: !this.state.slideFormVisibility
		});
	}

	closeSlideUpdateForm = () => {
		this.setState({
			...this.state,
			modalSlideVisibility: !this.state.modalSlideVisibility
		});
	}

	closeModal = () => {
		this.setState({
			...this.state,
			modalVisibility: !this.state.modalVisibility
		});
	}

  render(props) {
    return (
      <div className="container">

        <div className="commands">
          <h2 className="commands-title">Admin Panel:</h2>
            <div className="msg-block error-block">{ this.state.err ? this.state.err : null }</div>
            <div className="msg-block success-block">{ this.state.success ? this.state.success : null }</div>

            <Command onClick={this.getGoods} action="Get" descr="Get items" />
            <Command onClick={this.getSlides} action="Get" descr="Get slides" />
            <Command onClick={this.toggleForm} action={ this.state.formVisibility ? 'Close item modal' : 'Open item modal' } descr="Create and post new item" />
            <Command onClick={this.toggleSlideForm} action={ this.state.slideFormVisibility ? 'Close slide modal' : 'Open slide modal' } descr="Create and post new slide" />
        </div>

				<p>Form for creating new products:</p>
				{ this.state.formVisibility ? 
				 	<Form onClick={this.createPost} />
				 :
				 	null
				}


				<p>Form for creating new slides:</p>
				{ this.state.slideFormVisibility ? 
				 	<SlideForm onClick={this.createSlide} />
				 :
				 	null
				}


				{ this.state.modalSlideVisibility ? 
					<div className="modal-container">
						<SlideUpdateForm onClick={this.updateSlide} item={this.state.modalSlide} closeModal={this.closeSlideUpdateForm} />
					</div>
				 :
				 	null
				}


				 { this.state.modalVisibility ? 
				 		<div className="modal-container">
				 			<Modal updatePost={this.updatePost} item={this.state.modalItem} closeModal={this.closeModal} />
						</div>
					 :
						null
				 }
        
				
				<h3 className="section-title">All products:</h3>
        <div onClick={this.specifyClickForGoods} className="items">
          {
            this.state.goods.map((item) => {
              return <Item key={item._id} item={item} />
            })
          }
        </div>

				<h3 className="section-title">All slides:</h3>
				<div onClick={this.specifyClickForSlides} className="slides">
          {
            this.state.slides.map((item) => {
              return <SlideItem key={item._id} item={item} />
            })
          }
        </div>

      </div>
    );
  }
}

export default Panel;
