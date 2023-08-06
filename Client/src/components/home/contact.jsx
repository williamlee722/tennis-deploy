import React from 'react'
import '../../css/home.css'

function Contact() {
  return (
    <div className='body home-info' id='contact'>
        <div className='home-info-container'>
          <p className='home-info-title'><span>CONTACT US</span></p>
          <div className='home-info-contact'>
            <p><span><a href='tel:3104300390'>Phone: (123) 456 7890</a></span><span><a href='mailto:jongjin@gmail.com'>Email: info@jjtennis.com</a></span></p>
          </div>
          <div className='home-info-description'>
            <p><span>Private lessons are accepted only through online bookings. Drop-ins will not be accepted.<br/>All our custom-goods related inqueries will be accepted through online methods only.</span></p>
            <p><span>For more information, please contact us through the email or phone number.<br/>We appologize for the inconvience and thank you for your support.</span></p>
          </div>
        </div>
    </div>
  )
}

export default Contact