'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the primo ' + chalk.red('sub') + ' generator!'
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
      choices: ['minimist', 'yargs']
    }, {
      type   : 'input',
      name   : 'repo',
      message: 'What git repo will you be storing this in?',
      default: 'https://github.com/doug-wade/example-sub'
    }, {
      type   : 'list',
      name   : 'updater',
      message: 'How would you like users to update their app?',
      choices: ['git', 'npm']
    }, {
      type   : 'input',
      name   : 'updateInterval',
      message: 'At what interval would you like to prompt your users to update (in days)?',
      default: 7
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    var context = {
      argParser     : this.props.argParser,
      name          : this.props.name,
      repo          : this.props.repo,
      updater       : this.props.updater,
      updateInterval: this.props.updateInterval
    };

    this.template('_package.json', 'package.json', context);
    this.template('index.js', 'index.js', context);
    this.template('cli.js', 'cli.js', context);
    this.template('_eslintrc', '.eslintrc', context);
    this.template('_eslintignore', '.eslintignore', context);
    this.template('_gitignore', '.gitignore', context);
    this.template('_README.md', 'README.md', context);

    this.template('lib/config.js', 'lib/config.js', context);
    this.template('lib/logger.js', 'lib/logger.js', context);
    this.template('lib/persister.js', 'lib/persister.js', context);
    this.template('lib/sub.js', 'lib/sub.js', context);

    this.template('sub/help.js', 'sub/help.js', context);
    this.template('sub/commands.js', 'sub/commands.js', context);
    this.template('sub/example.js', 'sub/example.js', context);
    this.template('sub/init.js', 'sub/init.js', context);
    this.template('sub/version.js', 'sub/version.js', context);
    if (this.props.updater === 'git') {
      this.template('sub/git-update.js', 'sub/update.js', context);
    } else {
      this.template('sub/npm-update.js', 'sub/update.js', context);
    }

    this.template('tests/lib/config.spec.js', 'tests/lib/config.spec.js', context);
    this.template('tests/lib/persister.spec.js', 'tests/lib/persister.spec.js', context);
    this.template('tests/lib/sub.spec.js', 'tests/lib/sub.spec.js', context);

    this.template('tests/sub/commands.spec.js', 'tests/sub/commands.spec.js', context);
    this.template('tests/sub/example.spec.js', 'tests/sub/example.spec.js', context);
    this.template('tests/sub/version.spec.js', 'tests/sub/version.spec.js', context);

    this.template('tests/fixtures/mockPersister.js', 'tests/fixtures/mockPersister.js', context);
    this.template('tests/fixtures/spyLogger.js', 'tests/fixtures/spyLogger.js', context);
  },

  install: function () {
    this.installDependencies();
  }
});
