import React from 'react'
import '../css/notfound.css'

function Error404() {
  return (
    <div className='notfound'>
        <div className='notfound-container'>
            <div className='notfound-logo'/>
            <div className='notfound-body'>
                <div className='warning'/>
                <p className='title'><span>Page Not Found</span></p>
                <p className='title-body'><span>The page you are looking for does not exist.</span></p>
            </div>
        </div>
        <a className='notfound-home' href='/'>BACK TO HOME</a>
    </div>
  )
}

export default Error404