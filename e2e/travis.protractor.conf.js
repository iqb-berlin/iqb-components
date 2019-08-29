// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts',
  ],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [ "--headless" ]
    },
  },
  directConnect: true,
  baseUrl: 'http://localhost:4207/', //with ng serve app run on port 4208, which is set up in angular.json. keep 4200 for use directly with protractor, like from IDE
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 90000,
    print: function() {}
  },
  SELENIUM_PROMISE_MANAGER: false, // we use native asyc/await instead https://github.com/angular/protractor/blob/master/docs/async-await.md
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
