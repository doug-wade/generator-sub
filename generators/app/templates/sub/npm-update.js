'use strict';

const exec = require('child_process').exec;

/**
 * Updates <%= name %> by installing the most recent version of the npm package.
 * Usage:
 *     <%= name %> update
 *     # output from npm
 */
module.exports = function ({ config, logger }) {
  return new Promise(function (resolve, reject) {
    exec('npm install -g <%= name %>@' + config.tag, (err, stdout) => {
      if (err) {
        logger.error(err);
        reject(err);
      } else {
        logger.info(stdout);
        resolve();
      }
    });
  });
};
