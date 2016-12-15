import fs from 'fs';
import spyLogger from '../fixtures/spyLogger';
import mockPersister from '../fixtures/mockPersister';
import test from 'ava';
import sinon from 'sinon';
import sub from '../../lib/sub'; // this is less than ideal.
import <%= sterileName %> from '../..';
import path from 'path';

let version;

test.before(() => {
  version = JSON.parse(fs.readFileSync('../../package.json')).version;
});

test('Lists example package version with version command', async t => {
  const argv = { '_': ['version'] };
  const logger = spyLogger();

  await <%= sterileName %>({ argv, config: {}, logger, sub: sub({ logger }), persister: mockPersister });

  t.true(logger.info.calledOnce);
  t.true(logger.info.calledWith(version));
});

test('Lists example package version with -v', async t => {
  const argv = { 'v': true, '_': [] };
  const logger = spyLogger();

  await <%= sterileName %>({ argv, config: {}, logger, sub: sub({ logger }), persister: mockPersister });

  t.true(logger.info.calledOnce);
  t.true(logger.info.calledWith(version));
});

test('Lists example package version with --version', async t => {
  const argv = { 'version': true, '_': [] };
  const logger = spyLogger();

  await <%= sterileName %>({ argv, config: {}, logger, sub: sub({ logger }), persister: mockPersister });

  t.true(logger.info.calledOnce);
  t.true(logger.info.calledWith(version));
});
