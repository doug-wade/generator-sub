'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the kryptonian ' + chalk.red('generator-sub') + ' generator!'
    ));

    var prompts = [{
      type    : 'input',
      name    : 'name',
      message : 'What would you like to call your sub command?'
    },];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    var context = {
      name: this.props.name
    };

    this.template('command.js', 'lib/' + this.props.name + '.js', context);
  },

  install: function () {
    this.installDependencies();
  }
});
