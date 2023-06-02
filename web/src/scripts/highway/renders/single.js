import store from '../../store'
import Default from './default'
import { SingleIn } from '../../components'

class Single extends Default {
  constructor(opt = {}) {
    super(opt)

    this.slug = 'single'
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
    this.heroAnimation = SingleIn()
  }

  addEvents() {}

  animateIn() {
    this.heroAnimation.play()
  }

  removeEvents() {}

  onLeave() {
    super.onLeave()
    this.removeEvents()
  }

  onLeaveCompleted() {}
}

export default Single
