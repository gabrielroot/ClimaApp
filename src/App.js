import React,{useState,useEffect} from 'react'
require('dotenv').config()

const api ={
  key: process.env.REACT_APP_API_KEY,
  base: 'https://api.openweathermap.org/data/2.5/'
}


function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  useEffect(() => {
      getWeather('Januária') 
  }, [])

  function getWeather(search){
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
    .then(res => res.json())
    .then(result =>{
      setWeather(result)
    })
  }

  function search(evt) {
    if(evt.key === 'Enter'){
      getWeather(query)
      setQuery('')
    }
  }

  const dateBuilder = (d) => {
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    let days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    let day = days[d.getDay()]
    let month = months[d.getMonth()]
    let date = d.getDate()
    let year = d.getFullYear()

    return `${day}, ${date} de ${month} de ${year}`
  }

  return (
    <div className={(typeof weather.main != 'undefined')
      ?((weather.main.temp > 16)
        ? 'app warm' : 'app')
      :('app')
    }>
      <main>
        <div className='search-box'>
          <input 
            type='text'
            className='search-bar'
            placeholder='Buscar...'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={e => search(e)}
            />
        </div>

        {(typeof weather.main != 'undefined' ?
          <>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main === 'Rain' ? 'Sol' : 'Nuvens'}</div>
            </div>
          </>
          :(  //PADRÃO
            ''
          )
        )}
      </main>
    </div>
  );
}

export default App;
