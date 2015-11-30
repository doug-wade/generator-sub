"use strict";

module.exports = function() {
  console.log("A simple cli application. Broken into sub commands, invoked under <%= name %>: ");
  console.log("    example  an example command.  Ex. <%= name %> example");
  console.log("    help    (also: -h or --help) print this help message.  Ex. <%= name %> help");
};
