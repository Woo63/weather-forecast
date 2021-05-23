import React from 'react'
import './OneDayForecastCard.css'

function OneDayForecastCard (props: any) {
  return (
      <div className={`dayWeatherCard ${props.className}`}>
        <span className="dayWeatherCard__date">{props.forecast.date}</span>
        <img src= {`http://openweathermap.org/img/wn/${props.forecast.icon}@2x.png`} alt="error" className={`dayWeatherCard__icon ${props.className}`}/>
        <h1 className="dayWeatherCard__temp">+{props.forecast.temp}°</h1>
      </div>
  )
}

export default OneDayForecastCard
