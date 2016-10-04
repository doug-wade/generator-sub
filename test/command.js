import path from 'path';
import fs from 'fs';
import helpers from 'yeoman-test';
import test from 'ava';

test(`generator-sub:command creates file`, async t => {
	let testDir;
	await helpers.run(path.join(__dirname, '../generators/app'))
		.inTmpDir(dir => {
			testDir = dir;
		})
		.withPrompts({name: 'command', isInternal: false})
		.toPromise();

	t.true(exists('sub/commands.js', testDir));
});

function exists(filename, dir) {
	filename = path.join(dir, filename);
	try {
		fs.accessSync(filename, fs.F_OK);
		return true;
	} catch (err) {
		return false;
	}
}
