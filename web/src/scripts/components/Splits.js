import SplitText from './SplitText'
import { qs, qsa } from '../utils'

export default class Splits {
  constructor(obj = {}) {
    this.els = obj.els || qsa('[data-split]')
    this.splits = []

    this.splitContent()
  }

  splitContent() {
    if (this.els.length === 0) return

    this.els.forEach((el) => {
      const dataset = el.dataset.split
      const data = dataset.split(',')
      const split = {}

      split.el = el

      data.forEach((type, i) => {
        const filter = type.trim()

        switch (filter) {
          case 'lines':
            split[i] = new SplitText(el, {
              type: 'lines',
              linesClass: `line-${i}`,
            })

            break

          case 'words':
            split[i] = new SplitText(el, {
              type: 'words',
              wordsClass: `word-${i}`,
            })

            break

          case 'chars':
            split[i] = new SplitText(el, {
              type: 'chars',
              charsClass: `char-${i}`,
            })

            break
        }
      })

      this.splits.push(split)
    })
  }

  reverseContent(el) {
    const arr = []
    let reversed

    this.splits.forEach((split) => {
      if (split.el === el) {
        for (const [key, value] of Object.entries(split)) {
          if (key !== 'el') {
            arr.push(value)
          }
        }
      }
    })

    reversed = arr.reverse()

    reversed.forEach((a) => {
      a.revert()
    })
  }

  init() {}
}
