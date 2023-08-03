import React, { useEffect, useState } from 'react'
import '../css/portal.css'
import '../css/calendar.css'
import Logo from '../images/logo'
// import Calendar from 'react-calendar'
import ClassCalendar from '../components/portal/classCalendar'

function Portal() {

    const events = [
        {
          title: 'Intermediate Class',
          start: new Date(2023, 0, 10, 10, 0),
          end: new Date(2023, 0, 10, 12, 0),
          location: 'Court A',
          description: 'This is intermediate class at Court A.', // Additional event details
        },
        {
          title: 'Beginner Class',
          start: new Date(2023, 8, 12, 14, 0),
          end: new Date(2023, 8, 12, 16, 0),
          location: 'Court B',
          description: 'This is beginner class at Court B.', // Additional event details
        },
        // Add more event objects as needed
    ];



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

                <ClassCalendar events={events}/>
            </div>
        </div>
    </div>
  )
}

export default Portal