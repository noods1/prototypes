import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsUpload } from '../index';
// @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
import { UploadFile, UploadChangeParam } from '@src/entities';

describe('ks-upload component', () => {
  const mockFileList: UploadFile[] = [
    {
      uid: 'test-uid-1',
      name: 'test-file-1.jpg',
      size: 1024,
      type: 'image/jpeg',
      status: 'done',
      percent: 100,
    },
    {
      uid: 'test-uid-2',
      name: 'test-file-2.png',
      size: 2048,
      type: 'image/png',
      status: 'uploading',
      percent: 50,
    },
  ];

  it('should render with default props', async () => {
    const page = await newSpecPage({
      components: [KsUpload],
      template: () => <ks-upload></ks-upload>,
    });

    expect(page.root).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.size).toBe('md');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.disabled).toBe(false);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.multiple).toBe(false);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.name).toBe('file');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.method).toBe('post');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.showUploadList).toBe(true);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.type).toBe('select');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.showMessage).toBe(false);
  });

  it('should render with all props set', async () => {
    const page = await newSpecPage({
      components: [KsUpload],
      template: () => (
        <ks-upload
          size="sm"
          accept=".jpg,.png"
          action="/upload"
          data={{ key: 'value' }}
          name="uploadFile"
          disabled
          multiple
          headers={{ Authorization: 'Bearer token' }}
          method="put"
          file-list={mockFileList}
          defaultFileList={mockFileList}
          show-upload-list="false"
          type="drag"
          message="Custom message"
          description="Upload description"
          show-message="true"
        >
          <button>Upload Button</button>
        </ks-upload>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.size).toBe('sm');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.accept).toBe('.jpg,.png');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.action).toBe('/upload');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.data).toEqual({ key: 'value' });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.name).toBe('uploadFile');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.disabled).toBe(true);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.multiple).toBe(true);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.headers).toEqual({ Authorization: 'Bearer token' });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.method).toBe('put');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.showUploadList).toBe(false);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.type).toBe('drag');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.message).toBe('Custom message');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.description).toBe('Upload description');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.showMessage).toBe(true);

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    page.root.fileList = [
      {
        name: 'test-file-1.jpg',
        size: 1024,
        type: 'image/jpeg',
        status: 'done',
        percent: 100,
      },
    ] as UploadFile[];

    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.showMessage).toBe(true);
  });

  it('should render with custom slot content', async () => {
    const page = await newSpecPage({
      components: [KsUpload],
      template: () => (
        <ks-upload>
          <button>Custom Upload Button</button>
        </ks-upload>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const slotContent = page.root.querySelector('button');
    expect(slotContent).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(slotContent.textContent).toEqualText('Custom Upload Button');
  });

  it('should render description when provided', async () => {
    const page = await newSpecPage({
      components: [KsUpload],
      template: () => <ks-upload description="Upload your files here"></ks-upload>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const descriptionElement = page.root.shadowRoot.querySelector('ks-text');
    expect(descriptionElement).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(descriptionElement.textContent).toEqualText('Upload your files here');
  });

  it('should render message when showMessage is true', async () => {
    const page = await newSpecPage({
      components: [KsUpload],
      template: () => <ks-upload showMessage message="Upload message"></ks-upload>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const messageElement = page.root.shadowRoot.querySelector('.upload__message');
    expect(messageElement).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(messageElement.textContent).toEqualText('Upload message');
  });

  it('should render upload list when showUploadList is true', async () => {
    const page = await newSpecPage({
      components: [KsUpload],
      template: () => <ks-upload showUploadList fileList={mockFileList}></ks-upload>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const uploadListElement = page.root.shadowRoot.querySelector('ks-upload-list');
    expect(uploadListElement).toBeTruthy();
  });

  it('should not render upload list when showUploadList is false', async () => {
    const page = await newSpecPage({
      components: [KsUpload],
      template: () => <ks-upload showUploadList={false}></ks-upload>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const uploadListElement = page.root.shadowRoot.querySelector('ks-upload-list');
    expect(uploadListElement).toBeFalsy();
  });
});
