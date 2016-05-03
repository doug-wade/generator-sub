import test from 'ava';
import p from '../../lib/persister';
import spyLogger from '../fixtures/spyLogger';

const persister = p({logger: spyLogger});

test('Reads and writes lastUpgraded date', async t => {
  const expectedDate = new Date();
  const by = "unit tests";
  await persister.writeLastUpgraded({ date: expectedDate, by });
  const actual = await persister.readLastUpgraded();

  t.is(Date.parse(actual.date), expectedDate.getTime());
  t.is(actual.by, by);
});

test('Reads and writes config', async t => {
  const expectedConfig = { name: "User", "repo": "https://github.com/doug-wade/example-sub"};
  await persister.writeConfig(expectedConfig);
  const actual = await persister.readConfig();

  t.is(actual.name, expectedConfig.name);
  t.is(actual.repo, expectedConfig.repo);
});
