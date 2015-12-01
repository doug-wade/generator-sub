#!/usr/bin/env node

'use strict';

<% if (argParser === 'minimist') { %>
var argv = require('minimist')(process.argv.slice(2));
<% } %><% if (argParser === 'yargs') { %>
var argv = require('yargs').argv;
<% } %>

function runCommand(command) {
  try {
    require('./sub/' + command)(argv);
  } catch (e) {
    console.error('Error: did not recognize options ' + JSON.stringify(argv));
    require('./sub/help')();
  }
}

var command = argv._[0];
if (argv.h || argv.help || command === 'help') {
  require('./sub/help')(argv);
} else {
  // Help must not use lib or config to keep diagnostic information even if we get into a bad state (deleted config,
  // uninstalled dependencies, &c)
  var config = require('./lib/config');

  if (command === 'init') {
    require('./sub/init')(function () { });
  } else if (!config.isValid()) {
    console.error("There's a problem with your config; running <%= name %> init to set up config");
    require('./sub/init')(function () {
      runCommand(command);
    });
  } else {
    runCommand(command);
  }
}
