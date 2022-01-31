import logo from './logo.svg';
import React, { useCallback, useState } from 'react'
import './App.css';

const url = (path) => {
  const origin = new URL(document.location).origin
  return `${origin}${path}`
  //return `http://172.16.2.108:3000${path}`
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

  const displayResults = (results, drawersData) => {
    const resultsContainer = document.getElementById('resultsContainer')
    resultsContainer.innerHTML = ''
    for (let i=results.highest;i>0;i--) {
      for (let item in results[i]) {
        const container = document.createElement('div')
        container.className = 'resultField'
        const component = document.createElement('button')
        component.onclick = (e) => {
          fetch(url(`/activateDrawer?pixelCoords=${results[i][item]}`))
        }
        component.innerHTML = drawersData[results[i][item]].displayName
        container.appendChild(component)
        resultsContainer.appendChild(container)
      }
    }
  }

  const search = async (e) => {
    const searchBox = document.getElementById('searchText')
    const searchText = searchBox.value.toLowerCase()
    searchBox.value = ''

    const res = await fetch(url('/static/json/drawerData.json'))
    const drawersData = await res.json()
    //console.log(drawersData)

    let matchResults = {'highest': 0}
    for (const [k, v] of Object.entries(drawersData)) {
      let matches = 0

      for (let i in v.searchTerms) {
        if (searchText.includes(v.searchTerms[i])) {
          matches ++
        }
      }

      if (matches > matchResults.highest) {
        matchResults.highest = matches
      }

      if (!(matches in matchResults)) {
        matchResults[matches] = []
      }
      matchResults[matches].push(k)
    }

    displayResults(matchResults, drawersData)
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
      <div id='resultsContainer'></div>
    </div>
  );
}

export default App;