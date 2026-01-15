import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { KsUploadDrop } from '../index';

describe('ks-upload-drop component', () => {
  it('should have shadow dom when rendered', async () => {
    const page = await newSpecPage({
      components: [KsUploadDrop],
      template: () => <ks-upload-drop />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot).toBeTruthy();
  });

  it('should render with default description when not provided', async () => {
    const page = await newSpecPage({
      components: [KsUploadDrop],
      template: () => <ks-upload-drop />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const uploadComponent = page.root.shadowRoot.querySelector('ks-upload');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(uploadComponent.getAttribute('description')).toBe('');
  });

  it('should pass description prop to ks-upload component', async () => {
    const testDescription = 'Test description';
    const page = await newSpecPage({
      components: [KsUploadDrop],
      template: () => <ks-upload-drop description={testDescription} />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const uploadComponent = page.root.shadowRoot.querySelector('ks-upload');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(uploadComponent.getAttribute('description')).toBe(testDescription);
  });

  it('should set width style correctly when provided as number', async () => {
    const testWidth = 300;
    const page = await newSpecPage({
      components: [KsUploadDrop],
      template: () => <ks-upload-drop width={testWidth} />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const dropArea: HTMLElement = page.root.shadowRoot.querySelector('[data-testid="ks-upload-drag-index-8ra1Uc"]');
    expect(dropArea.style.width).toBe(`${testWidth}px`);
  });

  it('should set width style correctly when provided as string', async () => {
    const testWidth = '400px';
    const page = await newSpecPage({
      components: [KsUploadDrop],
      template: () => <ks-upload-drop width={testWidth} />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const dropArea: HTMLElement = page.root.shadowRoot.querySelector('[data-testid="ks-upload-drag-index-8ra1Uc"]');
    expect(dropArea.style.width).toBe(testWidth);
  });

  it('should render upload icon by default', async () => {
    const page = await newSpecPage({
      components: [KsUploadDrop],
      template: () => <ks-upload-drop />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const uploadIcon = page.root.shadowRoot.querySelector('ks-icon-upload');
    expect(uploadIcon).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const plusIcon = page.root.shadowRoot.querySelector('ks-icon-plus');
    expect(plusIcon).toBeFalsy();
  });

  it('should render plus icon when iconType is set to plus', async () => {
    const page = await newSpecPage({
      components: [KsUploadDrop],
      template: () => <ks-upload-drop iconType="plus" data-testid="__tests__-ks-upload-drag.spec-6ALcbY" />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const plusIcon = page.root.shadowRoot.querySelector('ks-icon-plus');
    expect(plusIcon).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const uploadIcon = page.root.shadowRoot.querySelector('ks-icon-upload');
    expect(uploadIcon).toBeFalsy();
  });
});
