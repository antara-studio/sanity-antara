/* Resize
   Default Resize Event
   ========================================================================== */

import { Sniffer, Throttle, bindAll, listener } from '../utils'

export default class Resize {
  constructor(o = {}) {
    const t = o.throttle

    this.cb = o.cb
    this.isDevice = Sniffer.isDevice
    this.tick = false

    bindAll(this, 'gT', 'gRaf', 'run')

    this.t = new Throttle({
      cb: this.gRaf,
      delay: t ? o.throttle.delay : 100,
      onlyAtEnd: t ? o.throttle.onlyAtEnd : true,
    })
  }

  on() {
    this.l('add')
  }

  off() {
    this.l('remove')
  }

  l(a) {
    const w = window
    if (this.isDevice) {
      listener(w, a, 'orientationchange', this.gT, false)
    } else {
      listener(w, a, 'resize', this.gT, false)
    }
  }

  gT(e) {
    this.e = e
    this.t.init()
  }

  gRaf() {
    if (!this.tick) {
      this.tick = true
      requestAnimationFrame(this.run)
    }
  }

  run() {
    this.cb(this.e)
    this.tick = false
  }
}
