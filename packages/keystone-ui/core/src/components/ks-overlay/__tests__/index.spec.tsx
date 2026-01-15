import { newSpecPage } from '@stencil/core/testing';
import { KsOverlay } from '../index'; // 假设 index.tsx 定义了 KsDrawer
import { h } from '@stencil/core';

describe('ks-overlay component', () => {
  it('ks-over render normal when deprecatedDisableTopLayer is true', async () => {
    const page = await newSpecPage({
      components: [KsOverlay],
      template: () => (
        <ks-overlay type="popover" deprecatedDisableTopLayer={true} title-text="Test Drawer">
          xxx
        </ks-overlay>
      ),
    });
    await page.waitForChanges();
    expect(page.root).toBeTruthy();
  });

  it('ks-over render normal when deprecatedDisableTopLayer is false', async () => {
    let visible = true;
    const page = await newSpecPage({
      components: [KsOverlay],
      template: () => (
        <ks-overlay open={visible} type="popover" deprecatedDisableTopLayer={false} title-text="Test Drawer">
          xxx
        </ks-overlay>
      ),
    });

    await page.waitForChanges();
    visible = false;
    await page.waitForChanges();
    expect(page.root).toBeTruthy();
  });
});
