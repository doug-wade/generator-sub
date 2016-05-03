'use strict';

const ONE_DAY = 1000 * 60 * 60 * 24;

module.exports = function ({ argv, config, logger, persister, sub }) {
  return new Promise((resolve, reject) => {
    const opts = { argv, config, logger, persister, sub };

    // Run help without updating in case something bad has happened
    logger.silly(`command: ${argv._[0]}`);
    sub.normalize(argv._[0]).then((command) => {
      if (argv.h || argv.help || command === 'help') {
        logger.debug('running help');
        sub.run('help', opts).then(resolve, reject);
      } else if (argv.v || argv.version || command === 'version') {
        logger.debug('running version');
        sub.run('version', opts).then(resolve, reject);
      } else if (!command || command === 'commands') {
        logger.debug('no command provided');
        sub.run('commands', opts).then(resolve, reject);
      } else {
        // Auto-upgrade daily
        persister.readLastUpgraded().then((lastUpgraded) => {
          if (!lastUpgraded.timestamp) {
            logger.debug('no last upgrade date; assuming this is freshly installed');
            persister.writeLastUpgraded({ timestamp: Date.now(), by: 'auto' }).then(() => {
              runCommand({ command, opts, sub }).then(resolve, reject);
            });
          } else if (!argv.noUpdate && command !== 'upgrade' && Date.now() - lastUpgraded.timestamp > ONE_DAY * 7) {
            logger.info('auto-upgrading');
            opts.by = 'auto';
            sub.run('upgrade', opts).then(() => {
              runCommand({ command, opts, sub }).then(resolve, reject);
            });
          } else {
            runCommand({ command, opts, sub }).then(resolve, reject);
          }
        });
      }
    });
  });
};

function runCommand({ command, opts, sub }) {
  return new Promise((resolve, reject) => {
    // Don't check config if they're updating config
    if (command === 'init') {
      sub.run('init', opts).then(resolve, reject);
    } else if (!opts.config.isValid()) {
      // Check config before running command so all commands are guaranteed to have valid config
      logger.error('There is a problem with your config; running example init to set up config');
      return sub.run('init', opts).then(() => {
        sub.run(command, opts).then(resolve, reject);
      });
    } else {
      return sub.run(command, opts).then(resolve, reject);
    }
  });
}
