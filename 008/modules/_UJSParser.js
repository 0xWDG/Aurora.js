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
if (!window._) {
  window.alert('Please make sure _.js is loaded!')
} else {
  window.SJSParserCustom = []
  window.SJSParserDebug = true
  var lib = function (params) { }
  /**
   * SJSParser
   *
   * Simple JavaScript Parser
   *
   * @param object [object] Wrapper
   * @see https://github.com/wesdegroot/_.js/wiki/module_SJSParser
   * @example _().SJSParser.init()
   */
  window._.fn.SJSParser = lib.prototype = {
    /**
     * init
     *
     * Simple Repeater
     *
     * @param object [object] Wrapper
     * @see https://github.com/wesdegroot/_.js/wiki/module_SJSParser#init
     * @example _().SJSParser.init()
     * @since v0.0.7
     */
    init: function () {
      if (window.SJSParserDebug) {
        console.log('SJSP: Init, Debugmode: on')
        window.setInterval(function () {
          console.log('SJSP: Debug: dumping window.SJSParserCustom')
          console.log(window.SJSParserCustom)
          console.log('SJSP: Debug: dumping done...')
        }, 60000) // 1 Min dump.
      }

      var js = document.getElementsByTagName('script')
      for (var i = 0, j = js.length; i < j; i++) {
        if (js[i].type === 'text/_js' || js[i].type === 'text/_.js') {
          var eScript = this.parse(js[i].innerHTML)
          var exec = eval(eScript, js[i]) //eslint-disable-line
          if (window.SJSParserDebug) {
            console.log({
              orginalValue: js[i].innerHTML,
              element: js[i],
              execScript: eScript,
              exec: exec
            })
          }
        }
      }
    },

    /**
     * extend
     *
     * Simple Repeater
     *
     * @param object [object] Wrapper
     * @param object data Data to parse
     * @see https://github.com/wesdegroot/_.js/wiki/module_SJSParser#extend
     * @example window._.SJSParser.extend({command: 'myCmd', exec: 'mySuperCommand'});
     * @internal
     * @since v0.0.7
     */
    extend: function (e) {
      if (window.SJSParserDebug) {
        console.log('SJSP: Extending with:')
      }

      if (typeof e === 'object') {
        for (var k in e) {
          this[k] = e[k]

          if (typeof this[k] !== 'function') {
            console.error('FAILED TO EXTEND WITH "' + k + '"!')
          }
        }
      }

      if (window.SJSParserDebug) {
        console.log('SJSP: End of extending')
      }
    },

    /**
     * sRep
     *
     * Simple Repeater
     *
     * @param object [object] Wrapper
     * @param string str String to repeat
     * @param int num Times to repeat
     * @see https://github.com/wesdegroot/_.js/wiki/module_SJSParser#sRep
     * @example _().SJSParser.sRep(' ', 10)
     * @internal
     * @since v0.0.7
     */
    sRep: function (str, num) {
      return new Array(num + 1).join(str)
    },

    /**
     * parse
     *
     * Simple JavaScript Parser
     *
     * @param object [object] Wrapper
     * @param string data Data file
     * @param object ele The parent element
     * @see https://github.com/wesdegroot/_.js/wiki/module_SJSParser#parse
     * @example _().SJSParser.parse(data, ele)
     * @internal
     * @since v0.0.7
     */
    parse: function (data, ele) {
      if (typeof data !== 'undefined') {
        // return 'window.' + data // console.log(data)
        var cmd = data.toLowerCase().split('(')
        if (cmd[0] === 'log') {
          return 'window.console.' + data
        } else if (cmd[0] === 'error') {
          return 'window.console.' + data
        } else {
          if (window.SJSParserDebug) {
            window.console.log('SJSP: -------------------------------------------')
            window.console.log('SJSP: --    _.js Simple JavaScript Parser Error    --')
            window.console.log('SJSP: --  Command ' + cmd[0] + ' Unknown!' + this.sRep(' ', Math.round(25 - cmd[0].length * 1.1)) + '--')
            window.console.log('SJSP: -------------------------------------------')
          } else {
            window._._error('#SJSParser#parseError')
          }
          return
        }
      } else {
        window._._error('#SJSParser')
      }
    }
  }
}
