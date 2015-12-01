"use strict";

let fs = require('fs');
let path = require('path');

let libDir = path.join('.', 'lib');

function getHelpText(fileName) {
  let file = fs.readFileSync(path.join(libDir, fileName)).toString();
  let lines = file.split('\n');
  let commentCharacters = [" *", "/**", "/*", "*", "//", "*/", " */"];
  let escapedCommentCharacters = [" \*", "/\*", "\*", "//", " \*/", "\*/"];
  let helpLines = lines.filter((line) => {
    // Include any top-level comments as help text (indented comments should be excluded so you can comment on the
    // internals without leaking any implementation details).
    return commentCharacters.reduce((prev, curr) => prev || line.startsWith(curr), false);
  });
  let uncommentedLines = helpLines.map((line) => {
    escapedCommentCharacters.forEach((char) => line = line.replace(char, ""));
    return line;
  });
  // Remove whitespace only lines
  return uncommentedLines.filter((line) => !(line.replace(/\s/g, '').length < 1));
}

function getSubCommandName(fileName) {
  return path.basename(fileName, '.js');
}

function getAllSubCommands() {
  let files = fs.readdirSync(libDir);

  return files.map((file) => {
    let helpText = getHelpText(file);

    return {
      name: getSubCommandName(file),
      firstLine: helpText[0],
      helpText: helpText
    }
  });
}

/**
 * Gets help for a sub command.
 * Usage:
 *      sub help example
 *      > An example command.
 *      > Usage:
 *      >      sub example
 *      >      > "You ran the example command!"
 */
module.exports = (argv) => {
  let commands = getAllSubCommands();
  let helpSub = argv ? argv._[1] : undefined;

  if (helpSub) {
    let subCommands = commands.filter((sub) => sub.name === helpSub);
    if (subCommands.length > 0) {
      let subCommand = subCommands[0];
      subCommand.helpText.forEach((line) => console.log(line));

      return;
    } else {
      console.log("Could not find command " + helpSub);
    }
  }

  console.log("A simple cli application. Broken into sub commands, invoked under sub: ");
  commands.forEach((sub) => console.log("    " + sub.name + ": " + sub.firstLine));
};
