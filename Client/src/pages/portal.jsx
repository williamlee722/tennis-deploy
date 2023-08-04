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
const token = cookies.get("Auth_TOKEN");

function Portal() {

    const [retVal, setRetVal] = useState("");
    const [username, setUsername] = useState("");
    const [level, setLevel] = useState("");
    const [credits, setCredits] = useState("");
    const [feedbacks, setFeedbacks] = useState("");
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const configuration = {
          method: 'post',
          url: server_url + '/portal',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        axios(configuration)
          .then((result) => {
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
    
        let feedString = '';
    
        if (retVal.feedbacks?.length > 0) {
            retVal.feedbacks.forEach((feedback) => {
              const dateString = feedback.dateOfFeed; 
          
              const date = new Date(dateString);
          
              const options = {
                month: 'long',
                day: '2-digit',
              };
          
              const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
          
              feedString += formattedDate + " : " + feedback.feedback + "\n";
            });
        }
        setFeedbacks(feedString);
    
        let eventsList = [];        
    
        setEvents(eventsList);
      }, [retVal]); 

    // events = [
    //     {
    //       title: 'Intermediate Class',
    //       start: new Date(2023, 0, 10, 10, 0),
    //       end: new Date(2023, 0, 10, 12, 0),
    //       location: 'Court A',
    //       description: 'This is intermediate class at Court A.', 
    //     }
    // ];



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
                {feedbacks}
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