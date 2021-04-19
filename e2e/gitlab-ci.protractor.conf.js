const { config } = require('./protractor.conf');

config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: [
      '--headless',
      '--user-data-dir=~/.config/google-chrome',
      '--profile-directory=Default'
    ]
  }
};

exports.config = config;
