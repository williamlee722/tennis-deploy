import React, { useState } from 'react'
import '../../css/contact.css'

function Contact() {
  return (
    <div className='body contact' id='contact'>
        <div className='contact-container'>
          <p className='contact-title'><span>CONTACT US</span></p>
          <div className='contact-desc2'>
            <p className='contact-sel'><span><a href='tel:3104300390'>Phone: (123) 456 7890</a></span><span><a href='mailto:jongjin@gmail.com'>Email: info@jjtennis.com</a></span></p>
          </div>
          <div className='contact-desc'>
            <p ><span>Private lessons are accepted only through online bookings. Drop-ins will not be accepted.                                                          All our custom-goods related inqueries will be accepted through online methods only.</span></p>
            <p><span>For more information, please contact us through the email or phone number provided.                                                           We appologize for the inconvience and thank you for your support.</span></p>
          </div>
        </div>
    </div>
  )
}

export default Contact