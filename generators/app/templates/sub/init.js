'use strict';

const inquirer = require('inquirer');

/**
 * Set up configuration for example. Runs interactive commands to walk you through setting up config.
 * Usage:
 *     example init
 */
module.exports = function ({ persister, config }) {
  return new Promise((resolve, reject) => {
    inquirer.prompt([
      {
        default: 'User',
        name   : 'name',
        message: 'Please enter your name'
      }, {
        name   : 'repo',
        message: 'Where did you install example (where is your git repo located)?',
        default: ''
      }
    ]).then((answers) => {
      Object.keys(answers).forEach((key) => {
        config[key] = answers[key];
      });
      persister.writeConfig(config).then(resolve, reject);
    });
  });
};
