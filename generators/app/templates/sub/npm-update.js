'use strict';

var execSync = require('child_process').execSync;

/**
 * Updates <%= name %> by installing the most recent version of the npm package.
 * Usage:
 *     <%= name %> update
 *     # output from npm
 */
module.exports = function () {
  try {
    var result = execSync('npm install -g <%= name %>');
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};
