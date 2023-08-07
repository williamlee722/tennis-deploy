import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import '../../css/modal.css'
import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();
const server_url = process.env.REACT_APP_SERVER_BASE_URL;

function Notifications() {
  const navigate = useNavigate();
  const [notificationList, setnotificationList] = useState([])
  const [retVal, setRetVal] = useState({});

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
      setnotificationList(retVal.notifications)     
    }    
  },[retVal])

  return (
    <div className="modalDiv">
      <div className="modal">
        <p className="modal-title">Notifications</p>
        <table>
          <tbody>
            <tr>
              <th>Member</th>
              <th>Details</th>
            </tr>
            {
              notificationList?.map((notification)=>(
                <tr>
                  <td>{notification.byUser}</td>
                  <td>Paid ${notification.creditAmount} credit</td>
                </tr>
              ))
            }
            {/* <tr>
              <td>William</td>
              <td>Paid $4 credit</td>
            </tr> */}
            <button className="confirm" onClick={() => navigate('/admin')}>Confirm</button>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Notifications