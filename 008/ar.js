/*
**                         _
**                        (_)
**                         _    _____
**                        | |  / ____|
**                        | |  | (___
**                    _   | |  \___  \
**     ______    _   | |__| |  ____) |
**    |______|  (_)   \____/  |______/
**                         v0.0.8 Beta
**              JS Standard Code Style
**
** https://www.github.com/wdg/_.js/
** or https://www.wdgwv.com
**
** Git....: https://github.com/wdg/_.js
** Todo...: https://github.com/wdg/_.js/issues
** Licence: https://github.com/wdg/_.js/blob/master/LICENCE.md (CC BY 4.0)
** Latest.: https://raw.githubusercontent.com/wdg/_.js/master/latest/_.js
*/

// _ function
;(function (self) {
  // * self._lastObj
  // *
  // * Last selected object
  // *
  // * @var object _lastObj
  self._lastObj = null

  // * self._modLoaded
  // *
  // * Wich modules are loaded?
  // *
  // * @var array _modLoaded
  self._modLoaded = []

  // * self._eventStore
  // *
  // * Event store (On.....)
  // *
  // * @var array _eventStore
  self._eventStore = []

  // _ returns new Library object that hold our selector. Ex: _('.wrapper')
  var _ = function (params) {
    return new Library(params)
  }

  // In our Library we get our selector with querySelectorAll
  var Library = function (params) {
    // * this.selector
    // *
    // * We'll gonna set the selector
    // *
    // * @var object selector
    var selector = typeof exports !== 'undefined' || typeof params === 'undefined' ? [] : (params.indexOf('>') === -1) ? document.querySelectorAll(params) : []

    // * this.lenth
    // *
    // * We'll gonna load the length of the selector
    // *
    // * @var int lenth
    this.length = selector.length

    // * this.param
    // *
    // * Wich param is sended?
    // *
    // * @var string param
    this.param = params

    // * this.version
    // *
    // * We'll gonna set the version
    // *
    // * @var string version
    this.version = '0.0.8b'

    // * this.revision
    // *
    // * We'll gonna set the revision (prefix: r)
    // *
    // * @var string revision
    this.revision = 'r161103'

    // * this.fullversion
    // *
    // * We'll gonna mix the version & revision (full build string)
    // *
    // * @var string fullversion
    this.fullversion = this.version + this.revision

    // * this.isBeta
    // *
    // * Is product in Beta status
    // *
    // * @var bool isBeta
    this.isBeta = (this.version.match(/b/g))

    // * this.isAlpha
    // *
    // * Is product in Aplha (alfa) status
    // *
    // * @var bool isAlpha
    // * @deprecated v0.0.6
    // * @removed v0.1.0
    this.isAlpha = (this.version.match(/a/g))

    // * this.isCompiled
    // *
    // * is this a compiled version
    // * Please note that _.js is always uncompiled.
    // * Compiled version = _.min.js
    // *
    // * @var bool isCompiled
    this.isCompiled = false

    // * this.isStable
    // *
    // * is this a stable version
    // *
    // * @var bool isStable
    this.isStable = (!this.isBeta && !this.isAlpha)

    // * this.scriptRX
    // *
    // * Regex for script tag
    // *
    // * @var string scriptRX
    this.ScriptRX = '<script[^>]*>([\\S\\s]*?)<\/script\\s*>' //eslint-disable-line

    // * this.JSONRX
    // *
    // * Regex for JSON
    // *
    // * @var string JSONRX
    this.JSONRX = '/^\/\*-secure-([\s\S]*)\*\/\s*$/' //eslint-disable-line

    // * this.nodeJS
    // *
    // * Do we run in nodeJS?
    // *
    // * @since v0.0.8
    // * @var object nodeJS
    // * @example _.nodeJS
    this.nodeJS = (typeof exports !== 'undefined')

    // * this.emoij
    // *
    // * Super cool emoij list
    // *
    // * @since v0.0.8
    // * @var object emoij
    // * @example _.emoij.nerd
    this.emoij = {
      nerd: '\uD83E\uDD13',
      smilie: '\ud83d\ude03',
      dsmilie: '\ud83d\ude00',
      heart: '\u2764\ufe0f',
      brokenheart: '\ud83d\udc94'
    }

    // * this.objectclass
    // *
    // * Possible object classes
    // *
    // * @var object objectclass
    this.objectclass = {
      '[object Boolean]': 'boolean',
      '[object Number': 'number',
      '[object String': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regexp',
      '[object Object]': 'object',
      '[object Error]': 'error'
    }

    // * this.cconsole
    // *
    // * [CLI] Change console colors
    // *
    // * @cli only
    // * @since v0.0.8
    // * @var object console
    // * @example _.emoij.color.red
    this.cconsole = {
      reset: {
        start: '\u001b[0m',
        stop: '\u001b[0m'
      },

      bold: {
        start: '\u001b[1m',
        stop: '\u001b[22m' // or 21
      },

      dim: {
        start: '\u001b[2m',
        stop: '\u001b[22m'
      },

      italic: {
        start: '\u001b[3m',
        stop: '\u001b[23m'
      },

      underline: {
        start: '\u001b[4m',
        stop: '\u001b[24m'
      },

      inverse: {
        start: '\u001b[7m',
        stop: '\u001b[27m'
      },

      hidden: {
        start: '\u001b[8m',
        stop: '\u001b[28m'
      },

      strikethrough: {
        start: '\u001b[9m',
        stop: '\u001b[29m'
      },

      color: {
        standard: '\u001b[39m',
        black: '\u001b[30m',
        red: '\u001b[31m',
        green: '\u001b[32m',
        yellow: '\u001b[33m',
        blue: '\u001b[34m',
        magenta: '\u001b[35m',
        cyan: '\u001b[36m',
        white: '\u001b[37m',
        gray: '\u001b[90m'
      },

      background: {
        standard: '\u001b[49m',
        black: '\u001b[40m',
        red: '\u001b[41m',
        green: '\u001b[42m',
        yellow: '\u001b[43m',
        blue: '\u001b[44m',
        magenta: '\u001b[45m',
        cyan: '\u001b[46m',
        white: '\u001b[47m'
      }
    }

    // * _._nav
    // *
    // * Browser info
    // * If present
    // *
    // * @since v0.0.8
    // * @var object _nav
    // * @internal
    var _nav = !this.nodeJS ? navigator : {userAgent: 'Node.js Node.js Node.js', maxTouchPoints: 0, msMaxTouchPoints: 0}

    // * temp
    // *
    // * Helper
    // * -> everyone lies (Especially Chrome), IE=Trident...
    // *
    // * @since v0.0.7
    // * @var string temp
    // * @internal
    var temp = _nav.userAgent.split(' ')[_nav.userAgent.split(' ').length - 2].split('/')[0] === 'Chrome'
      ? _nav.userAgent.split(' ')[_nav.userAgent.split(' ').length - 2].split('/')[0]
      : _nav.userAgent.split(' ')[_nav.userAgent.split(' ').length - 1].split('/')[0]

    // * this.browser
    // *
    // * Browser info
    // * ie, firefox, safari, opera, edge, chrome, userAgent, supportTouch...
    // *
    // * @since v0.0.7
    // * @var object browser
    this.browser = {
      ie: (_nav.userAgent.indexOf('Trident') !== -1), // Always try to be funnny...
      firefox: (temp === 'Firefox'),
      safari: (temp === 'Safari'),
      opera: (temp === 'OPR'),
      edge: (temp === 'Edge'),
      chrome: (temp === 'Chrome'),
      userAgent: _nav.userAgent,
      supportTouch: ('ontouchstart' in self) || (_nav.maxTouchPoints > 0) || (_nav.msMaxTouchPoints > 0)
    }

    // * this.getBrowser
    // *
    // * Browser name
    // *
    // * @since v0.0.7
    // * @var string getBrowser
    this.getBrowser = temp

    // Add selector to object for method chaining
    for (var i = 0; i < this.length; i++) {
      this[i] = selector[i]
      self._lastObj = selector[i]
    }

    // Return as object
    return this
  }

  // Extend the Library object.
  _.fn = Library.prototype = {
    /**
     * _
     *
     * Display/Set config
     *
     * @param object [object] Wrapper
     * @param string configKey config parameter
     * @example _._('version')
     */
    _: function (configKey) {
      return this[configKey]
    },

    /**
     * emulatejQuery
     *
     * emulate jQuery's $ script :D
     *
     * @web only
     * @param object [object] Wrapper
     * @return this
     * @example _.emulatejQuery()
     */
    emulatejQuery: function () {
      // jQuery uses a lot of window elements.
      // $, _$, jQuery and _jQuery!
      self.$ = self._
      self._$ = self._
      self.jQuery = self._
      self._jQuery = self._
      // After setting, just return
      return self._
    },

    /**
     * $
     *
     * Easter egg ;)
     *
     * @universal function
     * @param object [object] Wrapper
     * @return this
     * @example _.$()
     */
    $: function (x) {
      // Sometimes we'll also need FUN
      if (!this.nodeJS) {
        self.alert('Hi')

        if (self.confirm("Did you know that i'm not jQuery?")) {
          self.alert('Why did you even try this?')
        } else {
          self.alert("Nope, i'm not jQuery")
        }

        // Super (decodeURIComponent will be lost!)
        self.alert("Thanks for using '_.js'!\n" +
          decodeURIComponent('%F0%9F%92%99'))
      } else {
        if (x !== 'TEST') {
          console.log("Thanks for using '_.js'!\n" +
            decodeURIComponent('%F0%9F%92%99'))
        }
      }
      return
    },

    /**
     * extend
     *
     * Merge the contents of two or more objects together into the first object.
     *
     * @universal function
     * @param object object Wrapper
     * @param bool [deep] Deep?
     * @param object object Object1
     * @param object object Object2
     * @return object
     * @example _.extend(true, {apple:0, chicken:{weight:52, price:100}, cherry:97},{chicken:{price:200}, durian:100})
     */
    extend: function () {
      // Thanks to jQuery for this one ;)
      var src
      var copyIsArray
      var copy
      var name
      var options
      var clone
      var target = arguments[0] || {}
      var i = 1
      var length = arguments.length
      var deep = false
      // Handle a deep copy situation
      if (typeof target === 'boolean') {
        deep = target
        // skip the boolean and the target
        target = arguments[ i ] || {}
        i++
      }
      // Handle case when target is a string or something (possible in deep copy)
      if (typeof target !== 'object' && !this.isFunction(target)) {
        target = {}
      }
      // extend _.js itself if only one argument is passed
      if (i === length) {
        target = this
        i--
      }
      for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = arguments[ i ]) != null) {
          // Extend the base object
          for (name in options) {
            src = target[ name ]
            copy = options[ name ]
            // Prevent never-ending loop
            if (target === copy) continue
            // Recurse if we're merging plain objects or arrays
            if (deep && copy && (this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)))) {
              if (copyIsArray) {
                copyIsArray = false
                clone = src && this.isArray(src) ? src : []
              } else {
                clone = src && this.isPlainObject(src) ? src : {}
              }
              // Never move original objects, clone them
              target[ name ] = this.extend(deep, clone, copy)
            // Don't bring in undefined values
            } else if (copy !== undefined) {
              target[ name ] = copy
            }
          }
        }
      }
      // Return the modified object
      return target
    },

    /**
     * isArray
     *
     * Must be important enough that everyone need this!
     *
     * @universal function
     * @param object [object] Wrapper
     * @param object obj object to test
     * @return bool
     * @example _.isArray(['my', 'array'])
     */
    isArray: function (obj) {
      // Since node.js cannot handle isArray if a item is NOT an array
      return (!this.nodeJS ? obj.isArray : false) || (this.type(obj) === 'array')
    },

    /**
     * getCookie
     *
     * Get cookie data
     *
     * @web only
     * @since v0.0.8
     * @param string name cookies name
     * @return string/bool
     * @example _.getCookie('Cookiemonster')
     */
    getCookie: function (name) {
      if (!this.nodeJS) {
        var start = document.cookie.indexOf(name + '=')
        var len = start + name.length + 1

        if ((!start) && (name !== document.cookie.substring(0, name.length))) {
          return null
        }

        if (start === -1) {
          return null
        }

        var end = document.cookie.indexOf(';', len)

        if (end === -1) {
          end = document.cookie.length
        }

        return unescape(document.cookie.substring(len, end))
      } else {
        return false
      }
    },

    /**
     * setCookie
     *
     * Set cookie data
     *
     * @web only
     * @since v0.0.8
     * @param string name cookies name
     * @param string value cookies value
     * @param string [path] path (default: /)
     * @param string [domain] domain (default .domainname.extension)
     * @param bool [secure] secure cookie? (default: false) [JS Can't read secure cookies!]
     * @return null
     * @example _.setCookie('Cookiemonster', 'Cookiemonster is cool')
     */
    setCookie: function (name, value) { // , expires, path, domain, secure
      if (!this.nodeJS) {
        if (!domain) {
          var tdomain = self.location.hostname
          tdomain = domain.split('.')
          var domain = '.'

          for (var i = 1; i < tdomain.lenth; i++) {
            domain += tdomain[i]
          }
        }

        var today = new Date()
        today.setTime(today.getTime())

        if (typeof expires !== typeof 'String') {
          var expires = 1
        }

        if (typeof path !== typeof 'String') {
          var path = '/'
        }

        if (typeof secure !== typeof false) {
          var secure = false
        }

        if (expires) {
          expires = expires * 1000 * 60 * 60 * 24
        }

        var expiresDate = new Date(today.getTime() + expires)

        document.cookie = name + '=' + escape(value) +
          ((expires) ? ';expires=' + expiresDate.toGMTString() : '') + // expires.toGMTString()
          ((path) ? ';path=' + path : '') +
          ((domain) ? ';domain=' + domain : '') +
          ((secure) ? ';secure' : '')

        return null
      } else {
        return false
      }
    },

    /**
     * deleteCookie
     *
     * Delete cookie data
     *
     * @web only
     * @since v0.0.8
     * @param string name cookies name
     * @param string [path] path (default: /)
     * @param string [domain] domain (default .domainname.extension)
     * @return bool
     * @example _.getCookie('Cookiemonster')
     */
    deleteCookie: function (name) { // , path, domain
      if (!this.nodeJS) {
        if (this.getCookie(name)) {
          if (!domain) {
            var tdomain = self.location.hostname
            tdomain = domain.split('.')
            var domain = '.'

            for (var i = 1; i < tdomain.lenth; i++) {
              domain += tdomain[i]
            }
          }

          document.cookie = name + '=' +
            // ((path) ? ';path=' + path : '') +
            // ((domain) ? ';domain=' + domain : '') +
            ';expires=Thu, 01-Jan-1970 00:00:01 GMT'
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },

    /**
     * toggle
     *
     * Toggle between hidden, and opaque
     *
     * @web only
     * @since v0.0.8
     * @param object object Wrapper
     * @return null
     * @example _('.hideOrShowMe').toggle()
     */
    toggle: function () {
      if (!this.nodeJS) {
        var len = this.length
        while (len--) {
          if (this[len].style.display !== 'none') {
            this[len].style.display = 'none'
          } else {
            this[len].style.display = ''
          }
        }

        return null
      } else {
        return false
      }
    },

    /**
     * on
     *
     * On ... event
     *
     * @param object object Wrapper
     * @param string myEvent event
     * @param function|bool callback Function to use|remove
     * @return null
     * @example _('.wrapper').html('x').on('mousemove', function () { console.log('moved'); })
     * @example _('.wrapper').html('x').on('mousemove', true); // Remove.
     * @example _('.wrapper').on('mousemove', function () { console.log('moved'); })
     * @example _('.wrapper').on('mousemove', true); // Remove.
     */
    on: function (myEvent, callback) {
      if (!this.nodeJS) {
        var len = this.length
        if (typeof callback === 'function') {
          while (len--) {
            this[len].addEventListener(myEvent, callback)
            var tempArr = [(self._eventStore.length + 1), this[len], myEvent, callback]
            self._eventStore.push(tempArr)
          }
        } else {
          while (len--) {
            var newArray = []
            var curEvent
            for (curEvent in self._eventStore) {
              curEvent = self._eventStore[curEvent]
              if (this[len] === curEvent[1] && myEvent === curEvent[2]) {
                curEvent[1].removeEventListener(curEvent[2], curEvent[3])
              } else {
                newArray.push(curEvent)
              }
            }
            self._eventStore = newArray
          }
        }
        return null
      } else {
        return false
      }
    },

    /**
     * noop
     *
     * Function what don't do a thing...
     *
     * @since v0.0.7
     * @param object [object] Wrapper
     * @return nothing
     * @example _.noop()
     */
    noop: function () {},

    /**
     * supportTouch
     *
     * Does the client support touch (events)?
     *
     * @since v0.0.7
     * @param object [object] Wrapper
     * @return bool
     * @example _.supportTouch()
     */
    supportTouch: function () {
      return this.nodeJS ? false : (
        ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0)
      )
    },

    /**
     * appendTo
     *
     * append element to...
     *
     * @since v0.0.7
     * @param object [object] Wrapper
     * @param string to Append to
     * @return null
     * @example _("<b>Hi!</b>").appendTo(".inner")
     */
    appendTo: function (to) {
      if (!this.nodeJS) {
        if (to === 'body') {
          document.body.innerHTML += this.param
        } else if (to === 'head') {
          document.head.innerHTML += this.param
        } else if (to.substr(0, 1) === '.' || to.substr(0, 1) === '#') {
          _(to).html(this.param, true)
        } else {
          this._error('appendTo')
        }

        return null
      } else {
        return false
      }
    },

    /**
     * _error
     *
     * Internal use for error.
     * Please do use if your plugin is for public domain and a pull request is done
     * See [wiki/Module Developers](https://github.com/wdg/_.js/wiki/Developers_Module) for more information.
     *
     * @internal
     * @since v0.0.7
     * @param object [object] Wrapper
     * @param string functionname Function name
     * @param string [message] Error message
     * @return null
     * @example _.error('Functionname', 'Message')
     * @example _.error('#MyModule#MyFunction', 'Message')
     */
    _error: function (functionname, message) {
      if (functionname !== '#IGNORE#ME') {
        if (typeof message === 'undefined') {
          console.error('_.js Error: Invalid usage of function')
        } else {
          console.error('_.js Error: ' + message)
        }

        if (!this.startsWith(functionname, '#')) {
          if (!this.isBeta) {
            console.error('Please see: https://github.com/wdg/_.js/wiki/function_' + functionname)
          } else {
            console.error('Please see: https://github.com/wdg/_.js/wiki/flbeta_function_' + functionname)
          }
        } else {
          console.error('Please see: https://github.com/wdg/_.js/wiki/module_' + functionname.substr(1))
        }
      }

      return null
    },

    /**
     * deprecated
     *
     * Throw a warning when a function is deprecated
     *
     * @internal
     * @universal function
     * @param string what what function?
     * @param string since since when?
     * @param string endoflife EOL in version?
     * @param string [alternative] is there a alternative?
     * @return null
     * @example _.error('Message')
     */
    deprecated: function (what, since, endoflife, alternative) {
      console.warn(
        this.format(
            '⚠️  function \'%s\' is deprecated since v%s %s\n               this function will be removed in v%s %s\n%s',

            what,
            since,
            '(https://github.com/wdg/_.js/wiki/changed_in_' + since.replace(/(\.|b|a)/g, '') + ')',
            endoflife,
            '(https://github.com/wdg/_.js/wiki/changed_in_' + endoflife.replace(/(\.|b|a)/g, '') + ')',
            typeof alternative === 'undefined'
              ? '\n There\'s no alternative for ' + what
              : '\nAlternative: _.' + alternative + '(...) See https://github.com/wdg/_.js/wiki/' + (this.isBeta ? 'flbeta_' : '') +
                'function_' + alternative + ' for more information'
          )
      )
      return null
    },

    /**
     * error
     *
     * Throw a error (why would you ever do that?)
     *
     * @universal function
     * @param object [object] Wrapper
     * @param string message
     * @return null
     * @example _.error('Message')
     */
    error: function (msg) {
      throw new Error(msg)
    },

    /**
     * isFunction
     *
     * Is it a fly? or a function?
     *
     * @universal function
     * @param object [object] Wrapper
     * @param object obj object to test
     * @return bool
     * @example _.isFunction(function () {})
     */
    isFunction: function (obj) {
      return this.type(obj) === 'function'
    },

    /**
     * type
     *
     * What kind of object is parsed?
     *
     * @universal function
     * @param object [object] Wrapper
     * @param object obj Object to test
     * @return string
     * @example _.type(function () { })
     */
    type: function (obj) {
      if (obj == null) return obj + ''
      return typeof obj === 'object' || typeof obj === 'function'
        ? this.objectclass[ Object.prototype.toString.call(obj) ] || 'object' : typeof obj
    },

    /**
     * escapeForRegex
     *
     * Escape a string for safe regex use!
     *
     * @universal function
     * @since v0.0.8
     * @param object [object] Wrapper
     * @param string str the string to escape
     * @return string
     * @example _.escapeForRegex('myPotensialRegexUnSafeString')
     */
    escapeForRegex: function (str) {
      return str.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1')
                .replace(/\x08/g, '\\x08') //eslint-disable-line
    },

    /**
     * isPlainObject
     *
     * Check to see if an object is a plain object (created using "{}" or "new Object").
     *
     * @universal function
     * @param object [object] Wrapper
     * @param object obj Object to test
     * @return bool
     * @example _.isPlainObject(function () {})
     */
    isPlainObject: function (obj) {
      // Thanks to jQuery for this one ;)
      var key
      var hasOwn = ({}).hasOwnProperty
      var support = {}
      if (!obj || this.type(obj) !== 'object' || obj.nodeType) {
        return false
      }
      try {
        if (obj.constructor &&
          !hasOwn.call(obj, 'constructor') &&
          !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
          return false
        }
      } catch (e) {
        return false
      }
      if (support.ownLast) {
        for (key in obj) {
          return hasOwn.call(obj, key)
        }
      }
      for (key in obj) {}
      return key === undefined || hasOwn.call(obj, key)
    },

    /**
     * require
     *
     * Load/Require a javascript file
     * if a file is starting with _ then it is a _.js module
     * DO not use _ as first character on own modules! (unless you do a pull request.)
     *
     * @web only
     * @param object [object] Wrapper
     * @param string|array jsArray the array of files to load (or string)
     * @param function Callback the Callback function
     * @param bool [local] if set to true then load the local copy.
     * @return null
     * @example _.require(['a', 'r', 'ra', 'y'], function () { doSomeThing(); })
     */
    require: function (jsArray, Callback, local) {
      if (!this.nodeJS) {
        if (typeof local === 'undefined') local = false
        if (typeof jsArray === 'object') {
          for (var i = jsArray.length - 1; i >= 0; i--) {
            if (self._modLoaded.indexOf(jsArray[i]) === -1) {
              self._modLoaded.push(jsArray[i])
              if (!jsArray[i].match(/\.js/g)) {
                jsArray[i] = jsArray[i] + '.js'
              }
              if (this.startsWith(jsArray[i], '_') && !local) {
                jsArray[i] = 'https://raw.githubusercontent.com/wdg/_.js/master/latest/modules/' + jsArray[i].toLowerCase()
              }
              var script = document.createElement('script')
              script.type = 'text/javascript'
              script.src = jsArray[i]
              if (i === 1) {
                scriptOne.onreadystatechange = ''
                scriptOne.onload = setTimeout(function (Callback) {
                  _._copy_js()
                  Callback()
                }, 10, Callback)
              }
              document.head.appendChild(script)
            } else {
              _._copy_js()
              Callback()
            }
          }
        } else if (typeof (jsArray) === 'string') {
          if (self._modLoaded.indexOf(jsArray) === -1) {
            self._modLoaded.push(jsArray)
            if (!jsArray.match(/\.js/g)) jsArray = jsArray + '.js'
            if (this.startsWith(jsArray, '_') && !local) {
              jsArray = 'https://raw.githubusercontent.com/wdg/_.js/master/latest/modules/' + jsArray.toLowerCase()
            }
            var scriptOne = document.createElement('script')
            scriptOne.type = 'text/javascript'
            scriptOne.src = jsArray
            scriptOne.onreadystatechange = ''
            scriptOne.onload = setTimeout(function (Callback) {
              _._copy_js()
              Callback()
            }, 10, Callback)
            document.head.appendChild(scriptOne)
          } else {
            _._copy_js()
            Callback()
          }
        } else {
          console.error('Please use only a array, or a string.')
        }
      } else {
        // NEED A WAY TO REQUIRE EXTENSIONS WITH USE OF NODE.JS
        // ...
      }
      return null
    },

    /**
     * Format
     *
     * Format sort of sprintf
     *
     * @universal function
     * @param object [object] Wrapper
     * @param string str String
     * @param string ... Options
     * @return string
     * @example _.format('my %s', 'wesley')
     */
    format: function () {
      var args = arguments
      var string = args[0]
      var i = 1
      return string.replace(/%((%)|s|d)/g, function (m) {
        var val = null
        if (m[2]) {
          val = m[2]
        } else {
          val = args[i]
          switch (m) {
            case '%d':
              val = parseFloat(val)
              if (isNaN(val)) {
                val = 0
              }
              break
          }
          i++
        }
        return val
      })
    },

    /**
     * Hide
     *
     * Hide a object from the website
     *
     * @web only
     * @param object object Wrapper
     * @deprecated 0.0.8
     * @removed 0.1.0
     * @alternative toggle
     * @return this
     * @example _('.wrapper').hide()
     */
    hide: function () {
      this.deprecated('hide', '0.0.8', '0.1.0', 'toggle')
      if (!this.nodeJS) {
        var len = this.length
        while (len--) {
          self._lastObj = this[len]
          this[len].style.display = 'none'
        }
        return this
      } else {
        return false
      }
    },

    /**
     * html
     *
     * place html in a object from the website
     *
     * @web only
     * @param object object Wrapper
     * @param string [data] HTML to write
     * @return this
     * @example _('.wrapper').html('hi, i\'m new') //Write
     * @example _('.wrapper').html('hi, i\'m new', true) //Append
     * @example _('.wrapper').html() //Read
     */
    html: function (data, append) {
      if (!this.nodeJS) {
        var len = this.length

        while (len--) {
          self._lastObj = this[len]

          if (typeof data === 'undefined') {
            return this[len].innerHTML
          } else if (typeof append === 'undefined') {
            this[len].innerHTML = data
          } else {
            this[len].innerHTML += data
          }
        }

        return this
      } else {
        return false
      }
    },

    /**
     * show
     *
     * show a object from the website
     *
     * @web only
     * @param object object Wrapper
     * @deprecated 0.0.8
     * @removed 0.1.0
     * @alternative toggle
     * @return this
     * @example _('.wrapper').show()
     */
    show: function () {
      this.deprecated('show', '0.0.8', '0.1.0', 'toggle')
      if (!this.nodeJS) {
        var len = this.length

        while (len--) {
          self._lastObj = this[len]
          this[len].style.display = 'block'
        }

        return this
      } else {
        return false
      }
    },

    /**
     * Framebreak
     *
     * If i'm in a frame, please break out of it
     *
     * @web only
     * @param object [object] Wrapper
     * @return false
     * @example _.framebreak()
     */
    framebreak: function () {
      if (!this.nodeJS) {
        if (self.top.location !== self.location) {
          self.top.location.href = document.location.href
        }
      }
      return false
    },

    /**
     * ajaxPost
     *
     * ajaxPost Posts a form, tru ajax.
     * Please not call this function yourself, unless you know what you are doing!
     *
     * @internal
     * @web only
     * @param object object Wrapper
     * @param string form Form to handle
     * @param function callback callback to
     * @return bool
     * @example _('.wrapper').ajaxPost(form)
     */
    ajaxPOST: function (form, callback) {
      if (!this.nodeJS) {
        var len = this.length

        while (len--) {
          self._lastObj = this[len]
          var xmlPhttp
          var change = this[len]

          if (self.XMLHttpRequest) {
            xmlPhttp = new self.XMLHttpRequest() // code for IE7+, Firefox, Chrome, Opera, Safari
          } else {
            xmlPhttp = new self.ActiveXObject('Microsoft.XMLHTTP') // code for IE6, IE5
          }

          // Add form to FormData
          var formData = new FormData(form) //eslint-disable-line

          // Open
          xmlPhttp.open('POST', form.action, true)

          // Progress (we do not use it (yet))
          xmlPhttp.upload.onprogress = function (e) {
            if (e.lengthComputable) {
              var progress = (e.loaded / e.total) * 100
              console.log('Progress = ' + progress + '%')
            }
          }

          // Readystate Change(d)
          xmlPhttp.onreadystatechange = function () {
            if (xmlPhttp.readyState === 4 && xmlPhttp.status === 200) {
              change.innerHTML = xmlPhttp.responseText

              // JavaScript Fix!
              var js = change.getElementsByTagName('script')
              for (var i = 0, j = js.length; i < j; i++) {
                eval(js[i].innerHTML) //eslint-disable-line
              }

              // fix posts also (.ajax)
              var pst = change.getElementsByTagName('form')
              for (var ii = 0, jj = pst.length; ii < jj; ii++) {
                if (pst[ii].method.toLowerCase() === 'post') {
                  pst[ii].setAttribute('onsubmit', "event.preventDefault();_('." + change.className + "').ajaxPOST(this);")
                }
              }
            }
          }

          // Send our FormData
          xmlPhttp.send(formData)
        }
      }
      return false
    },

    /**
     * Ajax
     *
     * Loads a page AJAX
     *
     * @web only
     * @param object object Wrapper
     * @param string url Url to get
     * @param object options extra options
     * @return bool
     * @example _('.wrapper').ajax(url, options)
     */
    ajax: function (url, options) {
      if (!this.nodeJS) {
        var len = this.length

        while (len--) {
          self._lastObj = this[len]

          var xmlhttp
          var change = this[len]

          if (self.XMLHttpRequest) {
            xmlhttp = new self.XMLHttpRequest() // code for IE7+, Firefox, Chrome, Opera, Safari
          } else {
            xmlhttp = new self.ActiveXObject('Microsoft.XMLHTTP') // code for IE6, IE5
          }

          xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
              change.innerHTML = xmlhttp.responseText

              // JavaScript Fix!
              var js = change.getElementsByTagName('script')
              for (var i = 0, j = js.length; i < j; i++) {
                eval(js[i].innerHTML) //eslint-disable-line
              }

              // fix posts also (.ajax)
              var pst = change.getElementsByTagName('form')
              for (var ii = 0, jj = pst.length; ii < jj; ii++) {
                if (pst[ii].method.toLowerCase() === 'post') {
                  pst[ii].setAttribute('onsubmit', "event.preventDefault();_('." + change.className + "').ajaxPOST(this);")
                }
              }
            }
          }

          xmlhttp.open('GET', url, true)
          xmlhttp.send()
        }
      }

      return false
    },

    /**
     * noConflict
     *
     * Enables noConflict mode, so _()/_ can also be W()
     *
     * @universal function
     * @param object [object] Wrapper
     * @return this
     * @example var W = _.noConflict()
     */
    noConflict: function () {
      if (typeof oldJs === 'object') {
        self._ = oldJs
      }

      return _
    },

    /**
     * isLocal
     *
     * Are we running local?
     *
     * @universal function
     * @param object [object] Wrapper
     * @return bool
     * @example _.isLocal()
     */
    isLocal: function () {
      if (!this.nodeJS) {
        if (self.location.protocol !== 'file:') {
          if (!self.location.href.match(/(localhost|127\.0\.0\.1|::1)/g)) {
            return false
          } else {
            return true
          }
        } else {
          return true
        }
      } else {
        return true
      }
    },

    /**
     * requireSSL
     *
     * this make "SSL" / "HTTPS" required
     *
     * @web only
     * @param object [object] Wrapper
     * @return this
     * @example _.requireSSL()
     */
    requireSSL: function () {
      if (!this.nodeJS) {
        if (self.location.protocol !== 'https:' && self.location.protocol !== 'file:') {
          if (!self.location.href.match(/(localhost|127\.0\.0\.1|::1)/g)) {
            self.location.href = 'https:' + self.location.href.substring(self.location.protocol.length)
          }
        }
      }
      return
    },

    /**
     * loadExtension
     *
     * loadExtension Tries to load a extension (module)
     *
     * @web only
     * @deprecated 0.0.4
     * @removed 0.1.0
     * @param object [object] Wrapper
     * @return bool
     * @example _.loadExtension(src, callback)
     */
    loadExtension: function (src, callback) {
      this.deprecated('loadExtension', '0.0.4', '0.1.0', 'require')
      return this.require(src, callback)
    },

    /**
     * isUndefined
     *
     * isUndefined is a object undefined?
     *
     * @universal function
     * @param object [object] Wrapper
     * @param object thing object to test
     * @return bool
     * @example _.isUndefined(myObject)
     */
    isUndefined: function (thing) {
      return (typeof thing === 'undefined')
    },

    /**
     * isEmpty
     *
     * isEmpty is a object empty?
     *
     * @universal function
     * @param object [object] Wrapper
     * @param object check object to test
     * @return bool
     * @example _.isEmpty(myObject)
     */
    isEmpty: function (check) {
      return check === ''
    },

    /**
     * isBlank
     *
     * isBlank is a object blank?
     *
     * @universal function
     * @param object [object] Wrapper
     * @param object myObject object to test
     * @return bool
     * @example _.isBlank(myObject)
     */
    isBlank: function (check) {
      return /^\s*$/.test(check)
    },

    /**
     * getFileSize
     *
     * Get the filesize of a file
     *
     * @web only
     * @since v0.0.8
     * @param string fileURL file url
     * @param object onSize return to function
     * @return null
     * @example _.getFileSize('https://www.wdgwv.com/logo.png', function (size) {window.alert(size)})
     */
    getFileSize: function (fileURL, onSize) {
      if (!this.nodeJS) {
        var len = this.length

        while (len--) {
          var xhr
          if (self.XMLHttpRequest) {
            xhr = new self.XMLHttpRequest() // code for IE7+, Firefox, Chrome, Opera, Safari
          } else {
            xhr = new self.ActiveXObject('Microsoft.XMLHTTP') // code for IE6, IE5
          }
          xhr.open('HEAD', fileURL, true)
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                if (typeof onSize === 'function') {
                  onSize(xhr.getResponseHeader('Content-Length') / 1024)
                } else {
                  _(onSize).html(xhr.getResponseHeader('Content-Length') / 1024)
                }
              } else {
                if (typeof onSize === 'function') {
                  onSize('Error while getting filesize')
                } else {
                  _(onSize).html('Error while getting filesize')
                }
              }
            }
          }
          xhr.send(null)
        }
      }

      return null
    },

    /**
     * stripTags
     *
     * stripTags strip HTML tags of a object
     *
     * @web only
     * @param object object Wrapper
     * @return null
     * @example _('.codeField').stripTags()
     */
    stripTags: function () {
      if (!this.nodeJS) {
        var len = this.length

        while (len--) {
          self._lastObj = this[len]
          this[len].innerHTML = this[len].innerHTML.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '')
        }
      }
      return !this.nodeJS ? null : false
    },

    /**
     * stripScripts
     *
     * stripScripts strip Scripts from a object
     *
     * @web only
     * @param object object Wrapper
     * @return null
     * @example _('.codeField').stripScripts()
     */
    stripScripts: function () {
      if (!this.nodeJS) {
        var len = this.length

        while (len--) {
          self._lastObj = this[len]
          this[len].innerHTML = this[len].innerHTML.replace(new RegExp(this.ScriptRX, 'img'), '')
        }
      }

      return !this.nodeJS ? null : false
    },

    /**
     * css
     *
     * css read, or write css
     *
     * @web only
     * @param object object Wrapper
     * @param string read what to read
     * @param string [write] what to write
     * @example _('.wrapper').css('width', '10px')
     */
    css: function (read, write) {
      if (!this.nodeJS) {
        var len = this.length
        while (len--) {
          self._lastObj = this[len]
          if (this.isUndefined(write)) { // Read
            return self.getComputedStyle(this[len]).getPropertyValue(read)
          } else { // Write
            var _read = read
            _read = _read.replace(/-/g, '')
            // this[len].style._read = write; // does edit the dom.
            this[len].setAttribute('style', read + ':' + write + ';')
            return this
          }
        }
      } else {
        return false
      }
    },

    /**
     * escapeHTML
     *
     * escape the HTML
     *
     * @universal function
     * @param object [object] Wrapper
     * @param string str string to escape
     * @return string
     * @example _.escapeHTML(str)
     */
    escapeHTML: function (str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    },

    /**
     * unescapeHTML
     *
     * unescape the HTML
     *
     * @universal function
     * @param object [object] Wrapper
     * @param string str string to escape
     * @return string
     * @example _.unescapeHTML(str)
     */
    unescapeHTML: function (str) {
      return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    },

    /**
     * toArray
     *
     * string to array
     *
     * @universal function
     * @param object [object] Wrapper
     * @param string|object str string/object to put in the array
     * @return array
     * @example _.toArray(str)
     * @example _.toArray({my:'super', object:'rocks!'})
     */
    toArray: function (str) {
      if (typeof str === 'string') {
        return str.split('')
      } else {
        var arr = []
        for (var i in str) {
          if (str.hasOwnProperty(i)) {
            arr.push(str[i])
          }
        }
        return arr
      }
    },

    /**
     * runTest
     *
     * runTest Run a test [internal, external use.]
     *
     * @universal function
     * @param object [object] Wrapper
     * @param object testCase test case
     * @param object expectedResult expected Result
     * @return bool
     * @example _.runTest(_().someFunction(), 'haha')
     */
    runTest: function (testCase, expectedResult) {
      if (typeof testCase !== 'function') {
        return (String(testCase) === String(expectedResult)) // Pass!
      } else {
        return (String(testCase()) === String(expectedResult)) // Pass!
      }
    },

    /**
     * includes
     *
     * includes does a string includes the thing?
     *
     * @universal function
     * @param object [object] Wrapper
     * @param string str the string
     * @param string pattern the pattern
     * @return bool
     * @example _.includes('hi, i am wesley', 'hi')
     */
    includes: function (str, pattern) {
      return String(str).indexOf(pattern) > -1
    },

    /**
     * startsWith
     *
     * startsWith does a string starts With the thing?
     *
     * @universal function
     * @param object [object] Wrapper
     * @param string str the string
     * @param string pattern the pattern
     * @return bool
     * @example _.startsWith('hi, i am wesley', 'hi')
     */
    startsWith: function (str, pattern) {
      return str.lastIndexOf(pattern, 0) === 0
    },

    /**
     * endsWith
     *
     * endsWith does a string ends With the thing?
     *
     * @universal function
     * @param object [object] Wrapper
     * @param string str the string
     * @param string pattern the pattern
     * @return bool
     * @example _.endsWith('hi, i am wesley', 'wesley')
     */
    endsWith: function (str, pattern) {
      var d = str.length - pattern.length
      return d >= 0 && str.indexOf(pattern, d) === d
    },

    /**
     * capitalize
     *
     * capitalize a string
     *
     * @universal function
     * @param object [object] Wrapper
     * @param string str the string
     * @return string
     * @example _.capitalize('hi, i am wesley')
     */
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase()
    },

    /**
     * camelize
     *
     * camelize a string
     *
     * @universal function
     * @param object [object] Wrapper
     * @param string str the string
     * @return string
     * @example _.camelize('hi, i am wesley')
     */
    camelize: function (str) {
      return str.replace(/-+(.)?/g, function (match, chr) {
        return chr ? chr.toUpperCase() : ''
      })
    },

    /**
     * scrollToBottom
     *
     * scroll To Bottom
     *
     * @web only
     * @param object object Wrapper
     * @return bool
     * @example _('.wrapper').scrollToBottom()
     */
    scrollToBottom: function () {
      if (!this.nodeJS) {
        var len = this.length

        while (len--) {
          self._lastObj = this[len]
          this[len].scrollTop = this[len].scrollHeight
        }

        return true
      } else {
        return false
      }
    },

    /**
     * scrollToTop
     *
     * scroll To Bottom
     *
     * @web only
     * @param object object Wrapper
     * @return bool
     * @example _('.wrapper').scrollToTop()
     */
    scrollToTop: function () {
      if (!this.nodeJS) {
        var len = this.length

        while (len--) {
          self._lastObj = this[len]
          this[len].scrollTop = 0
        }

        return true
      } else {
        return false
      }
    },

    /**
     * map
     *
     * Walk trough the array, and perform a function
     *
     * @universal function
     * @param object [object] Wrapper
     * @param array arr Array to parse
     * @param function callbackInt Callback function to call
     * @return array
     * @example _.map(['a', 'b', 'c'], function (i, v) { window.alert('item ' + i + ', value: ' + v);})
     */
    map: function (arr, callbackInt) {
      var __ret = []
      for (var i = 0; i < arr.length; i++) {
        // (other) Underscore.js uses -> : __ret.push(callback_int(i, arr[i]))
        var temp = callbackInt(i, arr[i])
        if (typeof temp === 'undefined') {
          _.error('ERROR WHILE MAPPING')
        }
        if (typeof temp[0] === 'string') {
          for (var j = 0; j < temp.length; j++) {
            __ret.push(temp[j])
          }
        } else {
          __ret.push(callbackInt(i, arr[i]))
        }
      }
      return __ret
    },

    /**
     * each
     *
     * Walk trough array and peform callback
     *
     * @universal function
     * @param object [object] Wrapper
     * @param array myArr Array to walk trough
     * @param function callbackInt Callback function to call
     * @return array
     * @example _.each(['a', 'b', 'c'], function (i, v) { window.alert('count ' + i + ', value: ' + v); })
     * @example _.each({a:'b', c:'d'}, function (i, v) { window.alert('key ' + i + ', value: ' + v); })
     */
    each: function (myArr, callbackInt) {
      var arr = []
      var count = 0
      for (var i in myArr) {
        if (myArr.hasOwnProperty(i)) {
          if (!isNaN(i)) {
            arr.push(callbackInt(count, myArr[i]))
            count++
          } else {
            arr.push(callbackInt(i, myArr[i]))
          }
        }
      }
      return arr
    },

    /**
     * merge
     *
     * merge objects to one
     *
     * @universal function
     * @param object [object] Wrapper
     * @param object obj1 Object to merge
     * @param object obj2 Object to merge
     * @return object
     * @example _.merge(obj1, obj2)
     */
    merge: function () {
      var obj = {}
      var key
      for (var i = 0; i < arguments.length; i++) {
        for (key in arguments[i]) {
          if (arguments[i].hasOwnProperty(key)) {
            obj[key] = arguments[i][key]
          }
        }
      }
      return obj
    },

    /**
     * clearScreen
     *
     * Clear the screen
     *
     * @cli only
     * @example _.clearScreen()
     */
    clearScreen: function () {
      if (this.nodeJS) {
        process.stdout.write('\x1Bc');
      } else {
        console.warn('_.clearScreen() is only for CLi')
      }
    },

    /**
     * oneLineUp
     *
     * Move the cursor one line up
     *
     * @cli only
     * @example _.oneLineUp()
     */
    oneLineUp: function () {
      if (this.nodeJS) {
        process.stdout.write("\r\x1b[K")
      } else {
        console.warn('_.clearScreen() is only for CLi')
      }
    },

    /**
     * truncate
     *
     * truncate is a object undefined?
     *
     * @web only
     * @param object object Wrapper
     * @param string length length (default: 30)
     * @param string [truncation] truncation after the truncate (default: ...)
     * @return bool
     * @example _('.wrapper').truncate(length[, truncation])
     */
    truncate: function (length, truncation) {
      if (!this.nodeJS) {
        var len = this.length
        while (len--) {
          self._lastObj = this[len]

          length = length || 30

          truncation = this.isUndefined(truncation) ? '...' : truncation

          this[len].innerHTML = this[len].innerHTML.length > length
            ? this[len].innerHTML.substring(0, length) + truncation
            : String(this[len].innerHTML)
        }

        return true
      } else {
        // _('this is a verry long long string').truncate(10)
      }
    },

    /**
     * _copy_js
     *
     * Internal use for loading plugin.
     * Do not use, if know why this function exists.
     *
     * @internal
     * @notest
     * @universal function
     * @since v0.0.7
     * @param object [object] Wrapper
     * @return null
     * @example _._copy_js()
     */
    _copy_js: function () {
      var tLib = new Library()
      var copy
      for (copy in tLib) {
        // Fix by Sijmen Mulder (https://www.sjmulder.nl | https://github.com/sjmulder)
        _[copy] = tLib[copy]
      }
      return null
    }
  }

  // * tLib
  // *
  // * Add some "Global" Objects (what does not need a wrapper) Bug: #12
  // * https://github.com/wdg/_.js/issues/12 (Closed 19-OCT-2015)
  // * make a "temporary _.js"
  // *
  // * @var object tLib
  var tLib = new Library()
  var copy
  for (copy in tLib) {
    // Fix by Sijmen Mulder (https://www.sjmulder.nl | https://github.com/sjmulder)
    _[copy] = tLib[copy]
  }

  // * self._
  // *
  // * Assign our _ object to global window object.
  // *
  // * @var object _
  if (self._ === undefined) {
    self._ = _
    self._s = _
  } else {
    console.log('[_.JS Warning] We have overwritten self._!')
    var oldJs = self._
    self._ = _
    self._s = _
  }

  // node.js support
  if (typeof exports !== 'undefined') {
    module.exports = _
  }

  // And return
  return _
})(typeof exports === 'undefined' ? window : module.exports)

// Add Event! (if not using via Node.js)
if (typeof exports === 'undefined' && typeof document.createEvent !== 'undefined') {
  var _JSLoaded = document.createEvent('CustomEvent')
  _JSLoaded.initEvent('_.jsLoaded', !0, !0, { })
  window.dispatchEvent(_JSLoaded)
}

// Please. please.
// Somethimes we'll need to use eslint-disable-line
// because eslint does not know what we're doing with the code.
//
// Thanks,
// For reading the full source code.
// if you have questions, please go to:
// -> https://github.com/wdg/_.js/issues

