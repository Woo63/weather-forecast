import React, { useEffect, useState } from 'react'
import '../WeekForecast/ForecastBlock.css'
import SelectCity from '../SelectCity/SelectCity'
import WeatherPlaceholder from '../WeatherPlaceholder/WeatherPlaceholder'
import { IDayWeather, months, patternInputDate } from '../../constants'
import WeatherCard from '../WeatherCard/WeatherCard'
import InputDate from '../InputDate/InputDate'
import { stringToFormatDate, getSelectedCity } from '../../utils/utils'
import { fetchPastWeather } from '../../RequestWeather'

function PastDateForecast () {
  const [city, setCity] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [time, setTime] = useState<string>('')
  const [forecast, setForecast] = useState<IDayWeather>({
    temp: 0,
    icon: '',
    date: ''
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [dateForCard, setDateForCard] = useState<string>('')

  useEffect(() => {
    if (city.length && date.length) {
      const selectedCity = getSelectedCity(city)
      fetchPastWeather(selectedCity, time, setForecast, setLoading, dateForCard).then()
    }
  }, [city, time])

  useEffect(() => {
    const regExpDate = new RegExp(patternInputDate)
    if (regExpDate.exec(date)) {
      const selectedDate = new Date(stringToFormatDate(date))
      const nowDate = new Date()
      // проверка на попадание в нужные 5 дней, это 432000000мс
      if (nowDate.getTime() - selectedDate.getTime() < 432000000) {
        setDateForCard(selectedDate.getDate() + ' ' + months[selectedDate.getMonth()] + ' ' + selectedDate.getFullYear())
        setTime((selectedDate.getTime() / 1000).toString())
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
          ? <WeatherCard forecast={forecast} className={'past'}/>
          : <WeatherPlaceholder/>
      }
    </section>
  )
}

export default PastDateForecast
