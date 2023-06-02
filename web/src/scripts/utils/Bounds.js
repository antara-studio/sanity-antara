/* Bounds
   const top = bounds(el).top
   ========================================================================== */

export const bounds = (el) => {
  const bounds = el.getBoundingClientRect()

  return {
    bottom: bounds.bottom,
    left: bounds.left,
    height: bounds.height,
    right: bounds.right,
    top: bounds.top,
    width: bounds.width,
    x: bounds.x,
    y: bounds.y,
  }
}
