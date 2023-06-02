/* 3D
   Some helpfull functions for 3d 
   ========================================================================== */

import store from '../store'

export const viewSize = (camera, aspectRatio) => {
  // https://gist.github.com/ayamflow/96a1f554c3f88eef2f9d0024fc42940f

  let distance = camera.position.z
  let vFov = (camera.fov * Math.PI) / 180
  let height = 2 * Math.tan(vFov / 2) * distance
  let width = height * aspectRatio

  return { width, height, vFov }
}
