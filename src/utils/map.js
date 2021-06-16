/**
 *  function analogue Array.prototype.map
 * @template T, V
 * @param {function(element: T) : V} callback
 * @param {T[]} collection
 * @return {V[]}
 */
function map (callback, collection) {
  return collection.reduce((result, item) => {
    result.push(callback(item))
    return result
  }, [])
}

// example
console.log(map((item) => item + 1, [1, 2, 3])) // [2, 3, 4]
console.log([1, 2, 3].map((item) => item + 1)) // [2, 3, 4]
