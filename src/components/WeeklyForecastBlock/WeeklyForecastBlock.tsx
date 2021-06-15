import React, { useState, useEffect } from 'react'
import './ForecastBlock.css'
import SelectCity from '../SelectCity/SelectCity'
import PlugWeatherForecastCard from '../PlugWeatherForecastCard/PlugWeatherForecastCard'
import { IDayWeather } from '../../constants'
import DailyForecastBlock from '../WeeklyForecastGroup/WeeklyForecastGroup'
import { fetchWeekWeather } from '../../requestWeather'
import { getSelectCity } from '../../utils'

function WeeklyForecastBlock () {
  const [city, setCity] = useState<string>('')
  const [forecast, setForecast] = useState<IDayWeather[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (city.length) {
      const selectedCity = getSelectCity(city)
      fetchWeekWeather(selectedCity, setForecast, setLoading).then()
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
