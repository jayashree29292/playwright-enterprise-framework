# playwright-enterprise-framework

![CI](https://github.com/jayashree29292/playwright-enterprise-framework/actions/workflows/playwright.yml/badge.svg)

I built this to get hands-on with Playwright. I've been working with Cypress for the past few years and wanted to build something from scratch in Playwright + TypeScript to understand the framework deeply.

The app under test is the [Restful Booker Platform](https://automationintesting.online) — a hotel booking app built specifically for automation practice. It has a real UI and a REST API which made it a good fit for what I wanted to build.

---

## What I built

Started with the foundation — project structure, config, and a Page Object for the admin login page. The idea was to keep locators out of test files completely. Tests should read like plain English, not CSS selectors.

From there I added a custom logger so every step prints structured output to the console. Sounds small but it makes a real difference when you're debugging a failure at 3am and don't know which layer broke.

CI/CD is wired up via GitHub Actions — every push triggers a run, HTML report gets uploaded as an artifact, and if something fails the trace files come along too.

---

## Stack

- Playwright + TypeScript
- GitHub Actions
- Node.js

---

## Structure

```
playwright-enterprise-framework/
├── .github/workflows/playwright.yml   # CI/CD
├── pages/
│   └── LoginPage.ts                   # POM — admin login
├── tests/
│   └── ui/
│       └── login.spec.ts              # login scenarios
├── utils/
│   └── logger.ts                      # structured logging
└── playwright.config.ts
```

---

## Running it locally

```bash
git clone https://github.com/jayashree29292/playwright-enterprise-framework.git
cd playwright-enterprise-framework
npm install
npx playwright install
```

Run all tests:
```bash
npx playwright test
```

Watch it in the browser:
```bash
npx playwright test --headed
```

Open the report:
```bash
npx playwright show-report
```

---

## What's working right now

- Admin login — valid credentials, invalid credentials, empty fields
- Page Object Model with zero locators in test files
- Custom logger with structured step-by-step console output
- Screenshots and video captured on failure
- Trace files recorded on retry for debugging
- GitHub Actions pipeline running on every push
- 

---

## What's coming next

I'm actively building this out — API tests against the Restful Booker API are next, followed by an integration test that creates a booking via API and validates it in the UI. After that — fixtures, mobile viewport and multi-browser.
