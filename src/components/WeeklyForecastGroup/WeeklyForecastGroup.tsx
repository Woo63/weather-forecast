import React, { useEffect, useState } from 'react'
import DailyWeatherForecastCard from '../OneDayForecastCard/OneDayForecastCard'
import { IDayWeather } from '../../assets/constants'
import './WeeklyForecastGroup.css'

function WeeklyForecastGroup (props: any) {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0)
  const [showButton, setShowButton] = useState<boolean>(true)
  const [disabledNext, setDisabledNext] = useState<boolean>(false)
  const [disabledPrev, setDisabledPrev] = useState<boolean>(true)
  const rightBound: number = 5
  const leftBound: number = 0
  function changeDayIndex (next: boolean):void {
    if (next) {
      if (selectedDayIndex < rightBound) {
        setSelectedDayIndex(selectedDayIndex + 1)
        if (selectedDayIndex + 1 === rightBound) {
          setDisabledNext(true)
        }
        if (disabledPrev) setDisabledPrev(false)
      }
    } else {
      if (selectedDayIndex > leftBound) {
        setSelectedDayIndex(selectedDayIndex - 1)
        if (selectedDayIndex - 1 === leftBound) {
          setDisabledPrev(true)
        }
        if (disabledNext) setDisabledNext(false)
      }
    }
  }
  const desktopWidthThreshold = 1400
  function showArrows ():void {
    if ((document.documentElement.clientWidth > desktopWidthThreshold) && (!showButton)) {
      setShowButton(true)
    }
    if ((showButton) && (document.documentElement.clientWidth < desktopWidthThreshold)) {
      setShowButton(false)
    }
  }
  function selectedFormCard (index: number, item: IDayWeather): any {
    if (showButton) {
      if ((index >= selectedDayIndex) && (index < selectedDayIndex + 3)) return <DailyWeatherForecastCard forecast={item} className={'now'} key={index}/>
    } else {
      return <DailyWeatherForecastCard forecast={item} className={'now'} key={index}/>
    }
  }
  useEffect(() => {
    showArrows()
    window.addEventListener('resize', showArrows)
  })
  return (
    <div className="dailyForecastBlock">
      <div className="dailyForecastBlock__cards">
        {props.forecast.map((item: IDayWeather, index: number) => selectedFormCard(index, item))}
      </div>
      {
        (showButton)
          ? <>
            <button className="dailyForecastBlock__control prev" onClick={() => changeDayIndex(false)} disabled={disabledPrev}/>
            <button className="dailyForecastBlock__control next" onClick={() => changeDayIndex(true)} disabled={disabledNext}/>
            </>
          : <></>
      }
    </div>
  )
}

export default WeeklyForecastGroup
