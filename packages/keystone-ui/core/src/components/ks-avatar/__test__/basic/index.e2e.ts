import { test } from '@stencil/playwright';
import { expect } from '@playwright/test';

test.describe('ks-avatar E2E', () => {
  test('renders default avatar', async ({ page }) => {
    await page.setContent('<ks-avatar>A</ks-avatar>');

    const avatar = page.locator('ks-avatar');
    await expect(avatar).toBeVisible();

    // Playwright's locator pierces shadow DOM by default with CSS selectors
    const avatarOuter = avatar.locator('.avatar-outer');
    await expect(avatarOuter).toBeVisible();

    const avatarDiv = avatar.locator('.avatar');
    await expect(avatarDiv).toHaveClass(/avatar--md/);
    await expect(avatarDiv).toHaveClass(/avatar--circle/);
  });

  test('renders avatar with image src', async ({ page }) => {
    const imgSrc = 'https://via.placeholder.com/100';
    const imgAlt = 'Test Alt';
    await page.setContent(`<ks-avatar src="${imgSrc}" alt="${imgAlt}"></ks-avatar>`);

    const avatarDiv = page.locator('ks-avatar .avatar');
    await expect(avatarDiv).toHaveClass(/avatar--image/);
  });

  test('renders avatar with text content', async ({ page }) => {
    await page.setContent('<ks-avatar>JD</ks-avatar>');

    const avatar = page.locator('ks-avatar');
    await expect(avatar).toHaveText('JD');

    // Optionally, check for the slot element itself if needed
    const slotElement = avatar.locator('slot:not([name])');
    await expect(slotElement).toBeAttached();
  });

  test('renders avatar with label', async ({ page }) => {
    const name = 'John Doe';
    const description = 'Developer';
    await page.setContent(`<ks-avatar show-label name="${name}" description="${description}"></ks-avatar>`);

    const avatar = page.locator('ks-avatar');
    const labelDiv = avatar.locator('.avatar-label');
    await expect(labelDiv).toBeVisible();

    const nameEl = labelDiv.locator('ks-text:first-child');
    await expect(nameEl).toHaveText(name);

    const descEl = labelDiv.locator('ks-text:last-child');
    await expect(descEl).toHaveText(description);
  });

  test('does not render label when show-label is false or not present', async ({ page }) => {
    await page.setContent('<ks-avatar name="Test" description="Desc"></ks-avatar>');
    let avatar = page.locator('ks-avatar');
    let labelDiv = avatar.locator('.avatar-label');
    await expect(labelDiv).not.toBeVisible(); // Or .toBeHidden() or .toHaveCount(0)

    await page.setContent('<ks-avatar show-label="false" name="Test" description="Desc"></ks-avatar>');
    avatar = page.locator('ks-avatar'); // Re-locate after setContent
    labelDiv = avatar.locator('.avatar-label');
    await expect(labelDiv).not.toBeVisible();
  });

  test('renders avatar with overlap slot content', async ({ page }) => {
    await page.setContent(`
      <ks-avatar size="lg">
        <div slot="overlap" id="overlap-content">Overlap!</div>
      </ks-avatar>
    `);

    const avatar = page.locator('ks-avatar');
    const overlapDivInShadow = avatar.locator('.avatar__overlap');
    await expect(overlapDivInShadow).toBeVisible();

    // Check the slotted content in light DOM (relative to the host)
    const slottedContent = avatar.locator('[slot="overlap"]'); // or page.locator('ks-avatar > [slot="overlap"]')
    await expect(slottedContent).toBeVisible();
    await expect(slottedContent).toHaveText('Overlap!');
  });

  test('does not have group class by default', async ({ page }) => {
    await page.setContent('<ks-avatar></ks-avatar>');
    const avatarHost = page.locator('ks-avatar');
    // Check that the class 'avatar-host-group' is not present
    await expect(avatarHost).not.toHaveClass(/avatar-host-group/);
  });
});
