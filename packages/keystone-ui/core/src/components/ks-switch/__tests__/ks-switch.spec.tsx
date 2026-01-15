import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsSwitch } from '../';
import { KsText } from '@src/components/ks-text';
// @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
import { KsTooltip } from '@src/components/ks-tooltip';
import { KsTag } from '@src/components/ks-tag';

describe('ks-switch component', () => {
  it('should render with default props', async () => {
    const page = await newSpecPage({
      components: [KsSwitch],
      template: () => <ks-switch>Test Switch</ks-switch>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const switchEl = page.root.shadowRoot.querySelector('.switch');
    expect(switchEl).not.toBeNull();
    expect(switchEl).toHaveClass('switch--md');
    expect(switchEl).not.toHaveClass('switch--checked');
    expect(switchEl).not.toHaveClass('switch--disabled');
  });

  it('should apply correct size class', async () => {
    const page = await newSpecPage({
      components: [KsSwitch],
      template: () => <ks-switch size="sm">Small Switch</ks-switch>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const switchEl = page.root.shadowRoot.querySelector('.switch');
    expect(switchEl).toHaveClass('switch--sm');
  });

  it('should be checked when checked prop is true', async () => {
    const page = await newSpecPage({
      components: [KsSwitch],
      template: () => <ks-switch checked>Checked Switch</ks-switch>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const switchEl = page.root.shadowRoot.querySelector('.switch');
    expect(switchEl).toHaveClass('switch--checked');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(switchEl.getAttribute('aria-checked')).toBe('true');
  });

  it('should be disabled when disabled prop is true', async () => {
    const page = await newSpecPage({
      components: [KsSwitch],
      template: () => <ks-switch disabled>Disabled Switch</ks-switch>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const switchEl = page.root.shadowRoot.querySelector('.switch');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const button = page.root.shadowRoot.querySelector('button');
    expect(switchEl).toHaveClass('switch--disabled');
    expect(button).toHaveAttribute('disabled');
  });

  it('should show loading indicator when loading is true', async () => {
    const page = await newSpecPage({
      components: [KsSwitch],
      template: () => <ks-switch loading>Loading Switch</ks-switch>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const loadingIcon = page.root.shadowRoot.querySelector('ks-icon-loading');
    expect(loadingIcon).not.toBeNull();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const button = page.root.shadowRoot.querySelector('[data-testid="ks-switch-index-pUsHmY"]');
    expect(button).toHaveAttribute('disabled');
  });

  it('should emit change event when clicked', async () => {
    const changeSpy = jest.fn();
    const page = await newSpecPage({
      components: [KsSwitch],
      template: () => <ks-switch onKsChange={changeSpy}>Clickable Switch</ks-switch>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const button = page.root.shadowRoot.querySelector('button');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    button.click();
    await page.waitForChanges();

    expect(changeSpy).toHaveBeenCalledWith(expect.objectContaining({ detail: true }));
  });

  it('should not emit change event when disabled or loading', async () => {
    const changeSpy = jest.fn();
    const page = await newSpecPage({
      components: [KsSwitch],
      template: () => (
        <div>
          <ks-switch disabled onKsChange={changeSpy}>
            Disabled Switch
          </ks-switch>
          <ks-switch loading onKsChange={changeSpy}>
            Loading Switch
          </ks-switch>
        </div>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const buttons = page.root.shadowRoot.querySelectorAll('button');
    buttons.forEach((button) => button.click());
    await page.waitForChanges();

    expect(changeSpy).not.toHaveBeenCalled();
  });

  it('should render with description as label', async () => {
    const page = await newSpecPage({
      components: [KsSwitch, KsText],
      template: () => (
        <ks-switch description-style="label">
          Main Label
          <div slot="description">Description text</div>
        </ks-switch>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const descSlot = page.root.querySelector('div[slot="description"]');
    expect(descSlot).not.toBeNull();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(descSlot.textContent).toContain('Description text');
  });

  it('should render with tag content when size is md', async () => {
    const page = await newSpecPage({
      components: [KsSwitch, KsTag],
      template: () => (
        <ks-switch size="md" tag-content="New">
          Switch with Tag
        </ks-switch>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const tag = page.root.shadowRoot.querySelector('ks-tag');
    expect(tag).not.toBeNull();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(tag.textContent).toContain('New');
  });

  it('should not render tag when size is sm', async () => {
    const page = await newSpecPage({
      components: [KsSwitch],
      template: () => (
        <ks-switch size="sm" tag-content="New">
          Small Switch
        </ks-switch>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const tag = page.root.shadowRoot.querySelector('ks-tag');
    expect(tag).toBeNull();
  });

  it('should render with label on the right', async () => {
    const page = await newSpecPage({
      components: [KsSwitch],
      template: () => <ks-switch label-position="right">Right Label</ks-switch>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const content = page.root.shadowRoot.querySelector('.switch__content');
    expect(content).toHaveClass('switch--right');
  });

  it('should update checked state when prop changes', async () => {
    const page = await newSpecPage({
      components: [KsSwitch],
      template: () => <ks-switch checked={false}>Controlled Switch</ks-switch>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    let switchEl = page.root.shadowRoot.querySelector('.switch');
    expect(switchEl).not.toHaveClass('switch--checked');

    // Update the checked prop
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    page.root.checked = true;
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    switchEl = page.root.shadowRoot.querySelector('.switch');
    expect(switchEl).toHaveClass('switch--checked');
  });
});
