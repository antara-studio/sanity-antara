import store from '../store'
import create from 'dom-create-element'
import Preload from 'preload-it'
import { Emitter } from '../events'
import { qs, qsa, bindAll } from '../utils'
import { gsap } from 'gsap'

export default class Preloader {
  constructor(obj = {}) {
    bindAll(this, 'animateIn', 'animateOut')
    store.body.classList.add('is-loading')
    store.preloaded = Preload()

    this.el = null

    this.state = {
      preloaded: false,
    }

    this.init()
  }

  addLoader() {
    const page = store.main.firstChild

    this.el = create({
      selector: 'div',
      styles: 'preloader',
      html: `
  			<div class="preloader">
  				<div class="preload-content">
          <svg class="preload-logo" viewBox="0 0 123 132" fill="white">
          <defs>
              <clipPath id="clipPath1">
                  <rect x="0" y="0" width="70" height="40" />
              </clipPath>
              <clipPath id="clipPath2">
                <rect x="55" y="45" width="70" height="40" />
              </clipPath>
              <clipPath id="clipPath3">
                <rect x="25" y="95" width="70" height="40" />
              </clipPath>
          </defs>
          <g class="p-mask">
            <path class="AN" d="M7.1 35.8l2.9-8.2h14.4l2.9 8.2h7.5L21.3-.2h-8l-13.6 36h7.4zm15.7-14h-10l5-14 5 14zm23.9 14V10.2l16 25.5h7.2v-36H63v23.8L48.3-.2h-8.5v36h6.9z" class="st0"/> 
          </g>
          <g class="p-mask">
            <path class="TA" d="M78.4 83.8V54.4h11.4v-6.7h-30v6.7h11.4v29.3h7.2zm16.7 0l2.9-8.2h14.4l2.9 8.2h7.5l-13.5-36h-8l-13.6 36h7.4zm14.7-14h-10l5-14 5 14z"/>
          </g>
          <g class="p-mask">
            <path class="RA" d="M38.7 131.8v-13.9h3.6l6.9 13.9h7.6L49.3 117c4.6-1.4 7.5-5.2 7.5-10.2 0-6.2-4.4-11.1-11.2-11.1H31.8v36h6.9zm5.6-20h-5.5v-10h5.5c3.5 0 5.5 2 5.5 5 0 2.9-2 5-5.5 5zm21.8 20l2.9-8.2h14.4l2.9 8.2h7.5l-13.5-36h-8l-13.6 36h7.4zm15.7-14h-10l5-14 5 14z"/>
          </g>
          
        </svg>
          </div>
  			</div>
  		`,
    })

    store.main.insertBefore(this.el, page)
  }

  load() {
    this.animateIn()

    // const data = this.preload.projects.map((el) => el.image_l.image.asset.url)

    // store.preloaded.fetch(data).then((items) => {})

    // store.preloaded.onprogress = (e) => {
    //   //percentage.innerHTML = parseInt(event.progress) + '%'
    // }

    // store.preloaded.oncomplete = () => {
    //   //percentage.innerHTML = '100%'
    //   //this.animateOut()
    // }
  }

  animateIn() {
    const tl = gsap.timeline({
      paused: true,
      onComplete: () => this.animateOut(),
    })

    const logo = qs('.preload-logo')
    const an = qs('.AN', this.el)
    const ta = qs('.TA', this.el)
    const ra = qs('.RA', this.el)

    tl.from(logo, {
      duration: 1.4,
      autoAlpha: 0,
      scale: 0,
      ease: 'power3.inOut',
    })

    tl.from(an, { duration: 0.5, y: 45, rotate: 20 }, '-=0.8')
    tl.from(ta, { duration: 0.5, y: 45, rotate: 20 }, '-=0.7')
    tl.from(ra, { duration: 0.5, y: 45, rotate: 20 }, '-=0.6')

    if (store.sniff.isDevice) {
      tl.timeScale(1.4)
      tl.play()
    } else {
      tl.play()
    }
  }

  animateOut() {
    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        this.destroy()
      },
    })

    const delay = store.sniff.isDevice ? 0.5 : 1.2

    const logo = qs('.preload-logo')

    tl.to(this.el, { duration: 0.6, autoAlpha: 0, delay: delay })
    tl.to(
      logo,
      { duration: 0.4, autoAlpha: 0, scale: 0.9, ease: 'power3.inOut' },
      '-=0.5',
    )

    if (store.sniff.isDevice) {
      tl.timeScale(1.4)
      tl.play()
    } else {
      tl.play()
    }
  }

  destroy() {
    store.body.classList.add('is-loaded')
    store.body.classList.remove('is-loading')
    store.main.removeChild(this.el)

    Emitter.emit('Preloaded')
  }

  init() {
    this.addLoader()
    this.load()
  }
}
