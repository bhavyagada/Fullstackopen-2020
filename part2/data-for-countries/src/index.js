import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

const Filter = ({search, handleChange}) => <div>find countries <input value={search} onChange={handleChange}/></div>

const Display = ({search, countries, showButton}) => {
  const filtered = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <diV> 
      {
        filtered.length > 10 ? <p>Too many matches, specify another filter</p> : filtered.length === 1 ?
        <div>
          <h1>{filtered[0].name}</h1>
          <p>Capital {filtered[0].capital}</p>
          <p>Population {filtered[0].population}</p>
          <h2>Languages</h2>
          <ul> { filtered[0].languages.map(lang => <li key={lang.name}>{lang.name}</li>) } </ul>
          <img src={filtered[0].flag} alt='Flag' style={{width: 200, height: 200}} />
        </div>
        :
        <ul style={{listStyle:'none', padding: 0}}>
          { 
            filtered.map(result => 
                <li key={result.name}> {result.name} <button onClick={() => showButton(result.name)}>show</button></li>
            )
          }
        </ul>
      } 
    </diV>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchName, setSearch] = useState('')
  
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleChange = (event) => setSearch(event.target.value)
  const showButton = (name) => setSearch(name)

  return (
    <div className="App">
      <Filter search={searchName} handleChange={handleChange}/>
      <h2>Countries</h2>
      <Display search={searchName} countries={countries} showButton={showButton}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));