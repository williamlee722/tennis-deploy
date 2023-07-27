import React, { useEffect, useState } from 'react'
import '../css/portal.css'
import '../css/calendar.css'
import Logo from '../images/logo'
import Calendar from 'react-calendar'

function Portal() {
  return (
    <div className='portal'>
        <div className='portal-container'>
            <div className='portal-grid portal-user'>
                <div className='portal-logo'><a href='/'><Logo/></a></div>
                <p>Welcome Indianhead95</p>
            </div>

            <div className='portal-grid portal-level'>
                <p className='portal-grid-title'>Level:</p>
                <p className='portal-grid-description'>Intermediate</p>
            </div>
            <div className='portal-grid portal-credit'>
                <p className='portal-grid-title'>Credits: 8</p>
                <a href='/'>Buy More</a>
            </div>
            <div className='portal-grid portal-feedback'>
                <p className='portal-grid-title'>Feedback</p>
                <p className='portal-grid-feedback'><span>June 28</span>: <span>Fronthand is getting better, keep up the good work!</span></p>
                <a href='/'>More</a>
            </div>
            <div className='portal-grid portal-calender'>
                <p className='portal-grid-title'>Lessons</p>

                <Calendar />
            </div>
        </div>
    </div>
  )
}

export default Portal