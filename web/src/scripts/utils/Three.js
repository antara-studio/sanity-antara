import * as THREE from 'three'

const loadTexture = (loader, url, index) => {
  // https://threejs.org/docs/#api/en/loaders/TextureLoader
  return new Promise((resolve, reject) => {
    if (!url) {
      resolve({ texture: null, index })
      return
    }
    loader.load(
      url,
      (texture) => {
        resolve({ texture, index })
      },
      undefined,
      (error) => {
        console.error('An error happened.', error)
        reject(error)
      },
    )
  })
}

export const getTextures = (textures, obj) => {
  const loader = new THREE.TextureLoader()

  let promises = []

  textures.forEach((el, index) => {
    const src = textures[index]
    promises.push(loadTexture(loader, src ? src : null, index))
  })

  return new Promise((resolve, reject) => {
    Promise.all(promises).then((promises) => {
      promises.forEach((promise, index) => {
        obj[index].texture = promise.texture
        obj[index].index = index
      })
      resolve()
    })
  })
}
