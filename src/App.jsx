import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [data, setData] = useState({})
  const [town, setTown] = useState('London')

  const key = 'd500fe891d1b4069813a94fd9456c602'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&units=metric&appid=${key}`


  useEffect(() => {
    axios.get(url).then(res => setData(res.data))
  },[])

  const searchWeather = (e) => {
    if (e.key === 'Enter') {
      // fetch(url)
      //   .then(res => res.json())
      //   .then(response => {
      //     console.log(response);
      //     setData(response)
      //   })
      axios.get(url).then(res =>  setData(res.data))
      setTown('')
      console.log(data);
    }

    setTown('')
  }


  return (
    <>
      <div className="app">
        <div className="inp-field"
          value={town}
          onChange={(e) => setTown(e.target.value)}
          onKeyDown={searchWeather}
          aria-placeholder='Enter location'
        >
          <input type="text" />
        </div>
      </div>
      <div className="container">
        <div className="header">
          <div className="city">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? (
              <h1>{data.main.temp.toFixed()}'C</h1>
            ) : null}
          </div>
          <div className="desc">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name !== 'undefined' && (

          <div className="footer">
            <div className="feels">
              {data.main && (
                <p className="bold">
                  {data.main.feels_like.toFixed()}
                </p>

              )}
              <p>Feels like:</p>
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="bold">
                  {data.main.humidity}%
                </p>
              ): null}
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">
                  {data.wind.speed} m/s
                </p>
              ): null}
              <p>Wind</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App
