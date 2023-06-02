import store from './store'
import HController from './highway/HController'
import {
  Resize,
  RafController,
  Scroll,
  Mouse,
  Emitter,
  Preloader,
} from './events'
import { getViewport, getWindowSizes, Sniffer } from './utils'

export default class App {
  constructor() {
    console.log(
      `%c${store.title} \nMade with ❤️ by ${store.author} \n↳ https://twitter.com/mariosmaselli`,
      'color: #6a6a6a',
    )

    store.preload = new Preloader()
    store.raf = new RafController()
    store.mouse = new Mouse()
    store.scroll = new Scroll({
      smooth: Sniffer.sniff.isDesktop,
    })

    store.resize = new Resize({
      cb: this.onResize,
      throttle: {
        delay: 150,
      },
    })

    store.resize.on()
    this.preloaded()
  }

  preloaded() {
    if (store.sniff.isDevice) store.body.classList.add('is-fixed')

    new HController()
    store.raf.on()
    store.scroll.on()
    store.mouse.on()
  }

  onResize() {
    Sniffer.update()
    store.flags.resize = true
    store.vw = getViewport().width
    store.vh = getViewport().height
    store.window = getWindowSizes()
    store.sniff = Sniffer.sniff
    store.scroll.setScrollBounds()

    Emitter.emit('GlobalResize')
  }

  init() {}
}
