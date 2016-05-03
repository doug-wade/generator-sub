'use strict';

/**
 * Put some helpful help text here
 * Usage:
 *     <%= name %>
 *     > 'You ran the <%= name %> command!'
 */
module.exports = function ({ argv, config, logger }) {
  return new Promise((resolve) => {
    logger.info(config.name + ', you ran the ' + argv._[0] + ' command!');
    resolve();
  });
};
