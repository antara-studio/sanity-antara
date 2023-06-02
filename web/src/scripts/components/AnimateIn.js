import store from '../store'
import { Emitter } from '../events'
import { qs, qsa } from '../utils'
import { gsap } from 'gsap'

const HeaderIn = () => {
  const tl = gsap.timeline({
    onComplete: () => {
      store.flags.locked = false
    },
  })

  const header = qs('header')
  const logo = qs('.logo', header)
  const nav = qsa('.menu-item', header)

  tl.from(nav, { duration: 0.5, autoAlpha: 0, y: -20, stagger: 0.1 })
  tl.from(logo, { duration: 0.5, autoAlpha: 0, y: -20 })

  return tl
}

export const HeroIn = () => {
  const page = qs('.page')
  const hero = qs('.hero')
  const chars = qsa('.char-0', hero)
  const words = qsa('.word-0', hero)
  const mask = qsa('.t-mask', hero)
  const lines = qsa('.line-0', hero)
  const scroll = qs('.scroll-circle', hero)
  const arrowLine = qs('.arrow-line', hero)
  const arrowLeft = qs('.arrow-left', hero)
  const arrowRight = qs('.arrow-right', hero)
  // const light1 = qs('.light-1', hero)
  // const light2 = qs('.light-2', hero)

  const tl = gsap.timeline({
    paused: true,
    onComplete: () => {
      gsap.set(mask, { clearProps: 'perspective' })
      //gsap.set(chars, {clearProps: 'all'})
      //gsap.set(chars, {position: 'relative', display: 'inline-block'})
      Emitter.emit('animation-in')
    },
  })

  const lineL = parseInt(arrowLine.getTotalLength())
  const arrowLeftL = parseInt(arrowLeft.getTotalLength())
  const arrowRightL = parseInt(arrowRight.getTotalLength())
  const header = HeaderIn()

  gsap.set(arrowLine, { strokeDasharray: lineL, strokeDashoffset: lineL })
  gsap.set(arrowLeft, {
    strokeDasharray: arrowLeftL,
    strokeDashoffset: arrowLeftL,
  })
  gsap.set(arrowRight, {
    strokeDasharray: arrowRightL,
    strokeDashoffset: arrowRightL,
  })

  gsap.set(page, { autoAlpha: 1 })
  gsap.set(mask, { perspective: 1400 })
  //gsap.set(chars, {transformStyle:"preserve-3d"})

  tl.add(header, '+=0.1')

  // mask.forEach( (m, i)=> {
  //   const c = qsa('.char-0', m)
  //   const l = c.length
  //   tl.from(c, {duration: 0.8 + i * 0.2, autoAlpha: 0, rotateX: 180, x: -80, y: -80, stagger: 0.05, ease: 'back.out(1.7)'}, '0' )

  // })

  // gsap.from(light1, {
  //   duration: 2,
  //   autoAlpha: 0,
  //   scale: 0,
  //   x: 200,
  //   y: 200,
  //   ease: 'power4.inOut',
  // })
  // gsap.from(light2, {
  //   duration: 2,
  //   autoAlpha: 0,
  //   scale: 0,
  //   y: 100,
  //   x: 100,
  //   ease: 'power4.inOut',
  //   delay: 0.3,
  // })

  tl.from(
    words,
    {
      duration: 1.2,
      autoAlpha: 1,
      skewX: 45,
      x: -0,
      y: '102%',
      ease: 'power3.out',
      stagger: {
        amount: 0.5,
        from: 'center',
      },
      onComplete: () => {
        if (mask) gsap.set(mask, { overflow: 'visible' })
        if (store.sniff.isDevice) store.body.classList.remove('is-fixed')
        //store.flags.locked = false
      },
    },
    '0.5',
  )

  tl.from(
    scroll,
    { duration: 1.8, autoAlpha: 0, rotate: 60, ease: 'power3.inOut' },
    '-=1.2',
  )
  tl.to(
    arrowLine,
    { duration: 1, strokeDashoffset: 0, ease: 'power3.inOut' },
    '-=1.2',
  )
  tl.to(
    arrowLeft,
    { duration: 1, strokeDashoffset: 0, ease: 'power3.inOut' },
    '-=1',
  )
  tl.to(
    arrowRight,
    { duration: 1, strokeDashoffset: 0, ease: 'power3.inOut' },
    '-=1',
  )

  if (lines.length !== 0)
    tl.from(
      lines,
      { duration: 0.8, autoAlpha: 0, y: '101%', stagger: 0.1 },
      '-=1.8',
    )

  //tl.from(chars, {duration: 0.8, autoAlpha: 0, rotateX: 180, x: -50, y: -50, stagger: 0.1, ease: 'power2.in'})

  return tl
}

export const SingleIn = () => {
  const header = HeaderIn()
  const tl = gsap.timeline({
    paused: true,
    onComplete: () => {
      Emitter.emit('animation-in')
    },
  })

  const single = qs('.single')
  const hero = qs('.hero')
  const mask = qsa('.t-mask', hero)
  const words = qsa('.word-0', hero)
  const services = qs('.info-services', hero)
  const description = qs('.info-description', hero)
  const stitle = qs('.p-title', services)

  const dtitle = qs('.p-title', description)
  const serviceList = qsa('.word-1', services)
  const dLines = qsa('.line-0', description)

  const image = qs('.hero-image', hero)
  const scroll = qs('.scroll-circle', hero)
  const arrowLine = qs('.arrow-line', hero)
  const arrowLeft = qs('.arrow-left', hero)
  const arrowRight = qs('.arrow-right', hero)

  const lineL = parseInt(arrowLine.getTotalLength())
  const arrowLeftL = parseInt(arrowLeft.getTotalLength())
  const arrowRightL = parseInt(arrowRight.getTotalLength())

  gsap.set(arrowLine, { strokeDasharray: lineL, strokeDashoffset: lineL })
  gsap.set(arrowLeft, {
    strokeDasharray: arrowLeftL,
    strokeDashoffset: arrowLeftL,
  })
  gsap.set(arrowRight, {
    strokeDasharray: arrowRightL,
    strokeDashoffset: arrowRightL,
  })

  gsap.set(single, { autoAlpha: 1 })

  tl.add(header, '+=0.1')

  tl.from(
    words,
    {
      duration: 1.2,
      autoAlpha: 1,
      skewX: 45,
      x: -0,
      y: '102%',
      ease: 'power3.out',
      stagger: {
        amount: 0.5,
        from: 'center',
      },
      onComplete: () => {
        if (mask) gsap.set(mask, { overflow: 'visible' })
        if (store.sniff.isDevice) store.body.classList.remove('is-fixed')
        //store.flags.locked = false
      },
    },
    '0.5',
  )

  tl.from(stitle, { duration: 0.5, autoAlpha: 0, y: 20 }, '-=0.5')
  tl.from(dtitle, { duration: 0.5, autoAlpha: 0, y: 20 }, '-=0.4')

  tl.from(
    serviceList,
    { duration: 0.5, autoAlpha: 0, y: '101%', stagger: 0.1 },
    '-=0.3',
  )
  tl.from(
    dLines,
    { duration: 0.5, autoAlpha: 0, y: '101%', stagger: 0.1 },
    '-=0.3',
  )

  tl.from(image, { duration: 0.8, autoAlpha: 0 }, '-=0.5')

  tl.from(
    scroll,
    { duration: 1.8, autoAlpha: 0, rotate: 60, ease: 'power3.inOut' },
    '-=1.2',
  )
  tl.to(
    arrowLine,
    { duration: 1, strokeDashoffset: 0, ease: 'power3.inOut' },
    '-=1.2',
  )
  tl.to(
    arrowLeft,
    { duration: 1, strokeDashoffset: 0, ease: 'power3.inOut' },
    '-=1',
  )
  tl.to(
    arrowRight,
    { duration: 1, strokeDashoffset: 0, ease: 'power3.inOut' },
    '-=1',
  )

  return tl
}
