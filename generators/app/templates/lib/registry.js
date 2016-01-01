'use strict';

var fs = require('fs');
var libDir = __dirname;
var path = require('path');

function getSubCommandName(fileName) {
  return path.basename(fileName, '.js');
}

module.exports = {
  getAll: function () {
    var files = fs.readdirSync(libDir);

    return files.map((file) => getSubCommandName(file));
  }
};
