import React, { Component } from 'react';
import axios from 'axios';
import uuidv1 from 'uuid/v1';

import Menu from '../Menu/Nav/Menu';
import SliderNews from '../Slider/Slider/Slider';
import NewGood from '../NewGood/NewGood';
import Good from '../Good/Good';
import Cat from '../Cat/Cat';
import Footer from '../../Footer/Footer';
import Error from '../Error/Error';

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goods: [],
      sortedGoods: [],
      slides: [],
      cats: [],
      err: undefined,
      isLoaded: false,
      isSorted: false
    }
  }

  // making request after rendering
  componentDidMount = () => {

    // getting goods from api
    axios.get('/api/goods')
      .then(res => {
        const cats = [];
        const checked = {};
        
        // extracting unique cats from all items
        res.data.forEach((item, index) => {
          if(checked[item.cat] === undefined) {
            checked[item.cat] = true;
            cats.push(item.cat);
          }
        });

        this.setState({
          ...this.state,
          goods: res.data,
          cats: cats,
          isLoaded: true
        });
      
      })
      .catch(err => {
        this.setState({
          ...this.state,
          err: err
        });

      });


      // getting slides from api
      axios.get('api/slides')
        .then(res => {
          const slides = [];

          res.data.forEach((slide) => {
            slides.push(slide);
          });

          this.setState({
            ...this.state,
            slides: slides
          });

        })
        .catch(err => {
          this.setState({
            ...this.state,
            err: err
          });
        })

  }

  // sort method for cats
  sortByCat = (catNameId, activeCatSel, catsSel) => {
    // cleaning all cats of active selector 
    const cats = document.querySelectorAll(catsSel);
    for(let i = 0; i < cats.length; i++) {
      cats[i].classList.remove(activeCatSel);
    }

    // setting for the chosen cat the active selector
    document.getElementById(catNameId).classList.add(activeCatSel);

    // if the clear-item was chosen
    if(catNameId === "__all__") {

      this.setState({
        ...this.state,
        isSorted: false
      });
    }
  
    else {

      // getting matched items
      const sortedGoods = this.state.goods.filter((item) => item.cat === catNameId);

      this.setState({
        ...this.state,
        isSorted: true,
        sortedGoods
      });

    }

  }

  // extracting items from state to 'new goods' section
  renderNewGoods = () => {
    const newGoods = [];
    const goods = this.state.goods;

    for(let i = 0; i < goods.length && i < 4; i++) {
      newGoods.push(goods[i]);
    }

    return newGoods;
  }

  // if content is loading render loading message
  checkLoading = () => {
    if(this.state.isLoaded === false && this.state.err === undefined) {
      return false;
    }
    else if(this.state.isLoaded === true && this.state.err === undefined) {
      return true;
    }
  }

  // if err has occured return true
  checkError = () => {
    if(this.state.err !== undefined) {
      return true;
    } 
    else {
      return false;
    }
  }

  render(props) {
    return (
      <div>
        <Menu />
  
        <section className="section">  
          <div className="container">
            <h2 className="section__title" id="special">Special Offers</h2>
            {
              this.state.slides.length > 0 ?
              <SliderNews slides={this.state.slides} />
              :
                <p>No offers yet!</p>
            }
          </div>
        </section>
  
        <section className="section goods">
          <div className="container">
            <h2 className="section__title" id="brand-new">New products</h2>

            <div className="align-center">
              { !this.checkLoading() ? <span className="loading-msg">Content is loading...</span> : null }
            </div>

           
            <div className="align-center">
            { this.checkError() ? <Error message="Server error, try to reload the web site" /> : null }
            </div>

            <div className="goods__content">

              {
                this.checkLoading() ?
                this.renderNewGoods().map((item) => {
                  return (
                    <NewGood
                    key={item._id}
                    cat={item.cat}
                    good={item.name}
                    descr={item.descr}
                    img={item.img}
                    alt="Product on Storify"
                    cost={`${item.cost}$`}
                    href={item.href}
                  />
                  );
                }) 
                : null
              }
  
            </div>
          </div>
        </section>
  
        <section className="section">
  
          <div className="container">
            <h2 className="section__title" id="all">Product Catalog</h2>
  
            <div className="cats__container" id="cats-container">

              <Cat defaultClass="cats__elem-active" key={'__all__'} nameId="__all__" content="all products" sortFunc={this.sortByCat} />
              {
                
                this.state.cats.map((cat) => {
                  return <Cat defaultClass="" nameId={cat} content={cat} key={uuidv1()} sortFunc={this.sortByCat}/>
                })

              }

            </div>
              
            <div className="align-center">
              { !this.checkLoading() ? <span className="loading-msg">Content is loading...</span> : null }
            </div>
          
            <div className="align-center">
            { this.checkError() ? <Error message="Server error, try to reload the web site" /> : null }
            </div>

            <div className="goods__content">

              {
                this.checkLoading() ?
                
                 (this.state.isSorted === true ?

                  this.state.sortedGoods.map((item) => {
                    return (

                        <Good
                          key={item._id}
                          cat={item.cat}
                          good={item.name}
                          descr={item.descr}
                          img={item.img}
                          alt="Product on Storify"
                          cost={`${item.cost}$`}
                          href={item.href}
                        />
                      
                    );
                  })

                  : 

                  this.state.goods.map((item) => {
                    return (
                        <Good
                          key={item._id}
                          cat={item.cat}
                          good={item.name}
                          descr={item.descr}
                          img={item.img}
                          alt="Product on Storify"
                          cost={`${item.cost}$`}
                          href={item.href}
                        />
                    );
                  }))

                : null
              }

            </div>
  
          </div>
  
        </section>
  
        <footer className="section">
          <div className="container">
            <Footer />
          </div>
        </footer>
  
      </div>
    
    );
  }
}

export default Main;
