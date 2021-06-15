import { cityArr } from './constants'

/*
* формат строки введеный пользователем превращает в формат ISO для работы с Date()
* day/month/year || day.month.year || day-month-year => year-month-day
* */
export function stringToFormatDate (inputDate: string): string {
  const arr = inputDate.split(/[- /.]/)
  return arr[2] + '-' + arr[1] + '-' + arr[0]
}

/*
* формат строки ISO, полученный из стандартного инпута даты, превращает в формат из макета
* year-month-day => day/month/year
* */
export function dateToFormatString (dateISO: string): string {
  if (dateISO) {
    const arr = dateISO.split(/[- /.]/)
    return arr[2] + '/' + arr[1] + '/' + arr[0]
  }
  return ''
}

export const getSelectCity = (cityName: string) => {
  const index: number = cityArr.findIndex(city => city.name === cityName)
  return cityArr[index]
}
