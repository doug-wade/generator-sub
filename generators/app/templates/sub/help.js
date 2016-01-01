'use strict';

var fs = require('fs');
var libDir = __dirname;
var path = require('path');
var registry = require('../lib/registry');

function getHelpText(fileName) {
  var file = fs.readFileSync(path.join(libDir, fileName)).toString();
  var lines = file.split('\n');
  var commentCharacters = [' *', '/**', '/*', '*', '//', '*/', ' */'];
  var escapedCommentCharacters = [' \*', '/\*', '\*', '//', ' \*/', '\*/'];

  var helpLines = lines.filter((line) => {
    // Include any top-level comments as help text (indented comments should be excluded so you can comment on the
    // internals without leaking any implementation details).
    return commentCharacters.reduce((prev, curr) => prev || line.startsWith(curr), false);
  });

  var uncommentedLines = helpLines.map((line) => {
    escapedCommentCharacters.forEach((char) => line = line.replace(char, ''));
    return line;
  });

  // Remove whitespace only lines
  return uncommentedLines.filter((line) => !(line.replace(/\s/g, '').length < 1));
}

/**
 * Gets help for a sub command.
 * Usage:
 *      sub help example
 *      > An example command.
 *      > Usage:
 *      >      sub example
 *      >      > 'You ran the example command!'
 */
module.exports = (argv) => {
  var commands = registry.getAll();
  var helpSub = argv ? argv._[1] : undefined;

  if (helpSub) {
    var subCommands = commands.filter((sub) => sub.name === helpSub);
    if (subCommands.length > 0) {
      var subCommand = subCommands[0];
      var helpText = getHelpText(subCommand);
      helpText.forEach((line) => console.log(line));

      return;
    } else {
      console.log('Could not find command ' + helpSub);
    }
  }

  console.log('A simple cli application. Broken into sub commands, invoked under sub: ');
  commands.forEach((sub) => console.log('    ' + sub.name + ': ' + sub.firstLine));
};
