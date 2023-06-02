import store from '../store'

import Raf from './Raf'
import Emitter from './Emitter'
import { Sniffer, bindAll, lerp } from '../utils'
import { gsap } from 'gsap'

export default class RafController extends Raf {
  constructor() {
    super()

    bindAll(this, 'onScroll', 'onMove')

    this.target = 0
    this.current = 0
    this.currentRounded = 0
    this.mouse = {
      x: 0,
      y: 0,
      target: null,
    }
    this.ease = 0.115
  }

  onRaf() {
    this.current = lerp(this.current, this.target, this.ease)
    this.currentRounded = Math.round(this.current * 100) / 100
    this.diff = (this.target - this.current) * 0.005

    Emitter.emit('tick', {
      target: this.target,
      current: this.getSmooth(),
      mouse: this.mouse,
      diff: this.diff,
    })
  }

  clampTarget() {
    this.target = Math.min(Math.max(this.target, 0), store.bounds.scroll)
  }

  onScroll({ y }) {
    if (store.flags.locked) return

    this.target += y
    this.clampTarget()
  }

  getSmooth() {
    if (!store.sniff.isDevice) {
      return this.currentRounded
    } else {
      return window.pageYOffset
    }
  }

  scrollTo(offset) {
    if (!store.sniff.isDevice) {
      gsap.to(this, {
        target: offset,
        duration: 1,
        ease: 'expo.inOut',
      })
    } else {
      window.scrollTo({
        top: offset,
        left: 0,
        behavior: 'smooth',
      })
    }
  }

  setScroll(offset) {
    if (!store.sniff.isDevice) {
      this.currentRounded = 0
      gsap.set(this, {
        target: offset,
      })
    } else {
      window.scrollTo({
        top: offset,
        left: 0,
      })
    }
  }

  onMove({ x, y, target }) {
    this.mouse.x = x
    this.mouse.y = y
    this.mouse.target = target
  }

  getSmooth() {
    if (!Sniffer.sniff.isDevice) {
      return this.currentRounded
    } else {
      return window.pageYOffset
    }
  }

  on() {
    Emitter.on('scroll', this.onScroll)
    Emitter.on('mousemove', this.onMove)
  }
}
