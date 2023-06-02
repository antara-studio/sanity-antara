/* Listener
   listener(document, 'add', 'click', ()=>, false)
   ========================================================================== */

  export function listener(el, action, type, cb, p) {
    const l = el.length
    const passive = p === true ? { passive: true } : false;

    if(l !== 0) {
      for (let i = 0; i < l; i++) { 
        el[i][action + 'EventListener'](type, cb, passive)
      }
    } else {
      el[action + 'EventListener'](type, cb, passive)
    }
  }

  

