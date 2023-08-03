import React from 'react'

import '../../css/slider.css'
import hero1 from '../../images/kids lesson.jpg'

function Slider() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  
  return (
    <div className='slider' id='home'>
        <div className="swiper-img">
          <img src={hero1} alt="slide 1" />
        </div>
    </div>
  )
}

export default Slider