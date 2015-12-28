'use strict';

var config = require('../lib/config');
var inquirer = require('inquirer');

/**
 * Set up configuration for <%= name %>. Runs interactive commands to walk you through setting up config.
 * Usage:
 *     <%= name %> init
 */
module.exports = function (callback) {
  inquirer.prompt([
    {
      default: 'User',
      name   : 'name',
      message: 'Please enter your name'
    }<% if (updater === 'git') { %>, {
      name   : 'repo',
      message: 'Where did you install <%= name %> (where is your git repo located)?',
      default: ''
    }<% } %>
  ], (answers) => {
    config.updateConfig(answers);
    callback();
  });
};
