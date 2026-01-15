import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsTile } from '../index';

describe('ks-tile-radio', () => {
  it('should render with default props', async () => {
    const page = await newSpecPage({
      components: [KsTile],
      template: () => <ks-tile></ks-tile>,
    });
    await page.waitForChanges();
    const host = page.root;
    expect(host).toBeTruthy();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const tileDiv = host.shadowRoot.querySelector('.tile') as HTMLElement;
    tileDiv.click();
    await page.waitForChanges();
    expect(tileDiv).toHaveClass('tile--checked');
  });
});

describe('ks-tile-checkbox', () => {
  it('should render with action props', async () => {
    const page = await newSpecPage({
      components: [KsTile],
      template: () => <ks-tile action="checkbox"></ks-tile>,
    });
    await page.waitForChanges();
    const host = page.root;
    expect(host).toBeTruthy();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const tileDiv = host.shadowRoot.querySelector('.tile') as HTMLElement;
    tileDiv.click();
    await page.waitForChanges();
    expect(tileDiv).toHaveClass('tile--checked');
  });
});
