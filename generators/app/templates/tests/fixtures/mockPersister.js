'use strict';

/**
 * Exports a mock persister that matches the api of lib/persister.js, for use
 * when testing.  The write methods do nothing, the read methods return an the
 * most minimal possible response of the correct type (an empty object for
 * config and the current timestamp for lastUpgraded).
 * @type {Object} A mock persister
 */
module.exports = {
  readConfig: function () {
    return new Promise((resolve, reject) => {
      resolve({ name: 'Doug Wade' });
    });
  },

  writeConfig: function () {
    return new Promise((resolve, reject) => {
      resolve();
    });
  },

  readLastUpgraded: function () {
    return new Promise((resolve, reject) => {
      resolve(new Date());
    });
  },

  writeLastUpgraded: function () {
    return new Promise((resolve, reject) => {
      resolve();
    });
  },
};
