'use strict';

const config = require('../lib/config');
const fs = require('fs');
const path = require('path');

/**
 * Logs rfnpm's installed version
 * Usage:
 *     rfnpm -v
 *     rfnpm --version
 *     rfnpm version
 */
module.exports = function ({ argv, logger }) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, '..', 'package.json'), (err, data) => {
      if (err) {
        reject(err);
      } else {
        const packageJson = JSON.parse(data);
        logger.info(packageJson.version);
        resolve();
      }
    });
  });
};
