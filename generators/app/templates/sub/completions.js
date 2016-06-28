'use strict';

/**
 * Gets autocompletions.
 * @kind internal
 * Usage:
 *      <%= name %>
 *      # press tab key to get completions
 */
module.exports = ({ argv, logger, sub }) => {
  return new Promise((resolve, reject) => {
    sub.get().then((commands) => {
      commands.forEach((s) => logger.bare(s));
      resolve();
    }, reject);
  });
};
