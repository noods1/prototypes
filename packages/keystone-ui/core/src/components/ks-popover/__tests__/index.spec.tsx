import { newSpecPage } from '@stencil/core/testing';
import { KsPopover } from '../index'; // 假设 index.tsx 定义了 KsDrawer
import { h } from '@stencil/core';

describe('ks-popover component', () => {
  it('ks-popover render normal', async () => {
    const page = await newSpecPage({
      components: [KsPopover],
      template: () => <ks-popover content="popover">xxx</ks-popover>,
    });
    await page.waitForChanges();
    expect(page.root).toBeTruthy();
  });
});
