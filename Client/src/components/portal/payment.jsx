import { useNavigate } from "react-router-dom";
import '../../css/modal.css'

function Payment() {

  const navigate = useNavigate();

  return (
    <div className="modalDiv">
      <div className="modal">
        <p className="modal-title">Add Credit</p>
        <p className="modal-description">Credits can only be added using Zelle.<br/>Credits will be added once the Zelle transfer have been confirmed.<br/>4 Credit = USD $4</p>
        <form>
          <label name="zelleid">Zelle ID:</label>
          <input type="email" name="zelleid" value={"williamjongmin@gmail.com"}/>
          <label name="credit">Credit (USD):</label>
          <input type="number" name="credit" min="0" max="100" placeholder="Amount sent using Zelle"/>
          <div className="button-container">
            <input className="button" type="submit" value="Confirm"/>
            <button onClick={() => navigate('/portal')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Payment