'use strict';
const path = require('path');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
	prompting() {
		this.log(yosay(`Welcome to the primo ${chalk.red('sub')} generator!`));

		const prompts = [{
			type   : 'input',
			name   : 'name',
			message: 'What would you like to call your cli app?',
			default: this.appname.replace(/\s/g, '-') // Default to current folder name
		}, {
			type   : 'list',
			name   : 'argParser',
			message: 'Which argument parser would you like to use?',
			choices: ['minimist', 'yargs'],
			default: 'minimist'
		}, {
			type   : 'input',
			name   : 'repo',
			message: 'What git repo will you be storing this in?',
			default: `https://github.com/doug-wade/${this.appname.replace(/\s/g, '-')}`
		}, {
			type   : 'list',
			name   : 'updater',
			message: 'How would you like users to update their app?',
			choices: ['npm', 'git'],
			default: 'npm'
		}, {
			type   : 'input',
			name   : 'updateInterval',
			message: 'At what interval would you like to prompt your users to update (in days)?',
			default: 7
		}];

		const that = this;
		return this.prompt(prompts).then(props => {
			that.props = props;
			that.props.sterileName = props.name.replace(/-/g, '');
			that.props.executable = props.name.replace('-cli', '');
		});
	}

	writing() {
		const that = this;
		const context = {
			argParser     : that.props.argParser,
			executable    : that.props.executable,
			name          : that.props.name,
			sterileName   : that.props.sterileName,
			repo          : that.props.repo,
			updater       : that.props.updater,
			updateInterval: that.props.updateInterval
		};

		const files = [
			['_package.json', 'package.json'],
			['index.js', 'index.js'],
			['cli.js', 'cli.js'],
			['_eslintrc', '.eslintrc'],
			['_eslintignore', '.eslintignore'],
			['_gitignore', '.gitignore'],
			['_README.md', 'README.md'],

			['completions/bash', path.join('completions', `${this.props.name}.bash`)],
			['completions/zsh', path.join('completions', `${this.props.name}.zsh`)],

			['lib/config.js', 'lib/config.js'],
			['lib/logger.js', 'lib/logger.js'],
			['lib/persister.js', 'lib/persister.js'],
			['lib/sub.js', 'lib/sub.js'],

			['sub/help.js', 'sub/help.js'],
			['sub/commands.js', 'sub/commands.js'],
			['sub/completions.js', 'sub/completions.js'],
			['sub/example.js', 'sub/example.js'],
			['sub/init.js', 'sub/init.js'],
			['sub/version.js', 'sub/version.js'],

			['tests/lib/config.spec.js', 'tests/lib/config.spec.js'],
			['tests/lib/persister.spec.js', 'tests/lib/persister.spec.js'],
			['tests/lib/sub.spec.js', 'tests/lib/sub.spec.js'],

			['tests/sub/commands.spec.js', 'tests/sub/commands.spec.js'],
			['tests/sub/example.spec.js', 'tests/sub/example.spec.js'],
			['tests/sub/version.spec.js', 'tests/sub/version.spec.js'],

			['tests/fixtures/mockPersister.js', 'tests/fixtures/mockPersister.js'],
			['tests/fixtures/spyLogger.js', 'tests/fixtures/spyLogger.js']
		];
		if (this.props.updater === 'git') {
			files.push(['sub/git-update.js', 'sub/update.js']);
		} else {
			files.push(['sub/npm-update.js', 'sub/update.js']);
		}
		files.forEach(pair => {
			this.fs.copyTpl(
				this.templatePath(pair[0]),
				this.destinationPath(pair[1]),
				context
			);
		});
	}

	install() {
		this.installDependencies();
	}
};
