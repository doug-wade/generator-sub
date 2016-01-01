'use strict';

var registry = require('../lib/registry');

/**
 * Lists all commands.
 * Usage:
 *      sub commands
 *      > commands
 *      > example
 *      > init
 *      > update
 */
module.exports = () => {
  var commands = registry.getAll();

  commands.forEach((sub) => console.log('    ' + sub));
};
