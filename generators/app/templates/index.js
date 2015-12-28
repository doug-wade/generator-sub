#!/usr/bin/env node

'use strict';

var config = require('./lib/config');
var persister = require('./lib/persister');
<% if (argParser === 'minimist') { %>
var argv = require('minimist')(process.argv.slice(2));
<% } %><% if (argParser === 'yargs') { %>
var argv = require('yargs').argv;
<% } %>

function runCommand(command) {
  try {
    require('./sub/' + command)(argv);
  } catch (e) {
    console.error(e);
    console.error('Error: did not recognize options ' + JSON.stringify(argv));
    require('./sub/help')();
  }
}

// Run help without checking config or updating in case something bad has happened
var command = argv._[0];
if (argv.h || argv.help || command === 'help') {
  require('./sub/help')(argv);
  return;
}

// Auto-update
var lastUpdated = persister.readLastUpdated();
if (!lastUpdated.timestamp) {
  persister.writeLastUpdated({ timestamp: Date.now(), by: 'auto' });
} else if (Date.now() - lastUpdated.timestamp > <%= updateInterval %> * 1000 * 60 * 60 * 60 * 24) {
  <%
    /**
     * Dependening on answers given by the package author, this is one of: git-update.js, npm-update.js.  In any case,
     * the file is copied to update so that we don't leak implementation details to clients.
     */
  %>
  require('./sub/update')();
}

// Don't check config if they're updating config
if (command === 'init') {
  require('./sub/init')(function () { });
  return;
}

// Check config before running command so all commands are guaranteed to have valid config
if (!config.isValid()) {
  console.error('There is a problem with your config; running <%= name %> init to set up config');
  require('./sub/init')(function () {
    runCommand(command);
  });
  return;
}

runCommand(command);
