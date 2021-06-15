import React, { useEffect, useState } from 'react'
import '../WeeklyForecastBlock/ForecastBlock.css'
import SelectCity from '../SelectCity/SelectCity'
import PlugWeatherForecastCard from '../PlugWeatherForecastCard/PlugWeatherForecastCard'
import { IDayWeather, months } from '../../constants'
import DailyWeatherForecastCard from '../OneDayForecastCard/OneDayForecastCard'
import InputDate from '../InputDate/InputDate'
import { fetchPastWeather } from '../../requestWeather'
import { stringToFormatDate, getSelectCity } from '../../utils'

function PastForecastBlock () {
  const [city, setCity] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [time, setTime] = useState<string>('')
  const [forecast, setForecast] = useState<IDayWeather | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [dateForCard, setDateFarCard] = useState<string>('')

  useEffect(() => {
    if ((city.length) && (date.length)) {
      const selectedCity = getSelectCity(city)
      fetchPastWeather(selectedCity, time, setForecast, setLoading, dateForCard).then()
    }
  }, [city, time])

  useEffect(() => {
    if ((/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](2021)/).exec(date)) {
      const newDate = new Date(stringToFormatDate(date))
      const nowDate = new Date()
      // проверка на попадание в нужные 5 дней, это 432000000мс
      if (nowDate.getTime() - newDate.getTime() < 432000000) {
        setDateFarCard(newDate.getDate() + ' ' + months[newDate.getMonth()] + ' ' + newDate.getFullYear())
        setTime((newDate.getTime() / 1000).toString())
      } else console.log('Более пяти дней назад')
    }
  }, [date])

  return (
    <section className="forecastBlock">
      <h2 className="forecastBlock__title">Forecast for a Date in the Past</h2>
      <div className="selectBlock">
        <SelectCity setCity={setCity}/>
        <InputDate date={date} setDate={setDate}/>
      </div>
      {
        (loading)
          ? <DailyWeatherForecastCard forecast={forecast} className={'past'}/>
          : <PlugWeatherForecastCard/>
      }
    </section>
  )
}

export default PastForecastBlock
