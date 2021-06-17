import React from 'react'
import './InputDate.css'
import { dateToFormatString } from '../../utils/utils'
import { patternInputDate } from '../../constants'

function InputDate (props: { date: string, setDate: (arg: string) => void}) {
  return (
    <div className="date select">
      <input className="date__input" type="date" onChange={(e) => props.setDate(dateToFormatString(e.target.value))}/>
      <input className="date__head"
             value={props.date}
             placeholder="Select date"
             pattern={patternInputDate}
             onChange={(e) => props.setDate(e.target.value)}/>
    </div>
  )
}

export default InputDate
