import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = '931ebe5bc66f93e3c0cc03d5bf530109'
const api_url = 'https://api.openweathermap.org/data/2.5/weather?q='

//https://api.openweathermap.org/data/2.5/weather?q=London&appid=931ebe5bc66f93e3c0cc03d5bf530109&units=metrics

function App() {

  // sync query/search bar value to empty after searching

  const [city, setCity] = useState('Macao')
  const [weather, setWeather] = useState({})
  const [warm, setWarm] = useState(false)
  const [haveData, setHaveData] = useState(false)

  useEffect(() => {
    fetchWeather()
  }, [])

  const fetchWeather = async () => {
    try {
      const res = await axios.get(`${api_url}${city}&appid=${api_key}&units=metric`)
      const result = await res.data
      setWeather(result)
      setCity('')
      if(typeof result.main !== "undefined") {
        setHaveData(true)
        if(result.main.temp > 18) {
          setWarm(true)
        } else {
          setWarm(false)
        }
      } else {
        setHaveData(false)
      }
      console.log(weather)      
    } catch (error) {
      setCity('')
    }
  }

  const searchCity = (e) => {
    if(e.key === "Enter" && city !== '') {
      fetchWeather()
    } 
  }

  const dateBuilder = (d) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const day = days[d.getDay()]
    const month = months[d.getMonth()]
    const year = d.getFullYear()
    return `${day} ${d.getDate()} ${month} ${year}`
  }

  return (
    <div className={warm ? "app warm" : "app"}>
      <main>
        <div className="search-container">
          <div className="search-bar">
            <input type="text" 
              onChange={(e) => {setCity(e.target.value)}}
              onKeyPress={searchCity}
              value={city}
            />
          </div>
        </div>
        { haveData ? (
          <div className="weather-container">
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="date">
              {dateBuilder(new Date())}
            </div>
            <div className="temp">
              {Math.floor(weather.main.temp)}ºC
            </div>
            <div className="weather">
              {weather.weather[0].main}
            </div>
          </div>) : ''
        }
      </main>
    </div>
  )
}

export default App;
