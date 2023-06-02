import { Sniffer, qs, getViewport, getWindowSizes } from './utils'

export default {
  title: 'Antara Studio',
  author: 'mariosmaselli',
  link: 'https://twitter.com/mariosmaselli',
  body: document.body,
  main: qs('main'),
  header: qs('header'),
  page: qs('.page'),
  footer: qs('footer'),
  vw: getViewport().width,
  vh: getViewport().height,
  sniff: Sniffer.sniff,
  sizes: getWindowSizes(),
  bounds: {},
  smooth: {
    current: 0,
  },
  flags: {
    smooth: true,
    locked: true,
    resize: false,
    preloaded: false,
    load: false,
  },
}
