# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> no serious or critical axe violations on /legal/privacy
- Location: tests/e2e/a11y.spec.ts:8:3

# Error details

```
Error: Channel closed
```

```
Error: page.goto: net::ERR_ABORTED at http://localhost:4300/legal/privacy
Call log:
  - navigating to "http://localhost:4300/legal/privacy", waiting until "load"

```

```
Error: browserContext._wrapApiCall: Target page, context or browser has been closed
```