import React, { useState, useEffect } from 'react'
import SelectCity from './SelectCity'
import PlugWeatherForecastCard from './PlugWeatherForecastCard'
import { cityArr, API_KEY, IDayWeather, months } from '../assets/cityArray'
import DailyForecastBlock from './DailyForecastBlock'

function NearlyForecastBlock () {
  const [city, setCity] = useState<string>('')
  const [forecast, setForecast] = useState<IDayWeather[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    if (city.length) {
      const index : number = cityArr.findIndex(item => item.name === city)
      const selectedCity = cityArr[index]
      const fetchWeather = async () => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${selectedCity.latitude}&lon=${selectedCity.longitude}&units=metric&exclude=hourly,alerts,minutely,current&appid=${API_KEY}`
          )
          const data = await response.json()
          const date = new Date()
          const weatherForecast = []
          for (let i = 0; i < data.daily.length; i++) {
            weatherForecast.push({ temp: Math.floor(data.daily[i].temp.day), icon: data.daily[i].weather[0].icon, date: date.getDate() + i + ' ' + months[date.getMonth()] + ' ' + date.getFullYear() })
          }
          setForecast(weatherForecast)
          setLoading(true)
        } catch (e) {
          console.log(e.message)
        }
      }
      fetchWeather()
    }
  }, [city])
  return (
      <div className="forecastBlock">
          <h2 className="forecastBlock__title">7 Days Forecast</h2>
          <SelectCity setCity={setCity}/>
        {
          (loading)
            ? <DailyForecastBlock forecast={forecast} />
            : <PlugWeatherForecastCard/>
        }
      </div>
  )
}

export default NearlyForecastBlock
