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
console.log(_.runTest('b', 'b'))

// console.log(_console.background.gray)
// console.log('ABCD')
// console.log(_console.background.default + _console.color.default + _console.underline.stop)
// console.log('resetted?')

var readline = require('readline')
for (var i = 0; i < 101; i++) {
  setTimeout(function (i) {
    readline.clearLine(process.stdout, 0)
    readline.cursorTo(process.stdout, 0)

    if (i % 2) {
      setTimeout(function () {
        readline.clearLine(process.stdout, 0)
        readline.cursorTo(process.stdout, 0)

        process.stdout.write('  Running ' + i / 2 + '/50 tests..  (' + i + '%)')
        readline.cursorTo(process.stdout, 0)
      }, 75)

      process.stdout.write('  Running ' + i / 2 + '/50 tests.   (' + i + '%)')
      readline.cursorTo(process.stdout, 0)
    } else {
      process.stdout.write('  Running ' + i / 2 + '/50 tests... (' + i + '%)')
      readline.cursorTo(process.stdout, 0)
      process.stdout.write('  Running ' + i / 2 + '/50 tests... (' + i + '%)')
      setTimeout(function () {
        console.log()
        if (i / 2 % 2) {
          console.log('    Test #' + i / 2 + ': ' + _.cconsole.color.green + 'Pass' + _.cconsole.color.standard)
        } else {
          console.log('    Test #' + i / 2 + ': ' + _.cconsole.color.red + 'Fail' + _.cconsole.color.standard)
        }
      }, 75)
    }
  }, i * 125, i)
}
