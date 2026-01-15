import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { KsGuidance } from '../index';

describe('ks-guidance component', () => {
  it('', async () => {
    const page = await newSpecPage({
      components: [KsGuidance],
      template: () => <ks-guidance show={false} />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('.guidance')).toBeFalsy();
  });
});
