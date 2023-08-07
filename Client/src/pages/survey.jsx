import React from 'react'
import '../css/survey.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'

function Survey() {
  const navigate = useNavigate();
  return (
    <div className='survey'>
        <p><span>Welcome to Tennist!</span></p>
        <p><span>Please help us answer a few questions to know your level!</span></p>
        <Link onClick={navigate('/1')}>Let us Begin</Link>
        <Outlet/>
    </div>
  )
}

export default Survey