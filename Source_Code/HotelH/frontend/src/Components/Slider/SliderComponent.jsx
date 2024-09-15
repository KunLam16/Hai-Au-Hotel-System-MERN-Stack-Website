import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './SliderComponent.css'; 
import banner1 from '../Assets/banner1.png';
import banner2 from '../Assets/banner2.png';
import banner3 from '../Assets/banner3.png';
import banner4 from '../Assets/banner4.png';
import banner5 from '../Assets/banner5.png';

const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src={banner1} alt="" />
        </div>
        <div>
          <img src={banner2} alt="" />
        </div>
        <div>
          <img src={banner3} alt="" />
        </div>
        <div>
          <img src={banner4} alt="" />
        </div>
        <div>
          <img src={banner5} alt="" />
        </div>
      </Slider>
    </div>
  );
};

export default SliderComponent;