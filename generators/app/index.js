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
      type   : 'input',
      name   : 'name',
      message: 'What would you like to call your cli app?',
      default: this.appname // Default to current folder name
    }, {
      type   : 'list',
      name   : 'argParser',
      message: 'Which argument parser would you like to use?',
      choices: ['yargs', 'minimist']
    }, {
      type   : 'input',
      name   : 'repo',
      message: 'What git repo will you be storing this in?'
    }, {
      type   : 'list',
      name   : 'updater',
      message: 'How would you like users to update their app?',
      choices: ['git', 'npm']
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
      name     : this.props.name,
      repo     : this.props.repo,
      updater  : this.props.updater
    };

    this.template('_package.json', 'package.json', context);
    this.template('index.js', 'index.js', context);
    this.template('_eslintrc', '.eslintrc', context);
    this.template('_gitignore', '.gitignore', context);
    this.template('_README.md', 'README.md', context);
    this.template('sub/help.js', 'sub/help.js', context);
    this.template('sub/example.js', 'sub/example.js', context);
    this.template('sub/init.js', 'sub/init.js', context);
    if (this.props.updater === 'git') {
      this.template('sub/git-update.js', 'sub/update.js', context);
    } else {
      this.template('sub/npm-update.js', 'sub/update.js', context);
    }
    this.template('lib/config.js', 'lib/config.js', context);
  },

  install: function () {
    this.installDependencies();
  }
});
