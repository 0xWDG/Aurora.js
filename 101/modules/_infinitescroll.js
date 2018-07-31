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
   * infinitescroll
   *
   * infinite scroll
   *
   * @param object object
   * @param callbackOnEnd the callback function on reaching end of the page
   * @see https://github.com/wesdegroot/_.js/wiki/module_infinitescroll
   * @example _('.wrapper').infinitescroll(function () { loadMoreData(); })
   */
  window._.fn.infinitescroll2 = function (callbackOnEnd) {
    var len = this.length
    while (len--) {
      this[len].addEventListener('scroll', function (element) {
        console.log(this.scrollHeight)
        if (this.scrollTop + this.clientHeight + 250 >= this.scrollHeight) {
          if (typeof callbackOnEnd === 'function') {
            callbackOnEnd()
          } else {
            window._._error('#infinitescroll#infinitescroll')
          }
        }
      }, this[len])
    }
  }
}
