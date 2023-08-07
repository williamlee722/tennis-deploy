import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import '../../css/modal.css'
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const server_url = process.env.REACT_APP_SERVER_BASE_URL;

function AddFeedback() {

  const booking = useLocation().state?.booking || [];
  const navigate = useNavigate();
  const [returnedFeedbacks, setReturnedFeedbacks] = useState([]) // {username: , feedback:}

  // console.log(booking)
  // On submit
  const handleSubmit = (e) => {
    // console.log("submit clicked")

    e.preventDefault();
    const configuration = {
      method: "post",
      url: server_url + "/admin/createFeedback",
      headers: {
        Authorization: `Bearer ${cookies.get("Auth_TOKEN")}`,
      },
      data: {
        feedbacks: returnedFeedbacks
      }
    }

    axios(configuration)
      .then((result) => {
        navigate('/admin')
        window.location.reload();
      }).catch((e) => {
      });

  }

  const handleFeedbackUpdate = (index, e) => {
    
    if(returnedFeedbacks.length === 0){      
      setReturnedFeedbacks(booking.students.map((item) => ({username: item.username, feedback: ''})))
    }
    const { name, value } = e.target;
    const updatedFeedbacks = [...returnedFeedbacks];
    const student = booking.students[index];
  
    const feedbackObj = {
      username: student.username,
      [name]: value,
    };
    updatedFeedbacks[index] = feedbackObj;
  
    setReturnedFeedbacks(updatedFeedbacks);
  };

  return (
    <div className="modalDiv">
      <div className="modal">
        <p className="modal-title">Add Feedback</p>
        <form onSubmit={handleSubmit}>
          <label name="date">Date:</label>
          <input className="date" type="date" value={new Date(booking.day).toISOString().split('T')[0]} disabled/>

          {
            booking.students?.length > 0 && booking.students.map((student, index) => (
              <div key={index}>
                <label name="user">{student.username}:</label>
                <textarea rows={5} style={{ border: "none", boxShadow: "rgba(0,0,0,.1) 0px 1.5px 0px" }} name="feedback" required onChange={(event) => handleFeedbackUpdate(index, event)}/>
              </div>
            ))
          }

          {/* <label name="user">William:</label>
          <textarea rows={5} style={{border:"none", boxShadow:"rgba(0,0,0,.1) 0px 1.5px 0px"}} name="feedback" required/>
          <label name="user">Berke:</label>
          <textarea rows={5} style={{border:"none", boxShadow:"rgba(0,0,0,.1) 0px 1.5px 0px"}} name="feedback" required/> */}
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