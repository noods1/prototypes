import { test } from '@fixture/playwright';
import { expect } from '@playwright/test';

test.describe('ks-chip component: basic', () => {
  test('should match screenshot when rendered', async ({ page }) => {
    await page.goto('/components/ks-chip/__tests__/basic');

    const chips = page.locator('.chips');

    await expect(chips).toHaveScreenshot('ks-chip-basic.png');
  });

  test('should emit ksChange event when clicked', async ({ page }) => {
    await page.setContent(`<ks-chip label="Chip"></ks-chip>`);

    const ksChangeSpy = await page.spyOnEvent('ksChange');
    const chip = await page.locator('ks-chip');

    await chip.click();
    expect(ksChangeSpy).toHaveReceivedEventDetail(true);

    await chip.click();
    expect(ksChangeSpy).toHaveReceivedEventDetail(false);
  });
});
