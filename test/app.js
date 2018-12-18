import cp from 'child_process';
import fs from 'fs';
import path from 'path';
import test from 'ava';
import helpers from 'yeoman-test';

const files = [
	'lib/config.js',
	'lib/persister.js',
	'lib/logger.js',
	'lib/sub.js',

	'sub/commands.js',
	'sub/completions.js',
	'sub/example.js',
	'sub/help.js',
	'sub/init.js',
	'sub/version.js',
	'sub/update.js',

	'tests/lib/config.spec.js',
	'tests/lib/persister.spec.js',
	'tests/lib/sub.spec.js',

	'tests/sub/commands.spec.js',
	'tests/sub/example.spec.js',
	'tests/sub/version.spec.js',

	'tests/fixtures/mockPersister.js',
	'tests/fixtures/spyLogger.js',

	'.eslintignore',
	'.eslintrc',
	'.gitignore',
	'README.md',
	'package.json',
	'index.js',
	'cli.js'
];

const testCases = [{
	updateInterval: 7,
	updater       : 'git',
	repo          : 'http://github.com/doug-wade/example-sub',
	argParser     : 'minimist',
	name          : 'minimist-and-git'
}, {
	updateInterval: 7,
	updater       : 'npm',
	repo          : 'http://github.com/doug-wade/example-sub',
	argParser     : 'yargs',
	name          : 'yargs-and-npm'
}];

testCases.forEach(testCase => {
	test(`generator-sub:app ${testCase.name} creates files`, async t => {
		let testDir;
		await helpers.run(path.join(__dirname, '../generators/app'))
			.inTmpDir(dir => {
				testDir = dir;
			})
			.withPrompts(testCase)
			.toPromise();

		t.plan(files.length);
		files.forEach(file => {
			t.true(exists(file, testDir));
		});
	});

	// These don't terminate on ci and take forever locally, so only run them when
	// publishing
	if (!process.env.CONTINUOUS_INTEGRATION) {
		test(`generator-sub:app ${testCase.name} passes the test target`, async t => {
			let testDir;
			await helpers.run(path.join(__dirname, '../generators/app'))
				.inTmpDir(dir => {
					testDir = dir;
				})
				.withPrompts({name: 'foo', dockerCfg: false})
				.toPromise();

			await installDeps(testDir);
			t.true(await runsSuccessfully('npm test', testDir));
		});
	}
});

function exists(filename, dir) {
	filename = path.join(dir, filename);
	try {
		fs.accessSync(filename, fs.F_OK);
		return true;
	} catch (error) {
		return false;
	}
}

function runsSuccessfully(command, dir) {
	return new Promise((resolve, reject) => {
		cp.exec(command, {
			cwd: dir
		}, error => {
			if (error) {
				reject(error);
			} else {
				resolve(true);
			}
		});
	});
}

function installDeps(dir) {
	return new Promise((resolve, reject) => {
		cp.exec('npm install', {
			cwd: dir
		}, error => {
			if (error) {
				reject(error);
			} else {
				resolve();
			}
		});
	});
}
