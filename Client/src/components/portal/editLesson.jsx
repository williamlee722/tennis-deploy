import { useNavigate } from "react-router-dom";
import '../../css/modal.css'

function EditLesson() {

  const navigate = useNavigate();

  return (
    <div className="modalDiv">
      <div className="modal">
        <p className="modal-title">Add Lesson</p>
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

export default EditLesson