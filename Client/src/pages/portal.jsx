import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../css/portal.css'
import '../css/calendar.css'
import Logo from '../images/logo'
import ClassCalendar from '../components/portal/classCalendar'
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const server_url = process.env.REACT_APP_SERVER_BASE_URL;

function Portal() {

  const [retVal, setRetVal] = useState("");
  const [username, setUsername] = useState("");
  const [level, setLevel] = useState("");
  const [credits, setCredits] = useState("");
  const [feedbacksArr, setFeedbacksArr] = useState([]);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

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
    setUsername(retVal.username);
    setLevel(retVal.level);
    setCredits(retVal.credits);

    let feedArr = []

    if (retVal.feedbacks?.length > 0) {
      for (let index = 0; index < retVal.feedbacks.length; index++) {
        
        const dateString = retVal.feedbacks[index].dateOfFeed;

        const date = new Date(dateString)

        const formattedDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: '2-digit'}).format(date);

        feedArr.push({ date: formattedDate, text: retVal.feedbacks[index].feedback });
      }
    }
    setFeedbacksArr(feedArr);
    console.log(feedbacksArr)

    let eventsList = [];

    if (retVal.eventdb?.length > 0) {
      retVal.eventdb.forEach((event) => {

        let eventStartDate = new Date(event.day)
        let eventEndDate = new Date(event.day)
        const [startHour, startMinutes] = event.start.split(':');
        const [endHour, endMinutes] = event.end.split(':');
        eventStartDate.setHours(Number(startHour), Number(startMinutes));
        eventEndDate.setHours(Number(endHour), Number(endMinutes));
      
        eventsList.push({
          id: event._id,
          title: event.level,
          day: event.day,
          start: eventStartDate,
          end: eventEndDate,
          status: event.status,
          location: event.location,
          description: event.description,
          students: event.students
        })
      });
    }

    setEvents(eventsList);
  }, [retVal]);

  const handleLogout = () => {
    cookies.remove("Auth_TOKEN", { path: "/" });
  };

  return (
    <div className='portal'>
      <ul className='admin-user-btn'>
        <li><a className='logout' href='/home' onClick={handleLogout}>Logout</a></li>
      </ul>
      <div className='portal-container'>
        <div className='portal-grid portal-user'>
          <div className='portal-logo'><a href='/'><Logo /></a></div>
          <p>Welcome {username}</p>
        </div>
        <div className='portal-grid portal-level'>
          <p className='portal-grid-title'>Level:</p>
          <p className='portal-grid-description'>{level}</p>
        </div>
        <div className='portal-grid portal-credit'>
          <p className='portal-grid-title'>Credits: {credits}</p>
          <Link to="/payment" state={{ background: location }}>Add Credit</Link>
        </div>
        <div className='portal-grid portal-feedback'>
          <p className='portal-grid-title'>Feedback</p>
          {feedbacksArr?.length > 0 && (
            <div className='portal-grid-feedback'>
              <table>
                <tr>
                  <td>{feedbacksArr[feedbacksArr.length - 1].date}</td>
                  <td>{feedbacksArr[feedbacksArr.length - 1].text}</td>
                </tr>
              </table>
              <Link to="/feedback" state={{ background: location, feedbacks: feedbacksArr }}>View More</Link>
            </div>
          )}
        </div>
        <div className='portal-grid portal-calender'>
          <p className='portal-grid-title'>Lessons</p>

          <ClassCalendar events={events} />
          <p style={{textAlign:"center"}}><span>* In order to cancel your bookings, please contact the coach directly at <a style={{textDecoration:"none", color:"black"}} href='mailto:tennist@gmail.com'>tennist@gmail.com</a></span></p>
        </div>
      </div>
    </div>
  )
}

export default Portal