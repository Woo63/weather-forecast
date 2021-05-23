import React, { useEffect, useState } from 'react'
import DailyWeatherForecastCard from './DailyWeatherForecastCard'
import { IDayWeather } from '../assets/cityArray'

function DailyForecastBlock (props: any) {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0)
  const [showButton, setShowButton] = useState<boolean>(true)
  const [disabledNext, setDisabledNext] = useState<boolean>(false)
  const [disabledPrev, setDisabledPrev] = useState<boolean>(true)
  function changeDayIndex (next: boolean):void {
    if (next) {
      if (selectedDayIndex < 5) {
        setSelectedDayIndex(selectedDayIndex + 1)
        if (selectedDayIndex + 1 === 5) {
          setDisabledNext(true)
        }
        if (disabledPrev) setDisabledPrev(false)
      }
    } else {
      if (selectedDayIndex > 0) {
        setSelectedDayIndex(selectedDayIndex - 1)
        if (selectedDayIndex - 1 === 0) {
          setDisabledPrev(true)
        }
        if (disabledNext) setDisabledNext(false)
      }
    }
  }
  function showArrow ():void {
    if ((document.documentElement.clientWidth > 1400) && (!showButton)) {
      setShowButton(true)
    }
    if ((showButton) && (document.documentElement.clientWidth < 1400)) {
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
    showArrow()
    window.addEventListener('resize', showArrow)
  })
  return (
    <div className="containerBlock">
      <div className="dailyForecastBlock">
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

export default DailyForecastBlock
