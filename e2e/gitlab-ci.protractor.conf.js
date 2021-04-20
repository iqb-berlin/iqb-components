const { config } = require('./protractor.conf');

config.capabilities = {
  browserName: 'chrome',
  baseUrl: 'http://localhost:4208/',
  chromeOptions: {
    args: [
      '--headless',
      '--user-data-dir=~/.config/google-chrome',
      '--profile-directory=Default',
      '--no-sandbox'
    ]
  }
};

exports.config = config;
