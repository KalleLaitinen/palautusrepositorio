import React, { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const handleChange = event => {
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])


  

  const showThis = (e, country) => {
    console.log(e)
    setSearchTerm(country.name)
  }




  const results = !searchTerm
    ? countries
    : countries.filter(country =>
      country.name.includes(searchTerm)
    )

  const results2 = results.length > 10
    ? (<div> Too many matches, specify another filter </div>)
    : (<div>{results.map((country, l) => <p key={l}>{country.name}
      <button onClick={e => showThis(e, country)}>Show</button>
    </p>
    )}
    </div>)

  const results3 = results.length > 1
    ? (<div>{results2}</div>)
    : (<div>{results.map((country, s) =>
      <div key={s}>
        <h2>{country.name}</h2>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h3>languages</h3>
        <ul>
          {country.languages.map((lang, i) => {
            return (<li key={i} >{lang.name}</li>)
          })}
        </ul>
        <p><img src={country.flag} alt="new" style={{ height: "100px" }} /></p>
        <h3>Weather in {country.capital}</h3>

      </div>)}

    </div>)





  return (
    <div>
      find countries<input value={searchTerm} onChange={handleChange} />
      {results3}


    </div>
  )

}

export default App