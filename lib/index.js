'use strict';

var chalk   = require('chalk');
var Promise = require('bluebird');

var print = {
  error: function(str) { console.log('[' + chalk.red('ERROR')   + '] ' + str) },
  warn:  function(str) { console.log('[' + chalk.yellow('WARN') + '] ' + str) },
  info:  function(str) { console.log('[' + chalk.green('INFO')  + '] ' + str) },
  msg:   function(str) { console.log('[' + chalk.cyan('MSG')    + '] ' + str) }
}

var exec = new Promise.promisify(require('child_process').exec);

module.exports = function () {
  print.warn('Earthquake happens. Please move to safety place.');
  print.info('Start stage all files.');
  exec('git add --all .')
  .then(function (res) {
    print.info('Stage files complete.');
    print.info('Start commit.');
    return exec('git commit -m "Earthquake!!!!"')
      .then(function (res) {
        print.msg(res);
        print.info('Commit complete.');
        print.info('Start push all branches to remote.');
        return exec('git push --all origin')
          .then(function (res) {
            print.msg(res);
            print.info('Git push complete.');
          })
      })
  })
  .catch(function (e) { print.error(e) })
}
