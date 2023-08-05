import React, { useEffect, useState } from 'react'
import '../css/admin.css'
import '../css/calendar.css'
import Logo from '../images/logo'
import ClassCalendar from '../components/portal/classCalendar'
import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();
const server_url = process.env.REACT_APP_SERVER_BASE_URL;

function Admin() {

  const courtList = [{value: "Hyde Park", label: 'Hyde Park'}, {value: "Lafarge Park", label: 'Lafarge Park'}]
  const levels = [{value: "beginner", label: 'Beginner'}, {value: 'intermediate', label: 'Intermediate'}, {value: 'advance', label: 'Advance'}]
  const [bookingsList, setBookingsList] = useState([])
  const [userInfoList, setUserInfoList] = useState([])
  const [retVal, setRetVal] = useState({});

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
      });
  }, []);

  useEffect(() => {
    if(retVal){
      setBookingsList(retVal.bookings)
      setUserInfoList(retVal.userInfos)
      console.log(bookingsList)
      if(bookingsList){
        bookingsList.forEach(element => {
          console.log(element.location)
        });
      }      
    }    
  },[retVal])

  console.log(courtList[1].value)


  return (
    <div className='admin'>
      <div className='admin-container'>
        <div className='admin-grid admin-user'>
          <div className='admin-logo'><a href='/'><Logo /></a></div>
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
                      <td><input type='text' value={userInfo.level} /></td>
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
                {/* <tr>
                  <td>William</td>
                  <td><input type='text' value={'Advanced'}/></td>
                  <td><input type='number' value={10}/></td>
                  <td><select>        
                    <option value="active">Active</option>
                    <option value="suspend">Suspend</option>
                  </select></td>
                </tr>
                <tr>
                  <td>Berke</td>
                  <td><input type='text' value={'Advanced'}/></td>
                  <td><input type='number' value={10}/></td>
                  <td><select>        
                    <option value="active">Active</option>
                    <option value="suspend">Suspend</option>
                  </select></td>
                </tr> */}
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
                  <th>LOCATION</th>
                  <th>STATUS</th>
                </tr>

                {
                  bookingsList?.length > 0 && bookingsList.map((booking, index) => (
                    <tr key={index}>
                      <td><input type='date' value={new Date(booking.day).toISOString().split('T')[0]}/></td>
                      <td>{booking.students.map((student) => student.username).join(', ')}</td>
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

                {/* <tr>
                  <td><input type='date' value={'2023-08-10'}/></td>
                  <td>William, Berke</td>
                  <td><select>        
                    <option value="1">Hyde Park</option>
                    <option value="2">Lafarge Park</option>
                  </select></td>
                  <td><select>        
                    <option value="on">On-Going</option>
                    <option value="canceled">Canceled</option>
                  </select></td>
                </tr>
                <tr>
                  <td><input type='date' value={'2023-08-10'}/></td>
                  <td>William, Berke</td>
                  <td><select>        
                    <option value="1">Hyde Park</option>
                    <option value="2">Lafarge Park</option>
                  </select></td>
                  <td><select>        
                    <option value="on">On-Going</option>
                    <option value="canceled">Canceled</option>
                  </select></td>
                </tr> */}
              </tbody>
            </table>
          </div>
          <a href='/'>Add</a>
        </div>
      </div>
    </div>
  )
}

export default Admin