'use strict';

const fs = require('fs');
const path = require('path');

const commandsDir = path.join(__dirname, '..', 'sub');

const aliases = {
  c: 'commands',
  e: 'example',
  h: 'help',
  i: 'init',
  u: 'update'
};

module.exports = ({ logger }) => {
  return {
  /**
   * Gets all subcommands that example supports.
   * @return {Array of String} The names of all the supported subcommands.
   */
    get,

  /**
   * Given a command name or alias, get the name.
   * @param  {string} key A package alias or name
   * @return {string}     The package name
   */
    normalize: function (key) {
      return new Promise((resolve, reject) => {
        get().then((commands) => {
          if (commands.has(key)) {
            resolve(key);
          } else {
            resolve(aliases[key]);
          }
        });
      });
    },

  /**
   * Runs a command by name
   * @param  {String} command The command to run
   * @param {Object} opts The options to pass to the command
   * @param {function} cb The callback to execute after the command
   * @return {undefined}      Nothing
   */
    run: function (command, opts) {
      return new Promise(function (resolve, reject) {
        try {
          require(path.join('..', 'sub', command))(opts).then(resolve, reject);
        } catch (e) {
          logger.error(e);
          logger.error('Error: did not recognize options ' + JSON.stringify(opts.argv));
          require(path.join('..', 'sub', 'help'))(opts).then(resolve, reject);
        }
      });
    }
  };

  function get() {
    return new Promise((resolve, reject) => {
      fs.readdir(commandsDir, (err, files) => {
        if (err) {
          reject(err);
        }
        files = files.map(file => path.basename(file, '.js'));
        resolve(new Set(files));
      });
    });
  }
};
