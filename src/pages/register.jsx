import React from 'react'
import '../css/register.css'
import Logo from '../images/logo'

function Register() {
  return (
    <div className='register'>
        <div className='register-container'>
            <a href='/' className='logo'><Logo/></a>
            <p className='register-title'>Nice to meet you!</p>
            <form>
                <input type='text' name='uname' placeholder='username'/>
                <input type='email' name='email' placeholder='email'/>
                <input type='password' name='password' placeholder='password'/>
                <input type='password' name='checkpassword' placeholder='check password'/>
                <button type='submit' name='register'>Register</button>
                <p>Already a member? <a href='/login'>Login</a></p>
            </form>
        </div>        
    </div>
  )
}

export default Register