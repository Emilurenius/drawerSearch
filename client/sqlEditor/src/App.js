import logo from './logo.svg';
import './App.css';

function url(address) {
  return `http://localhost:3001/${address}`
}

function SqlInput() {
  const handleSubmit = (e) => {
    const sqlInput = document.getElementById('sqlInput')
    console.log(sqlInput.value)
    fetch(url(`sendQuery?sqlQuery=${sqlInput.value}`))
      .then(response => response.json())
      .then(data => {
        document.getElementById('sqlResponseText').innerHTML = JSON.stringify(data)
        console.log(data)
      })
      //.then(data => document.getElementById('sqlResponseText').innerHTML = data)
    sqlInput.value = ''
  }
  return (
    <div className="container">
      <textarea id='sqlInput' name='sqlInput' rows='10' cols='50' placeholder='Enter sql here'></textarea>
      <button id='submit' onClick={handleSubmit}>Submit</button>
    </div>
  )
}

function SqlResponse() {
  return (
    <div className='container'>
      <p id='sqlResponseText'></p>
    </div>
  )
}

function App() {
  return (
    <div className='main'>
      <SqlInput />
      <SqlResponse />
    </div>
  );
}

export default App;
