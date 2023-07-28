import React, { useState } from 'react';
import '../css/home.css'
import Navbar from '../components/home/navbar'
import Hero from '../components/home/hero'
import About from '../components/home/about'
import Lessons from '../components/home/lessons'
import Contact from '../components/home/contact'

function Home() {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 500){
      setVisible(true)
    } 
    else if (scrolled <= 500){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };
  window.addEventListener('scroll', toggleVisible);

  return (
    <div>
    <div className='backtotop' onClick={scrollToTop} style={{display: visible ? 'block' : 'none', position: 'fixed', right: 25, bottom: 20, zIndex: 10000, cursor: 'pointer'}}></div>
      <Navbar/>
      <Hero/>
      <About/>
      <Lessons/>
      <Contact/>
    </div>
  )
}

export default Home