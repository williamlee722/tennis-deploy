import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll'
import '../../css/navbar.css'
import Logo from '../../images/logo';
import { useLocation } from 'react-router-dom'
import {Squash as Hamburger} from 'hamburger-react';

var style_nav;

function Navbar() {
    const [show, setShow] = useState(true);
    const [isOpen, setOpen] = useState(false);
    
    if(isOpen === false){
      style_nav ="hide-nav";
    }else{
      style_nav ="show-nav";
    }
  
    const setClose = () => {
      setOpen(false);
    }
    
    const controlNavbar = () => {
      if (window.scrollY > 700) {
        setShow(false);
      } else {
        setShow(true);
      }
    };  
  
    useEffect(() => {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }, []);
  
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  
    const { pathname } = useLocation();
    if (pathname !== '/')
      return null;

  return (
    <div className={`nav ${show && 'nav_show'}`}>
        <nav className='nav-body'>
          <div className='mobile-nav'>
            <Link to='home' spy={true} smooth={true} offset={0} duration={500} onClick={setClose}><div className='app-logo'><Logo/></div></Link>
            <div className='hamburger' ><Hamburger color='black' direction='left' size={25} toggled={isOpen} toggle={setOpen}/></div>
          </div>
          <div className={`nav-area ${style_nav}`}>
            <ul className='main'>
                <li><Link to='about' activeClass="active" spy={true} smooth={true} offset={-165} duration={500} onClick={setClose}>About Us</Link></li>
                <li><Link to='lessons' activeClass="active" spy={true} smooth={true} offset={-65} duration={500} onClick={setClose}>Lessons</Link></li>
                <li><a href='/'>Store</a></li>
                <li><Link to='contact' activeClass="active" spy={true} smooth={true} offset={-50} duration={500} onClick={setClose}>Contact</Link></li>
            </ul>
            <ul className='sub'>
                <li><a href='/login'>Login</a></li>
                <li><a href='/register'>Register</a></li>
            </ul>   
          </div>
        </nav>
    </div>
  )
}

export default Navbar