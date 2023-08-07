import { useNavigate, useLocation } from "react-router-dom";
import '../../css/modal.css'

function Feedback() {

  const navigate = useNavigate();
  const location = useLocation();
  const feedbacks = location.state?.feedbacks || [];

  return (
    <div className="modalDiv">
      <div className="modal">
        <p className="modal-title">Feedbacks</p>
        <table>
          <tbody>
            <tr>
              <th>DATE</th>
              <th>FEEDBACK</th>
            </tr>
            {feedbacks?.length > 0 && feedbacks.map((feed, index) => (
              <tr>
                <td>{feed.date}</td>
                <td>{feed.text}</td>
              </tr>
            ))}

            {/* <tr>
              <td>2023-07-22</td>
              <td>Need more practice in backhand.</td>
            </tr>
            <tr>
              <td>2023-07-22</td>
              <td>Need more practice in backhand.Need more practice in backhand.Need more practice in backhand.Need more practice in backhand.Need more practice in backhand.Need more practice in backhand.Need more practice in backhand.Need more practice in backhand.Need more practice in backhand.</td>
            </tr> */}
            <button className="confirm" onClick={() => navigate('/portal')}>Confirm</button>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Feedback