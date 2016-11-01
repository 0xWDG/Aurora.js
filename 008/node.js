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

__RunTest('_._lastObj', undefined)
__RunTest('_._modLoaded', undefined)
__RunTest('_._eventStore', undefined)
__RunTest('_.length', 1)
__RunTest('_.params', undefined)
__RunTest('_.version', _.version)
__RunTest('_.revision', _.revision)
__RunTest('_.fullversion', _.fullversion)
__RunTest('_.isBeta', _.isBeta)
__RunTest('_.isAlpha', _.isAlpha) // WILL BE REMOVED!!!
__RunTest('_.isCompiled', _.isCompiled)
__RunTest('_.isStable', _.isStable)
__RunTest('_.nodeJS', true)
__RunTest('_.ScriptRX', _.ScriptRX)
__RunTest('_.JSONRX', _.JSONRX)
__RunTest('_.emoij.nerd', '🤓')
__RunTest('_.emoij.smilie', '😃')
__RunTest('_.emoij.dsmilie', '😀')
__RunTest('_.emoij.heart', '❤️')
__RunTest('_.emoij.brokenheart', '💔')
__RunTest('_.browser[\'ie\']', false)
__RunTest('_.browser[\'firefox\']', false)
__RunTest('_.browser[\'safari\']', false)
__RunTest('_.browser[\'opera\']', false)
__RunTest('_.browser[\'edge\']', false)
__RunTest('_.browser[\'chrome\']', false)
__RunTest('_.browser[\'userAgent\']', 'Node.js Node.js Node.js')
__RunTest('_.browser[\'supportTouch\']', false)
__RunTest('_.getBrowser', 'Node.js')
__RunTest('_.$(\'TEST\')', 'undefined')
__RunTest('_.extend(true, {apple:0, chicken:{weight:52, price:100}, cherry:97},{chicken:{price:200}, durian:100})', '[object Object]')
__RunTest('_.isArray([])', true)
__RunTest('_.isArray(null)', false)
__RunTest('_.getCookie(\'Cookiemonster\')', false)
__RunTest('_.setCookie(\'Cookiemonster\', \'Cookiemonster is cool\')', false)
__RunTest('_.getCookie(\'Cookiemonster\')', false)
__RunTest('_(\'.x\').toggle()', false)
__RunTest('_(\'.x\').on(\'click\', function (){console.log(\'clicked on x\')})', false)
__RunTest('_.noop()', undefined)
__RunTest('_.supportTouch()', false)
__RunTest('_("<b>Hi!</b>").appendTo(".inner")', false)
__RunTest('_._error(\'#IGNORE#ME\', \'SOME TERRIBLE THING HAPPENED!\')', null)
// __RunTest('_.error(\'XYX\')', false)
__RunTest('_.isFunction(function () {})', true)
__RunTest('_.isFunction(false)', false)
__RunTest('_.type(function () { })', 'function')
__RunTest('_.type({})', 'object')
__RunTest('_.type([])', 'array')
__RunTest('_.escapeForRegex(\'myPotensialRege\\\\\\\'xUnSafeString\')', 'myPotensialRege\\\\\'xUnSafeString')
__RunTest('_.isPlainObject(function () {})', false)
__RunTest('_.isPlainObject({})', true)
__RunTest('_.isPlainObject([])', false)
__RunTest('_.require([\'a\', \'r\', \'ra\', \'y\'], function () { doSomeThing(); })', null)
__RunTest('_.format(\'my %s\', \'wesley\')', 'my wesley')
__RunTest('_(\'.wrapper\').hide()', false)
__RunTest('TOTAL', 'TOTAL')
var x = _.browser['userAgent']
console.log(_.cconsole.color.yellow + x)
console.log(_.cconsole.color.yellow + typeof x)

