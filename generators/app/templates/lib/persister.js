'use strict';

var fs = require('fs');
var path = require('path');

var persistenceDir = path.join(__dirname, '..', 'persist');
var configFile = path.join(persistenceDir, 'config.json');
var lastUpdatedFile = path.join(persistenceDir, 'lastUpdated.json');
var persistenceFiles = [configFile, lastUpdatedFile];

function ensurePersistenceDirValidity() {
  var stats;
  try {
    stats = fs.lstatSync(persistenceDir);
    if (!stats.isDirectory()) {
      fs.unlink(persistenceDir);
      fs.mkdir(persistenceDir);
    }
  } catch (e) {
    fs.mkdir(persistenceDir);
  }
  for (var file of persistenceFiles) {
    try {
      stats = fs.lstatSync(file);
      if (stats.isDirectory()) {
        fs.rmdir(file);
        fs.writeFileSync(file, '{}');
      }
    } catch (e) {
      fs.writeFileSync(file, '{}');
    }
  }
}

module.exports = {
  readConfig: function () {
    ensurePersistenceDirValidity();
    return JSON.parse(fs.readFileSync(configFile));
  },
  writeConfig: function (contents) {
    ensurePersistenceDirValidity();
    fs.writeFileSync(configFile, JSON.stringify(contents));
  },
  readLastUpdated: function () {
    ensurePersistenceDirValidity();
    return JSON.parse(fs.readFileSync(lastUpdatedFile));
  },
  writeLastUpdated: function (contents) {
    ensurePersistenceDirValidity();
    fs.writeFileSync(lastUpdatedFile, JSON.stringify(contents));
  }
};
