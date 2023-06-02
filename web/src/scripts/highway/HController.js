import Highway from '@dogstudio/highway'

import Page from './renders/page'
import Single from './renders/single'
import Fade from './transitions/fade'

import { qsa, bindAll } from '../utils'
import { Emitter } from '../events'

export default class HController {
  constructor() {
    bindAll(this, 'nav')

    this.init()
  }

  addHighway() {
    this.highway = new Highway.Core({
      renderers: {
        page: Page,
        single: Single,
      },
      transitions: {
        default: Fade,
      },
    })
  }

  els() {
    this.links = qsa('.menu-link')
  }

  l() {
    this.els()
    this.highway.on('NAVIGATE_IN', this.nav)
  }

  nav({ to, location, trigger }) {
    const el = to.view

    this.links = qsa('.menu-link', el)

    this.links.forEach((link) => {
      if (link.href === location.href) {
        link.classList.add('is-active')
      }
    })
  }

  activeLink() {
    this.links.forEach((link) => {
      link.classList.remove('is-active')
      if (link.href === location.href) {
        link.classList.add('is-active')
      }
    })
  }

  init() {
    this.addHighway()
    this.els()
    this.activeLink()
    this.l()
  }
}
