const baseConfig = require('./karma.conf');

module.exports = function (param) {
  baseConfig(param).set({
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    browsers: ['ChromeHeadlessNoSandbox']
  });
};
