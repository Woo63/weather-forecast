import React from 'react'
import DailyWeatherForecastCard from './DailyWeatherForecastCard'
import { IDayWeather } from '../assets/cityArray'

function DailyForecastBlock (props: any) {
  return (
    <div className="containerBlock">
      <div className="dailyForecastBlock">
        {props.forecast.map((item: IDayWeather, index: number) => <DailyWeatherForecastCard forecast={item} className={'now'} key={index}/>)}
      </div>
    </div>
  )
}

export default DailyForecastBlock
