import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsSpace } from '../index';

describe('ks-space component', () => {
  it('should render with default props', async () => {
    const page = await newSpecPage({
      components: [KsSpace],
      template: () => <ks-space></ks-space>,
    });

    expect(page.root).toBeTruthy();
  });

  it('should render with custom gap', async () => {
    const page = await newSpecPage({
      components: [KsSpace],
      template: () => <ks-space gap="10"></ks-space>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const space: HTMLDivElement = page.root.shadowRoot.querySelector('.space');

    expect(space).toBeTruthy();
    expect(space.style.gap).toBe('10px');
  });
});
