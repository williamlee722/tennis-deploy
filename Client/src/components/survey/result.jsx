import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Result() {
    const navigate = useNavigate()
    const location = useLocation()
    const data = location.state;

    let cal = ((data[0] + data[1] + data[2])/3)
    let result = parseInt(cal, 10)

    let level = ""

    if(result == 0 || result == 1 || result == 2 || result == 3) {
        level = "beginner"
    }
    if(result == 4 || result == 5 || result == 6) {
        level = "intermediate"
    }
    if(result == 7) {
        level = "advanced"
    }

    return (
        <div className='survey-start'>
            <p className='survey-title'><span>Your level is:</span></p>
            <p className='survey-title'><span style={{textTransform:"capitalize"}}>{level}</span></p>
            <p className='survey-description'><span>Do you want to register an account with this level?</span></p>
            <button className='survey-link' onClick={() => {navigate('../../register', {state: level})}}>Register</button>
        </div>
      )
}

export default Result