// _.js TEST FILE
var _ = require('./_.js')

console.log('**')
console.log('**                         _')
console.log('**                        (_)')
console.log('**                         _    _____')
console.log('**                        | |  / ____|')
console.log('**                        | |  | (___')
console.log('**                    _   | |  \\___  \\')
console.log('**     ______    _   | |__| |  ____) |')
console.log('**    |______|  (_)   \\____/  |______/')
if (_.version.match(/b/)) {
  console.log('**                         v' + _.version.split('b')[0] + ' Beta')
} else {
  console.log('**                      v' + _.version + ' Release')
}
console.log('**              JS Standard Code Style')
console.log('**')
console.log('**    This is the Node.js init file.')
console.log('**    To use _.js in your project use:')
console.log('**       var _ = require(\'./_.js\')')
console.log('**')
// console.warn(_console.background.red + '**    !!! Running tests...' + _console.background.default)
console.log('**')
console.log(_.runTest('a', 'b'))

// var _testReturn
var _testCounter = 1
var _testPassed = 0
var _testFailed = 0
function __RunTest (i, x) {
  if (i === 'TOTAL' && x === 'TOTAL') {
    console.log('All tests finished')
    if (_testFailed > 0) {
      console.log(_.cconsole.color.green + _testPassed + ' tests Passed (? %)' + _.cconsole.color.standard)
      console.log(_.cconsole.color.red + _testFailed + ' tests Failed (? %)' + _.cconsole.color.standard)
    } else {
      console.log(_.cconsole.color.green + _testPassed + ' (ALL) tests Passed (100 %)' + _.cconsole.color.standard)
    }
  } else {
    if (_.runTest(eval(i), x)) { //eslint-disable-line
      console.log(_.cconsole.color.green + 'Test ' + i + ' (#' + _testCounter + ') passed' + _.cconsole.color.standard)
      console.log('Expecting: ' + _.cconsole.color.green + x + _.cconsole.color.standard + '; Got: ' + _.cconsole.color.green + eval(i) + _.cconsole.color.standard + ' ') //eslint-disable-line
      _testCounter++
      _testPassed++
    } else {
      console.log(_.cconsole.color.red + 'Test ' + i + ' (#' + _testCounter + ') failed' + _.cconsole.color.standard)
      console.log('Expecting: ' + _.cconsole.color.magenta + x + _.cconsole.color.standard + '; Got: ' + _.cconsole.color.red + eval(i) + _.cconsole.color.standard + ' ') //eslint-disable-line
      _testCounter++
      _testFailed++
    }
  }
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

// Hide this wrapper
// if we are a browser...
__RunTest('_(\'.wrapper\').hide()', false)

__RunTest('_(\'.wrapper\').html(\'xxxx\')', false)
__RunTest('_(\'.wrapper\').html(\'xxxx\', true)', false)
__RunTest('_(\'.wrapper\').html()', false)

__RunTest('_(\'.wrapper\').show()', false)

__RunTest('_.framebreak()', false)

// if (!this.nodeJS) {
//   Execute code
// } else {
//   return false
// }

// 🖥 CLI ONLY
// 🌍 / 🌐 UNIVERSAL
// 🕸 WEB ONLY
// Display test Results!
__RunTest('TOTAL', 'TOTAL')
