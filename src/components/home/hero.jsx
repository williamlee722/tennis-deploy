import React from 'react'
import { Link } from 'react-scroll'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

import '../../css/slider.css'
import hero1 from '../../images/kids lesson.jpg'
import arrow from '../../images/bottom_arrow.svg'

function Slider() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  
  return (
    <div className='slider' id='home'>
        <div className='arrow'><Link to='about' activeClass="active" spy={true} smooth={true} offset={-165} duration={500}><img src={arrow} alt='arrow' /><br/><span>Scroll Down for More</span></Link></div>
        <div className="swiper-img">
          <img src={hero1} alt="slide 1" />
        </div>
    </div>
  )
}

export default Slider