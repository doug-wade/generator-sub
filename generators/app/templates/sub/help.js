'use strict';

const fs = require('fs');
const libDir = __dirname;
const path = require('path');



  /**
   * Returns the lines of the given that are top-level comments
   * @param {String} fileName The name of the file to find comment lines for.
   * @return {Array.<String>} An array of strings that are top-level comments
   */
function getHelpLines(fileName) {
  const file = fs.readFileSync(path.join(libDir, fileName + '.js')).toString();
  const lines = file.split('\n');

  const commentCharacters = ['*/', ' */', ' *', '/**', '/*', '*', '//'];

  const helpLines = lines.filter((line) => {
    // Include any top-level comments as help text (indented comments should be excluded so you can comment on the
    // internals without leaking any implementation details).
    return commentCharacters.reduce((prev, curr) => prev || line.startsWith(curr), false);
  });

  return helpLines;
}

  /**
   * Gets the help text for a command.
   * @param  {String} fileName The name of the command to get the help text for.
   * @return {String}          The first line of the help text.
   */
function getHelpText(fileName) {
  const helpLines = getHelpLines(fileName)
  
  const escapedCommentCharacters = [' \*/', '\*/', ' \*', '/\*', '\*', '//'];

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
   * Returns whether or not the command is considered a "long" only command.
   * This is determined by whether or not a top level comment contains the
   * annotation "@kind internal".
   * @param {String} filename The name of the command to test against.
   * @return {boolean}        Whether or not this command is considered a "long" command
   */
function isLongCommand(fileName) {
  const longTest = /@kind\s+internal/;
  const lines = getHelpLines(fileName);
  return lines.some((line) => longTest.test(line));
}

/**
 * Gets help for a sub command.
 * Usage:
 *      <%= name %> help example
 *      > An example command.
 *      > Usage:
 *      >      <%= name %> example
 *      >      > 'You ran the example command!'
 */
module.exports = function ({ argv, logger, sub }) {
  return new Promise((resolve, reject) => {
    sub.get().then((commands) => {
      const secondaryCommand = argv ? argv._[1] : undefined;
      let showLong = false;
      let helpSub = null;
      if (secondaryCommand) {
        if (secondaryCommand === "--long") {
          showLong = true;
        } else {
          helpSub = secondaryCommand;
        }  
      }

      if (helpSub) {
        if (commands.has(helpSub)) {
          const helpText = getHelpText(helpSub);
          helpText.forEach((line) => logger.info(line));

          resolve();
        } else {
          logger.error('Could not find command ' + helpSub);
          reject();
        }
      } else {
        logger.info('A simple cli application. Broken into sub commands, invoked under sub: ');

        const longCommands = commands.filter(isLongCommand);
        const basicCommands = commands.filter(command => !isLongCommand(command));

        if (basicCommands.length) {
          basicCommands.forEach(s => logger.info('    ' + s + ': ' + getFirstLine(s)));  
        }

        if (longCommands.length) {
          if (showLong) {
            logger.info('');
            logger.info('These commands are marked as "internal":');
            longCommands.forEach(s => logger.info('    ' + s + ': ' + getFirstLine(s)));
            logger.info('');
            logger.info('Also takes the flag --noUpdate to prevent auto updating.');  
          } else {
            logger.info('There are more, internal commands that can be shown with the --long flag');
          }
        }
        resolve();
      }
    }, reject);
  });
};
