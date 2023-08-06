import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import '../../css/modal.css'
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const server_url = process.env.REACT_APP_SERVER_BASE_URL;

function AddLesson() {

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
 
    e.preventDefault();
    const configuration = {
      method: "post",
      url: server_url + "/admin/createLecture",
      headers: {
        Authorization: `Bearer ${cookies.get("Auth_TOKEN")}`,
      },
      data: {
        eventLocation: location,
        eventDay: date,
        eventStart: startHour.toLocaleString('en-CA', { hour: '2-digit', minute: '2-digit', hour12: false }),
        eventEnd: endHour.toLocaleString('en-CA', { hour: '2-digit', minute: '2-digit', hour12: false }),
        eventLevel: level
      }
    }

    axios(configuration)
      .then((result) => {
        navigate('/admin')
        window.location.reload();
      }).catch((e) => {
        setErr(true);
        setErrMes(e.response.data.message)
      });
  }

  return (
    <div className="modalDiv">
      <div className="modal">
        <p className="modal-title">Add Lesson</p>
        <form onSubmit={handleSubmit}>
          <label name="date">Date:</label>
          <input className="date" type="date" required name="date" onChange={(e) => setDate(e.target.value)} />
          <label name="start">Starts At:</label>
          <input type="time" name="start" required onChange={(e) => setStartHour(e.target.value)} />
          <label name="end">Ends At:</label>
          <input type="time" name="end" required onChange={(e) => setEndHour(e.target.value)} />
          <input className="date" type="time" name="start" required onChange={(e) => setStartHour(e.target.value)} />
          <label name="end">Ends At:</label>
          <input className="date" type="time" name="end" required onChange={(e) => setEndHour(e.target.value)} />
          <label name="level">Level:</label>
          <select required onChange={(e) => setLevel(e.target.value)} value={level}>
            <option selected value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <label name="location">Location:</label>
          <select name="location" required onChange={(e) => setLocation(e.target.value)} value={location}>
            {courtList.map((court) => (
              <option key={court.value} value={court.value}>
                {court.label}
              </option>
            ))}
          </select>
          {err && (<p className="text-danger">{errMes}</p>)}
          <div className="button-container">
            <input className="button" type="submit" value="Confirm" />
            <button onClick={() => navigate('/admin')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddLesson