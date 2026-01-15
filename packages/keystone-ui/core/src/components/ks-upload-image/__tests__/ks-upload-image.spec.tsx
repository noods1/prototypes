import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { KsUploadAvatar } from '../index';

describe('ks-upload-drop component', () => {
  it('should have shadow dom when rendered', async () => {
    const page = await newSpecPage({
      components: [KsUploadAvatar],
      template: () => <ks-upload-avatar />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot).toBeTruthy();
  });

  it('should render with default description when not provided', async () => {
    const page = await newSpecPage({
      components: [KsUploadAvatar],
      template: () => <ks-upload-avatar />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const uploadComponent = page.root.shadowRoot.querySelector('ks-upload');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(uploadComponent.getAttribute('description')).toBe('');
  });

  it('should pass description prop to ks-upload component', async () => {
    const testDescription = 'Test description';
    const page = await newSpecPage({
      components: [KsUploadAvatar],
      template: () => <ks-upload-avatar description={testDescription} />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const uploadComponent = page.root.shadowRoot.querySelector('ks-upload');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(uploadComponent.getAttribute('description')).toBe(testDescription);
  });
});
