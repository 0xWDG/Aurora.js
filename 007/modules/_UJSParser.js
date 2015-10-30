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
  var lib = function (params) { }
  /**
   * SJSParser
   *
   * Simple JavaScript Parser
   *
   * @param object [object] Wrapper
   * @see https://github.com/wesdegroot/_.js/wiki/module_SJSParser
   * @example _().UJSParser.init()
   */
  window._.fn.SJSParser = lib.prototype = {
    init: function () {
      var js = document.getElementsByTagName('script')
      for (var i = 0, j = js.length; i < j; i++) {
        if (js[i].type === 'text/_js' || js[i].type === 'text/_.js') {
          var eScript = this.parse(js[i].innerHTML)
          eval(eScript, js[i]) //eslint-disable-line
          console.log({
            orginalValue: js[i].innerHTML,
            element: js[i],
            execScript: eScript
          })
          // js[i].innerHTML) //eslint-disable-line
        }
      }
    },

    sRep: function (str, num) {
      return new Array(num + 1).join(str)
    },

    parse: function (data, ele) {
      if (typeof data !== 'undefined') {
        // return 'window.' + data // console.log(data)
        var cmd = data.toLowerCase().split('(')
        if (cmd[0] === 'log') {
          return 'window.console.' + data
        } else if (cmd[0] === 'error') {
          return 'window.console.' + data
        } else {
          window.console.log('-------------------------------------------')
          window.console.log('--    _.js Simple JavaScript Parser Error    --')
          window.console.log('-------------------------------------------')
          window.console.log('--  Command ' + cmd[0] + ' Unknown!' + this.sRep(' ', Math.round(25 - cmd[0].length * 1.1)) + '--')
          window.console.log('-------------------------------------------')
          window._._error('#UJSParser#parseError')
          return
        }
      } else {
        window._._error('#UJSParser')
      }
    }
  }
}
