'use strict';

var fs = require('fs');
var path = require('path');
var subDir = path.join(__dirname, '..', 'sub');

function getSubCommandName(fileName) {
  return path.basename(fileName, '.js');
}

module.exports = {
  getAll: function () {
    var files = fs.readdirSync(subDir);

    return files.map((file) => getSubCommandName(file));
  }
};
