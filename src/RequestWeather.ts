import { API_KEY, ICity, IDayWeather, months, IResponseAPI, IDayWeatherAPI } from './constants'

export const fetchPastWeather = async (selectedCity: ICity, time: string, setForecast: (arg: IDayWeather) => void, setLoading: (arg: boolean) => void, dateForCard: string) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${selectedCity.latitude}&lon=${selectedCity.longitude}&dt=${time}&units=metric&appid=${API_KEY}`
    )
    const pastDayWeather = await response.json()
    setForecast({ temp: Math.floor(pastDayWeather.current.temp), date: dateForCard, icon: pastDayWeather.current.weather[0].icon })
    setLoading(true)
  } catch (e) {
    console.log(e.message)
  }
}

export function getWeeklyForecast (responseAPI: IResponseAPI): IDayWeather[] {
  const nowDate = new Date()
  const weatherForecast: IDayWeather[] = []
  responseAPI.daily.map((dayWeather: IDayWeatherAPI, index: number) =>
    weatherForecast.push({
      temp: Math.floor(dayWeather.temp.day),
      icon: dayWeather.weather[0].icon,
      date: nowDate.getDate() + index + ' ' + months[nowDate.getMonth()] + ' ' + nowDate.getFullYear()
    }))
  return weatherForecast
}

export const fetchWeekWeather = async (selectedCity: ICity, setForecast: (arg: IDayWeather[]) => void, setLoading: (arg: boolean) => void) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${selectedCity.latitude}&lon=${selectedCity.longitude}&units=metric&exclude=hourly,alerts,minutely,current&appid=${API_KEY}`
    )
    const weekWeather = await response.json()
    setForecast(getWeeklyForecast(weekWeather))
    setLoading(true)
  } catch (e) {
    console.log(e.message)
  }
}
