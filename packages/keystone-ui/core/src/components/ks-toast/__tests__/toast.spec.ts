import { newSpecPage } from '@stencil/core/testing';
import { Toast, type ToastConfig } from '../toast';
import { KsToast } from '../index';
import { KsToastBox } from '../../ks-toast-box';

describe('toast API', () => {
  let toast: Toast;

  // Reinitialize toast for each test to prevent component conflicts from previous tests
  beforeEach(() => {
    toast = new Toast();
  });

  it('should create a toast with custom configuration', async () => {
    const page = await newSpecPage({
      components: [KsToast, KsToastBox],
    });

    const config: ToastConfig = {
      content: 'Custom toast',
      variant: 'success',
      duration: 3000,
      customStyle: { color: 'red' },
    };
    toast.open(config);
    await page.waitForChanges();

    const toastElement = document.querySelector('ks-toast');

    expect(toastElement).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(toastElement.shadowRoot.textContent).toEqual('Custom toast');
  });

  it('should create a basic toast with string content', async () => {
    const page = await newSpecPage({
      components: [KsToast, KsToastBox],
    });

    toast.open('Test message');
    await page.waitForChanges();

    const toastElement = document.querySelector('ks-toast');

    expect(toastElement).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(toastElement.shadowRoot.textContent).toEqual('Test message');
  });

  it('should handle multiple toasts in queue', async () => {
    const page = await newSpecPage({
      components: [KsToast, KsToastBox],
    });

    toast.open('First toast');
    toast.open('Second toast');
    await page.waitForChanges();

    expect(document.querySelectorAll('ks-toast')).toHaveLength(2);
  });

  it('should support preset methods', async () => {
    const page = await newSpecPage({
      components: [KsToast, KsToastBox],
    });

    toast.success('Success message');
    toast.error('Error message');
    toast.loading('Loading message');
    await page.waitForChanges();

    expect(document.querySelectorAll('ks-toast')).toHaveLength(3);
  });

  // [FIXME] Remove failing after https://github.com/stenciljs/core/issues/5676 is fixed
  it.failing('should close toast', async () => {
    const page = await newSpecPage({
      components: [KsToast, KsToastBox],
    });

    toast.open({
      content: 'Test lifecycle',
      closeable: true,
      duration: 0,
    });
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const toastElement: HTMLKsToastElement = document.querySelector('ks-toast');
    expect(toastElement).toBeTruthy();

    toastElement.close();
    await page.waitForChanges();

    expect(document.querySelector('ks-toast')).toBeFalsy();
  });

  it('should support custom container', async () => {
    const page = await newSpecPage({
      components: [KsToast, KsToastBox],
    });

    const customContainer = document.createElement('div');
    document.body.appendChild(customContainer);

    toast.open({
      content: 'Custom container toast',
      container: customContainer,
    });
    await page.waitForChanges();

    expect(customContainer.querySelector('ks-toast')).toBeTruthy();
  });

  it('should handle BTM tracking attributes', async () => {
    const page = await newSpecPage({
      components: [KsToast, KsToastBox],
    });

    const config = {
      content: 'BTM tracked toast',
      btm: 'test-btm',
      btmConfig: { key: 'value' },
    };

    toast.open(config);
    await page.waitForChanges();

    const toastElement = document.querySelector('ks-toast');

    expect(toastElement?.getAttribute('data-btm')).toEqual(config.btm);
    expect(toastElement?.getAttribute('data-btm-config')).toEqual(JSON.stringify(config.btmConfig));
  });

  it('should clean up toast box when all toasts are closed', async () => {
    const page = await newSpecPage({
      components: [KsToast, KsToastBox],
    });

    toast.open('Test cleanup');
    await page.waitForChanges();

    const toastBox = document.querySelector('ks-toast-box');
    expect(toastBox).toBeTruthy();

    toast.closeAll();
    await page.waitForChanges();

    expect(document.querySelector('ks-toast-box')).toBeFalsy();
  });
});
