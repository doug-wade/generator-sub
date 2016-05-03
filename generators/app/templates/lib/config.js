'use strict';

const path = require('path');
const untildify = require('untildify');

// I don't like that this is stored partially here and partially in init.
const keys = [
  'name',
  'repo'

];

let config;

module.exports = ({argv, persister, logger}) => {
  return {
  /**
   * Gets the config for the running instance of example.
   * @example
   *     getConfig().then((config) => {logger.info(config.key)});
   *     // returns { name: "User", repo: "<%= repo %>" }
   * @return {Promise} for the config
   */
    getConfig: function () {
      return new Promise(function (resolve, reject) {
        if (config) {
          resolve(config);
        } else {
          logger.debug(`Bootstrapping config with args ${JSON.stringify(argv)}`);
          persister.readConfig().then((configFile) => {
            config = configFile;
            config.repo = path.join(__dirname, '..');
            for (let key of keys) {
              logger.debug(`checking for arg ${key} in argv`);
              if (argv[key]) {
                logger.debug(`Overriding config value ${config[key]} with command line arg ${argv[key]}`);
                config[key] = path.resolve(untildify(argv[key]));
              }
            }
            config.isValid = function () {
              for (let i = 0; i < keys.length; i++) {
                if (!this[keys[i]]) {
                  return false;
                }
              }
              return true;
            };
            resolve(config);
          }, reject);
        }
      });
    },
  };
};
