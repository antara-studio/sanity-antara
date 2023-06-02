import { Raf } from '../events'
import { listener, bindAll } from '../utils'
import { Renderer, Camera, Transform, Box, Program, Mesh, Orbit } from 'ogl'

export default class OglController extends Raf {
  constructor() {
    super()

    bindAll(this, 'onRaf', 'resize')

    this.renderer = new Renderer({ dpr: 2 })
    this.gl = this.renderer.gl
    this.camera = new Camera(this.gl)
    this.camera.position.z = 5

    this.controls = new Orbit(this.camera)
    this.scene = new Transform()

    document.body.appendChild(this.gl.canvas)

    this.init()
  }

  setup() {
    const vertex = `
      attribute vec3 position;

      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;

      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `
    const fragment = `
      void main() {
        gl_FragColor = vec4(1.0);
      }
    `

    const geometry = new Box(this.gl)
    const program = new Program(this.gl, {
      vertex: vertex,
      fragment: fragment,
    })

    this.mesh = new Mesh(this.gl, { geometry, program })
    this.mesh.setParent(this.scene)
  }

  onRaf() {
    const scene = this.scene
    const camera = this.camera

    this.controls.update()
    // this.mesh.rotation.y -= 0.04;
    // this.mesh.rotation.x += 0.03;
    this.renderer.render({ scene, camera })
  }

  on() {
    listener(window, 'add', 'resize', this.resize, false)
  }

  resize() {
    this.renderer.setSize(store.vw, store.vh)
    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height,
    })
  }

  init() {
    this.on()
    this.setup()
    this.resize()
  }
}
