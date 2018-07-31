/*
                         _
                        (_)
                         _    _____
                        | |  / ____|
                        | |  | (___
                    _   | |  \___  \
     ______    _   | |__| |  ____) |
    |______|  (_)   \____/  |______/
                              v0.0.7

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
  var TranslateJS = function (params) { }
  /**
   * init
   *
   * Add a nice multimedia parser
   *
   * @param object [object] Wrapper
   * @see https://github.com/wesdegroot/_.js/wiki/module_translate
   * @since v0.0.7
   */
  window._.fn.translate = TranslateJS.prototype = {
    /**
     * init
     *
     * init translator
     *
     * @param object object Wrapper
     * @param object data dataparser
     * @see https://github.com/wesdegroot/_.js/wiki/module_translate#init
     * @example _.translate.init()
     */
    init: function (data) {
      // DEBUG THINGS
      console.log('Data=')
      console.log(data)
      console.log(typeof data)

      if (typeof data === 'object') {
        var len = this.length
        while (len--) {

        }
      } else {
        window._._error('#translate#init')
      }
    }
  }
}
