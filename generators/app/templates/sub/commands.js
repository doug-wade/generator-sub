'use strict';

/**
 * Lists all commands.
 * Usage:
 *      <%= name %> commands
 *          commands
 *          example
 *          help
 *          init
 *          update
 */
module.exports = ({ logger, sub }) => {
  return new Promise((resolve, reject) => {
    sub.get().then((commands) => {
      logger.info('Available commands: ');
      commands.forEach((s) => logger.random(s));
      resolve();
    }, reject);
  });
};
