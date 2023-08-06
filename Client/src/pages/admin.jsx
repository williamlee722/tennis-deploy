import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import '../css/admin.css'
import '../css/calendar.css'
import Logo from '../images/logo'
import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();
const server_url = process.env.REACT_APP_SERVER_BASE_URL;

function Admin() {

  const courtList = [{value: "Hyde Park", label: 'Hyde Park'}, {value: "Lafarge Park", label: 'Lafarge Park'}]
  const levels = [{key: "beginner", value: 'Beginner'}, {key: 'intermediate', value: 'Intermediate'}, {key: 'advance', value: 'Advance'}]
  const [bookingsList, setBookingsList] = useState([])
  const [userInfoList, setUserInfoList] = useState([])
  const [retVal, setRetVal] = useState({});
  const navigate = useNavigate();

  const location = useLocation();

  // Get data from server UserInfo + Bookings
  useEffect(() => {
    const configuration = {
      method: 'post',
      url: server_url + '/admin/getData',
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
    if(retVal){
      setBookingsList(retVal.bookings)
      setUserInfoList(retVal.userInfos)
      // console.log(bookingsList)
      if(bookingsList){
        bookingsList.forEach(element => {
          console.log(element._id)
        });
      }      
    }    
  },[retVal])

  const handleLogout = () => {
    cookies.remove("Auth_TOKEN", { path: "/" });
  };


  return (
    <div className='admin'>
      <ul className='admin-user-btn'>
        <li><Link to="/notifications" state={{ background: location }}>Notifications</Link></li>
        <li><a className='logout' href='/home' onClick={handleLogout}>Logout</a></li>
      </ul>
      <div className='admin-container'>
        <div className='admin-grid admin-user'>
          <div className='admin-user-header'>
            <div className='admin-logo'><a href='/'><Logo /></a></div>
          </div>
          <p>Welcome Coach Richard</p>
        </div>
        <div className='admin-grid admin-members'>
          <p className='admin-grid-title'>Members Status</p>
          <div className='admin-grid-table'>
            <table>
              <tbody>
                <tr>
                  <th>USERNAME</th>
                  <th>LEVEL</th>
                  <th>CREDIT</th>
                  <th>STATUS</th>
                </tr>
                {
                  userInfoList?.length > 0 && userInfoList.map((userInfo, index) => (
                    <tr key={index}>
                      <td>{userInfo.username}</td>
                      {/* Add on click modal here */}
                      <td>
                        <select value={userInfo.level}>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select></td>
                      <td><input type='number' value={userInfo.credits} /></td>
                      <td>
                        <select>
                          <option value="active">Active</option>
                          <option value="suspend">Suspend</option>
                        </select>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          
        </div>
        <div className='admin-grid admin-schedule'>
          <p className='admin-grid-title'>Lessons Status</p>
          <div className='admin-grid-table'>
            <table>
              <tbody>
                <tr>
                  <th>DATE</th>
                  <th>MEMBERS</th>
                  <th>LEVEL</th>
                  <th>LOCATION</th>
                  <th>STATUS</th>
                </tr>

                {
                  bookingsList?.length > 0 && bookingsList.map((booking, index) => (
                    <tr key={index}>
                      <td className='date-tr'><input type='date' value={new Date(booking.day).toISOString().split('T')[0]}/></td>
                      <td className='addfeedback'><Link to="/addfeedback" state={{ background: location }}>{booking.students.map((student) => student.username).join(', ')}</Link></td>
                      <td>{booking.level.charAt(0).toUpperCase() + booking.level.slice(1)}</td>
                      <td><select value={booking.location}>
                      {courtList.map((court) => (
                        <option key={court.value} value={court.value}>
                          {court.label}
                        </option>
                      ))}
                      </select></td>
                      <td><select value={booking.status}>        
                        <option value="Open">On-Going Not Full</option>
                        <option value="Full">On-Going Full</option>
                        <option value="Canceled">Canceled</option>
                      </select></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <Link to="/addlesson" state={{ background: location }}>Add</Link>
        </div>
      </div>
    </div>
  )
}

export default Admin