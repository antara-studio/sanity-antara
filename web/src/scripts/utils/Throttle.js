export default class Throttle {
  constructor(o = {}) {
    this.delay = o.delay
    this.cb = o.cb
    this.onlyAtEnd = o.onlyAtEnd
    this.last
    this.timer
  }

  init() {
    const self = this
    let firstTime = true
    const now = Date.now()
    if ((this.last && now < this.last + this.delay) || firstTime) {
      firstTime = false
      clearTimeout(this.timer)
      this.timer = setTimeout(function() {
        self.last = now
        self.cb()
      }, this.delay)
    } else {
      this.last = now
      if (!this.onlyAtEnd) {
        firstTime = false
        this.cb()
      }
    }
  }
}
