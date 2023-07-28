import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import '../css/login.css'
import Logo from '../images/logo'
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const server_url = process.env.REACT_APP_SERVER_BASE_URL;

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(false);
  const [errMes, setErrMes] = useState('');
  const [logSuccess, setLogSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (logSuccess) {
      navigate("/portal");
    }
  }, [logSuccess]);

  const handleSubmit = (e) =>{
    
    e.preventDefault();
    const configuration = {
      method: "post",
      url: server_url + "/login",
      data: {
        username: username,
        password: password
      }
    }

    axios(configuration)
    .then((result) => {
      console.log(result); 
      console.log(result.data.token);
      cookies.set("Auth_TOKEN", result.data.token, {
        path: "/",
      });

      setLogSuccess(true);

    }).catch((e) => {
      console.log(e.message); 
      setErr(true);
      setErrMes(e.response.data.message);
    });  
  }


  return (
    <div className='login'>
        <div className='login-container'>
            <a href='/' className='logo'><Logo/></a>
            <p className='login-title'>Welcome back!</p>
            <form onSubmit={handleSubmit}>
                <input type='text' name='username' placeholder='username' required onChange={(e) => setUsername(e.target.value)}/>
                <input type='password' name='password' placeholder='password' required onChange={(e) => setPassword(e.target.value)}/>
                <button type='submit' name='login'>Login</button>
                <p>Not a member? <a href='/register'>Register</a></p>
            </form>
            {err && ( <p className="text-danger">{errMes}</p>)} 
        </div>               
    </div>
  )
}

export default Login