import { useNavigate } from "react-router-dom";
import '../../css/modal.css'

function AddLesson() {

  const navigate = useNavigate();

  return (
    <div className="modalDiv">
      <div className="modal">
        <p className="modal-title">Add Lesson</p>
        <form>
          <label name="date">Date:</label>
          <input className="date" type="date" name="date"/>
          <label name="location">Location:</label>
          <select name="location">        
            <option value="1">Hyde Park</option>
            <option value="2">Lafarge Park</option>
          </select>
          <div className="button-container">
            <input className="button" type="submit" value="Confirm"/>
            <button onClick={() => navigate('/portal')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddLesson