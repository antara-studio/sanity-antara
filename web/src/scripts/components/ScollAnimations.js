import store from '../store'
import { Emitter } from '../events'
import { qs, qsa, bindAll, bounds } from '../utils'
import { gsap } from 'gsap'

export default class ScrollAnimations {
  constructor(obj = {}) {
    bindAll(this, 'run', 'resize')

    this.el = obj.el
    this.length = this.el.length
    this.sections = []
    this.current = 0

    if (this.length !== 0) {
      this.el.forEach((el) => {
        this.getSections(el)
      })
    }
  }

  updateScroll() {}

  visible({ start, end }) {
    return this.current > start && this.current < end
  }

  run(e) {
    this.current = e.current
    this.playTimelines()
  }

  playTimelines() {
    this.sections.forEach((s) => {
      const visible = this.visible(s)

      if (visible && !s.ended) {
        s.tl.play()
        s.el.classList.add('in-view')
        //if(s.tl.progress() === 1 ) s.ended = true
      } else {
        if (s.reverse) {
          s.tl.reverse()
        }
      }
    })
  }

  getSections(el) {
    const section = el.dataset.section || el.dataset.element

    switch (section) {
      case 'fixed':
        const fixed = this.fixed(el)
        this.sections.push(fixed)
        break
      case 'featured':
        const featured = this.featured(el)
        this.sections.push(featured)
        break
      case 'works':
        const works = this.works(el)
        this.sections.push(works)
        break
      case 'workblock':
        const workblock = this.workblock(el)
        this.sections.push(workblock)
        break
      case 'split':
        const split = this.split(el)
        this.sections.push(split)
        break
      case 'services':
        const services = this.services(el)
        this.sections.push(services)
        break
      case 'process':
        const process = this.process(el)
        this.sections.push(process)
        break
      case 'press':
        const press = this.press(el)
        this.sections.push(press)
        break
      case 'pagination':
        const pagination = this.pagination(el)
        this.sections.push(pagination)
        break
      case 'gallery':
        const gallery = this.gallery(el)
        this.sections.push(gallery)
        break
      case 'footer':
        const footer = this.footer(el)
        this.sections.push(footer)
        break
    }
  }

  fixed(el) {
    const tl = gsap.timeline({ paused: true })
    const items = qsa('.menu-link', el)

    tl.to(items, { duration: 0.5, y: '0%', stagger: 0.05 })

    return {
      el: el,
      start: store.vh + 200,
      end: store.bounds.scroll,
      tl: tl,
      ended: false,
      reverse: true,
    }
  }

  featured(el) {
    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        clearAll()
      },
    })

    const h2 = qs('.featured-title', el)
    const content = qsa('.p', el)
    const button = qs('.button', el)
    const moreSubtitle = qs('.more-subtitle', el)
    const moreTitle = qs('.more-title', el)
    let left, right, arrow, circle

    if (content.length !== 0) {
      left = qsa('.line-1', content[0])
      right = qsa('.line-1', content[1])
    }

    if (button) {
      circle = qs('.circle', button)
      arrow = qs('.arrow', button)
    }

    // tl.from(title, {duration: 0.8,  autoAlpha: 0, rotateX: 0, x: -20, y: -60, ease: 'back.out(1.4)', stagger: {
    //   amount: 0.2,
    //   from: "end"
    // }} )

    tl.from(h2, { duration: 0.8, y: '50%', autoAlpha: 0 })

    if (left)
      tl.from(
        left,
        { duration: 0.6, y: '101%', autoAlpha: 0, stagger: 0.1 },
        '-=0.6',
      )
    if (right)
      tl.from(
        right,
        { duration: 0.6, y: '101%', autoAlpha: 0, stagger: 0.1 },
        '-=0.6',
      )

    if (moreSubtitle)
      tl.from(moreSubtitle, { duration: 0.6, y: '101%', autoAlpha: 0 }, '-=0.5')

    if (moreTitle)
      tl.from(moreTitle, { duration: 0.6, y: '101%', autoAlpha: 0 }, '-=0.5')

    if (circle)
      tl.from(
        circle,
        { duration: 0.8, rotate: 60, autoAlpha: 0, ease: 'power3.inOut' },
        '-=0.8',
      )

    if (arrow)
      tl.from(
        arrow,
        { duration: 0.8, x: 20, autoAlpha: 0, ease: 'power3.inOut' },
        '-=0.6',
      )

    const clearAll = () => {
      if (circle) gsap.set(circle, { clearProps: 'all' })
      if (content[0]) store.splits.reverseContent(content[0])
      if (content[1]) store.splits.reverseContent(content[1])
    }

    return {
      el: el,
      bottom: 0,
      top: 0,
      start: 0,
      end: 0,
      ended: false,
      tl: tl,
      get updateS() {
        return this.top - store.vh / 1.6
      },
      get updateE() {
        return this.bottom
      },
    }
  }

  works(el) {
    const tl = gsap.timeline({ paused: true })
    const element = el.dataset.element
    const title = qs('.work-name', el)
    let chars, parent

    if (element) {
      chars = qsa('.word-0', title)
    }

    if (chars)
      tl.from(chars, {
        duration: 0.8,
        autoAlpha: 0,
        skewX: 45,
        x: 0,
        y: '102%',
        stagger: 0.15,
        ease: 'power3.out',
        onComplete: () => {},
      })

    return {
      el: el,
      bottom: 0,
      top: 0,
      start: 0,
      end: 0,
      ended: false,
      tl: tl,
      get updateS() {
        return this.top - store.vh / 1.2
      },
      get updateE() {
        return this.bottom
      },
    }
  }

  workblock(el) {
    const tl = gsap.timeline({ paused: true })
    const large = qs('.work-l-img', el)
    const small = qs('.work-s-img', el)
    const reversed = el.classList.value.includes('-reversed')
    let x1, x2, r1, r2

    x1 = reversed ? -100 : 100
    x2 = reversed ? 100 : -100
    r1 = reversed ? -4 : 4
    r2 = reversed ? 4 : -4

    tl.from(large, { duration: 0.8, x: x1, y: '50%', autoAlpha: 0, rotate: r1 })
    tl.from(
      small,
      { duration: 0.8, x: x2, y: '50%', autoAlpha: 0, rotate: r2 },
      '-=0.8',
    )

    return {
      el: el,
      top: 0,
      bottom: 0,
      start: 0,
      end: 0,
      ended: false,
      tl: tl,
      get updateS() {
        return this.top - store.vh / 1.8
      },
      get updateE() {
        return this.bottom + store.vh / 4
      },
    }
  }

  split(el) {
    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        clearAll()
      },
    })
    const h2 = qs('.split-title', el)
    const subtitle = qs('.split-subtitle', el)
    const content = qs('.p', el)
    const lines = qsa('.p .line-0', el)
    const readmore = qs('.read-more', el)
    let more = {}

    if (readmore) {
      more.subtitle = qs('.more-subtitle', readmore)
      more.title = qs('.more-title', readmore)
      more.content = qsa('.p3 .line-0', readmore)
      more.circle = qs('.circle', readmore)
      more.arrow = qs('.arrow', readmore)
    }

    h2 && tl.from(h2, { duration: 0.8, y: 40, autoAlpha: 0 })
    subtitle &&
      tl.from(subtitle, { duration: 0.8, y: 40, autoAlpha: 0 }, '-=0.7')

    if (lines.length !== 0) {
      tl.from(
        lines,
        { duration: 0.6, y: '101%', autoAlpha: 0, stagger: 0.1 },
        '-=0.6',
      )
    }

    //arc && tl.from(arc, {duration: 1.2, skew: 120, scaleY: 0, ease: 'power2.inOut'}, '0')

    if (readmore) {
      more.subtitle &&
        tl.from(
          more.subtitle,
          { duration: 0.6, y: '101%', autoAlpha: 0 },
          '-=0.5',
        )

      more.title &&
        tl.from(more.title, { duration: 0.6, y: '101%', autoAlpha: 0 }, '-=0.5')

      if (more.content.length !== 0) {
        tl.from(
          more.content,
          { duration: 0.6, y: '101%', autoAlpha: 0, stagger: 0.1 },
          '-=0.3',
        )
      }

      tl.from(
        more.circle,
        { duration: 0.8, rotate: 60, autoAlpha: 0, ease: 'power3.inOut' },
        '-=0.8',
      )
      tl.from(
        more.arrow,
        { duration: 0.8, x: 20, autoAlpha: 0, ease: 'power3.inOut' },
        '-=0.6',
      )
    }

    const clearAll = () => {
      if (more.circle) gsap.set(more.circle, { clearProps: 'all' })
      if (content) store.splits.reverseContent(content)
    }

    return {
      el: el,
      top: 0,
      bottom: 0,
      start: 0,
      end: 0,
      ended: false,
      tl: tl,
      get updateS() {
        return this.top - store.vh / 1.4
      },
      get updateE() {
        return this.bottom
      },
    }
  }

  services(el) {
    const tl = gsap.timeline({ paused: true })
    const services = qsa('.services-item', el)

    services.forEach((service, i) => {
      const title = qs('.p1', service)
      const list = qsa('.p', service)

      const t1 = i > 0 ? i * 0.5 : 0.5
      const t2 = i > 0 ? i * 0.6 : '-=0.8'

      tl.from(title, { duration: 0.8, y: 20, autoAlpha: 0 }, t1)
      tl.from(
        list,
        { duration: 0.8, y: '101%', autoAlpha: 0, stagger: 0.1 },
        t2,
      )
    })

    return {
      el: el,
      top: 0,
      bottom: 0,
      start: 0,
      end: 0,
      start: 0,
      end: 0,
      ended: false,
      tl: tl,
      get updateS() {
        return this.top - store.vh / 1.2
      },
      get updateE() {
        return this.bottom
      },
    }
  }

  process(el) {
    const tl = gsap.timeline({ paused: true })
    const nr = qs('.process-nr', el)
    const title = qs('.process-title', el)
    const content = qsa('.p', el)

    tl.from(nr, { duration: 0.5, autoAlpha: 0, y: 40 })
    tl.from(title, { duration: 0.5, autoAlpha: 0, y: 20 }, '-=0.4')
    tl.from(
      content,
      { duration: 0.8, autoAlpha: 0, y: 20, stagger: 0.1 },
      '-=0.4',
    )

    return {
      el: el,
      top: 0,
      bottom: 0,
      start: 0,
      end: 0,
      tl: tl,
      get updateS() {
        return this.top - store.vh / 1.6
      },
      get updateE() {
        return this.bottom
      },
    }
  }

  press(el) {
    const tl = gsap.timeline({ paused: true })
    const nr = qs('.press-nr', el)
    const media = qs('.press-media', el)
    const year = qs('.press-year', el)

    tl.from(nr, { duration: 0.8, x: 40, autoAlpha: 0 })
    tl.from(media, { duration: 0.8, x: 40, autoAlpha: 0 }, '-=0.7')
    tl.from(year, { duration: 0.8, x: 40, autoAlpha: 0 }, '-=0.7')

    return {
      el: el,
      top: 0,
      bottom: 0,
      start: 0,
      end: 0,
      ended: false,
      tl: tl,
      get updateS() {
        return this.top - store.vh / 1.6
      },
      get updateE() {
        return this.bottom
      },
    }
  }

  pagination(el) {
    const tl = gsap.timeline({ paused: true })
    const title = qs('.t1', el)
    const words = qsa('.word-0', el)

    tl.from(words, {
      duration: 1.2,
      autoAlpha: 0,
      skewX: 45,
      x: -0,
      y: '102%',
      ease: 'power3.out',
      stagger: {
        amount: 0.5,
        from: 'center',
      },
      onComplete: () => {
        if (title) gsap.set(title, { overflow: 'visible' })
      },
    })

    return {
      el: el,
      top: 0,
      bottom: 0,
      start: 0,
      end: 0,
      tl: tl,
      get updateS() {
        return this.top - store.vh / 1.6
      },
      get updateE() {
        return this.bottom
      },
    }
  }

  gallery(el) {
    const tl = gsap.timeline({ paused: true })

    tl.from(el, { duration: 0.5, autoAlpha: 0, scale: 1.1 })

    return {
      el: el,
      top: 0,
      bottom: 0,
      start: 0,
      end: 0,
      tl: tl,
      get updateS() {
        return this.top - store.vh / 1.6
      },
      get updateE() {
        return this.bottom
      },
    }
  }

  footer(el) {
    const tl = gsap.timeline({ paused: true })
    const location = qsa('.footer-location .p', el)
    const list = qsa('.p1', el)
    const intouch = qs('.t1', el)
    const line = qs('.line', el)
    const words = qsa('.word-1', intouch)
    const copyright = qs('.copyright p')

    tl.from(location, { duration: 0.5, y: 40, autoAlpha: 0, stagger: 0.1 })

    tl.from(
      list,
      { duration: 0.8, y: 40, autoAlpha: 0, stagger: 0.05 },
      '-=0.3',
    )

    tl.from(
      words,
      {
        duration: 0.8,
        autoAlpha: 0,
        skewX: 45,
        x: 0,
        y: '102%',
        stagger: 0.15,
        ease: 'power3.out',
      },
      '-=1',
    )

    tl.from(line, { duration: 0.8, x: '-101%', ease: 'power3.inOut' }, '-=0.6')

    tl.from(
      copyright,
      { duration: 0.8, y: 40, autoAlpha: 0, stagger: 0.05 },
      '-=0.8',
    )

    return {
      el: el,
      top: 0,
      bottom: 0,
      start: 0,
      end: 0,
      ended: false,
      tl: tl,
      get updateS() {
        return this.top - store.vh / 2
      },
      get updateE() {
        return this.bottom
      },
    }
  }

  addEvents() {
    Emitter.on('tick', this.run)
  }

  removeEvents() {
    Emitter.off('tick', this.run)
  }

  update() {
    this.sections.forEach((section) => {
      const { el } = section
      const rect = bounds(el)
      section.top = rect.top
      section.bottom = rect.bottom
      section.start = section.updateS
      section.end = section.updateE
    })
  }

  destroy() {
    this.el = null
    this.sections = []
    this.removeEvents()
  }

  init() {
    this.addEvents()
  }
}
