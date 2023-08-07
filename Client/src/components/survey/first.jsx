import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function First() {

  const navigate = useNavigate()

  const [one, setOne] = useState(2);
  const [two, setTwo] = useState(2);
  const [three, setThree] = useState(2);
  const [four, setFour] = useState(2);
  const [five, setFive] = useState(2);
  const [six, setSix] = useState(2);
  const [seven, setSeven] = useState(2);

  let result = [one, two, three, four, five, six, seven]
  let first = 0

  const onSubmit = (e) => {

    e.preventDefault();

    for(var i =0; i<result.length; i++){
      if(result[i] === 1){
        first++
      }
    }

    navigate('../2', {state: first})
  }

  return (
    <div className='survey-start'>
      <p className='survey-title'><span>Part1: Ground Strokes</span></p>
      <form onSubmit={onSubmit}>
        <label className='survey-label'>You can do more than 5 rally but cannot control the ball freely</label>
        <div>
        <input type='radio' name='one' value={'1'} onChange={e=>setOne(+e.currentTarget.value)} checked={one === 1}/>Yes
        <input type='radio' name='one' value={'2'} onChange={e=>setOne(+e.currentTarget.value)} checked={one === 2}/>No
        </div>
        <label className='survey-label'>You can rally more than 10 balls with an arched trajectory over the net</label>
        <div>
        <input type='radio' name='two' value={'1'} onChange={e=>setTwo(+e.currentTarget.value)} checked={two === 1}/>Yes
        <input type='radio' name='two' value={'2'} onChange={e=>setTwo(+e.currentTarget.value)} checked={two === 2}/>No
        </div>
        <label className='survey-label'>You are able to maintain the rally when receiving high, short or wide balls</label>
        <div>
        <input type='radio' name='three' value={'1'} onChange={e=>setThree(+e.currentTarget.value)} checked={three === 1}/>Yes
        <input type='radio' name='three' value={'2'} onChange={e=>setThree(+e.currentTarget.value)} checked={three === 2}/>No
        </div>
        <label className='survey-label'>You are able to move the opponent around the court or hit harder when receiving easier balls</label>
        <div>
        <input type='radio' name='four' value={'1'} onChange={e=>setFour(+e.currentTarget.value)} checked={four === 1}/>Yes
        <input type='radio' name='four' value={'2'} onChange={e=>setFour(+e.currentTarget.value)} checked={four === 2}/>No
        </div>
        <label className='survey-label'>You are able to develop points with some consistency by using a reliable combination of shots</label>
        <div>
        <input type='radio' name='five' value={'1'} onChange={e=>setFive(+e.currentTarget.value)} checked={five === 1}/>Yes
        <input type='radio' name='five' value={'2'} onChange={e=>setFive(+e.currentTarget.value)} checked={five === 2}/>No
        </div>
        <label className='survey-label'>You know how to do a variety of spins</label>
        <div>
        <input type='radio' name='six' value={'1'} onChange={e=>setSix(+e.currentTarget.value)} checked={six === 1}/>Yes
        <input type='radio' name='six' value={'2'} onChange={e=>setSix(+e.currentTarget.value)} checked={six === 2}/>No
        </div>
        <label className='survey-label'>You are able to maintain a consistent rally, 10 balls in a row on faster balls</label>
        <div>
        <input type='radio' name='seven' value={'1'} onChange={e=>setSeven(+e.currentTarget.value)} checked={seven === 1}/>Yes
        <input type='radio' name='seven' value={'2'} onChange={e=>setSeven(+e.currentTarget.value)} checked={seven === 2}/>No
        </div>

        <input type='submit'/>
      </form>
    </div>
  )
}

export default First