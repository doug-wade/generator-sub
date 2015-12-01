'use strict';

var config = require('../lib/config');
var inquirer = require('../inquirer');

/**
 * An example command.
 * Usage:
 *     sub example
 *     > 'You ran the example command!'
 */
module.exports = function () {
  if (config.isValid()) {
    inquirer.inquire();
  }
};
