import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsSpinner } from '../index';

describe('ks-spinner component', () => {
  it('should render with default props', async () => {
    const page = await newSpecPage({
      components: [KsSpinner],
      template: () => <ks-spinner />,
    });

    expect(page.root).toBeTruthy();
    expect(page.root).toEqualAttribute('ks-auto-center', 'false');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('.spinner')).toHaveClasses(['spinner--horizontal', 'spinner--md']);
  });

  it('should render with custom props', async () => {
    const page = await newSpecPage({
      components: [KsSpinner],
      template: () => <ks-spinner size="lg" layout="vertical" inverse autoCenter />,
    });

    expect(page.root).toBeTruthy();
    expect(page.root).toEqualAttribute('ks-auto-center', 'true');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('.spinner')).toHaveClasses([
      'spinner--vertical',
      'spinner--lg',
      'spinner--inverse',
    ]);
  });
});
