'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

var testSubCommand = "random";

describe('generator-sub:command', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/command'))
      .withOptions({name: testSubCommand})
      .withPrompts({name: testSubCommand})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      testSubCommand + '.js'
    ]);
  });
});
