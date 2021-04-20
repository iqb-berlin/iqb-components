const baseConfig = require('./karma.conf');

module.exports = function (config) {
  baseConfig(config);
  config.set({
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    browsers: ['ChromeHeadlessNoSandbox']
  });
};
