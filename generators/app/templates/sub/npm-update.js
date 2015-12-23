'use strict';

var execSync = require('child_process').execSync;

module.exports = function () {
  try {
    var result = execSync('npm install -g <%= name %>');
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};
