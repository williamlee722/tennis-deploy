import React, { useEffect, useState } from 'react'
import '../css/admin.css'
import '../css/calendar.css'
import Logo from '../images/logo'
import ClassCalendar from '../components/portal/classCalendar'
import Cookies from "universal-cookie";
const cookies = new Cookies();
const server_url = process.env.REACT_APP_SERVER_BASE_URL;

function Admin() {

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
                <tr>
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
                </tr>
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
                </tr>
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