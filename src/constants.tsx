export interface ICity {
  name: string,
  latitude: number,
  longitude: number
}

export interface IDayWeather {
    temp: number,
    icon: string,
    date: string
}

export interface IDayWeatherAPI {
  temp: { day: number},
  weather: Array<{icon: string}>
}

export interface IResponseAPI {
  daily: Array<IDayWeatherAPI>,
  lat: number,
  lon: number,
  timezone: string,
  // eslint-disable-next-line camelcase
  timezone_offset: number
}

export const months: string[] = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

export const cityArr: ICity[] = [
  {
    name: 'Samara',
    latitude: 53.195873,
    longitude: 50.100193
  },
  {
    name: 'Saratov',
    latitude: 51.533557,
    longitude: 46.034257
  },
  {
    name: 'Kazan',
    latitude: 55.796127,
    longitude: 49.106405
  },
  {
    name: 'Krasnodar',
    latitude: 45.035470,
    longitude: 38.975313
  },
  {
    name: 'Togliatti',
    latitude: 53.507836,
    longitude: 49.420393
  }]

export const API_KEY: string = '373651eef091af2d1670e866f24aa876'

export const patternInputDate = '^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](2021)$'
