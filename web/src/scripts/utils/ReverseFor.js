export const reverseForIn = (obj) => {
  var arr = []
  var newobj = {}
  let j = 0

  for (var key in obj) {
    // add hasOwnPropertyCheck if needed
    arr.push(key)
  }
  for (var i = arr.length - 1; i >= 0; i--) {
    f(obj, arr[i])
  }

  function f(a, b) {
    const nr = parseInt(b)

    //console.log(nr == NaN)
    //console.log(typeof nr === 'number')

    if (typeof nr === 'number') {
      newobj[j] = a[b]

      j++
    }
  }

  return newobj
}
