#!/usr/bin/env node

"use strict";
<% if (argParser === "minimist") { %>
var argv = require("minimist")(process.argv.slice(2));
<% } %><% if (argParser === "yargs") { %>
var argv = require('yargs').argv;
<% } %>

if (argv.h || argv.help) {
  console.log("Description goes here!");
  console.log("-h | --help print this help message");
  process.exit(0);
}
