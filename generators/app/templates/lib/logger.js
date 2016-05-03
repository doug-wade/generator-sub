'use strict';
/* eslint no-console: 0 */

const chalk = require('chalk');
const colors = ['green', 'yellow', 'blue', 'magenta', 'cyan'];
const randomEmoji = require('random-emoji');

/**
 * The logger.  All logging should be done using the logger, since it makes unit
 * testing console output possible.
 * @type {function} The logger constructor
 */
module.exports = {
  getLogger: function (level) {
    return {
      getLevel: () => {
        return level;
      },
      silly: (message) => {
        if (level > 4) {
          console.log(chalk.green('[SILLY] ') + message);
        }
      },
      debug: (message) => {
        if (level > 3) {
          console.log(chalk.blue('[DEBUG] ') + message);
        }
      },
      info: (message) => {
        if (level > 2) {
          console.log(chalk.magenta('[INFO] ') + message);
        }
      },
      warn: (message) => {
        if (level > 1) {
          console.log(chalk.yellow('[WARN] ') + message);
        }
      },
      error: (message) => {
        if (level > 0) {
          console.log(chalk.red('[ERROR] ') + message);
        }
      },
      random: (message) => {
        if (level > 2) {
          let color = colors[Math.floor(Math.random() * colors.length)];
          let emojis = randomEmoji.random({count: 1});
          console.log('    ' + emojis[0].character + '  ' + chalk[color](message));
        }
      },
    };
  },

  /**
   * Given the console arguments, return the log level.
   * @param  {Object} argv the parsed arguments
   * @return {Number}      the log level
   */
  getLevelFromArgv(argv) {
    if (argv.dd || argv.silly) {
      return 5;
    } else if (argv.d || argv.debug) {
      return 4;
    } else if (argv.q || argv.quiet) {
      return 2;
    } else if (argv.qq || argv.quieter) {
      return 1;
    } else if (argv.s || argv.silent) {
      return 0;
    }
    return 3;
  }
};
