/*
                         _
                        (_)
                         _    _____
                        | |  / ____|
                        | |  | (___
                    _   | |  \___  \
     ______    _   | |__| |  ____) |
    |______|  (_)   \____/  |______/
                              v0.1.0

    https://www.github.com/wesdegroot/_.js/
    or https://www.wdgwv.com

    Git:     https://github.com/wesdegroot/_.js
    Todo:    https://github.com/wesdegroot/_.js/issues
    Licence: https://github.com/wesdegroot/_.js/blob/master/LICENCE.md (CC BY 4.0)
    Latest:  https://raw.githubusercontent.com/wesdegroot/_.js/master/latest/_.js
*/
if (typeof _ !== 'function') {
  window.alert('Please make sure _.js is loaded!')
} else {
  /**
   * isOnScreen
   *
   * is the object still on the screen?
   *
   * @param object object
   * @param data the configuration array.
   * @see https://github.com/wesdegroot/_.js/wiki/module_isOnScreen
   * @example _().isOnScreen('background:red;','background:green;')
   */
  window._.fn.isOnScreen = function (idle, scrolled) {
    var len = 0

    if (true) {
      // set the window ios (Stay on Top)
      window._ios = ((
        // get object top
        this[len].getBoundingClientRect().top -
        // get object hight (minus top)
        this[len].getBoundingClientRect().height
      ) +
        // Add also the scroll position...
        window.scrollY
      )
      // Stay On Element
      window._ose = this[len]

      // Set window on scroll
      window.onscroll = function () {
        // Scrolled (almost) more than element?
        if (window.scrollY > window._ios) {
          // is the idle thing a 'function'
          if (typeof scrolled === 'function') {
            scrolled()
          } else if (typeof scrolled === 'string' && scrolled.substr(0, 1) === '.') {
            window._ose.className = scrolled.substr(1, scrolled.length)
          } else {
            window._ose.style.cssText = scrolled
          }
        } else {
          if (typeof idle === 'function') {
            idle()
          } else if (typeof idle === 'string' && idle.substr(0, 1) === '.') {
            window._ose.className = idle.substr(1, idle.length)
          } else {
            window._ose.style.cssText = idle
          }
        }
      }

      // Call the window on scroll!
      window.onscroll()
    }
  }
}
