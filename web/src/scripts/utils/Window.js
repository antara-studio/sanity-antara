/* Get Width and Height
   ========================================================================== */

export const getViewport = () => {
  let el = window
  let a = 'inner'
  if (!('innerWidth' in window)) {
    a = 'client'
    el = document.documentElement || document.body
  }
  return { width: el[`${a}Width`], height: el[`${a}Height`] }
}

/* Window breakpoints
     Should match with CSS breakpoints in settings.scss
     ========================================================================== */

export const getWindowSizes = () => {
  return {
    XS: window.innerWidth <= 500,
    S: window.innerWidth <= 749,
    S_UP: window.innerWidth >= 501,
    M: window.innerWidth <= 1023,
    M_UP: window.innerWidth >= 750,
    L: window.innerWidth >= 1024,
  }
}

/* VH Helper for mobile 100vh
     Needs to be updated on resize
     ========================================================================== */

export const setViewportCSSVar = () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}
