# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automated testing and CI/CD.

## Workflows

### 🔍 PR Checks (`pr-checks.yml`)
- **Triggers:** Pull requests to `main` or `develop` branches
- **Purpose:** Validates PRs before merging
- **Actions:**
  - Runs linter (`npm run lint`)
  - Executes all Jasmine tests (`npm test`)
  - Uploads XML test reports to Trunk
  - Posts test results as PR comments
  - Uses Node.js 20.x

### 🧪 Test Suite (`test.yml`)
- **Triggers:** Pull requests and pushes to `main`/`develop`
- **Purpose:** Comprehensive testing across multiple Node.js versions
- **Actions:**
  - Tests on Node.js 18.x and 20.x
  - Runs linter and tests
  - Uploads XML test reports to Trunk
  - Builds the project
  - Uploads test and build artifacts

### 🚀 Continuous Integration (`ci.yml`)
- **Triggers:** Pushes to `main`/`develop` and daily at 2 AM UTC
- **Purpose:** Regular validation and monitoring
- **Actions:**
  - Tests on Node.js 18.x and 20.x
  - Runs linter, tests, and build
  - Uploads XML test reports to Trunk
  - Validates build output

## Test Coverage

The workflows run the following test suites:
- **Math utilities** - Basic and advanced arithmetic operations
- **String utilities** - String manipulation and validation
- **Array utilities** - Array operations and transformations

## Requirements

- Node.js 18.x or 20.x
- npm dependencies installed via `npm ci`
- All tests must pass for PRs to be mergeable

## Trunk Integration

All workflows automatically upload test results to Trunk for flaky test detection:

### Required Configuration
1. **GitHub Secret**: Add `TRUNK_API_TOKEN` to repository secrets
2. **Organization Slug**: Currently set to `alex-test` (update if needed)
3. **API Token**: Generate from Trunk dashboard → Settings → API Tokens

### Upload Behavior
- **Runs on failure**: Uploads results even if tests fail (`if: "!cancelled()"`)
- **Continue on error**: Won't fail the workflow if Trunk upload fails
- **XML Reports**: Uses `test-reports/*.xml` pattern for JUnit format

## Status Badges

Add these to your README.md:

```markdown
![Tests](https://github.com/your-username/my-flaky-app/workflows/Test%20Suite/badge.svg)
![PR Checks](https://github.com/your-username/my-flaky-app/workflows/PR%20Checks/badge.svg)
![CI](https://github.com/your-username/my-flaky-app/workflows/Continuous%20Integration/badge.svg)
```
