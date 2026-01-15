import { test } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { TagVariant, TagSize } from '../../../../entities';

const VariantMap = {
  info: 'primary',
  new: 'support',
  neutral: 'neutral',
  success: 'success',
  error: 'error',
  warning: 'warning',
};

test.describe('ks-tag E2E Tests', () => {
  test('should render with default props and text', async ({ page }) => {
    await page.setContent('<ks-tag>Default Tag</ks-tag>');
    const tag = page.locator('ks-tag');
    await expect(tag).toBeVisible();
    await expect(tag).toHaveText('Default Tag');

    // Shadow DOM checks
    const tagDiv = tag.locator('.tag');
    await expect(tagDiv).toHaveClass(/tag--neutral/);
    await expect(tagDiv).toHaveClass(/tag--md/);
  });

  const variants: TagVariant[] = ['info', 'new', 'neutral', 'success', 'error', 'warning'];
  for (const variant of variants) {
    test(`should render with variant: ${variant}`, async ({ page }) => {
      await page.setContent(`<ks-tag variant="${variant}">Variant Tag</ks-tag>`);
      const tag = page.locator('ks-tag');
      await expect(tag).toBeVisible();
      const tagDiv = tag.locator('.tag');
      await expect(tagDiv).toHaveClass(new RegExp(`tag--${VariantMap[variant]}`));
      await expect(tag).toHaveAttribute('variant', variant);
    });
  }

  const sizes: TagSize[] = ['sm', 'md', 'lg'];
  for (const size of sizes) {
    test(`should render with size: ${size}`, async ({ page }) => {
      await page.setContent(`<ks-tag size="${size}">Size Tag</ks-tag>`);
      const tag = page.locator('ks-tag');
      await expect(tag).toBeVisible();
      const tagDiv = tag.locator('.tag');
      await expect(tagDiv).toHaveClass(new RegExp(`tag--${size}`));
      await expect(tag).toHaveAttribute('size', size);
    });
  }

  test('should render as disabled', async ({ page }) => {
    await page.setContent('<ks-tag disabled>Disabled Tag</ks-tag>');
    const tag = page.locator('ks-tag');
    await expect(tag).toBeVisible();
    const tagDiv = tag.locator('.tag');
    await expect(tagDiv).toHaveClass(/tag--disabled/);
    await expect(tag).toHaveAttribute('aria-disabled', 'true');
  });

  test('should render with indicator', async ({ page }) => {
    await page.setContent('<ks-tag indicator>Indicator Tag</ks-tag>');
    const tag = page.locator('ks-tag');
    await expect(tag).toBeVisible();
    const tagDiv = tag.locator('.tag');
    await expect(tagDiv).toHaveClass(/tag--indicator/);
    const indicatorEl = tag.locator('.indicator svg');
    await expect(indicatorEl).toBeVisible();
  });

  test('should render with icon slot', async ({ page }) => {
    await page.setContent('<ks-tag><span slot="icon">ICON</span>Icon Tag</ks-tag>');
    const tag = page.locator('ks-tag');
    await expect(tag).toBeVisible();
    const iconContent = tag.locator('[slot="icon"]');
    await expect(iconContent).toHaveText('ICON');
    // Check if the slot element exists in shadow DOM
    const iconSlotInShadow = tag.locator('slot[name="icon"]');
    await expect(iconSlotInShadow).toHaveCount(1); // Ensure the slot is there
  });

  test('should apply custom width and maxWidth', async ({ page }) => {
    await page.setContent('<ks-tag width="100px" max-width="150px">Styled Tag</ks-tag>');
    const tag = page.locator('ks-tag');
    await expect(tag).toBeVisible();
    const tagDiv = tag.locator('.tag');
    await expect(tagDiv).toHaveAttribute('style', /width:\s*100px;/);
    await expect(tagDiv).toHaveAttribute('style', /max-width:\s*150px;/);
  });
});
