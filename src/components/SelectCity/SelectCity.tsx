import React, { useEffect, useState } from 'react'
import { cityArr } from '../../constants'
import './SelectCity.css'

function SelectCity (props : any) {
  const [show, setShow] = useState<boolean>(false)
  const [classNameArrow, setClassNameArrow] = useState<string>('select__head close')
  const [classNameUl, setClassNameUl] = useState<string>('select__list close')
  const [city, setCity] = useState<string>('Select city')
  const [textColor, setTextColor] = useState<{color : string}>({ color: '#8083A4' })

  function onSelectCity (selectEvent: React.FormEvent<EventTarget>): void {
    const target = selectEvent.target as HTMLInputElement
    setCity(cityArr[Number(target.id)].name)
    setTextColor({ color: '#2C2D76' })
  }

  useEffect(() => {
    if (city !== 'Select city') {
      props.setCity(city)
    }
  }, [city])

  if ((show) && (classNameArrow !== 'select__head')) {
    setClassNameArrow('select__head')
    setClassNameUl('select__list')
  } else if ((!show) && (classNameArrow !== 'select__head close')) {
    setClassNameArrow('select__head close')
    setClassNameUl('select__list close')
  }

  return (
        <div className="select" onClick={() => setShow(!show)}>
            <input className="select__input" type="hidden" name=""/>
            <div className={classNameArrow} style={textColor}> {city} </div>
            <ul className={classNameUl} onClick={(e) => onSelectCity(e)}>
                {cityArr.map((item, index) =>
                    <li className="select__item" key={index} id={index.toString()}>{item.name}</li>)}
            </ul>
        </div>
  )
}

export default SelectCity
