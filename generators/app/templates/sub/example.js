'use strict';

/**
 * An example command.
 * Usage:
 *     <%= executable %> example
 *     > 'You ran the example command!'
 */
module.exports = function ({ config, logger }) {
  return new Promise((resolve) => {
    logger.info(config.name + ', you ran the example command!');
    resolve();
  });
};
