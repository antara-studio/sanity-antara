/* Is
   const isString = is('string', 'jojo') 
   ========================================================================== */


  export function is(type, val) {
    switch(type) {
      case 'string': 
        return typeof val === 'string'
        break;
      case 'object': 
        return val === Object(val)
        break;
      case 'array': 
        return val.constructor === Array
        break;
      case 'def': 
        return val !== undefined
        break;
      case 'undef': 
        return val === undefined
        break;
    }
  }

