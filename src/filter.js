export function filter (array, func) {
  return array.reduce((result, item) => { return (func(item)) ? result.push(item) : result }, [])
}
