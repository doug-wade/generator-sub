'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the primo ' + chalk.red('generator-sub') + ' generator!'
    ));

    var prompts = [{
      type    : 'input',
      name    : 'name',
      message : 'What would you like to call your cli app?',
      default : this.appname // Default to current folder name
    }, {
      type: 'list',
      name: 'argParser',
      message: 'Which argument parser would you like to use?',
      choices: ['yargs', 'minimist']
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    var context = {
      argParser: this.props.argParser,
      name: this.props.name
    };

    this.template('_package.json', 'package.json', context);
    this.template('index.js', 'index.js', context);
  },

  install: function () {
    this.installDependencies();
  }
});
