import store from '../store'
import { Emitter, RafController } from '../events'
import { bindAll, qs, qsa, bounds } from '../utils'

class SmoothScroll {
  constructor() {
    bindAll(this, 'run', 'resize')
    this.el = qs('[data-smooth]')
    this.elems = null
    this.current = 0
    this.threshold = 100
    this.sections = null
    this.scrollbar = null
  }

  init(elems) {
    this.elems = elems || qsa('[data-smooth-item]')
    this.getSections()
    this.on()
  }

  update(elems) {
    store.flags.resize = true
    store.scroll.setScrollBounds()
    this.elems = elems || qsa('[data-smooth-item]')
    //this.scrollbar.update()
    this.getSections()
    this.transformSections()
  }

  clean() {
    this.elems = this.sections = null
  }

  run({ current }) {
    this.current = current
    this.transformSections()
  }

  transformSections() {
    if (!this.sections || !store.flags.smooth) return

    const { resize } = store.flags
    for (let i = 0; i < this.sections.length; i++) {
      const section = this.sections[i]
      const { isVisible, transform } = this.isVisible(section)
      if (isVisible || resize) {
        section.out = false
        section.transform = transform
        section.el.style.transform = this.getTransform(transform)
      } else if (!section.out) {
        section.out = true

        section.transform = transform
        section.el.style.transform = this.getTransform(transform)
      }
    }
  }

  isVisible(section) {
    const { vh } = store
    const { top, bottom, offset, speed, parent } = section

    const extra = (parent && parent.transform) || 0
    const translate = this.current * speed
    const transform = translate - offset - extra
    const start = top - translate
    const end = bottom - translate
    const isVisible = start < this.threshold + vh && end > -this.threshold

    return {
      isVisible,
      transform,
    }
  }

  getTransform(transform) {
    return `translate3d(0, ${-transform}px, 0)`
  }

  getVars(el, speed) {
    const { vh } = store
    const rect = bounds(el)
    const centering = vh / 2 - rect.height / 2
    const offset =
      rect.top < vh
        ? 0
        : (rect.top - centering) * speed - (rect.top - centering)
    const top = rect.top + offset
    const bottom = rect.bottom + offset

    return {
      top,
      bottom,
      offset,
    }
  }

  getSections() {
    if (!this.elems) return
    this.sections = null
    this.sections = []
    this.elems.forEach((el) => {
      el.style.transform = 'translate3d(0, 0, 0)'
      const speed = el.dataset.speed || 1
      const { top, bottom, offset } = this.getVars(el, speed)
      let parent = el.parentNode.closest('[data-smooth-item]')
      parent &&
        this.sections.some((obj) => {
          if (obj.el === parent) parent = obj
        })
      this.sections.push({
        el,
        parent,
        top,
        bottom,
        offset,
        speed,
        out: true,
        transform: 0,
      })
    })
  }

  resize() {
    if (!this.sections) return
    this.sections.forEach((section) => {
      section.el.style.transform = 'translate3d(0, 0, 0)'
      const { top, bottom, offset } = this.getVars(section.el, section.speed)
      Object.assign(section, {
        top,
        bottom,
        offset,
      })
    })

    this.transformSections()
  }

  anchor(smooth = true) {
    const links = qsa('[data-scroll-to]')

    links.forEach((link) => {
      link.addEventListener('click', () => {
        const el = qs(`#${link.dataset.scrollTo}`)

        smooth
          ? RafController.scrollTo(el.offsetTop)
          : window.scrollTo(0, el.offsetTop)
      })
    })
  }

  on() {
    Emitter.on('tick', this.run)
    Emitter.on('GlobalResize', this.resize)
  }

  off() {
    Emitter.off('tick', this.run)
  }
}

export default new SmoothScroll()
