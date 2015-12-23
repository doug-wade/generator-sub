'use strict';

var fs = require('fs');
var path = require('path');

var persistenceDir = path.join(__dirname, '..', 'persist');
var file = path.join(persistenceDir, 'config.json');
var config = {};

// copy-pasta from http://stackoverflow.com/questions/4482686/check-synchronously-if-file-directory-exists-in-node-js
try {
  var stats = fs.lstatSync(persistenceDir);
  if (stats.isDirectory()) {
    config = JSON.parse(fs.readFileSync(file));
  }
} catch (e) {
  fs.mkdir(persistenceDir);
  fs.writeFileSync(file, JSON.stringify({}));
}

// I don't like that this is stored partially here and partially in init.
var keys = [
  'name',
  'repo'
];

module.exports = {
  getConfig: function () {
    return config;
  },

  saveConfig: function (newConfig) {
    config = newConfig;
    fs.writeFileSync(file, JSON.stringify(newConfig));
  },

  isValid: function () {
    for (var i = 0; i < keys.length; i++) {
      if (!config[keys[i]]) {
        return false;
      }
    }
    return true;
  }
};
