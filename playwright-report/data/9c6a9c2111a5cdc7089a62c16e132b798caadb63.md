# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: epam-client-work.spec.ts >> EPAM site - Client Work navigation >> explore client work -> Client Work is visible
- Location: tests\epam-client-work.spec.ts:10:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "https://www.epam.com/", waiting until "networkidle"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e2]:
    - generic [ref=e3]:
      - heading "www.epam.com" [level=1] [ref=e5]
      - heading "Verifying you are human. This may take a few seconds." [level=2] [ref=e6]
      - paragraph [ref=e7]: This website uses a security service to protect against malicious bots. This page is displayed while the website verifies you are not a bot.
  - contentinfo [ref=e14]:
    - generic [ref=e16]:
      - generic [ref=e18]:
        - text: "Ray ID:"
        - code [ref=e19]: 9e5dbca3fb9ad84f
      - generic [ref=e20]:
        - generic [ref=e21]:
          - text: Performance and Security by
          - link "Cloudflare" [ref=e22] [cursor=pointer]:
            - /url: https://www.cloudflare.com?utm_source=challenge&utm_campaign=m
        - link "Privacy" [ref=e24] [cursor=pointer]:
          - /url: https://www.cloudflare.com/privacypolicy/
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import path from 'path';
  3  | import { makeArtifactsDir } from '../test-helpers/playwright-utils';
  4  | 
  5  | // EPAM client work test
  6  | test.describe('EPAM site - Client Work navigation', () => {
  7  |   const runId = Date.now().toString();
  8  |   const artifactsDir = makeArtifactsDir(runId);
  9  | 
  10 |   test('explore client work -> Client Work is visible', async ({ page }, testInfo) => {
  11 |     // Navigate to EPAM
> 12 |     await page.goto('https://www.epam.com/', { waitUntil: 'networkidle' });
     |                ^ Error: page.goto: Test timeout of 30000ms exceeded.
  13 | 
  14 |     // Click Services in the header menu (try different casing/variants)
  15 |     const services = page.locator('role=link[name="Services"]');
  16 |     if (await services.count() > 0) {
  17 |       await services.first().click();
  18 |     } else {
  19 |       // fallback to text locator
  20 |       await page.locator('text=Services').first().click();
  21 |     }
  22 | 
  23 |     // Click Explore Our Client Work link (text may slightly differ)
  24 |     const exploreLink = page.locator('text=Explore our client work', { strict: false });
  25 |     if (await exploreLink.count() === 0) {
  26 |       // try alternative text
  27 |       await page.locator('text=Explore Our Client Work', { strict: false }).first().click();
  28 |     } else {
  29 |       await exploreLink.first().click();
  30 |     }
  31 | 
  32 |     // Wait for heading containing "Client Work"
  33 |     const heading = page.locator('text=Client Work');
  34 |     await expect(heading).toBeVisible({ timeout: 10000 });
  35 | 
  36 |     // Save success screenshot
  37 |     const successPath = path.join(artifactsDir, 'screenshots', `${testInfo.title.replace(/[^a-z0-9-_]/gi, '_')}-success.png`);
  38 |     await page.screenshot({ path: successPath, fullPage: true });
  39 |   });
  40 | 
  41 |   test.afterEach(async ({ page }, testInfo) => {
  42 |     if (testInfo.status !== 'passed') {
  43 |       const failurePath = path.join(artifactsDir, 'screenshots', `${testInfo.title.replace(/[^a-z0-9-_]/gi, '_')}-failure.png`);
  44 |       await page.screenshot({ path: failurePath, fullPage: true });
  45 |     }
  46 |   });
  47 | });
  48 | 
```