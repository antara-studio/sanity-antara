
import Emitter from './Emitter';
import { Sniffer, bindAll, listener } from "../utils"

export default class Mouse {
  constructor() {

    this.state = {
      on: 0,
      off: 0,
      coords: {
        x: 0,
        y: 0
      }
    };

    this.events = {
      move: Sniffer.sniff.isDevice ? 'touchmove' : 'mousemove',
      down: Sniffer.sniff.isDevice ? 'touchstart' : 'mousedown',
      up: Sniffer.sniff.isDevice ? 'touchend' : 'mouseup'
    };

    bindAll(this,'onMove', 'onDown', 'onUp' )

  }

  on() {
    this.l('add')
  }

  off() {
    this.l('remove')
  }

  l(a) {

    const { move, down, up } = this.events;

    listener(window, a, move, this.onMove);
    listener(window, a, down, this.onDown);
    listener(window, a, up, this.onUp);
  }

  getPos(e) {
    const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const y = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
    const target = e.target;

    return { x, y, target };
  }

  onMove(e) {
    const { x, y, target } = this.getPos(e);

    Emitter.emit('mousemove', { x, y, target, e });
  }

  onDown(e) {
    const { x, y, target } = this.getPos(e);
    this.state.on = x;
    Emitter.emit('mousedown', { x, y, target });
  }

  onUp(e) {
    const { x, target } = this.getPos(e);
    const state = this.state;
    state.off = x;
    const isClick = Math.abs(state.on - state.off) > 10;
    Emitter.emit('mouseup', { x, target, isClick });
  }

}


