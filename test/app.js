'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-sub:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'), { tmpdir: true })
      .withPrompts({
        updateInterval: 7,
        updater       : 'git',
        repo          : 'http://github.com/doug-wade/example-sub',
        argParser     : 'minimist',
        name          : 'example-sub'
      })
      .on('end', done);
  });

  it('creates files', function (done) {
    assert.file([
      'lib/config.js',
      'lib/persister.js',
      'lib/registry.js',
      'sub/commands.js',
      'sub/example.js',
      'sub/help.js',
      'sub/init.js',
      'sub/update.js',
      '.eslintrc',
      '.gitignore',
      'README.md',
      'package.json',
      'index.js'
    ]);
    done();
  });
});
