
import './App.css';
import Header from './Header';
import { useState, useRef } from 'react';



function App() {
  const clipboardtext = useRef();
  let resultList = document.getElementById('resultlist');
  const [selectedOperator, setselectedOperator] = useState('');
  const [list1, setList1] = useState('');
  const [list2, setList2] = useState('');
  let arithemeticResult = [];



  const [OperatorMessage, setOperatorMessage] = useState("")

  function coptytoclipboard(e) {



    navigator.clipboard.writeText(clipboardtext.current.value);



  }









  function handleChange(event) {
    setselectedOperator(event.target.value);

    if ((list1 === "") || (list2 === "")) {
      alert("Please insert operands");
    }
    else {
      let list1array = list1.split('\n')
      let list2array = list2.split('\n')
      resultList.value = "";
      arithemeticResult = [];


      const trimmedlist1array = list1array.map((element) => {
        return element.trim();
      });
      const trimmedlist2array = list2array.map((element) => {
        return element.trim();
      });


      let operand1 = trimmedlist1array;
      let operand2 = trimmedlist2array;


      switch (event.target.value) {
        case "+":
          setOperatorMessage("You are adding all the contents of List 2 to List 1. The result will be every list-item in List1 and List 2. There will be no duplicates.");
          let res = operand1.concat(operand2);
          arithemeticResult = [...new Set(res)];


          arithemeticResult.forEach((element) => {

            resultList.value += element + '\n';
          });






          break;
        case "-":
          setOperatorMessage("You are removing everything that is in List 2 from List 1. The result shows every list-item in List 1 that was not in List 2.");
          arithemeticResult = operand1.filter(item => !operand2.includes(item));

          arithemeticResult.forEach((element) => {
            resultList.value += element + '\n';
          });

          break;

        case "x":
          setOperatorMessage("This combines each list-item in List 2 to each list-item in List 1");


          for (let i = 0; i < operand1.length; i++) {
            for (let j = 0; j < operand2.length; j++) {
              arithemeticResult.push(operand1[i] + operand2[j]);
            }
          }
          arithemeticResult.forEach((element) => {
            resultList.value += element + '\n';
          });
          break;


      }
    }


  }

  function handleList1Change(event) {
    setList1(event.target.value);
  }

  function handleList2Change(event) {
    setList2(event.target.value);
    console.log(list1);
  }


  return (
    <div className="App">
      <Header />

      <div id='Operators'>
        <div className='operators-up'>
          <div className='operator-group'>
            <label>
              <input type="radio" name="operand" value="+" onChange={handleChange} />
              Plus
            </label>
            <label>
              <input type="radio" name="operand" value="-" onChange={handleChange} />
              Subtract
            </label>
            <label>
              <input type="radio" name="operand" value="x" onChange={handleChange} />
              Multiply
            </label>

          </div>
        </div>


        <div className='operators-down'>

          <p><b><i>{OperatorMessage}</i></b></p>

        </div>


      </div>




      <div className="operands">
        <div className='list-div'>
          <label >List 1: (Operand 1)</label>

          <textarea id="list1" value={list1} onChange={handleList1Change} rows={12}></textarea>
        </div>

        <div className='list-div'>
          <label>List 2: (Operand 2)</label>

          <textarea id="list2" value={list2} onChange={handleList2Change} rows={12}></textarea>
        </div>


      </div>

      <div className='result-div'>
        <div className='result-div-container'>

          <div className='result-div-header'>
            <label >Result</label>
            <i className="far fa-copy" onClick={coptytoclipboard}></i>
          </div>

          <textarea rows={15} id="resultlist" ref={clipboardtext}></textarea>
        </div>
      </div>

    </div>
  );
}

export default App;
