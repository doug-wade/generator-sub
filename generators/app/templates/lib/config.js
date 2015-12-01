'use strict';

var fs = require('fs');

var file = '/persist/config.json';
var contents = fs.readFileSync(file);
var config = contents || {};
// I don't like that this is stored partially here and partially in init.
var keys = [
  'name'
];

module.exports = {
  getConfig: function () {
    return config;
  },

  saveConfig: function (newConfig) {
    config = newConfig;
    fs.writeFileSync(file);
  },

  isValid: function () {
    //var derp = ;
    return keys.reduce((prev, curr) => prev && !!config[curr], true);
  }
};
