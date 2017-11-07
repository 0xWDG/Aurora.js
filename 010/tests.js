/*
**                         _
**                        (_)
**                         _    _____
**                        | |  / ____|
**                        | |  | (___
**                    _   | |  \___  \
**     ______    _   | |__| |  ____) |
**    |______|  (_)   \____/  |______/
**                         v0.1.0 Beta
**
** https://www.github.com/wdg/_.js/
** or https://www.wdgwv.com
**
** Git....: https://github.com/wdg/_.js
** Todo...: https://github.com/wdg/_.js/issues
** Licence: https://github.com/wdg/_.js/blob/master/LICENCE.md (CC BY 4.0)
** Latest.: https://raw.githubusercontent.com/wdg/_.js/master/latest/_.js
*/

// _.js TEST FILE
var _ = require('./_.js')
var delay = 10 // Delay 10 milli seconds for all tests!

// PLEASE DO NOT MODIFY BELOW THIS LINE

// Stupid name, yes i'll fix it later
// TODO: normal function name
var fillScreen = function (pts) {
  var screenSize = process.stdout.columns
  var textSize = pts.length
  var add = ''
  for (var i = 1; i < (screenSize - textSize); i++) {
    add = add + ' '
  }

  process.stdout.write(pts + add)
}

// Will be hidden but useful for 'debugging' purposes
console.log('Terminal size: ' + process.stdout.columns + 'x' + process.stdout.rows)

// Number of current test
var _testCounter = 1

// Number of current test (for timeout)
var _timeoutCounter = 1

// How many tests passed (we want 100%)
var _testPassed = 0

// How many tests are failed (we want 0% (ok mayme 0.05% a 'failed test' test))
var _testFailed = 0

// Ok this code is awful but works for now.
// This only prints the 'test' to the screen.
function __RunTest (i, x, z) {
  setTimeout(function (i, x, z) {
    if (i === 'TOTAL' && x === 'TOTAL') {
      fillScreen('\rAll tests finished')
      if (_testFailed > 0) {
        console.log('\n' + _.cconsole.color.green + _testPassed + ' tests Passed (? %)' + _.cconsole.color.standard)
        console.log('\n' + _.cconsole.color.red + _testFailed + ' tests Failed (? %)' + _.cconsole.color.standard)
      } else {
        console.log('\n' + _.cconsole.color.green + _testPassed + ' (ALL) tests Passed (100 %)' + _.cconsole.color.standard)
      }
    } else {
      var xEval = String(eval(i)).replace(/(\r\n|\n\r|\r|\n)/g, '') //eslint-disable-line
      if (typeof z !== 'undefined' || _.runTest(xEval, String(x).replace(/(\r\n|\n\r|\r|\n)/g, ''))) { //eslint-disable-line
        if (_testFailed === 0) {
          process.stdout.write('\x1Bc')
          console.log(_.cconsole.color.standard + '**')
          console.log(_.cconsole.color.standard + '**' + _.cconsole.color.cyan + '                         _')
          console.log(_.cconsole.color.standard + '**' + _.cconsole.color.cyan + '                        (_)')
          console.log(_.cconsole.color.standard + '**' + _.cconsole.color.cyan + '                         _    _____')
          console.log(_.cconsole.color.standard + '**' + _.cconsole.color.cyan + '                        | |  / ____|')
          console.log(_.cconsole.color.standard + '**' + _.cconsole.color.cyan + '                        | |  | (___')
          console.log(_.cconsole.color.standard + '**' + _.cconsole.color.cyan + '                    _   | |  \\___  \\')
          console.log(_.cconsole.color.standard + '**' + _.cconsole.color.cyan + '     ______    _   | |__| |  ____) |')
          console.log(_.cconsole.color.standard + '**' + _.cconsole.color.cyan + '    |______|  (_)   \\____/  |______/')
          if (_.version.match(/b/)) {
            console.log(_.cconsole.color.standard + '**' + _.cconsole.color.cyan + '                         v' + _.version.split('b')[0] + ' Beta')
          } else {
            console.log(_.cconsole.color.standard + '**' + _.cconsole.color.cyan + '                      v' + _.version + ' Release')
          }
          console.log(_.cconsole.color.standard + '**              JS Standard Code Style')
          console.log(_.cconsole.color.standard + '**')
          console.log(_.cconsole.color.standard + '**    This is the Node.js init file.')
          console.log(_.cconsole.color.standard + '**    To use ' + _.cconsole.color.cyan + '_.js' + _.cconsole.color.standard + ' in your project use:')
          console.log(_.cconsole.color.standard + '**       ' + _.cconsole.color.magenta + 'var _ = require(\'./_.js\')' + _.cconsole.color.standard)
          console.log(_.cconsole.color.standard + '**')
          // console.warn(_console.background.red + '**    !!! Running tests...' + _console.background.default)
          console.log(_.cconsole.color.standard + '**')
          console.log('')
          console.log('')
        }
        process.stdout.write('Expecting: ' + _.cconsole.color.green + String(x).replace(/(\r\n|\n\r|\r|\n)/g, '') + _.cconsole.color.standard + '; Got: ' + _.cconsole.color.green + xEval + _.cconsole.color.standard + '\r') //eslint-disable-line
        if (_testCounter < 10) {
          _testCounter = '00' + _testCounter
        } else if (_testCounter < 100) {
          _testCounter = '0' + _testCounter
        } else {
          _.noop()
        }
        fillScreen('\r' + _.cconsole.color.green + 'Test (#' + _testCounter + ') ' + i + ' passed' + _.cconsole.color.standard)
        _testCounter++
        _testPassed++
      } else {
        if (_testCounter < 10) {
          _testCounter = '0' + _testCounter
        } else if (_testCounter < 100) {
          _testCounter = '0' + _testCounter
        } else {
          _.noop()
        }

        console.log(_.cconsole.color.red + 'Test (#' + _testCounter + ') ' + i + ' failed' + _.cconsole.color.standard)
        console.log('Expecting: ' + _.cconsole.color.magenta + String(x).replace(/(\r\n|\n\r|\r|\n)/g, '') + _.cconsole.color.standard + '; Got: ' + _.cconsole.color.red + xEval + _.cconsole.color.standard) //eslint-disable-line
        _testCounter++
        _testFailed++
      }
    }
  }, _timeoutCounter * delay, i, x, z)
  _timeoutCounter++
}

// Since we've never gonna call a object in Node.js this will always be undefined.
// We still put the test in
__RunTest('_._lastObj', undefined)

// We can't load modules in Node.js right now
// ... i am looking for a solution for this problem
__RunTest('_._modLoaded', undefined)

// We don't have a eventStore for Node.js
// it's simply not neccecary
__RunTest('_._eventStore', undefined)

// We don't have a length so we'll return 1
// 1 = basic
__RunTest('_.length', 1)

// We didn't call with params
// So we'll got none
__RunTest('_.params', undefined)

// We did call with params
// Really?, Nope!
__RunTest('_(\'.MyParam\').params', undefined)

// What version are we running?
// Since this test is also for future versions we only check via eval()'d code
__RunTest('_.version', _.version)

// What revision are we running?
// Since this test is also for future versions we only check via eval()'d code
__RunTest('_.revision', _.revision)

// Please let me see the full version
// Since this test is also for future versions we only check via eval()'d code
__RunTest('_.fullversion', _.fullversion)

// Are we running a Beta version?
// Since this test is also for future versions we only check via eval()'d code
__RunTest('_.isBeta', _.isBeta)

// Are we running a Alpha version? (DEPRECTATED)
// Removed in v1.0.0
// Since this test is also for future versions we only check via eval()'d code
__RunTest('_.isAlpha', _.isAlpha) // WILL BE REMOVED!!!

// Is this version the 'compiled' one?
// Since this test is also for future versions we only check via eval()'d code
__RunTest('_.isCompiled', _.isCompiled)

// Is this version Stable?
// Since this test is also for future versions we only check via eval()'d code
__RunTest('_.isStable', _.isStable)

// Are we running in Node.js?
// Guess the answer!
__RunTest('_.nodeJS', true)

// This is a fancy one,
// This is a REGEX string to check if there is a <script> tag
__RunTest('_.ScriptRX', _.ScriptRX)

// Another fany one,
// This is a REGEX string to check if it is JSON
__RunTest('_.JSONRX', _.JSONRX)

// We are so emotional that we'll need to support Emoijs
__RunTest('_.emoij.nerd', '🤓')

// We are so emotional that we'll need to support Emoijs
__RunTest('_.emoij.smilie', '😃')

// We are so emotional that we'll need to support Emoijs
__RunTest('_.emoij.dsmilie', '😀')

// We are so emotional that we'll need to support Emoijs
__RunTest('_.emoij.heart', '❤️')

// We are so emotional that we'll need to support Emoijs
__RunTest('_.emoij.brokenheart', '💔')

// Are we running on Internet Explorer
// No, We are in Node.js
__RunTest('_.browser[\'ie\']', false)

// Are we running on Firefox
// No, We are in Node.js
__RunTest('_.browser[\'firefox\']', false)

// Are we running on Safari
// No, We are in Node.js
__RunTest('_.browser[\'safari\']', false)

// Are we running on Opera
// No, We are in Node.js
__RunTest('_.browser[\'opera\']', false)

// Are we running on Edge
// No, We are in Node.js
__RunTest('_.browser[\'edge\']', false)

// Are we running on (Google) Chrome
// No, We are in Node.js
__RunTest('_.browser[\'chrome\']', false)

// What is our (fake) User-Agent?
__RunTest('_.browser[\'userAgent\']', 'Node.js Node.js Node.js')

// Do we support touch (touchscreen based)
__RunTest('_.browser[\'supportTouch\']', false)

// What browser are we using?
__RunTest('_.getBrowser', 'Node.js')

// jQuery call ;)
// Try _.$() in your browser
__RunTest('_.$(\'TEST\')', 'undefined')

// Try to extend
__RunTest('_.extend(true, {apple:0, chicken:{weight:52, price:100}, cherry:97},{chicken:{price:200}, durian:100})', '[object Object]')

// Is it an Array?
__RunTest('_.isArray([])', true)

// Is it an Array?
__RunTest('_.isArray(null)', false)

// Get the cookie value
__RunTest('_.getCookie(\'Cookiemonster\')', false)

// Set the cookie value
__RunTest('_.setCookie(\'Cookiemonster\', \'Cookiemonster is cool\')', false)

// Delete the cookie
__RunTest('_.getCookie(\'Cookiemonster\')', false)

// Toggle (between display: none; and display: block)
__RunTest('_(\'.x\').toggle()', false)

// On ...
// ... Click!
__RunTest('_(\'.x\').on(\'click\', function (){console.log(\'clicked on x\')})', false)

// This is just for handling errors, does nothing at all
// code is
// noop: function () { }
__RunTest('_.noop()', undefined)

// Do we support touch?
__RunTest('_.supportTouch()', false)

// Append text?
// Failed, we are not in a browser
__RunTest('_("<b>Hi!</b>").appendTo(".inner")', false)

// Throw an error
__RunTest('_._error(\'#IGNORE#ME\', \'SOME TERRIBLE THING HAPPENED!\')', null)

// This one doesn't work yet on Node.js
// __RunTest('_.error(\'XYX\')', false)

// Is it a function?
__RunTest('_.isFunction(function () {})', true)

// Is it a function?
__RunTest('_.isFunction(false)', false)

// What type object is this?
__RunTest('_.type(function () { })', 'function')

// What type object is this?
__RunTest('_.type({})', 'object')

// What type object is this?
__RunTest('_.type([])', 'array')

// Escape a potential unsafe string for Regex
__RunTest('_.escapeForRegex(\'myPotensialRege\\\\\\\'xUnSafeString\')', 'myPotensialRege\\\\\'xUnSafeString')

// Is it a plain object?
__RunTest('_.isPlainObject(function () {})', false)

// Is it a plain object?
__RunTest('_.isPlainObject({})', true)

// Is it a plain object?
__RunTest('_.isPlainObject([])', false)

// Require
// ... Does not work yet on Node.js
__RunTest('_.require([\'a\', \'r\', \'ra\', \'y\'], function () { doSomeThing(); })', null)

// Format code
// like sprintf(...)
__RunTest('_.format(\'my %s\', \'wesley\')', 'my wesley')

__RunTest('_(\'.wrapper\').html(\'xxxx\')', false)

__RunTest('_(\'.wrapper\').html(\'xxxx\', true)', false)

__RunTest('_(\'.wrapper\').html()', false)

__RunTest('_.framebreak()', false)

__RunTest('_(\'.wrapper\').ajaxPOST(\'form\', function(x){console.log(x)})', false)

__RunTest('_(\'.wrapper\').ajax(\'https://www.wdgwv.com/conditions/noHTML\')', false)

__RunTest('_.noConflict()', _)

__RunTest('_.isLocal()', true)

__RunTest('_.requireSSL()')

__RunTest('_.require([\'a\', \'r\', \'ra\', \'y\'], function () { doSomeThing(); })', null)

__RunTest('_.isUndefined(false)', false)

__RunTest('_.isUndefined(true)', false)

__RunTest('_.isUndefined(undefined)', true)

__RunTest('_.isEmpty(undefined)', false)

__RunTest('_.isEmpty(\'\')', true)

__RunTest('_.isBlank(undefined)', false)

__RunTest('_.isBlank(\'\')', true)

__RunTest('_.getFileSize(\'https://www.wdgwv.com/logo.png\')', null)

__RunTest('_(\'.wrapper\').stripTags()', false)

__RunTest('_(\'.wrapper\').stripScripts()', false)

__RunTest('_(\'.wrapper\').css(\'color: red;\')', false)

__RunTest('_.escapeHTML(\'<&>\')', '&lt;&amp;&gt;')

__RunTest('_.unescapeHTML(\'&lt;&amp;&gt;\')', '<&>')

__RunTest('_.toArray({my:\'super\', object:\'rocks!\'})', 'super,rocks!')

__RunTest('_.runTest(false)', false)

__RunTest('_.includes(\'hi, i am wesley\', \'hi\')', true)

__RunTest('_.startsWith(\'hi, i am wesley\', \'hi\')', true)

__RunTest('_.endsWith(\'hi, i am wesley\', \'hi\')', false)

__RunTest('_.capitalize(\'hi, i am wesley\')', 'Hi, i am wesley')

__RunTest('_.camelize(\'Hi, i am wesley\')', 'Hi, i am wesley')

__RunTest('_.scrollToBottom()', false)

__RunTest('_.scrollToTop()', false)

__RunTest('_.map([\'a\', \'b\', \'c\'], function (i, v) { console.log(\'item \' + i + \', value: \' + v); return true; })', 'true,true,true')

__RunTest('_.each({a:\'b\', c:\'d\'}, function (i, v) { console.log(\'key \' + i + \', value: \' + v); })', ',')

__RunTest('_.merge({a:\'a\'}, {b:\'b\'})', '[object Object]')

__RunTest('_(\'XXX\').truncate(2)', false)

// 🖥 CLI ONLY
// 🌍 / 🌐 UNIVERSAL
// 🕸 WEB ONLY
// Display test Results!
__RunTest('TOTAL', 'TOTAL')
