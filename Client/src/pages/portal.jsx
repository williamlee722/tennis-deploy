import React, { useEffect, useState } from 'react'
import '../css/portal.css'
import '../css/calendar.css'
import Logo from '../images/logo'
// import Calendar from 'react-calendar'
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
          console.log(result.data.username)
          setRetVal(result.data);
        })
        .catch((error) => {
          error = new Error();
      });
    }, []); 
    
    useEffect(() => {
        setUsername(retVal.username);
        setLevel(retVal.level);
        setCredits(retVal.credits);
    
        let feedArr = []
    
        if (retVal.feedbacks?.length > 0) {
            retVal.feedbacks.forEach((feedback) => {
              const dateString = feedback.dateOfFeed; 
          
              const date = new Date(dateString);
          
              const options = {
                month: 'long',
                day: '2-digit',
              };
          
              const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
          
              feedArr.push({ date: formattedDate, text: feedback.feedback });

            });
      }
        setFeedbacksArr(feedArr);
        
        let eventsList = [];  

        if (retVal.eventdb?.length > 0) {
            retVal.eventdb.forEach((event) => {
              console.log(event)
              eventsList.push({
                title: event.level,
                day: event.day,
                start: event.start,
                end: event.end,
                status: event.status,
                location: event.location,
                description: event.description
              })
            });
        }     
    
        setEvents(eventsList);
    }, [retVal]); 



  return (
    <div className='portal'>
        <div className='portal-container'>
            <div className='portal-grid portal-user'>
                <div className='portal-logo'><a href='/'><Logo/></a></div>
                <p>Welcome {username}</p>
            </div>
            <div className='portal-grid portal-level'>
                <p className='portal-grid-title'>Level:</p>
                <p className='portal-grid-description'>{level}</p>
            </div>
            <div className='portal-grid portal-credit'>
                <p className='portal-grid-title'>Credits: {credits}</p>
                <a href='/'>Buy More</a>
            </div>
            <div className='portal-grid portal-feedback'>
                <p className='portal-grid-title'>Feedback</p>
                {/* {feedbacks} */}
                {feedbacksArr.map((feed, index) => (
                    <p className='portal-grid-feedback' key={index}>
                    <span>{feed.date}</span>: <span>{feed.text}</span>
                    </p>
                ))}
                {/* <p className='portal-grid-feedback'><span>June 28</span>: <span>Fronthand is getting better, keep up the good work!</span></p> */}
                <a href='/'>More</a>
            </div>
            <div className='portal-grid portal-calender'>
                <p className='portal-grid-title'>Lessons</p>

                <ClassCalendar events={events}/>
            </div>
        </div>
    </div>
  )
}

export default Portal