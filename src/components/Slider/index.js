import React, { useState, useEffect } from 'react';
import Swiper from 'swiper';
import "swiper/dist/css/swiper.css";
import { SliderContainer } from './style'


const Slider = (props) => {
  const [sliderSwiper, setSliderSwiper] = useState(null);
  const { bannerList } = props;

  useEffect(() => {
    if (bannerList.length && !sliderSwiper) {
      let newSliderSwiper = new Swiper(".slider-container", {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: { el: '.swiper-pagination' }
      })
      setSliderSwiper(newSliderSwiper)
    };

  }, [bannerList.length, sliderSwiper]);

  return (
    <SliderContainer>
      <div className="before"></div>
      <div className="slider-container">
        <div className="swiper-wrapper">
          {
            bannerList.map((slider, index) => (
              <div className="swiper-slide" key={slider.imageUrl + index}>
                <div className="slider-nav">
                  <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                </div>
              </div>
            ))
          }
        </div>
        <div className="swiper-pagination"></div>
      </div>


    </SliderContainer>

  );
}

export default React.memo(Slider);
