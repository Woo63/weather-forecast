import React, { useState, useEffect } from 'react'
import './ForecastBlock.css'
import SelectCity from '../SelectCity/SelectCity'
import PlugWeatherForecastCard from '../PlugWeatherForecastCard/PlugWeatherForecastCard'
import { cityArr, API_KEY, IDayWeather, months } from '../../assets/constants'
import DailyForecastBlock from '../WeeklyForecastGroup/WeeklyForecastGroup'

function WeeklyForecastBlock () {
  const [city, setCity] = useState<string>('')
  const [forecast, setForecast] = useState<IDayWeather[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  function getWeeklyForecast (data: any): IDayWeather[] {
    const date = new Date()
    const weatherForecast = []
    for (let i = 0; i < data.daily.length; i++) {
      weatherForecast.push({
        temp: Math.floor(data.daily[i].temp.day),
        icon: data.daily[i].weather[0].icon,
        date: date.getDate() + i + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()
      })
    }
    return weatherForecast
  }

  useEffect(() => {
    if (city.length) {
      const index: number = cityArr.findIndex(item => item.name === city)
      const selectedCity = cityArr[index]
      const fetchWeather = async () => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${selectedCity.latitude}&lon=${selectedCity.longitude}&units=metric&exclude=hourly,alerts,minutely,current&appid=${API_KEY}`
          )
          const data = await response.json()
          setForecast(getWeeklyForecast(data))
          setLoading(true)
        } catch (e) {
          console.log(e.message)
        }
      }
      fetchWeather()
    }
  }, [city])
  return (
    <section className="forecastBlock">
      <h2 className="forecastBlock__title">7 Days Forecast</h2>
      <SelectCity setCity={setCity}/>
      {
        (loading)
          ? <DailyForecastBlock forecast={forecast}/>
          : <PlugWeatherForecastCard/>
      }
    </section>
  )
}

export default WeeklyForecastBlock
