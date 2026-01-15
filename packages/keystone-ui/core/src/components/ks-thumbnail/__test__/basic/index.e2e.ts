import { test } from '@stencil/playwright';
import { expect } from '@playwright/test';

test.describe('ks-thumbnail E2E Tests', () => {
  test('should render default thumbnail', async ({ page }) => {
    await page.setContent('<ks-thumbnail></ks-thumbnail>');
    const thumbnail = page.locator('ks-thumbnail');
    await expect(thumbnail).toBeVisible();
    const thumbnailDiv = thumbnail.locator('.thumbnail__container');
    await expect(thumbnailDiv).toHaveClass(/thumbnail__md/);
    // Default background color check might be too brittle, focusing on structure and classes.
  });

  test('should render with image source', async ({ page }) => {
    const imageUrl = 'https://via.placeholder.com/150';
    await page.setContent(`<ks-thumbnail image="${imageUrl}"></ks-thumbnail>`);
    const thumbnail = page.locator('ks-thumbnail');
    await expect(thumbnail).toBeVisible();
    const thumbnailDiv = thumbnail.locator('.thumbnail');
    await expect(thumbnailDiv).toHaveAttribute('style', new RegExp(`background: url\\("${imageUrl}"\\)`));
  });

  test('should be disabled', async ({ page }) => {
    await page.setContent('<ks-thumbnail disabled playable></ks-thumbnail>');
    const thumbnail = page.locator('ks-thumbnail');
    await expect(thumbnail).toBeVisible();
    const thumbnailDiv = thumbnail.locator('.thumbnail');
    await expect(thumbnailDiv).toHaveClass(/thumbnail__disabled/);

    const playIcon = thumbnail.locator('ks-icon-filled-play');
    await expect(playIcon).not.toBeVisible(); // Should not be visible or exist
  });

  test('should not display multiple effect for smaller sizes', async ({ page }) => {
    const sizes = ['xs', 'sm', 'md'];
    for (const size of sizes) {
      await page.setContent(`<ks-thumbnail is-multiple size="${size}"></ks-thumbnail>`);
      const thumbnail = page.locator('ks-thumbnail');
      await expect(thumbnail).toBeVisible();
      const multipleDiv = thumbnail.locator('.thumbnail__multiple');
      await expect(multipleDiv).not.toBeVisible();
    }
  });
});
