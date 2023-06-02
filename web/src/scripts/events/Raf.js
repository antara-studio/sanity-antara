/* Raf
   Global Raf class
   ========================================================================== */

   import {gsap} from "gsap"
   import { bindAll} from "../utils"

   export default class Raf {
    constructor() {

      bindAll(this, 'onRaf')
      this.raf()
    }
    
    raf() {
      if(this.onRaf) {
        gsap.ticker.add(this.onRaf);
      }
    }
  }
