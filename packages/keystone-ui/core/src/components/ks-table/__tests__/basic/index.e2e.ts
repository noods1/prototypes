import { test } from '@fixture/playwright';
import { expect } from '@playwright/test';

test.describe('ks-table component: basic', () => {
  test('should match screenshot when rendered', async ({ page }) => {
    await page.goto('/components/ks-table/__tests__/basic/index.e2e.html');

    const table = page.locator('ks-table');

    await expect(table).toHaveScreenshot('ks-table-basic.png');
  });
});
