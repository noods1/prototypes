import { test } from '@stencil/playwright';
import { expect } from '@playwright/test';

test.describe('ks-progress E2E Tests', () => {
  test('should render default bar progress correctly', async ({ page }) => {
    await page.setContent('<div style="width:200px"><ks-progress></ks-progress></div>');
    const progress = page.locator('ks-progress');
    await expect(progress).toBeVisible();

    const barContainer = progress.locator('.progress--bar');
    await expect(barContainer).toBeVisible();
    await expect(barContainer).toHaveClass(/progress--md/);

    const innerBar = progress.locator('.progress__inner');
    await expect(innerBar).toHaveCSS('width', '0px'); // Or check against a calculated 0% of parent

    const label = progress.locator('.progress__label');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('0%');
  });

  test('should render default ring progress correctly', async ({ page }) => {
    await page.setContent('<ks-progress variant="ring"></ks-progress>');
    const progress = page.locator('ks-progress');
    await expect(progress).toBeVisible();

    const ringContainer = progress.locator('.progress--ring');
    await expect(ringContainer).toBeVisible();
    await expect(ringContainer).toHaveClass(/progress--md/);

    const svg = ringContainer.locator('svg');
    await expect(svg).toBeVisible();
    await expect(svg).toHaveAttribute('width', '120'); // Default for md

    const label = progress.locator('.progress__label');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('0%');
  });

  test('should not render label for bar progress when showLabel is false', async ({ page }) => {
    await page.setContent('<ks-progress show-label="false"></ks-progress>');
    const progress = page.locator('ks-progress');
    await expect(progress).toBeVisible();

    const label = progress.locator('.progress__label');
    await expect(label).not.toBeVisible();
    await expect(label).toHaveCount(0);
  });

  test('should render percentage for ring progress with warning status', async ({ page }) => {
    await page.setContent('<ks-progress variant="ring" percent="60" status="warning"></ks-progress>');
    const progress = page.locator('ks-progress');
    await expect(progress).toBeVisible();

    const label = progress.locator('.progress__label');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('60%'); // Warning status for ring shows percent

    const statusIcon = label.locator('ks-status-icon');
    await expect(statusIcon).not.toBeVisible(); // No icon for warning in ring
    await expect(statusIcon).toHaveCount(0);
  });
});
