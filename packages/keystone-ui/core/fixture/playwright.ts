import { test as base } from '@stencil/playwright';

export const test = base.extend<{ forEachTest: void }>({
  forEachTest: [
    async ({ page }, use) => {
      await page.route('**/*.{woff,woff2,ttf,otf,eot}', (route) => {
        route.fulfill({ body: '' });
      });

      await use();
    },
    { auto: true },
  ],
});
