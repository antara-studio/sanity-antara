import store from '../store'
import * as THREE from 'three'
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Emitter } from '../events'
import { bindAll, qs, qsa, getTextures, map } from '../utils'
import { projectVertex, backgroundVertex } from '../glsl/vertex'
import {
  projectFragment,
  backgroundFragment,
  backgroundFragmentSingle,
} from '../glsl/fragment'
import { gsap } from 'gsap'

export default class ThreeController {
  constructor() {
    bindAll(this, 'run', 'resize', 'onHover', 'onLeave', 'onMove')

    this.isHome = qs('.is-home')
    this.isPage = qs('.page')
    this.isSingle = qs('.single')

    this.mouse = {}
    this.options = {
      strength: 0.15,
    }

    const colorSingle = this.isSingle ? this.isSingle.dataset.color : null
    const colorPage = this.isPage ? this.isPage.dataset.color : null

    if (this.isSingle) {
      if (colorSingle) {
        this.color = new THREE.Color(colorSingle)
      } else {
        this.color = new THREE.Color(0xcdb075)
      }
    }

    if (this.isPage) {
      if (colorPage) {
        this.color = new THREE.Color(colorPage)
      } else {
        this.color = new THREE.Color(0xcdb075)
      }
    }

    this.white = new THREE.Color(0xf5f5f5)

    this.init()
  }

  createScene() {
    const canvas = qs('.canvas')

    this.scene = new THREE.Scene()

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    })

    this.renderer.setSize(store.vw, store.vh)
    this.renderer.setPixelRatio = window.devicePixelRatio
    this.renderer.setClearColor(0xf5f5f5, 1)

    this.clock = new THREE.Clock()

    gsap.to(canvas, { duration: 1, autoAlpha: 1 })
  }

  createCamera() {
    this.camera = new THREE.OrthographicCamera(
      store.vw / -2,
      store.vw / 2,
      store.vh / 2,
      store.vh / -2,
      1,
      100,
    )

    this.camera.lookAt(this.scene.position)
    this.camera.position.z = 1
    this.fov = this.camera.fov
    this.scene.add(this.camera)

    this.viewSize = {
      width: store.vw,
      height: store.vh,
    }
  }

  movePlanes() {
    const { position } = this.background

    position.y = this.current
  }

  getBackgroundMesh() {
    const geometry = new THREE.PlaneBufferGeometry(store.vw, store.vw, 32, 32)
    const ratio = this.viewSize.width / this.viewSize.height

    this.uBackground = {
      uOffset: {
        value: new THREE.Vector2(),
      },
      uRes: {
        value: new THREE.Vector2(store.vw, store.vh),
      },
      uR1: {
        value: 0.0,
      },
      uR2: {
        value: 0.0,
      },
      uTime: {
        value: 0.0,
      },
      uColor: {
        value: new THREE.Vector3(this.color.r, this.color.g, this.color.b),
      },
    }

    const material = new THREE.ShaderMaterial({
      uniforms: this.uBackground,
      vertexShader: backgroundVertex,
      fragmentShader: this.isPage
        ? backgroundFragment
        : backgroundFragmentSingle,
      transparent: true,
    })

    // this.scale = new THREE.Vector3(ratio, 1, 1)
    // this.background.scale.copy(this.scale)

    this.background = new THREE.Mesh(geometry, material)
    this.scene.add(this.background)

    this.background.position.z = -0.2

    gsap.to(this.uBackground.uR1, {
      duration: 3,
      value: 0.32,
      delay: 0.15,
      ease: 'power2.inOut',
    })
    gsap.to(this.uBackground.uR2, {
      duration: 3,
      value: 0.21,
      ease: 'power2.inOut',
    })
  }

  getProjectMesh() {
    this.position = new THREE.Vector3(0, 0, 0)
    const geometry = new THREE.PlaneBufferGeometry(450, 600, 32, 32)
    const ratio = this.viewSize.width / this.viewSize.height

    this.uProjects = {
      uTexture: {
        value: null,
      },
      uOffset: {
        value: new THREE.Vector2(),
      },
      uAlpha: {
        value: 0,
      },
      uRes: {
        value: new THREE.Vector2(store.vw, store.vh),
      },
      uRatio: {
        value: new THREE.Vector2(),
      },
    }

    const material = new THREE.ShaderMaterial({
      uniforms: this.uProjects,
      vertexShader: projectVertex,
      fragmentShader: projectFragment,
      transparent: true,
    })

    this.plane = new THREE.Mesh(geometry, material)
    this.scene.add(this.plane)
  }

  loadTexture() {
    const app = window.app
    const obj = app.preload.projects
    const images = app.preload.projects.map((el) => el.image_l.image.asset.url)
    const loader = getTextures(images, obj)

    loader.then(() => {})
  }

  els() {
    this.projects = qsa('.work-link')
    this.wrapper = qs('.works')
  }

  run(e) {
    if (this.isHome && !store.sniff.isDevice) this.onMove(e.mouse)

    this.current = e.current
    this.renderer && this.renderer.render(this.scene, this.camera)
    this.uBackground.uTime.value = this.clock.getElapsedTime()

    this.movePlanes()
  }

  addEvents() {
    Emitter.on('tick', this.run)
    Emitter.on('GlobalResize', this.resize)

    if (this.isHome && !store.sniff.isDevice) {
      this.projects.forEach((el, index) => {
        el.addEventListener('mouseover', this.onHover.bind(this, index), false)
        // el.addEventListener('mousemove', this.onHover.bind(this, index), false)
      })

      this.wrapper.addEventListener(
        'mouseleave',
        this.onLeave.bind(this),
        false,
      )
    }
  }

  removeEvents() {
    Emitter.off('tick', this.run)
    Emitter.off('GlobalResize', this.resize)

    if (this.isHome && !store.sniff.isDevice) {
      this.projects.forEach((el, index) => {
        el.removeEventListener(
          'mouseover',
          this.onHover.bind(this, index),
          false,
        )
      })

      this.wrapper.removeEventListener(
        'mouseleave',
        this.onLeave.bind(this),
        false,
      )
    }
  }

  onMove(e) {
    this.mouse.x = (e.x / store.vw) * 2 - 1
    this.mouse.y = -(e.y / store.vh) * 2 + 1

    this.onMouseMove()
  }

  onMouseMove() {
    // let x = map(this.mouse.x, -1, 1, -this.viewSize.width / 2, this.viewSize.width / 2)

    // let y = map(this.mouse.y, -1, 1, -this.viewSize.height / 2, this.viewSize.height / 2)

    let x = this.mouse.x.map(
      -1,
      1,
      -this.viewSize.width / 2,
      this.viewSize.width / 2,
    )
    let y = this.mouse.y.map(
      -1,
      1,
      -this.viewSize.height / 2,
      this.viewSize.height / 2,
    )

    // update plane position
    this.position = new THREE.Vector3(x, y, -0.1)
    gsap.to(this.plane.position, {
      duration: 1,
      x: x,
      y: y,
      z: -0.1,
      ease: 'power4.out',
      onUpdate: this.onPositionUpdate.bind(this),
    })
  }

  onMouseEnter() {
    if (!this.currentItem || !this.isMouseOver) {
      if (this.mouse.x === -1 && this.mouse.y === 1) return
      this.isMouseOver = true
      // show plane
      gsap.to(this.uProjects.uAlpha, {
        duration: 0.5,
        value: 1,
        ease: 'power4.out',
      })
    }
  }

  onHover(index, el) {
    this.onMouseEnter()
    if (this.currentItem && this.currentItem.index === index) return
    this.onTargetChange(index)
  }

  onMouseLeave(e) {
    gsap.to(this.uProjects.uAlpha, {
      duration: 0.5,
      value: 0,
      ease: 'power4.out',
    })
  }

  onLeave(e) {
    this.isMouseOver = false
    this.onMouseLeave(e)
  }

  onPositionUpdate() {
    let offset = this.plane.position
      .clone()
      .sub(this.position) // velocity
      .multiplyScalar(-this.options.strength)
    this.uProjects.uOffset.value = offset
  }

  onTargetChange(index) {
    const app = window.app

    this.currentItem = app.preload.projects[index]

    if (!this.currentItem.texture) return

    this.uProjects.uTexture.value = this.currentItem.texture
    this.uProjects.uRatio.value.x = this.currentItem.texture.image.naturalWidth
    this.uProjects.uRatio.value.y = this.currentItem.texture.image.naturalHeight
  }

  resize() {
    this.camera.aspect = store.vw / store.vh

    this.camera.left = store.vw / -2
    this.camera.right = store.vw / 2
    this.camera.top = store.vh / 2
    this.camera.bottom = store.vh / -2

    this.camera.updateProjectionMatrix()
    this.renderer.setSize(store.vw, store.vh)
  }

  destroy() {
    this.removeEvents()
  }

  init() {
    this.els()
    this.createScene()
    this.createCamera()
    this.loadTexture()

    this.getBackgroundMesh()
    if (this.isHome && !store.sniff.isDevice) this.getProjectMesh()
    this.addEvents()
    this.resize()

    //this.controls = new OrbitControls(this.camera, this.renderer.domElement)
  }
}
