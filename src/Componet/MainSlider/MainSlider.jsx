import React from 'react';
import mainSlide from '../../assets/slider.jpg'; 
import mainSlide2 from '../../assets/slider2.jpg'; 
import mainSlide3 from '../../assets/slider3.jpg'; 
import mainSlide4 from '../../assets/slider4.jpg'; 
import mainSlide5 from '../../assets/slider5.jpg'; 
import mainSlide6 from '../../assets/slider6.jpg'; 
import Slider from "react-slick";

export default function MainSlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true
    };
  return (
    <>
      <div className="row mt-8">
        <div className="w-3/4">
        <Slider {...settings}>
        <img src={mainSlide3} alt="Main Slide" className='w-full h-[400px]' />
        <img src={mainSlide4} alt="Main Slide" className='w-full h-[400px]' />
        <img src={mainSlide5} alt="Main Slide" className='w-full h-[400px]' />
        <img src={mainSlide6} alt="Main Slide" className='w-full h-[400px]' />
                    </Slider>
        </div>
        <div className="w-1/4">
        <img src={mainSlide2} alt="Main Slide" className='w-full h-[200px] mainSlide2 ' />
          <img src={mainSlide} alt="Main Slide" className='w-full  h-[200px] mainSlide2' />

        </div>
      </div>
    </>
  );
}
