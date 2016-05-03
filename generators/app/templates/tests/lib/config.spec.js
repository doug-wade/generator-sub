import test from 'ava';
import c from '../../lib/config';
import mockPersister from '../fixtures/mockPersister';
import spyLogger from '../fixtures/spyLogger';

test('Detects valid config', t => {
  const logger = spyLogger();
  const config = c({logger, persister: mockPersister, argv: {} });
  config.getConfig().then((underTest) => {
    t.true(underTest.isValid());
  });
});

test('Detects invalid config', t => {
  const logger = spyLogger();
  const invalidConfigPersister = {
    readConfig: function () {
      return new Promise((resolve, reject) => {
        resolve({ foo: 'bar' });
      });
    }
  };
  const config = c({logger, persister: invalidConfigPersister, argv: {} });
  config.getConfig().then((underTest) => {
    t.true(!underTest.isValid());
  });
});
