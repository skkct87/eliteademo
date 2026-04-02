import { test, expect } from '@playwright/test';
import path from 'path';
import { makeArtifactsDir } from '../test-helpers/playwright-utils';

// Initial structure for EPAM client work test. Test body will be added in a follow-up update.
test.describe('EPAM site - Client Work navigation', () => {
  const runId = Date.now().toString();
  const artifactsDir = makeArtifactsDir(runId);

  test('explore client work -> Client Work is visible', async ({ page }) => {
    // TODO: implement test steps (added in next edit)
  });
});
