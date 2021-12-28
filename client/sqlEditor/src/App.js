import logo from './logo.svg';
import './App.css';

function url(address) {
  return `http://localhost:3000/${address}`
}

function App() {
  const handleSubmit = (e) => {
    const sqlInput = document.getElementById('sqlInput')
    console.log(sqlInput.value)
  }
  return (
    <div className='main'>
      <textarea id='sqlInput' name='sqlInput' rows='10' cols='50' placeholder='Enter sql here'></textarea>
      <button id='submit' onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
