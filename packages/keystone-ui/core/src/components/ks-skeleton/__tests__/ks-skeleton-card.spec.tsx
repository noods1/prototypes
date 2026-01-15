import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsSkeletonCard } from '../ks-skeleton-card';

describe('ks-skeleton-card component', () => {
  it('should render', async () => {
    const page = await newSpecPage({
      components: [KsSkeletonCard],
      template: () => <ks-skeleton-card />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const skeleton = page.root.shadowRoot.querySelector<HTMLDivElement>('.ks-skeleton');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(skeleton.style.width).toEqual('100%');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(skeleton.style.height).toEqual('100%');
  });
});
