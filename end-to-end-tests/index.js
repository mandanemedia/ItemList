let reporter = require('cucumber-html-reporter');
//themes: 'bootstrap', 'hierarchy', 'foundation', 'simple'
let options = {
  theme: 'bootstrap',
  jsonFile: 'report/cucumber_report.json',
  output: 'report/cucumber_report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  columnLayout: 1,
  launchReport: true,
  metadata: {
    "service version":"1.1.0",
    "Test Environment": "LocalHost"
  }
};

reporter.generate(options);
