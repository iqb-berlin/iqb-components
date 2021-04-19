const config = require('./karma.conf');

config.customLaunchers = {
  ChromeHeadlessNoSandbox: {
    base: 'ChromeHeadless',
    flags: ['--no-sandbox']
  }
};

config.browsers = ['ChromeHeadlessNoSandbox'];

exports.config = config;
