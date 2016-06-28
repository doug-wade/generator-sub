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

		this.prompt(prompts, function (props) { // eslint-disable-line prefer-arrow-callback
			this.props = props;
		}.bind(this));
	},

	writing: () => {
		const context = {
			name      : this.props.name,
			isInternal: this.props.isInternal
		};

		this.template('command.js', path.join('sub', `${this.props.name}.js`), context);
	}
});
