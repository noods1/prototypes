import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsSkeletonButton } from '../ks-skeleton-button';

describe('ks-skeleton-button component', () => {
  it('should render', async () => {
    const page = await newSpecPage({
      components: [KsSkeletonButton],
      template: () => <ks-skeleton-button />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('.skeleton-button')).toHaveClasses([
      'skeleton-button--angle',
      'skeleton-button--md',
    ]);
  });
});
