export function map (array, func) {
  return array.reduce((result, item) => array.push(func(result)), [])
}
