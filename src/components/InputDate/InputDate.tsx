import React from 'react'
import './InputDate.css'
import { dateToFormatString } from '../../utils'

function InputDate (props: any) {
  return (
    <div className="date select">
      <input className="date__input" type="date" onChange={(e) => props.setDate(dateToFormatString(e.target.value))}/>
      <input className="date__head"
             value={props.date}
             placeholder="Select date"
             pattern="^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](2021)$"
             onChange={(e) => props.setDate(e.target.value)}/>
    </div>
  )
}

export default InputDate
