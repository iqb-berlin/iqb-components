// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'chrome'
  },
  directConnect: true,
  // this is used, when protracor is started directly (like form IDE). it does expect the app running
  // on default path (4207 as ste in angulart.json)
  // when using ng e2e, the app runs on 4208 and is found there.
  baseUrl: 'http://localhost:4207/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 90000,
    print() {}
  },
  SELENIUM_PROMISE_MANAGER: false, // we use native asyc/await instead https://github.com/angular/protractor/blob/master/docs/async-await.md
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: 'pretty' } }));
  }
};
