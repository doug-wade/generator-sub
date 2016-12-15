#!/usr/bin/env node
'use strict';

<% if (argParser === "minimist") { %>
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2), {
  boolean: true,
});
<% } %><% if (argParser === "yargs") { %>
const argv = require('yargs').argv;
<% } %>

const log = require('./lib/logger');
const logger = log.getLogger(log.getLevelFromArgv(argv));
process.on('unhandledRejection', function (reason, p){
  logger.error('Unhandled error: ' + reason);
});

const persister = require('./lib/persister')({argv, logger});
require('./lib/config')({argv, logger, persister}).getConfig().then((config) => {
  const sub = require('./lib/sub')({argv, logger, persister, config});

  const <%= sterileName %> = require('.');

  logger.debug('process.argv: ' + JSON.stringify(argv));

  <%= sterileName %>({ argv, config, logger, persister, sub }).then((result) => {
    process.exit(result); // eslint no-process-exit:0
  });
}, (err) => {
  logger.error('failed to bootstrap config with error: ', err);
});
