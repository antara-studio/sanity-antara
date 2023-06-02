import store from '../store'

import VirtualScroll from 'virtual-scroll'
import Emitter from './Emitter'
import { bindAll, bounds, qs } from '../utils'
import { Sniffer } from '../utils/Sniffer'

export default class Scroll {
  constructor(o = {}) {
    this.smooth = o.smooth || false
    store.flags.smooth = Sniffer.sniff.isDesktop
    bindAll(this, 'onEvent', 'onScroll')
  }

  setScrollBounds() {
    store.bounds = {}
    //const height = bounds(store.page);
    const height = qs('[data-smooth]').getBoundingClientRect().height
    store.bounds.scroll = height > store.vh ? height - store.vh : 0
  }

  onEvent(e) {
    Emitter.emit('scroll', { y: e.deltaY * -1 })
  }

  onScroll(e) {
    //Pointer.run();

    Emitter.emit('scroll', { y: window.scrollY })
  }

  on() {
    this.l('add')
  }

  off() {
    this.l('remove')
  }

  l(a) {
    if (this.smooth) {
      store.body.classList.add('is-smooth')

      const action = a === 'add' ? 'on' : 'off'
      const vs = new VirtualScroll({
        mouseMultiplier: Sniffer.sniff.isWindows ? 1.1 : 0.45,
        touchMultiplier: 3.5,
        firefoxMultiplier: Sniffer.sniff.isWindows ? 40 : 90,
        passive: true,
      })

      vs[action](this.onEvent)
    } else {
      listener(window, a, 'scroll', this.onScroll, true)
    }
  }
}
