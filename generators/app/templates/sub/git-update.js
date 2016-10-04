'use strict';

var execSync = require('child_process').execSync;

/**
 * Updates <%= executable %> by pulling the most recent commit from the master branch of the remote git repository.
 * Usage:
 *     <%= executable %> update
 *     # output from git
 */
module.exports = function ({ config, logger }, cb) {
  var result;

  try {
    var dir = execSync('pwd').toString();
    execSync('cd ' + config.repo);
    execSync('git pull origin ' + config.tag);
    execSync('cd ' + dir);
    result = 0;
  } catch (err) {
    logger.error(err);
    result = 1;
  }

  if (cb) {
    return cb();
  } else {
    return result;
  }
};
