import jasmineReporters from "jasmine-reporters";

// Configure JUnit XML reporter for Trunk Flaky Tests
var junitReporter = new jasmineReporters.JUnitXmlReporter({
  savePath: "test-reports",
  consolidateAll: false,
});
jasmine.getEnv().addReporter(junitReporter);

export default {
  spec_dir: "spec",
  spec_files: [
    "**/*[sS]pec.?(m)js"
  ],
  helpers: [
    "helpers/**/*.?(m)js"
  ],
  env: {
    stopSpecOnExpectationFailure: false,
    random: true,
    forbidDuplicateNames: true
  }
}
