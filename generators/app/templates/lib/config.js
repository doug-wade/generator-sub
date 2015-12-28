'use strict';

var persister = require('./persister');

// I don't like that this is stored partially here and partially in init.
var keys = [
  'name',
  'repo'
];

module.exports = {
  getConfig: function () {
    return persister.readConfig();
  },

  updateConfig: function (newConfig) {
    var config = persister.readConfig();
    Object.keys(newConfig).forEach(function (key) {
      config[key] = newConfig[key];
    });
    persister.writeConfig(config);
  },

  isValid: function () {
    var config = persister.readConfig();
    for (var i = 0; i < keys.length; i++) {
      if (!config[keys[i]]) {
        return false;
      }
    }
    return true;
  }
};
