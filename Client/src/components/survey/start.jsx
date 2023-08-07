import React from 'react'
import { Link } from 'react-router-dom'

function Start() {
  return (
    <div className='survey-start'>
        <p className='survey-title'><span>Welcome to Tennist!</span></p>
        <p className='survey-description'><span>Please help us answer a few questions to know your level!</span></p>
        <Link className='survey-link' to={'1'}>Let us Begin!</Link>
    </div>
  )
}

export default Start