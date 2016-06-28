import path from 'path';
import fs from 'fs';
import helpers from 'yeoman-test';
import test from 'ava';

test(`generator-react-server:command creates file`, async t => {
	let testDir;
	await helpers.run(path.join(__dirname, '../generators/app'))
		.inTmpDir(dir => {
			testDir = dir;
		})
		.withPrompts({name: 'command', isInternal: false})
		.toPromise();

	t.true(await exists('sub/command', testDir));
});

function exists(filename, dir) {
	filename = path.join(dir, filename);
	return new Promise((resolve, reject) => {
		fs.access(filename, fs.F_OK, err => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}
