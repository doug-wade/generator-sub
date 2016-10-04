import fs from 'fs';
import spyLogger from '../fixtures/spyLogger';
import mockPersister from '../fixtures/mockPersister';
import test from 'ava';
import sinon from 'sinon';
import sub from '../../lib/sub';
import <%= sterileName %> from '../..';

test('Run example command correctly', async t => {
  const argv = { '_': ['example'] };
  const logger = spyLogger();

  await <%= sterileName %>({ argv, config: { name: 'Doug Wade', isValid: () => true }, logger, sub: sub({ logger }), persister: mockPersister });

  t.true(logger.info.calledOnce);
  t.true(logger.info.calledWith('Doug Wade, you ran the example command!'));
});

test('Run example command using its alias', async t => {
  const argv = { '_': ['e'] };
  const logger = spyLogger();

  await <%= sterileName %>({ argv, config: { name: 'Doug Wade', isValid: () => true }, logger, sub: sub({ logger }), persister: mockPersister });

  t.true(logger.info.calledOnce);
  t.true(logger.info.calledWith('Doug Wade, you ran the example command!'));
});
