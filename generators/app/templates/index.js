#!/usr/bin/env node

"use strict";
<% if (argParser === "minimist") { %>
var argv = require("minimist")(process.argv.slice(2));
<% } %><% if (argParser === "yargs") { %>
var argv = require('yargs').argv;
<% } %>

if (argv.h || argv.help) {
  require("./lib/help")();
} else {
  try {
    var command = argv._[0];
    require("./lib/" + command)(argv);
  } catch (e) {
    console.error("Error: did not recognize options " + JSON.stringify(argv));
    require("./lib/help")();
  }
}
