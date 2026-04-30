# Playwright Learning Project

This project has been upgraded to look more like a QA automation portfolio project rather than a basic learning repo.

## What it covers
- UI testing with Playwright Test
- Page Object Model for Saucedemo flows
- Data-driven testing from Excel files edit
- API checks against JSONPlaceholder
- CI-ready setup using GitHub Actions
- HTML reporting, traces, screenshots and videos on failure

## Project structure
```text
pages/                  Page objects
utils/                  Shared helpers
tests/login/            Login scenarios
tests/checkout/         Checkout scenarios
tests/forms/            Form validation scenarios
tests/api/              API checks
test-data/              Excel files used as test data
.github/workflows/      GitHub Actions workflow
```

## Install
```bash
npm install
npx playwright install
```

## Run tests
```bash
npm test
npm run test:headed
npm run test:smoke
npm run test:api
npm run report
```

## CI
The workflow in `.github/workflows/playwright.yml` runs the Playwright suite on pushes and pull requests.

## Notes
- `node_modules` should not be committed to Git.
- Use Command Prompt or `npx.cmd playwright test` on a locked-down Windows work laptop if PowerShell blocks `npx.ps1`.
