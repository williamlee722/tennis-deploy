import React from 'react'
import '../css/login.css'
import Logo from '../images/logo'

function Login() {
  return (
    <div className='login'>
        <div className='login-container'>
            <a href='/' className='logo'><Logo/></a>
            <p className='login-title'>Welcome back!</p>
            <form>
                <input type='text' name='uname' placeholder='username'/>
                <input type='password' name='password' placeholder='password'/>
                <button type='submit' name='login'>Login</button>
                <p>Not a member? <a href='/register'>Register</a></p>
            </form>
        </div>        
    </div>
  )
}

export default Login