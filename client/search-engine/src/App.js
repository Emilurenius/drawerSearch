import logo from './logo.svg';
import React, { useCallback, useState } from 'react'
import './App.css';

const url = (path) => {
  const origin = new URL(document.location).origin
  //return `${origin}${path}`
  return `http://172.16.2.108:3000${path}`
}

const ResultField = (props) => {

  return (
    <div className='resultField'>
      <p className='componentName'>{props.componentName}</p>
      {/* <p className='component'>Ligger i hylle {props.drawerID}. Hyllen lyser grønt</p>
      <p className='componentDesc'>{props.componentDesc}</p> */}
    </div>
  )
}

const SearchBar = (props) => {
  const [results, setResults] = useState({})
  const search = async (e) => {
    const searchText = document.getElementById('searchText')
    console.log(searchText.value)
    searchText.value = ''

    const res = await fetch(url('/static/json/drawerData.json'))
    const drawersData = await res.json()
    console.log(drawersData)
    const data = {
      'componentName': 'Component'
    }
    setResults((results) => data)
    props.searchCallback(results)
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('Enter key pressed')
      search()
    }
  }
  return (
    <div>
      <input type='text' placeholder='Søk her' id='searchText' onKeyDown={handleKeyDown}></input>
      <button className='btnSubmit' onClick={search}>Søk</button>
    </div>
  )
}

function App() {
  const [results, setResults] = useState({})
  const searchCallback = useCallback((results) => {
    setResults(results)
    console.log(results)
  }, [])
  return (
    <div className="App">
      <p className='header'>Drawer search</p>
      <SearchBar searchCallback={searchCallback} />
      <ResultField componentName={results.componentName} />
    </div>
  );
}

export default App;