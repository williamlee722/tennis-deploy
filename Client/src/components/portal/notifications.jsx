import React from 'react'
import { useNavigate } from "react-router-dom";
import '../../css/modal.css'

function Notifications() {
  const navigate = useNavigate();
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
            <tr>
              <td>William</td>
              <td>Paid $4 credit</td>
            </tr>
            <button className="confirm" onClick={() => navigate('/admin')}>Confirm</button>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Notifications