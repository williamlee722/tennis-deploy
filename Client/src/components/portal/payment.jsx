import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import '../../css/modal.css'
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const server_url = process.env.REACT_APP_SERVER_BASE_URL;

function Payment() {

  const navigate = useNavigate();
  const [zelleId, setZelleId] = useState("");
  const [credits,setCredits] = useState("")
  const [err, setErr] = useState(false);
  const [errMes, setErrMes] = useState('');
  
  // Get zelleidfrom server
  useEffect(() => {
    const configuration = {
      method: 'post',
      url: server_url + '/payment/getData',
      headers: {
        Authorization: `Bearer ${cookies.get("Auth_TOKEN")}`,
      },
    };

    axios(configuration)
      .then((result) => {
        setZelleId(result.data.preferedZelleID);
      })
      .catch((error) => {
        error = new Error();
        cookies.remove("Auth_TOKEN", { path: "/" });
        navigate("/login");
      });
  }, []);

  const handleZelleIdChange = (event) => {
    setZelleId(event.target.value);
  };

  const handleCreditChange = (event) => {
    setCredits(event.target.value);
  };

  // On submit
  const handleSubmit = (e) => {

    e.preventDefault();
    const configuration = {
      method: "post",
      url: server_url + "/payment/notifyCredit",
      headers: {
        Authorization: `Bearer ${cookies.get("Auth_TOKEN")}`,
      },
      data: {
        preferedZelleID: zelleId,
        creditAmount: credits
      }
    }

    axios(configuration)
      .then((result) => {
        navigate('/portal')
      }).catch((e) => {
        setErr(true);
        setErrMes(e.response.data.message)
      });
  }

  return (
    <div className="modalDiv">
      <div className="modal">
        <p className="modal-title">Add Credit</p>
        <p className="modal-description">Credits can only be added using Zelle.<br/>Credits will be added once the Zelle transfer have been confirmed.<br/>1 Credit = USD $4</p>
        <form onSubmit={handleSubmit}>
          <label name="zelleid">Zelle ID:</label>
          <input type="email" name="zelleid" value={zelleId} onChange={handleZelleIdChange}/>
          <label name="credit">1 Credit (USD $4):</label>
          <input type="number" name="credit" min="1" max="100" placeholder="Amount sent using Zelle" onChange={handleCreditChange}/>
          {err && (<p className="text-danger">{errMes}</p>)}
          <p style={{textAlign: "center"}}>Total of <span style={{fontSize: "1.2rem", fontWeight: 700}}>${credits * 4}</span><br/>should be deposited to tennist@gmail.com</p>
          <div className="button-container">
            <input className="button" type="submit" value="Confirm"/>
            <button onClick={() => navigate('/portal')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Payment