import React, { useEffect, useState } from 'react'
import '../WeeklyForecastBlock/ForecastBlock.css'
import SelectCity from '../SelectCity/SelectCity'
import PlugWeatherForecastCard from '../PlugWeatherForecastCard/PlugWeatherForecastCard'
import { API_KEY, cityArr, IDayWeather, months } from '../../assets/constants'
import DailyWeatherForecastCard from '../OneDayForecastCard/OneDayForecastCard'
import InputDate from '../InputDate/InputDate'

function PastForecastBlock () {
  const [city, setCity] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [time, setTime] = useState<string>('')
  const [forecast, setForecast] = useState<IDayWeather | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [dateForCard, setDateFarCard] = useState<string>('')
  useEffect(() => {
    if ((city.length) && (date.length)) {
      const index: number = cityArr.findIndex(item => item.name === city)
      const selectedCity = cityArr[index]
      const fetchWeather = async () => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${selectedCity.latitude}&lon=${selectedCity.longitude}&dt=${time}&units=metric&appid=${API_KEY}`
          )
          const data = await response.json()
          setForecast({ temp: Math.floor(data.current.temp), date: dateForCard, icon: data.current.weather[0].icon })
          setLoading(true)
        } catch (e) {
          console.log(e.message)
        }
      }
      fetchWeather()
    }
  }, [city, time])

  function stringToFormatDate () {
    const arr = date.split(/[- /.]/)
    return arr[2] + '-' + arr[1] + '-' + arr[0]
  }

  useEffect(() => {
    if ((/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](2021)/).exec(date)) {
      const newDate = new Date(stringToFormatDate())
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
