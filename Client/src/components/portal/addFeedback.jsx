import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import '../../css/modal.css'
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const server_url = process.env.REACT_APP_SERVER_BASE_URL;

function AddFeedback() {

  const courtList = [{ value: "Hyde Park", label: 'Hyde Park' }, { value: "Lafarge Park", label: 'Lafarge Park' }]
  const levels = [{ value: "beginner", label: 'Beginner' }, { value: 'intermediate', label: 'Intermediate' }, { value: 'advance', label: 'Advance' }]
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("")
  const [startHour, setStartHour] = useState("")
  const [endHour, setEndHour] = useState("")
  const [level, setLevel] = useState("beginner")
  const [err, setErr] = useState(false);
  const [errMes, setErrMes] = useState('');

  // On submit
  const handleSubmit = (e) => {
    console.log("submit clicked")
  }

  return (
    <div className="modalDiv">
      <div className="modal">
        <p className="modal-title">Add Feedback</p>
        <form onSubmit={handleSubmit}>
          <label name="date">Date:</label>
          <input className="date" type="date" required name="date" onChange={(e) => setDate(e.target.value)} disabled/>
          <label name="user">William:</label>
          <textarea rows={5} style={{border:"none", boxShadow:"rgba(0,0,0,.1) 0px 1.5px 0px"}} name="feedback" required/>
          <label name="user">Berke:</label>
          <textarea rows={5} style={{border:"none", boxShadow:"rgba(0,0,0,.1) 0px 1.5px 0px"}} name="feedback" required/>
          <div className="button-container">
            <input className="button" type="submit" value="Confirm" />
            <button onClick={() => navigate('/admin')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddFeedback