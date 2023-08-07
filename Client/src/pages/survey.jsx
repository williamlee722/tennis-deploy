import React from 'react'
import '../css/survey.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import LogoWhite from '../images/logo-white'

function Survey() {
  return (
    <div className='survey'>
      <div className='survey-logo'><a href='/'><LogoWhite/></a></div>
      <div className='survey-container'>
        <div className='survey-outlet'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Survey