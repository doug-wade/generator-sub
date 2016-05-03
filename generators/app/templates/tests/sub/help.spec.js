import fs from 'fs';
import spyLogger from '../fixtures/spyLogger';
import mockPersister from '../fixtures/mockPersister';
import test from 'ava';
import sub from '../../lib/sub'; // this is less than ideal.
import example from '../..';
import path from 'path';


test('Gets help with help command', async t => {
	const argv = { '_': ['help'] };
  const logger = spyLogger();
  const subs = await sub({ logger }).get();
  const callCount = subs.size + 2;

  await example({ argv, config: {}, logger, sub: sub({ logger }), persister: mockPersister });

  t.is(callCount, logger.info.callCount);
  t.true(logger.info.calledWith('A simple cli application. Broken into sub commands, invoked under sub: '));
  t.true(logger.info.calledWith('Also takes the flag --noUpdate to prevent auto updating.'));
});

test('Gets help with -h', async t => {
	const argv = { 'h': true, '_': [] };
  const logger = spyLogger();
  const subs = await sub({ logger }).get();
  const callCount = subs.size + 2;

  await example({ argv, config: {}, logger, sub: sub({ logger }), persister: mockPersister });

  t.is(callCount, logger.info.callCount);
  t.true(logger.info.calledWith('A simple cli application. Broken into sub commands, invoked under sub: '));
  t.true(logger.info.calledWith('Also takes the flag --noUpdate to prevent auto updating.'));
});

test('Gets help with h', async t => {
	const argv = { '_': ['h'] };
  const logger = spyLogger();
  const subs = await sub({ logger }).get();
  const callCount = subs.size + 2;

  await example({ argv, config: {}, logger, sub: sub({ logger }), persister: mockPersister });

  t.is(callCount, logger.info.callCount);
  t.true(logger.info.calledWith('A simple cli application. Broken into sub commands, invoked under sub: '));
  t.true(logger.info.calledWith('Also takes the flag --noUpdate to prevent auto updating.'));
});

test('Gets help for commands', async t => {
	const argv = { '_': ['help', 'example'] };
  const logger = spyLogger();

  await example({ argv, config: {}, logger, sub: sub({ logger }), persister: mockPersister });

  t.true(logger.info.calledWith(' An example command.'));
  t.true(logger.info.calledWith(' Usage:'));
  t.true(logger.info.calledWith('     <%= name %>'));
  t.true(logger.info.calledWith("     > 'You ran the example command!'"));
});

test('Logs an error for non-existent commands', async t => {
	const argv = { '_': ['help', 'sandwich'] };
  const logger = spyLogger();

  await example({ argv, config: {}, logger, sub: sub({ logger }), persister: mockPersister });

  t.true(logger.error.calledWith('Could not find command sandwich'));
});
