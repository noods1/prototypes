import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsInputPassword } from '../';
import { KsInput } from '@src/components/ks-input';

describe('ks-input-password', () => {
  it('should toggle password visibility when clicking the eye icon', async () => {
    const page = await newSpecPage({
      components: [KsInputPassword, KsInput],
      template: () => <ks-input-password></ks-input-password>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const iconButton: HTMLSpanElement = page.root.shadowRoot.querySelector(
      '[data-testid="ks-input-password-index-bRmxXi"]',
    );
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const input = page.root.shadowRoot.querySelector('ks-input');

    // Initial state should be password (hidden)
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(input.type).toBe('password');

    // Click to show password
    iconButton.click();
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(input.type).toBe('text');

    // Click again to hide password
    iconButton.click();
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(input.type).toBe('password');
  });

  it('should not toggle password visibility when disabled', async () => {
    const page = await newSpecPage({
      components: [KsInputPassword, KsInput],
      template: () => <ks-input-password disabled></ks-input-password>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const iconButton: HTMLSpanElement = page.root.shadowRoot.querySelector(
      '[data-testid="ks-input-password-index-bRmxXi"]',
    );
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const input = page.root.shadowRoot.querySelector('ks-input');

    // Should not change when disabled
    iconButton.click();
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(input.type).toBe('password');
  });

  it('should emit change event when input value changes', async () => {
    const page = await newSpecPage({
      components: [KsInputPassword, KsInput],
      template: () => <ks-input-password></ks-input-password>,
    });

    const changeSpy = jest.fn();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    page.root.addEventListener('ksChange', changeSpy);

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const input = page.root.shadowRoot.querySelector('ks-input');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    input.value = 'newpassword';
    const event = new CustomEvent('ksChange', { detail: 'newpassword' });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    input.dispatchEvent(event);

    await page.waitForChanges();
    expect(changeSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: 'newpassword',
      }),
    );
  });

  it('should set initial value from value prop', async () => {
    const page = await newSpecPage({
      components: [KsInputPassword, KsInput],
      template: () => <ks-input-password value="initial"></ks-input-password>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const input = page.root.shadowRoot.querySelector('ks-input');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(input.value).toBe('initial');
  });

  it('should set initial value from defaultValue prop', async () => {
    const page = await newSpecPage({
      components: [KsInputPassword, KsInput],
      template: () => <ks-input-password default-value="default"></ks-input-password>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const input = page.root.shadowRoot.querySelector('ks-input');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(input.defaultValue).toBe('default');
  });

  it('should forward size prop to input', async () => {
    const page = await newSpecPage({
      components: [KsInputPassword, KsInput],
      template: () => <ks-input-password size="sm"></ks-input-password>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const input = page.root.shadowRoot.querySelector('ks-input');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(input.size).toBe('sm');
  });

  it('should forward placeholder prop to input', async () => {
    const page = await newSpecPage({
      components: [KsInputPassword, KsInput],
      template: () => <ks-input-password placeholder="Enter password"></ks-input-password>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const input = page.root.shadowRoot.querySelector('ks-input');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(input.placeholder).toBe('Enter password');
  });

  it('should forward disabled prop to input', async () => {
    const page = await newSpecPage({
      components: [KsInputPassword, KsInput],
      template: () => <ks-input-password disabled></ks-input-password>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const input = page.root.shadowRoot.querySelector('ks-input');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(input.disabled).toBe(true);
  });

  it('should forward clearable prop to input', async () => {
    const page = await newSpecPage({
      components: [KsInputPassword, KsInput],
      template: () => <ks-input-password clearable></ks-input-password>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const input = page.root.shadowRoot.querySelector('ks-input');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(input.clearable).toBe(true);
  });

  it('should forward status prop to input', async () => {
    const page = await newSpecPage({
      components: [KsInputPassword, KsInput],
      template: () => <ks-input-password status="error"></ks-input-password>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const input = page.root.shadowRoot.querySelector('ks-input');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(input.status).toBe('error');
  });

  it('should render prefix slot', async () => {
    const page = await newSpecPage({
      components: [KsInputPassword],
      template: () => (
        <ks-input-password>
          <span slot="prefix">🔒</span>
        </ks-input-password>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const slot = page.root.querySelector('span[slot="prefix"]');
    expect(slot).not.toBeNull();
  });

  it('should render suffix slot', async () => {
    const page = await newSpecPage({
      components: [KsInputPassword],
      template: () => (
        <ks-input-password>
          <span slot="suffix">?</span>
        </ks-input-password>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const slot = page.root.querySelector('span[slot="suffix"]');
    expect(slot).not.toBeNull();
  });

  it('should focus input when focusInput is called', async () => {
    const page = await newSpecPage({
      components: [KsInputPassword],
      template: () => <ks-input-password></ks-input-password>,
    });

    const focusSpy = jest.fn();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const input = page.root.shadowRoot.querySelector('ks-input');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    input.focusInput = focusSpy;

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    await page.root.focusInput();
    expect(focusSpy).toHaveBeenCalled();
  });

  it('should blur input when blurInput is called', async () => {
    const page = await newSpecPage({
      components: [KsInputPassword],
      template: () => <ks-input-password></ks-input-password>,
    });

    const blurSpy = jest.fn();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const input = page.root.shadowRoot.querySelector('ks-input');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    input.blurInput = blurSpy;

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    await page.root.blurInput();
    expect(blurSpy).toHaveBeenCalled();
  });
});
