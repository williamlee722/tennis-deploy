import React from 'react'
import { Link } from 'react-scroll'
import '../../css/footer.css'
import phone from '../../images/phone.svg'
import email from '../../images/email.svg'
import { useLocation } from 'react-router-dom'

function Footer() {
    const { pathname } = useLocation();
    if (pathname !== '/')
    return null;
  return (
    <div className='footer'>
        <div className='footer-body'>
            <div className='footer-main'>
                <div className='footer-container'>
                    <div className='footer-col-1'>
                        <Link className='footer-title' to='home' activeClass="active" spy={true} smooth={true} offset={-65} duration={500}><span>JJTENNIS</span></Link>
                    </div>
                    <div className='footer-col-2'>
                        <ul>
                            <li><Link to='lessons' activeClass="active" spy={true} smooth={true} offset={-65} duration={500}>LESSONS</Link></li>
                            <li><a href='/login'>LOGIN</a></li>
                            <li><a href='/register'>REGISTER</a></li>
                        </ul>
                    </div>
                    <div className='footer-col-3'>
                        <p><span><a href='tel:13104300390'><img src={phone} alt='phone'/></a></span></p>
                        <p><span><a href='mailto: jongjin@gmail.com'><img src={email} alt='email'/></a></span></p>
                    </div>
                </div>
            </div>
        </div>
        <p className='copyright'>&copy;COPYRIGHT JJTENNIS 2023. All Rights Reserved</p>
    </div>
  )
}

export default Footer