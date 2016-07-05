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
  /**
   * isOnScreen
   *
   * is the object still on the screen?
   *
   * @param object object
   * @see https://github.com/wesdegroot/_.js/wiki/module_snow
   * @example _().snow.start()
   */
  window._.snow = {
    conf: {
      // Cusom
    },

    lis: {
      configuration: 'default',
      elementList: [], // Empty
      myCount: null, // Needs to be int!
      max: 25,
      refresh: 500, // Default: 1500
      withColors: true, // True = Snow becomes fireworks!
      colors: ['red', 'blue', 'yellow', 'green', 'orange', 'purple', 'white', 'cyan', 'DeepSkyBlue', 'Gold', 'DodgerBlue', 'Magenta'],
      style: 'z-index: 10; border-radius: 5px; border: 1px solid transparent; color: transparent; background: %s; position: fixed; left:%spx; top:%spx; width:5px; height:5px; padding:0px; margin:0px; line-hight: 5px;'
    },

    start: function () {
      window._.snow.letItSnow() // Misplaced name.
    },

    letItSnow: function () {
      window._.snow.makeSnowElements()
      window.setTimeout(function () {
        window._.snow.letItSnow()
      }, window._.snow.lis.refresh)
    },

    shift: function (elementID) {
      if (window._.snow.lis.withColors) {
        var myColor = window._.snow.lis.colors[Math.floor((Math.random() * window._.snow.lis.colors.length))]
        document.getElementById(elementID).style.cssText = window._.format(window._.snow.lis.style, myColor, Math.floor((Math.random() * window.screen.width) + 1), Math.floor((Math.random() * window.screen.height) + 1))
      } else {
        document.getElementById(elementID).style.cssText = window._.format(window._.snow.lis.style, '#FFF', Math.floor((Math.random() * window.screen.width) + 1), Math.floor((Math.random() * window.screen.height) + 1))
      }
    },

    makeSnowElements: function () {
      // Create Elements (yes, they need to be hidden)...
      for (window._.snow.lis.myCount = 0; window._.snow.lis.myCount < window._.snow.lis.max; window._.snow.lis.myCount++) {
        // Create Tempy var
        var tempy

        // Just for counting
        if (window._.snow.lis.myCount < 100 && window._.snow.lis.myCount > 9) window._.snow.lis.myCount = '0' + window._.snow.lis.myCount

        // Just for counting
        if (window._.snow.lis.myCount < 10) window._.snow.lis.myCount = '00' + window._.snow.lis.myCount

        // Just for counting
        var myID = '_lis_' + window._.snow.lis.myCount

        // If not exists then create (otherwise call window.fn.snow.shift(id))
        if (document.getElementById(myID) === null) {
          tempy = document.createElement('div')
          tempy.className = 'lis'
          tempy.id = myID
          tempy.innerHTML = '.'
          tempy.style.cssText = window._.format(window._.snow.lis.style, Math.floor((Math.random() * window.screen.width) + 1), Math.floor((Math.random() * window.screen.height) + 1))
          //
          // Append...
          document.body.appendChild(tempy)
          window._.snow.lis.elementList.push(myID)
        } else {
          window._.snow.shift(myID)
        }
      }
    }
  }
}
