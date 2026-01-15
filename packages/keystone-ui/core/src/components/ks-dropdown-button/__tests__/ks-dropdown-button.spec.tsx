import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { KsDropdownButton } from '../index';
import { KsButton } from '../../ks-button';
import { DropdownMenu } from '../../../entities';

const MOCK_DATA_SOURCE: DropdownMenu = {
  type: 'list' as const,
  items: [
    { id: '1', type: 'single' as const, content: 'Option 1' },
    { id: '2', type: 'single' as const, content: 'Option 2' },
    { id: '3', type: 'single' as const, content: 'Option 3' },
  ],
};

describe('KsDropdownButton', () => {
  it('should render with basic props', async () => {
    const page = await newSpecPage({
      components: [KsDropdownButton, KsButton],
      template: () => <ks-dropdown-button dataSource={MOCK_DATA_SOURCE}></ks-dropdown-button>,
    });
    expect(page.root).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const button = page.root.shadowRoot.querySelector('ks-button');
    expect(button).toBeTruthy();
  });

  it('should handle disabled state', async () => {
    const page = await newSpecPage({
      components: [KsDropdownButton, KsButton],
      template: () => <ks-dropdown-button dataSource={MOCK_DATA_SOURCE} disabled></ks-dropdown-button>,
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const button = page.root.shadowRoot.querySelector('ks-button');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(button.disabled).toBe(true);
  });

  it('should handle loading state', async () => {
    const page = await newSpecPage({
      components: [KsDropdownButton, KsButton],
      template: () => <ks-dropdown-button dataSource={MOCK_DATA_SOURCE} loading></ks-dropdown-button>,
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const button = page.root.shadowRoot.querySelector('ks-button');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(button.loading).toBe(true);
  });
});
