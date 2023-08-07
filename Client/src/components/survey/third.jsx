import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function Third() {

  const navigate = useNavigate()
  const location = useLocation()
  const data = location.state;
  
  const [one, setOne] = useState(2);
  const [two, setTwo] = useState(2);
  const [three, setThree] = useState(2);
  const [four, setFour] = useState(2);
  const [five, setFive] = useState(2);
  const [six, setSix] = useState(2);
  const [seven, setSeven] = useState(2);

  let result = [one, two, three, four, five, six, seven]
  let third = 0

  const onSubmit = (e) => {

    e.preventDefault();

    for(var i =0; i<result.length; i++){
      if(result[i] === 1){
        third++
      }
    }

    navigate('../result', {state: [data[0], data[1], third]})
  }

  return (
    <div className='survey-start'>
      <p className='survey-title'><span>Part3: Net Play</span></p>
      <form onSubmit={onSubmit}>
        <label className='1'>When receiving a serve, you tend to position in a manner to protect weaknesses</label>
        <div>
        <input type='radio' name='one' value={'1'} onChange={e=>setOne(+e.currentTarget.value)} checked={one === 1}/>Yes
        <input type='radio' name='one' value={'2'} onChange={e=>setOne(+e.currentTarget.value)} checked={one === 2}/>No
        </div>
        <label className='1'>In singles, you are consistent when returning towards the middle of the court. In doubles, you have difficulty returning cross- court to start the point</label>
        <div>
        <input type='radio' name='two' value={'1'} onChange={e=>setTwo(+e.currentTarget.value)} checked={two === 1}/>Yes
        <input type='radio' name='two' value={'2'} onChange={e=>setTwo(+e.currentTarget.value)} checked={two === 2}/>No
        </div>
        <label className='1'>You can control the direction of the ball in both singles and doubles, when receiving a serve of moderate pace</label>
        <div>
        <input type='radio' name='three' value={'1'} onChange={e=>setThree(+e.currentTarget.value)} checked={three === 1}/>Yes
        <input type='radio' name='three' value={'2'} onChange={e=>setThree(+e.currentTarget.value)} checked={three === 2}/>No
        </div>
        <label className='1'>You can return fast serves or well- placed serves with defensive actions. On easy second serve, can return with pace or directional control; can approach the net in doubles.</label>
        <div>
        <input type='radio' name='four' value={'1'} onChange={e=>setFour(+e.currentTarget.value)} checked={four === 1}/>Yes
        <input type='radio' name='four' value={'2'} onChange={e=>setFour(+e.currentTarget.value)} checked={four === 2}/>No
        </div>
        <label className='1'>You have difficulty in returning spin serves and very fast serves.</label>
        <div>
        <input type='radio' name='five' value={'1'} onChange={e=>setFive(+e.currentTarget.value)} checked={five === 1}/>Yes
        <input type='radio' name='five' value={'2'} onChange={e=>setFive(+e.currentTarget.value)} checked={five === 2}/>No
        </div>
        <label className='1'>You can defend first serves consistently but very inconsistent when attempting an aggressive return</label>
        <div>
        <input type='radio' name='six' value={'1'} onChange={e=>setSix(+e.currentTarget.value)} checked={six === 1}/>Yes
        <input type='radio' name='six' value={'2'} onChange={e=>setSix(+e.currentTarget.value)} checked={six === 2}/>No
        </div>
        <label className='1'>You can periodically succeeds at aggressive return off fast first serves using dominant shot</label>
        <div>
        <input type='radio' name='seven' value={'1'} onChange={e=>setSeven(+e.currentTarget.value)} checked={seven === 1}/>Yes
        <input type='radio' name='seven' value={'2'} onChange={e=>setSeven(+e.currentTarget.value)} checked={seven === 2}/>No
        </div>

        <input type='submit'/>
      </form>
    </div>
  )
}

export default Third