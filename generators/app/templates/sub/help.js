'use strict';

const fs = require('fs');
const libDir = __dirname;
const path = require('path');

/**
 * Gets the help text for a command.
 * @param  {String} fileName The name of the command to get the help text for.
 * @return {String}          The first line of the help text.
 */
function getHelpText(fileName) {
  const file = fs.readFileSync(path.join(libDir, fileName + '.js')).toString();
  const lines = file.split('\n');
  const commentCharacters = ['*/', ' */', ' *', '/**', '/*', '*', '//'];
  const escapedCommentCharacters = [' \*/', '\*/', ' \*', '/\*', '\*', '//'];

  const helpLines = lines.filter((line) => {
    // Include any top-level comments as help text (indented comments should be excluded so you can comment on the
    // internals without leaking any implementation details).
    return commentCharacters.reduce((prev, curr) => prev || line.startsWith(curr), false);
  });

  const uncommentedLines = helpLines.map((line) => {
    escapedCommentCharacters.forEach((char) => {
      // this is in a block to avoid returning the assignment result.
      line = line.replace(char, '');
    });
    return line;
  });

  // Remove whitespace only lines
  return uncommentedLines.filter((line) => !(line.replace(/\s/g, '').length < 1));
}

/**
 * Gets the first line of help text for a command.
 * @param  {String} fileName The name of the command to get the help text for.
 * @return {String}          The first line of the help text.
 */
function getFirstLine(fileName) {
  return getHelpText(fileName)[0];
}

/**
 * Gets help for a sub command.
 * Usage:
 *      rfnpm help example
 *      > An example command.
 *      > Usage:
 *      >      rfnpm example
 *      >      > 'You ran the example command!'
 */
module.exports = function ({ argv, logger, sub }) {
  return new Promise((resolve, reject) => {
    sub.get().then((commands) => {
      const helpSub = argv ? argv._[1] : undefined;

      if (helpSub) {
        if (commands.has(helpSub)) {
          const helpText = getHelpText(helpSub);
          helpText.forEach((line) => logger.info(line));

          resolve();
        } else {
          logger.error('Could not find command ' + helpSub);
          reject();
        }
      }

      logger.info('A simple cli application. Broken into sub commands, invoked under sub: ');
      commands.forEach((s) => logger.info('    ' + s + ': ' + getFirstLine(s)));
      logger.info('Also takes the flag --noUpdate to prevent auto updating.');
      resolve();
    }, reject);
  });
};
