import store from '../../store'
import Highway from '@dogstudio/highway'
import { Emitter } from '.././../events'
import {
  qs,
  qsa,
  afrom,
  bindAll,
  lerp,
  clamp,
  setViewportCSSVar,
} from '../../utils'
import SmoothScroll from '../../components/SmoothScroll'
import ScrollAnimations from '../../components/ScollAnimations'
import Splits from '../../components/Splits'
import ThreeController from '../../components/ThreeController'
import { gsap } from 'gsap/gsap-core'

class Default extends Highway.Renderer {
  constructor(opt = {}) {
    super(opt)

    if (store.sniff.isDevice) store.body.classList.add('is-device')
    //store.body.classList.remove('is-fixed')

    bindAll(this, 'run', 'openMenu', 'closeMenu', 'preload', 'onload')

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'America/Guatemala',
      weekday: 'short',
    }
    this.GT = new Date().toLocaleDateString('en-US', options)
    this.preloadData = window.app.preload
  }

  onEnter() {
    this.el = this.wrap.lastElementChild

    this.data = {
      r: 0,
    }
  }

  onEnterCompleted() {
    store.splits = new Splits()
    this.els()
    this.on()
    this.smooth()
    this.addThree()
    this.addDate()
  }

  els() {
    this.scroll = qs('.scroll-circle')
    this.scrollIcon = qs('.scroll.icon')
    this.date = qs('.footer-location span', this.el)
    this.menu = qs('.open-menu')
    this.mobile = qs('.mobile-menu')
    this.back = qs('.back')
    this.imgs = afrom(document.images)

    this.mobileMenu = qs('.mobile-menu')

    const viewport = setViewportCSSVar()
  }

  on() {
    Emitter.on('tick', this.run)
    Emitter.on('Preloaded', this.preload)
    this.menu.addEventListener('click', this.openMenu)
    this.back.addEventListener('click', this.closeMenu)
  }

  off() {
    this.menu.removeEventListener('click', this.openMenu)
    this.back.removeEventListener('click', this.closeMenu)
  }

  loadImages() {
    if (this.current < store.vh) return

    if (!store.flags.load) {
      const data = this.preloadData.projects.map(
        (el) => el.image_l.image.asset.url,
      )

      store.preloaded.fetch(data).then((items) => {})

      store.preloaded.onprogress = (e) => {
        //percentage.innerHTML = parseInt(event.progress) + '%'
      }

      store.preloaded.oncomplete = () => {
        //percentage.innerHTML = '100%'
        //this.animateOut()
      }
    }

    store.flags.load = true
  }

  preload() {
    store.flags.preloaded = true
    this.addThree()
  }

  run(e) {
    const { mouse, current } = e
    const r = clamp(mouse.x * 0.25, 0, store.vw) //lerp(0, mouse.x, 0.15)
    const s = clamp(current * 0.25, 0, store.vh) //Math.min(Math.max(current, 0), store.vh); //lerp(0, current , 0.15)

    this.data.r = lerp(this.data.r, r, 0.025)
    this.scrollIcon.style.transform = `rotate(${-s}deg)`
    this.current = current

    this.loadImages()
  }

  openMenu() {
    store.body.classList.add('is-fixed')

    this.tl = gsap.timeline({
      paused: true,
    })

    const logo = qs('.logo', this.mobile)
    const back = qs('.back', this.mobile)
    const items = qsa('.menu-link span', this.mobile)
    const circle = qs('.circle', this.mobile)

    this.tl.to(this.mobile, { duration: 0.8, autoAlpha: 1 })

    this.tl.from(
      items,
      { duration: 1.4, y: '101%', stagger: 0.1, ease: 'power3.inOut' },
      '-=0.8',
    )
    this.tl.from(circle, { duration: 0.5, y: 20, autoAlpha: 0 }, '-=0.4')

    this.tl.from(back, { duration: 0.5, y: -20, autoAlpha: 0 }, '-=1')
    this.tl.from(logo, { duration: 0.5, y: -20, autoAlpha: 0 }, '-=0.85')

    this.tl.play()
  }

  closeMenu() {
    store.body.classList.remove('is-fixed')

    this.tl = gsap.timeline({
      paused: true,
    })

    this.tl.to(this.mobile, { duration: 0.8, autoAlpha: 0 })
    this.tl.play()
  }

  addDate() {
    this.date.innerHTML = this.GT
  }

  smooth() {
    const smooth = qsa('[data-smooth-item]', this.el)
    const sections = qsa('[data-section]', this.el)
    const elements = qsa('[data-element]', this.el)

    SmoothScroll.init(smooth)
    store.scroll.setScrollBounds()

    this.sectionAnimation = new ScrollAnimations({
      el: sections,
    })
    this.elementAnimation = new ScrollAnimations({
      el: elements,
    })

    Promise.all(
      this.imgs
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((resolve) => {
              img.onload = img.onerror = resolve
            }),
        ),
    ).then(() => {
      SmoothScroll && SmoothScroll.update()
    })

    setTimeout(() => {
      this.sectionAnimation.update()
      this.elementAnimation.update()

      this.sectionAnimation.init()
      this.elementAnimation.init()
    }, 1200)
  }

  addThree() {
    if (!store.flags.preloaded) return

    if (!store.sniff.isDevice) this.three = new ThreeController()
  }

  onLeave() {
    SmoothScroll.off()
    this.off()
    store.flags.locked = true
    if (store.sniff.isDevice) store.body.classList.add('is-fixed')
    this.sectionAnimation.destroy()
    this.elementAnimation.destroy()
    this.three && this.three.destroy()
  }

  onLeaveCompleted() {}
}

export default Default
