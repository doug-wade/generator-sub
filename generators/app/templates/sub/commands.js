'use strict';

var registry = require('../lib/registry');

/**
 * Lists all commands.
 * Usage:
 *      <%= name %> commands
 *          commands
 *          example
 *          help
 *          init
 *          update
 */
module.exports = () => {
  var commands = registry.getAll();
  commands.forEach((sub) => console.log('    ' + sub));
};
