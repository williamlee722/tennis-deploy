import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import '../css/register.css'
import Logo from '../images/logo'
import axios from "axios";
const server_url = process.env.REACT_APP_SERVER_BASE_URL;


function Register() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const [err, setErr] = useState(false);
  const [errMes, setErrMes] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (regSuccess) {
      navigate("/portal");
    }
  }, [regSuccess]);

  const handleSubmit = (e) => {

    e.preventDefault();

    if (password === rePassword) {
      const configuration = {
        method: "post",
        url: server_url + "/register",
        data: {
          first_name: firstName,
          last_name: lastName,
          username: username,
          email: email,
          password: password
        }
      }

      axios(configuration)
        .then((result) => {
          // console.log(result);
          alert("Registration successful.");
          setRegSuccess(true);
        }).catch((e) => {
          setErr(true);
          setErrMes(e.response.data.message);
        })

    } else {
      // console.log("Password doesnt match");
      setErr(true);
      setErrMes("Password doesnt match");
    }
  }

  return (
    <div className='register'>
        <div className='register-container'>
            <a href='/' className='logo'><Logo/></a>
            <p className='register-title'>Nice to meet you!</p>
            <form onSubmit={handleSubmit}>
                <input type='text' name='fname' placeholder='first name' required onChange={(e) => setFirstName(e.target.value)} />
                <input type='text' name='lname' placeholder='last name' required onChange={(e) => setLastName(e.target.value)} />
                <input type='text' name='uname' placeholder='username' required onChange={(e) => setUsername(e.target.value)}/>
                <input type='email' name='email' placeholder='email' required onChange={(e) => setEmail(e.target.value)}/>
                <input type='password' name='password' placeholder='password' required onChange={(e) => setPassword(e.target.value)}/>
                <input type='password' name='checkpassword' placeholder='check password' required onChange={(e) => setRePassword(e.target.value)}/>
                <button type='submit' name='register'>Register</button>
                <p>Already a member? <a href='/login'>Login</a></p>
            </form>
            {err && ( <p className="text-danger">{errMes}</p>)}    
        </div>            
    </div>
  )
}

export default Register