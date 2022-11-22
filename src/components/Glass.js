import './Glass.css'
import { useState } from 'react'
import axios from 'axios'
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { message } from "antd";
function Glass() {

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
    reset();
  };

const [data1]=useState({
      Gender:'',
      bscCgpa:'',
      exp:'',
      test:'',
      mscCgpa:''
})

  const [gender, setGender] = useState('')
  const [bsc, setBsc] = useState('')
  const [workex, setWorkex] = useState('')
  const [etest_p, setEtest_p] = useState('')
  const [msc, setMsc] = useState('')
  const[visited,setVisited]=useState(false);
  const [data,setData]=useState({});
  const [parameter,setParameter]=useState();
  const handleSubmit = (e) => {
      message.success('passwords not matched')
     console.log("gender"+gender);
    e.preventDefault()
    const params = { gender, bsc, workex, etest_p, msc }
    axios
      .post('http://localhost:8090/prediction', params)
      .then((res) => {
        setVisited(true);
        const data = res.data.data
        setData(data);
        // const parameters = JSON.stringify(params)
        setParameter(parameter)
        // const msg = `Prediction: ${data.prediction}\nInterpretation: ${data.interpretation}\nParameters: ${parameters}`
        
      })
      .catch((error) => alert(`Error: ${error.message}`))

     data1.Gender=gender==='1' ? "Male": "Female";
     data1.bscCgpa=bsc;
     data1.exp=workex==='1' ? "Yes" : "No";
     data1.test=etest_p;
     data1.mscCgpa=msc;
     console.log(data1+"After");
      if(visited){
         setShow(true);
      }


  }

  const reset = () => {
    setGender('')
    setBsc('')
    setWorkex('')
    setEtest_p('')
    setMsc('')
  }
    console.log(data)
    console.log(parameter)
  return (
    <div>
       
   
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Predictions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
         <label>Gender</label>
          <Form.Control
            type="text"
            disabled
            value={data1.Gender}
          ></Form.Control>
         <br/>
         <label>Bsc CGPA</label>
          <Form.Control
            disabled
            type="text"
            value={data1.bscCgpa}
          ></Form.Control>
           <br/>
         <label>Work Experience</label>
          <Form.Control
            type="text"
            disabled
            value={data1.exp}
          ></Form.Control>
           <br/>
         <label>Test Score</label>
          <Form.Control
             disabled
            type="text"
            value={data1.test}
          ></Form.Control>
           <br/>
           <label>Msc Score</label>
          <Form.Control
            type="text"
            disabled
            value={data1.mscCgpa}
          ></Form.Control>
           <br/>
          <div className='success'>
          {
              data.interpretation==="Candidate can not be hired."?
             <h3 style={{color:"red"}}>{data.interpretation}</h3> 
             : <h3 style={{color:"green"}}>{data.interpretation}</h3>
          }
          </div>
        </Form>
        </Modal.Body>
        <Modal.Footer>
     
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> 
       <div className="glass"> 
     <form onSubmit={(e) => handleSubmit(e)} className="glass__form">
        <h4>Employment Data</h4>
        <div className="glass__form__group">
          <input
            id="gender"
            className="glass__form__input"
            placeholder="Gender (1 = Male or 0 = Female)"
            required
            autoFocus
            min="0"
            max="1"
            pattern="[0-9]{0,1}"
            title="Gender must either be (1 = Male or 0 = Female)"
            type="number"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        <div className="glass__form__group">
          <input
            id="bsc"
            className="glass__form__input"
            placeholder="BSc CGPA (1.00 - 5.00)"
            required
            min="0"
            max="5"
            type="number"
            title="BSc CGPA must be in the range (1.00 - 5.00)"
            pattern="[0-9]+([\.,][0-9]+)?"
            step="0.01"
            value={bsc}
            onChange={(e) => setBsc(e.target.value)}
          />
        </div>

        <div className="glass__form__group">
          <input
            id="workex"
            className="glass__form__input"
            placeholder="Work Experience (1 = True or 0 = False)"
            required
            min="0"
            max="1"
            type="number"
            title="Work Experience must either be (1 = True or 0 = False)"
            value={workex}
            onChange={(e) => setWorkex(e.target.value)}
          />
        </div>

        <div className="glass__form__group">
          <input
            id="etest_p"
            className="glass__form__input"
            placeholder="E-Test Score (1.00 - 100.00)"
            required
            min="0"
            max="100"
            type="number"
            title="E-Test score must be in the range (1.00 - 100)"
            pattern="[0-9]+([\.,][0-9]+)?"
            step="0.01"
            value={etest_p}
            onChange={(e) => setEtest_p(e.target.value)}
          />
        </div>

        <div className="glass__form__group">
          <input
            id="msc"
            className="glass__form__input"
            placeholder="MSc CGPA (1.00 - 5.00)"
            required
            min="0"
            max="5"
            type="number"
            title="MSc CGPA must be in the range (1.00 - 5.00)"
            pattern="[0-9]+([\.,][0-9]+)?"
            step="0.01"
            value={msc}
            onChange={(e) => setMsc(e.target.value)}
          />
        </div>

        <div className="glass__form__group">
          <button type="submit" className="glass__form__btn">
               Predict
          </button>
        </div>
      </form> 

   
     </div> 
   </div> 
    
  )
}

export default Glass
