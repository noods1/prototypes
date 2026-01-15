import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsSkeletonTile } from '../ks-skeleton-tile';

describe('ks-skeleton-tile component', () => {
  it('should render', async () => {
    const page = await newSpecPage({
      components: [KsSkeletonTile],
      template: () => <ks-skeleton-tile />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelectorAll('ks-skeleton-text')).toHaveLength(3);
  });
});
