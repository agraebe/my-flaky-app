# Trunk Flaky Tests Integration

This document describes how to integrate this project with Trunk Flaky Tests for automated flaky test detection.

## Setup Complete ✅

The project has been configured to generate Trunk-compatible XML test reports using the `jasmine-reporters` package.

## Configuration Details

### 1. Dependencies Installed
- `jasmine-reporters` - Generates JUnit XML format reports
- `@types/jasmine` - TypeScript support

### 2. Jasmine Configuration
The JUnit XML reporter is configured in `/spec/support/jasmine.mjs`:

```javascript
import jasmineReporters from "jasmine-reporters";

// Configure JUnit XML reporter for Trunk Flaky Tests
var junitReporter = new jasmineReporters.JUnitXmlReporter({
  savePath: "test-reports",
  consolidateAll: false,
});
jasmine.getEnv().addReporter(junitReporter);
```

### 3. Report Generation
- **Location**: `test-reports/` directory
- **Format**: JUnit XML
- **Pattern**: `test-reports/*.xml`
- **Files**: One XML file per test suite
  - `junitresults-Arrayutilities.xml`
  - `junitresults-Mathutilities.xml`
  - `junitresults-Stringutilities.xml`

## Running Tests with Reports

### Command Line
```bash
# Run tests and generate XML reports
npm test

# Run with detailed report summary
npm run test:reports
```

### GitHub Actions
All workflows automatically generate and upload XML reports:
- **PR Checks**: Uploads `jasmine-xml-reports` artifact + Trunk upload
- **Test Suite**: Uploads `test-results-node-{version}` artifacts + Trunk upload
- **CI Pipeline**: Uploads `jasmine-xml-reports-node-{version}` artifacts + Trunk upload

### Trunk Upload Configuration
All workflows include automatic upload to Trunk using the `trunk-io/analytics-uploader` action:

```yaml
- name: Upload results to Trunk
  # Run this step even if the test step ahead fails
  if: "!cancelled()"
  uses: trunk-io/analytics-uploader@main
  with:
    junit-paths: "test-reports/*.xml"
    # Provide your Trunk organization slug.
    org-slug: alex-test
    # Provide your Trunk API token as a GitHub secret.
    token: ${{ secrets.TRUNK_API_TOKEN }}
  continue-on-error: true
```

## Trunk Integration

### Report File Path
Use this glob pattern in Trunk configuration:
```
test-reports/*.xml
```

### Sample XML Structure
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<testsuites disabled="0" errors="0" failures="0" tests="7" time="0.004">
 <testsuite name="Math utilities" timestamp="2025-09-30T14:55:17" hostname="localhost" time="0.002" errors="0" tests="0" skipped="0" disabled="0" failures="0">
 </testsuite>
 <testsuite name="Math utilities.Basic arithmetic" timestamp="2025-09-30T14:55:17" hostname="localhost" time="0.001" errors="0" tests="4" skipped="0" disabled="0" failures="0">
  <testcase classname="Math utilities.Basic arithmetic" name="should subtract two numbers correctly" time="0" />
  <testcase classname="Math utilities.Basic arithmetic" name="should add two numbers correctly" time="0.001" />
  <testcase classname="Math utilities.Basic arithmetic" name="should divide two numbers correctly" time="0" />
  <testcase classname="Math utilities.Basic arithmetic" name="should multiply two numbers correctly" time="0" />
 </testsuite>
</testsuites>
```

## Test Suites

### Current Test Coverage
- **Math utilities**: 7 tests (basic arithmetic, advanced operations)
- **String utilities**: 7 tests (manipulation, validation)
- **Array utilities**: 8 tests (manipulation, transformation, validation)

**Total**: 22 test specs across 3 suites

## Important Notes

### Retries Disabled
- Automatic retries are **disabled** for accurate flaky test detection
- Use Trunk's Quarantining feature instead of retry mechanisms
- This ensures reliable flaky test identification

### Report Cleanup
- XML reports are in `.gitignore` (not committed to repository)
- Reports are generated fresh on each test run
- GitHub Actions uploads reports as artifacts for 7 days

### File Naming
- Reports use suite names with spaces removed
- Example: "Math utilities" → `junitresults-Mathutilities.xml`
- Each suite generates a separate XML file

## Troubleshooting

### No XML Reports Generated
1. Check that `jasmine-reporters` is installed: `npm list jasmine-reporters`
2. Verify Jasmine configuration in `/spec/support/jasmine.mjs`
3. Ensure `test-reports/` directory exists and is writable

### Empty XML Files
1. Verify tests are actually running: `npm test`
2. Check for JavaScript errors in test files
3. Ensure test specs are properly structured

### GitHub Actions Issues
1. Check workflow logs for XML upload steps
2. Verify artifact names match expected patterns
3. Ensure `test-reports/` directory is included in upload paths

## GitHub Secrets Configuration

Before the workflows can upload to Trunk, you need to configure the GitHub secret:

1. **Get Trunk API Token**: 
   - Go to your Trunk dashboard
   - Navigate to Settings → API Tokens
   - Generate a new token for CI/CD

2. **Add GitHub Secret**:
   - Go to your GitHub repository
   - Navigate to Settings → Secrets and variables → Actions
   - Add a new repository secret named `TRUNK_API_TOKEN`
   - Paste your Trunk API token as the value

3. **Update Organization Slug** (if needed):
   - The workflows use `org-slug: alex-test`
   - Update this in all workflow files if your organization slug is different

## Next Steps

1. **Configure GitHub Secret**: Add `TRUNK_API_TOKEN` to your repository secrets
2. **Verify Organization Slug**: Update `org-slug` in workflows if needed
3. **Run Baseline**: Execute tests multiple times to establish baseline metrics
4. **Monitor Results**: Review Trunk dashboard for flaky test detection
5. **Quarantine Flaky Tests**: Use Trunk's quarantining feature for identified flaky tests

## Support

For issues with:
- **Jasmine configuration**: Check [Jasmine documentation](https://jasmine.github.io/)
- **jasmine-reporters**: Check [jasmine-reporters GitHub](https://github.com/larrymyers/jasmine-reporters)
- **Trunk integration**: Check [Trunk Flaky Tests documentation](https://docs.trunk.io/flaky-tests)
