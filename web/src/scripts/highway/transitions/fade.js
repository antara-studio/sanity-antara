import store from '../../store'

import Highway from '@dogstudio/highway'
import { qs } from '../../utils'
import { gsap } from 'gsap'

export default class Fade extends Highway.Transition {
  in({ from, to, done }) {
    const tl = gsap.timeline({ paused: true })
    const transition = qs('.page-transition')

    from.remove()
    done()

    tl.fromTo(to, { autoAlpha: 0 }, { duration: 0.4, autoAlpha: 1 })

    tl.to(transition, { duration: 0.5, autoAlpha: 0 })

    tl.play()
  }

  out({ from, done }) {
    const tl = gsap.timeline({
      paused: true,
      onComplete: () => done(),
    })

    const transition = qs('.page-transition')

    tl.fromTo(
      from,
      { autoAlpha: 1 },
      {
        duration: 0.4,
        autoAlpha: 0,
        onComplete: () => {
          store.raf.setScroll(0)
        },
      },
    )

    tl.to(transition, { duration: 0.5, autoAlpha: 1 })

    tl.play()
  }
}
