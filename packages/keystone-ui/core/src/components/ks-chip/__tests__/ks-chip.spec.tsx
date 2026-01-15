import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { KsChip } from '../ks-chip';

describe('KsChip', () => {
  it('should render with basic props', async () => {
    const page = await newSpecPage({
      components: [KsChip],
      template: () => <ks-chip label="Test Chip" />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const chip = page.root.shadowRoot.querySelector('.chip');
    expect(chip).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(chip.textContent).toEqual('Test Chip');
  });

  it('should handle disabled state correctly', async () => {
    const page = await newSpecPage({
      components: [KsChip],
      template: () => <ks-chip disabled label="Disabled Chip" />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const chip = page.root.shadowRoot.querySelector('.chip');
    expect(chip).toHaveClass('chip--disabled');
  });

  it('should handle selected state correctly', async () => {
    const page = await newSpecPage({
      components: [KsChip],
      template: () => <ks-chip selected label="Selected Chip" />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const chip = page.root.shadowRoot.querySelector('.chip');
    expect(chip).toHaveClass('chip--active');
  });

  it('should handle defaultSelected state correctly', async () => {
    const page = await newSpecPage({
      components: [KsChip],
      template: () => <ks-chip defaultSelected label="Default Selected Chip" />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const chip = page.root.shadowRoot.querySelector('.chip');
    expect(chip).toHaveClass('chip--active');
  });

  it('should change selected state on click when not controlled', async () => {
    const page = await newSpecPage({
      components: [KsChip],
      template: () => <ks-chip label="Clickable Chip" />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const chip = page.root.shadowRoot.querySelector<HTMLDivElement>('.chip');
    expect(chip).not.toHaveClass('chip--active');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    chip.click();
    await page.waitForChanges();
    expect(chip).toHaveClass('chip--active');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    chip.click();
    await page.waitForChanges();
    expect(chip).not.toHaveClass('chip--active');
  });

  it('should not change when selected prop is provided', async () => {
    const page = await newSpecPage({
      components: [KsChip],
      template: () => <ks-chip selected label="Controlled Chip" />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const chip = page.root.shadowRoot.querySelector<HTMLDivElement>('.chip');
    expect(chip).toHaveClass('chip--active');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    chip.click();
    await page.waitForChanges();
    expect(chip).toHaveClass('chip--active');
  });

  it('should change when selected prop and ksChange event are provided', async () => {
    const page = await newSpecPage({
      components: [KsChip],
      template: () => (
        <ks-chip
          selected
          label="Controlled Chip"
          onKsChange={function ({ detail }) {
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            (this as HTMLKsChipElement).selected = detail;
          }}
        />
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const chip = page.root.shadowRoot.querySelector<HTMLDivElement>('.chip');
    expect(chip).toHaveClass('chip--active');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    chip.click();
    await page.waitForChanges();
    expect(chip).not.toHaveClass('chip--active');
  });

  it('should not respond to clicks when disabled', async () => {
    const page = await newSpecPage({
      components: [KsChip],
      template: () => <ks-chip disabled label="Disabled Click Chip" />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const chip = page.root.shadowRoot.querySelector<HTMLDivElement>('.chip');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    chip.click();
    await page.waitForChanges();
    expect(chip).not.toHaveClass('chip--active');
  });
});
