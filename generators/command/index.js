'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the kryptonian ' + chalk.red('generator-sub') + ' generator!'
    ));

    var prompts = [
      {
        type   : 'input',
        name   : 'name',
        message: 'What would you like to call your sub command?'
      },
      {
        type   :'confirm',
        name   :'isInternal',
        message:'Should this be an internal command? (Only shown with --long)'
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    var context = {
      name: this.props.name,
      isInternal: this.props.isInternal
    };

    this.template('command.js', path.join('sub', this.props.name + '.js'), context);
  },

  install: function () {
    this.installDependencies();
  }
});
