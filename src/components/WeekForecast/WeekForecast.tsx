import React, { useState, useEffect } from 'react'
import './ForecastBlock.css'
import SelectCity from '../SelectCity/SelectCity'
import WeatherPlaceholder from '../WeatherPlaceholder/WeatherPlaceholder'
import { IDayWeather } from '../../constants'
import WeekWeatherCards from '../WeekWeatherCards/WeekWeatherCards'
import { fetchWeekWeather } from '../../RequestWeather'
import { getSelectedCity } from '../../utils/utils'

function WeekForecast () {
  const [city, setCity] = useState<string>('')
  const [forecast, setForecast] = useState<IDayWeather[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (city.length) {
      const selectedCity = getSelectedCity(city)
      fetchWeekWeather(selectedCity, setForecast, setLoading).then()
    }
  }, [city])

  return (
    <section className="forecastBlock">
      <h2 className="forecastBlock__title">7 Days Forecast</h2>
      <SelectCity setCity={setCity}/>
      {
        (loading)
          ? <WeekWeatherCards forecast={forecast}/>
          : <WeatherPlaceholder/>
      }
    </section>
  )
}

export default WeekForecast
