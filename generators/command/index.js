'use strict';
const path = require('path');
const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
	prompting() {
		this.log(yosay(`Welcome to the kryptonian ${chalk.red('generator-sub')} generator!`));

		const prompts = [{
			type   : 'input',
			name   : 'name',
			message: 'What would you like to call your sub command?'
		}, {
			type   : 'confirm',
			name   : 'isInternal',
			message: 'Should this be an internal command? (Only shown with --long)'
		}];

		const that = this;
		return this.prompt(prompts).then(props => {
			that.props = props;
		});
	},

	writing() {
		const that = this;
		const context = {
			isInternal: that.props.isInternal,
			name      : that.props.name
		};

		this.template('command.js', path.join('sub', `${that.props.name}.js`), context);
	}
});
