import axios from "axios";
import Cookies from "universal-cookie";
import React, {useEffect, useRef, useState} from 'react'
import { useNavigate, useParams } from "react-router-dom";

const server_url = process.env.REACT_APP_SERVER_BASE_URL;
const cookies = new Cookies();

function Details() {
  const navigate = useNavigate();
  const modalRef = useRef();
  const { id } = useParams();

  const [retVal, setRetVal] = useState("");
  const [booking, setBooking] = useState({});

  useEffect(() => {
    const configuration = {
      method: 'post',
      url: server_url + '/portal',
      headers: {
        Authorization: `Bearer ${cookies.get("Auth_TOKEN")}`,
      },
    };

    axios(configuration)
      .then((result) => {
        setRetVal(result.data);
      })
      .catch((error) => {
        error = new Error();
        cookies.remove("Auth_TOKEN", { path: "/" });
        navigate("/login");
      });
  }, []);

  useEffect(() => {
    let bookingob = {};
    let student = "";

    if (retVal.eventdb?.length > 0) {
      retVal.eventdb.forEach((event) => {
        if(event._id == id){
          event.students.forEach((event)=>{
            student += event.username + ' '
          })
          bookingob={
            students: student,
            date: (event.day).slice(0,10),
            time: (event.start) + " - " + (event.end),
            level: event.level,
            location: event.location
          }
        }
      });    
    }

    setBooking(bookingob);
  }, [retVal]);
  
  return (
    <div ref={modalRef} className="modalDiv">
      <div className="modal">
        <p className="modal-title">Lesson Details</p>
        <table>
          <tbody>
            <tr>
              <th>Level</th>
              <td>{booking.level}</td>
            </tr>
            <tr>
              <th>Members</th>
              <td>{booking.students}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{booking.date}</td>
            </tr>
            <tr>
              <th>Time</th>
              <td>{booking.time}</td>
            </tr>
            <tr>
              <th>Location</th>
              <td>{booking.location}</td>
            </tr>
            <tr>
              <th>Fee</th>
              <td>4 Credits</td>
            </tr>
          </tbody>
        </table>
        <div className="button-container">
          <input className="button" type="submit" value="Confirm"/>
          <button onClick={() => navigate('/portal')}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default Details