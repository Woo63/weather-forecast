import React from 'react'
import './InputDate.css'

function InputDate (props: any) {
  function changeDateToString (date: string): string {
    if (date) {
      const arr = date.split(/[- /.]/)
      return arr[2] + '/' + arr[1] + '/' + arr[0]
    }
    return ''
  }

  return (
    <div className="date select">
      <input className="date__input" type="date" onChange={(e) => props.setDate(changeDateToString(e.target.value))}/>
      <input className="date__head"
             value={props.date}
             placeholder="Select date"
             pattern="^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](2021)$"
             onChange={(e) => props.setDate(e.target.value)} onSubmit={() => console.log('submit')}/>
    </div>
  )
}

export default InputDate
