'use strict';

var sinon = require('sinon');

module.exports = () => {
  return {
    random: sinon.spy(),
    debug : sinon.spy(),
    info  : sinon.spy(),
    silly : sinon.spy(),
    warn  : sinon.spy(),
    error : sinon.spy()
  };
};
