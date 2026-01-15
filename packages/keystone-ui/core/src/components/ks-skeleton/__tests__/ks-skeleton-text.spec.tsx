import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsSkeletonText } from '../ks-skeleton-text';

describe('ks-skeleton-text component', () => {
  it('should render', async () => {
    const page = await newSpecPage({
      components: [KsSkeletonText],
      template: () => <ks-skeleton-text />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const skeleton = page.root.shadowRoot.querySelector<HTMLDivElement>('.ks-skeleton');

    expect(skeleton).toHaveClasses(['skeleton-text', 'skeleton-text-headline-Md']);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(skeleton.style.width).toEqual('60%');
  });
});
