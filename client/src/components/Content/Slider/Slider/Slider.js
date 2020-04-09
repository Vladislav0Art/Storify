import React, { Component } from "react";
import Slider from "react-slick";
import Slide from "../Slide/Slide";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './Slider.css';
import './Slider-media.css'

export class SliderNews extends Component {
  render(props) {
    const settings = {
      dots: true,
      arrows: false,
      autoplay: true,
      infinite: false,
      pauseOnFocus: true,
      speed: 1300,
      autoplaySpeed: 4000,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <div className="slider">
        <Slider {...settings}> 

          {

            this.props.slides.map(slide => {
              return (
              <Slide
                key={slide._id}  
                good={slide.title}
                descr={slide.descr}
                href={slide.href}
                src={`slides/${slide.img.filename}`}
                alt={slide.alt}
              />)
            })

          }

        </Slider>
      </div>
    );
  }
}

export default SliderNews;
