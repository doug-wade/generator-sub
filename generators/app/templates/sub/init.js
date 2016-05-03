'use strict';

const inquirer = require('inquirer');
const exec = require('child_process').exec;
const fs = require('fs');
const untildify = require('untildify');
const path = require('path');

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
      }, {
        name   : 'shell',
        message: 'What is your preferred shell?',
        default: 'zsh',
        type   : 'list',
        choices: ['bash', 'zsh']
      }
    ]).then((answers) => {
      Object.keys(answers).forEach((key) => {
        config[key] = answers[key];
      });
      persister.writeConfig(config).then(() => {
        let command = 'source ';
        let profile;
        if (answers.shell === 'zsh') {
          command += path.resolve(path.join(__dirname, '..', 'completions', 'example.zsh'));
          profile = '.zshrc';
        } else {
          command += path.resolve(path.join(__dirname, '..', 'completions', 'example.bash'));
          profile = '.bash_profile';
        }

        fs.appendFile(untildify(path.join('~', profile)), command + '\n', (err) => {
          if (err) {
            reject(e);
          } else {
            exec(command, (execErr) => {
              if (execErr) {
                reject(execErr);
              } else {
                resolve();
              }
            });
          }
        });
      }, reject);
    });
  });
};
