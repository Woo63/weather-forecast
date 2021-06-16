/**
 *  function analogue Array.prototype.filter
 * @template T
 * @param {function(element: T) : boolean} predicate
 * @param {T[]} collection
 * @return {T[]}
 */
function filter (predicate, collection) {
  return collection.reduce((result, item) => {
    if (predicate(item)) result.push(item)
    return result
  }, [])
}

// example
console.log(filter((item) => item > 2, [1, 2, 3])) // [3]
console.log([1, 2, 3].filter((item) => item > 2)) // [3]
