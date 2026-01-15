import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsSkeletonAvatar } from '../ks-skeleton-avatar';

describe('ks-skeleton-avatar component', () => {
  it('should render', async () => {
    const page = await newSpecPage({
      components: [KsSkeletonAvatar],
      template: () => <ks-skeleton-avatar />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('.ks-skeleton')).toHaveClasses([
      'skeleton-avatar',
      'skeleton-avatar--circle',
      'skeleton-avatar--md',
    ]);
  });
});
