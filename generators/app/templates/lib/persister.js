'use strict';

const fs = require('fs');
const path = require('path');
const untildify = require('untildify');

const persistenceDir = untildify('~/.config/<%= name %>');
const configFile = path.join(persistenceDir, 'config.json');
const lastUpgradedFile = path.join(persistenceDir, 'lastUpgraded.json');
const persistenceFiles = [configFile, lastUpgradedFile];

module.exports = (logger) => {
  return {
  /**
   * Reads the config from a file.
   * @return {Promise} for a JSON representation of the config.
   * @example
   *     { name: "Doug Wade" }
   */
    readConfig: function () {
      return new Promise((resolve, reject) => {
        ensurePersistenceDirValidity().then(() => {
          fs.readFile(configFile, (err, data) => {
            if (err) {
              reject(err);
            }
            resolve(JSON.parse(data));
          });
        });
      });
    },

  /**
   * Writes the config to a file.
   * @param  {Object} contents The JSON to write to file
   * @return {undefined}       May throw errors from synchronous file operations
   * @example
   *     { name: "Doug Wade" }
   */
    writeConfig: function (contents) {
      return new Promise((resolve, reject) => {
        ensurePersistenceDirValidity().then(() => {
          fs.writeFile(configFile, JSON.stringify(contents), (err, data) => {
            if (err) {
              reject(err);
            }
            resolve();
          });
        });
      });
    },

  /**
   * Gets the last upgraded date from file.
   * @return {Promise} for a JSON representation of the last upgraded information.
   * @example
   *     { date: 1461459266285, by: "robot" }
   */
    readLastUpgraded: function () {
      return new Promise((resolve, reject) => {
        ensurePersistenceDirValidity().then(() => {
          fs.readFile(lastUpgradedFile, (err, data) => {
            if (err) {
              reject(err);
            }
            resolve(JSON.parse(data));
          });
        });
      });
    },

  /**
   * Writes your last upgraded date to file
   * @param  {Object} contents A JSON representation of the last upgraded information.
   * @return {Promise}
   * @example
   *     { date: 1461459266285, by: "robot" }
   */
    writeLastUpgraded: function (contents) {
      return new Promise((resolve, reject) => {
        ensurePersistenceDirValidity().then(() => {
          fs.writeFile(lastUpgradedFile, JSON.stringify(contents), (err, data) => {
            if (err) {
              reject(err);
            }
            resolve();
          });
        });
      });
    },
  };
};

/**
 * Checks to see whether the persistence directory exists.
 * @return {Promise}
 */
function ensurePersistenceDirValidity() {
  return new Promise((resolve, reject) => {

    fs.lstat(persistenceDir, (err, stats) => {
      if (err) {
        fs.mkdir(persistenceDir, (mdErr) => {
          if (mdErr) {
            reject(mdErr);
          } else {
            ensurePersistenceFiles().then(resolve, reject);
          }
        });
      } else if (!stats.isDirectory()) {
        fs.unlink(persistenceDir, (uErr) => {
          if (uErr) {
            reject(uErr);
          }
          fs.mkdir(persistenceDir, (mdErr) =>{
            if (mdErr) {
              reject(mdErr);
            } else {
              resolve();
            }
          });
        });
      } else {
        ensurePersistenceFiles().then(resolve, reject);
      }
    });
  });
}

/**
 * Ensure that ther persisted files and are valid json
 * @return {Promise}
 */
function ensurePersistenceFiles() {
  let promises = [];
  for (let file of persistenceFiles) {
    promises.push(new Promise((resolve, reject) => {
      fs.lstat(file, (err, stats) => {
        if (err) {
          fs.writeFile(file, '{}', (wfErr) => {
            if (wfErr) {
              reject(wfErr);
            } else {
              resolve();
            }
          });
        }
        resolve();
      });
    }));
  }
  return Promise.all(promises);
}
