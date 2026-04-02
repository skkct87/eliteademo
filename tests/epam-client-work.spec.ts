import { test, expect } from '@playwright/test';
import path from 'path';
import { makeArtifactsDir } from '../test-helpers/playwright-utils';

// EPAM client work test
test.describe('EPAM site - Client Work navigation', () => {
  const runId = Date.now().toString();
  const artifactsDir = makeArtifactsDir(runId);

  test('explore client work -> Client Work is visible', async ({ page }, testInfo) => {
    // Navigate to EPAM
    await page.goto('https://www.epam.com/', { waitUntil: 'networkidle' });

    // Click Services in the header menu (try different casing/variants)
    const services = page.locator('role=link[name="Services"]');
    if (await services.count() > 0) {
      await services.first().click();
    } else {
      // fallback to text locator
      await page.locator('text=Services').first().click();
    }

    // Click Explore Our Client Work link (text may slightly differ)
    const exploreLink = page.locator('text=Explore our client work', { strict: false });
    if (await exploreLink.count() === 0) {
      // try alternative text
      await page.locator('text=Explore Our Client Work', { strict: false }).first().click();
    } else {
      await exploreLink.first().click();
    }

    // Wait for heading containing "Client Work"
    const heading = page.locator('text=Client Work');
    await expect(heading).toBeVisible({ timeout: 10000 });

    // Save success screenshot
    const successPath = path.join(artifactsDir, 'screenshots', `${testInfo.title.replace(/[^a-z0-9-_]/gi, '_')}-success.png`);
    await page.screenshot({ path: successPath, fullPage: true });
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== 'passed') {
      const failurePath = path.join(artifactsDir, 'screenshots', `${testInfo.title.replace(/[^a-z0-9-_]/gi, '_')}-failure.png`);
      await page.screenshot({ path: failurePath, fullPage: true });
    }
  });
});
