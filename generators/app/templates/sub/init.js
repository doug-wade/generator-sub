'use strict';

var config = require('../lib/config');
var inquirer = require('inquirer');

/**
 * Set up configuration for <%= name %>
 * Usage:
 *     sub init
 *     # Interactive commands walk you through setting config
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
    var tempConfig = config.getConfig();
    Object.keys(answers).forEach(function (key) {
      tempConfig[key] = answers[key];
    });
    config.saveConfig(tempConfig);
    callback();
  });
};
