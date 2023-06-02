
/* Sniffer
   Browser detect util
   ========================================================================== */


   export const Sniffer = {
    uA: navigator.userAgent.toLowerCase(),
    aV: navigator.appVersion.toLowerCase(),

    get isWindowsMobile() {
      return /windows phone|iemobile|wpdesktop/.test(this.uA)
    },

    get isMobileOpera() {
      return /opera mini/i.test(this.uA)
    },

    get isIOS() {
      return /iphone|ipad|ipod/i.test(this.uA)
    },

    get isIpad() {
      return !this.isWindowsMobile && /ipad/i.test(this.uA) && this.isIOS
    },

    get isIphone() {
      return !this.isWindowsMobile && /iphone/i.test(this.uA) && this.isIOS
    },

    get isMobileAndroid() {
      return !this.isWindowsMobile && /android.*mobile/.test(this.uA)
    },

    get isTabletAndroid() {
      return (
        !this.isWindowsMobile && !this.isMobileAndroid && /android/i.test(this.uA)
      )
    },

    get isAndroid() {
      return this.isMobileAndroid || this.isTabletAndroid
    },

    get isPhone() {
      return (
        this.isMobileAndroid ||
        (this.isIOS && !this.isIpad) ||
        this.isWindowsMobile
      )
    },

    get isTablet() {
      return this.isTabletAndroid || this.isIpad
    },

    get isDevice() {
      return this.isPhone || this.isTablet
    },

    get isFirefox() {
      return this.uA.indexOf("firefox") > -1
    },

    get isSafari() {
      return !!this.uA.match(/version\/[\d\.]+.*safari/)
    },

    get isOpera() {
      return this.uA.indexOf("opr") > -1
    },

    get isIE11() {
      return !window.ActiveXObject && "ActiveXObject" in window
    },

    get isIE() {
      return (
        this.aV.indexOf("msie") > -1 ||
        this.isIE11 ||
        this.aV.indexOf("edge") > -1
      )
    },

    get isEdge() {
      return this.uA.indexOf("edge") > -1
    },

    get isWindows() {
      return ['Win32', 'Win64', 'Windows', 'WinCE'].indexOf(window.navigator.platform) !== -1
    },

    get isChrome() {
      return (
        window.chrome !== null &&
        window.chrome !== undefined &&
        navigator.vendor.toLowerCase() == "google inc." &&
        !this.isOpera &&
        !this.isEdge
      )
    },

    get isMac() {
      return navigator.platform.toLowerCase().indexOf("mac") > -1
    },

    get isDesktop() {
      return !this.isPhone && !this.isTablet
    },

    get isTouch () {
      return 'ontouchstart' in window
    },

    get sniff() {
      return {
        isWindowsMobile: this.isWindowsMobile,
        isMobileOpera: this.isMobileOpera,
        isIOS: this.isIOS,
        isIpad: this.isIpad,
        isIphone: this.isIphone,
        isMobileAndroid: this.isMobileAndroid,
        isTabletAndroid: this.isTabletAndroid,
        isAndroid: this.isAndroid,
        isFirefox: this.isFirefox,
        isSafari: this.isSafari,
        isOpera: this.isOpera,
        isIE11: this.isIE11,
        isIE: this.isIE,
        isEdge: this.isEdge,
        isChrome: this.isChrome,
        isMac: this.isMac,
        isPhone: this.isPhone,
        isTablet: this.isTablet,
        isDevice: this.isDevice,
        isDesktop: this.isDesktop,
        isWindows: this.isWindows,
        isTouch: this.isTouch
      }
    },

    update() {
      Object.assign(this, {
        uA: navigator.userAgent.toLowerCase(),
        aV: navigator.appVersion.toLowerCase()
      })
    }
  }

