'use strict';
const path = require('path');
const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = yeoman.Base.extend({
	prompting: function () {
		this.log(yosay(`Welcome to the primo ${chalk.red('sub')} generator!`));

		const prompts = [{
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

		const that = this;
		return this.prompt(prompts).then(props => {
			that.props = props;
		});
	},

	writing: function () {
		const that = this;
		const context = {
			argParser     : that.props.argParser,
			name          : that.props.name,
			repo          : that.props.repo,
			updater       : that.props.updater,
			updateInterval: that.props.updateInterval
		};

		this.template('_package.json', 'package.json', context);
		this.template('index.js', 'index.js', context);
		this.template('cli.js', 'cli.js', context);
		this.template('_eslintrc', '.eslintrc', context);
		this.template('_eslintignore', '.eslintignore', context);
		this.template('_gitignore', '.gitignore', context);
		this.template('_README.md', 'README.md', context);

		this.template('completions/bash', path.join('completions', `${this.props.name}.bash`), context);
		this.template('completions/zsh', path.join('completions', `${this.props.name}.zsh`), context);

		this.template('lib/config.js', 'lib/config.js', context);
		this.template('lib/logger.js', 'lib/logger.js', context);
		this.template('lib/persister.js', 'lib/persister.js', context);
		this.template('lib/sub.js', 'lib/sub.js', context);

		this.template('sub/help.js', 'sub/help.js', context);
		this.template('sub/commands.js', 'sub/commands.js', context);
		this.template('sub/completions.js', 'sub/completions.js', context);
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
