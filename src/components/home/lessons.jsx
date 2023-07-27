import React from 'react'
import '../../css/lessons.css'
import private1 from '../../images/private1.jpg'
import private2 from '../../images/private2.jpg'

function Lessons() {
  return (
    <div className='body lessons' id='lessons'>
        <div className='lessons-container'>
          <p className='lessons-title'><span>PRIVATE LESSONS</span></p>
          <div className='lessons-desc'>
            <img className='lessons-img' src={private1} alt='private lesson'/>
            <p className='lessons-description'><span>Private lessons are given to members on a reservation bases. Members will have access to the reservation system once the member have been verified by the coach.</span></p>
          </div>
          <div className='lessons-desc'>
            <p className='lessons-description'><span>Private lessons include lessons to children and adults from intermediate level to expert level.</span></p>
            <img className='lessons-img' src={private2} alt='private lesson'/>
          </div>
        </div>
    </div>
  )
}

export default Lessons