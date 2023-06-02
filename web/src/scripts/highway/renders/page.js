import store from '../../store'
import Default from './default'
import { qs, bindAll } from '../../utils'
import { Emitter } from '../../events'
import { HeroIn } from '../../components'

class Page extends Default {
  constructor(opt = {}) {
    super(opt)
    bindAll(this, 'animateIn', 'preload')
    this.slug = 'page'
  }

  onEnter() {
    super.onEnter()
  }

  onEnterCompleted() {
    super.onEnterCompleted()
    this.addElements()
    this.addEvents()
    this.animateIn()
  }

  addElements() {
    this.heroAnimation = HeroIn()
    this.isHome = qs('.is-home')
  }

  addEvents() {}

  preload() {
    super.preload()

    this.animateIn()
  }

  animateIn() {
    if (!store.flags.preloaded) return

    this.heroAnimation.play()
  }

  removeEvents() {}

  onLeave() {
    super.onLeave()
    this.removeEvents()
  }

  onLeaveCompleted() {}
}

export default Page
