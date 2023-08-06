import React from 'react'
import '../../css/home.css'
import private1 from '../../images/private1.jpg'
import private2 from '../../images/private2.jpg'

function Lessons() {
  return (
    <div className='body home-info' id='lessons'>
        <div className='home-info-container'>
          <p className='home-info-title'><span>PRIVATE LESSONS</span></p>
            <div className='home-info-grid-container'>
                <img className='home-info-grid home-info-img' src={private1} alt='private lesson'/>
                <p className='home-info-grid home-info-desc'><span>Private lessons are given to members on a reservation bases. Members will have access to the reservation system once the member have been verified by the coach.</span></p>
                <img className='home-info-grid home-info-img2' src={private2} alt='private lesson'/>
                <p className='home-info-grid home-info-desc2'><span>Want to know your level?<br/>Take a short survey and find out!.</span><br/><a href='/survey'>Survey!</a></p>
            </div>
        </div>
    </div>
  )
}

export default Lessons