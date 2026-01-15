import { test } from '@fixture/playwright';
import { expect } from '@playwright/test';

test.describe('ks-segmented-control component: basic', () => {
  test('should match screenshot when rendered', async ({ page }) => {
    await page.goto('/components/ks-segmented-control/__tests__/basic');

    const segmentedGroup = await page.locator('ks-segmented-group');

    await expect(segmentedGroup).toHaveScreenshot('ks-segmented-control-basic.png');
  });
});
