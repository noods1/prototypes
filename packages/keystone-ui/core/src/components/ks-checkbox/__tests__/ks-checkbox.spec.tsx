import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsCheckbox } from '../index';

describe('ks-checkbox component', () => {
  // Basic rendering
  describe('basic rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [KsCheckbox],
        template: () => <ks-checkbox>Label</ks-checkbox>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const label = page.root.shadowRoot.querySelector('label');
      expect(label).toBeTruthy();
      expect(label).toHaveClass('checkbox');
      expect(label).toHaveClass('checkbox--md');
      expect(label).toHaveClass('checkbox--align-center');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const input: HTMLInputElement = page.root.shadowRoot.querySelector('[data-testid="ks-checkbox-index-hCMjrk"]');
      expect(input).toBeTruthy();
      expect(input.checked).toBe(false);
      expect(input.disabled).toBe(false);
    });

    it('should render as checked when checked prop is true', async () => {
      const page = await newSpecPage({
        components: [KsCheckbox],
        template: () => <ks-checkbox checked>Label</ks-checkbox>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const input: HTMLInputElement = page.root.shadowRoot.querySelector('[data-testid="ks-checkbox-index-hCMjrk"]');
      expect(input.checked).toBe(true);
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const labelEl = page.root.shadowRoot.querySelector('label');
      expect(labelEl).toHaveClass('checkbox--checked');
    });

    it('should render as checked when defaultChecked is true (uncontrolled)', async () => {
      const page = await newSpecPage({
        components: [KsCheckbox],
        template: () => <ks-checkbox defaultChecked>Label</ks-checkbox>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const input: HTMLInputElement = page.root.shadowRoot.querySelector('[data-testid="ks-checkbox-index-hCMjrk"]');
      expect(input.checked).toBe(true);
    });

    it('should render as disabled', async () => {
      const page = await newSpecPage({
        components: [KsCheckbox],
        template: () => <ks-checkbox disabled>Label</ks-checkbox>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const input: HTMLInputElement = page.root.shadowRoot.querySelector('[data-testid="ks-checkbox-index-hCMjrk"]');
      expect(input.disabled).toBe(true);
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const labelEl = page.root.shadowRoot.querySelector('label');
      expect(labelEl).toHaveClass('checkbox--disabled');
    });

    it('should render as indeterminate', async () => {
      const page = await newSpecPage({
        components: [KsCheckbox],
        template: () => (
          <ks-checkbox indeterminate checked>
            Label
          </ks-checkbox>
        ),
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const labelEl = page.root.shadowRoot.querySelector('label');
      expect(labelEl).toHaveClass('checkbox--indeterminate');
      // Should render indeterminate icon
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const indIcon = page.root.shadowRoot.querySelector('.checkbox__display__icon');
      expect(indIcon).toBeTruthy();
    });

    it('should render with align flex-start', async () => {
      const page = await newSpecPage({
        components: [KsCheckbox],
        template: () => <ks-checkbox align="flex-start">Label</ks-checkbox>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const labelEl = page.root.shadowRoot.querySelector('label');
      expect(labelEl).toHaveClass('checkbox--align-flex-start');
    });

    it('should render with size sm', async () => {
      const page = await newSpecPage({
        components: [KsCheckbox],
        template: () => <ks-checkbox size="sm">Label</ks-checkbox>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const labelEl = page.root.shadowRoot.querySelector('label');
      expect(labelEl).toHaveClass('checkbox--sm');
    });
  });

  // Slot rendering
  describe('slots', () => {
    it('should render label slot content', async () => {
      const page = await newSpecPage({
        components: [KsCheckbox],
        template: () => (
          <ks-checkbox>
            <span slot="label">Custom Label</span>
          </ks-checkbox>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const labelSlot = page.root.querySelector('[slot="label"]');
      expect(labelSlot).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(labelSlot.textContent).toBe('Custom Label');
    });

    it('should render default slot as label text', async () => {
      const page = await newSpecPage({
        components: [KsCheckbox],
        template: () => <ks-checkbox>Label Text</ks-checkbox>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.textContent).toContain('Label Text');
    });
  });

  // Accessibility
  describe('accessibility', () => {
    it('should have role and aria-checked', async () => {
      const page = await newSpecPage({
        components: [KsCheckbox],
        template: () => <ks-checkbox checked>Label</ks-checkbox>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.getAttribute('role')).toBe('checkbox');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.getAttribute('aria-checked')).toBe('true');
    });

    it('should have aria-checked="mixed" when indeterminate', async () => {
      const page = await newSpecPage({
        components: [KsCheckbox],
        template: () => (
          <ks-checkbox indeterminate checked>
            Label
          </ks-checkbox>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.getAttribute('aria-checked')).toBe('mixed');
    });

    it('should have part attributes for styling', async () => {
      const page = await newSpecPage({
        components: [KsCheckbox],
        template: () => <ks-checkbox>Label</ks-checkbox>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const label = page.root.shadowRoot.querySelector('label');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const display = page.root.shadowRoot.querySelector('.checkbox__display');

      expect(label).toEqualAttribute('part', 'self');
      expect(display).toEqualAttribute('part', 'display');
    });
  });

  // CSS class logic
  describe('CSS class logic', () => {
    it('should apply correct base and state classes', async () => {
      const page = await newSpecPage({
        components: [KsCheckbox],
        template: () => (
          <ks-checkbox checked disabled indeterminate align="flex-start" size="sm">
            Label
          </ks-checkbox>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const labelEl = page.root.shadowRoot.querySelector('label');
      expect(labelEl).toHaveClasses([
        'checkbox',
        'checkbox--checked',
        'checkbox--disabled',
        'checkbox--indeterminate',
        'checkbox--align-flex-start',
        'checkbox--sm',
      ]);
    });
  });

  // Edge cases
  describe('edge cases', () => {
    it('should handle empty label', async () => {
      const page = await newSpecPage({
        components: [KsCheckbox],
        template: () => <ks-checkbox></ks-checkbox>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.textContent).toBe('');
    });

    it('should handle special characters in label', async () => {
      const specialLabel = '& < > " \\\'';
      const page = await newSpecPage({
        components: [KsCheckbox],
        template: () => <ks-checkbox>{specialLabel}</ks-checkbox>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.textContent).toBe(specialLabel);
    });

    it('should handle long label', async () => {
      const longLabel = 'A'.repeat(1000);
      const page = await newSpecPage({
        components: [KsCheckbox],
        template: () => <ks-checkbox>{longLabel}</ks-checkbox>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.textContent).toBe(longLabel);
    });

    it('should prevent default event when click description', async () => {
      const page = await newSpecPage({
        components: [KsCheckbox],
        template: () => (
          <ks-checkbox>
            <span slot="description">Description</span>
          </ks-checkbox>
        ),
      });

      await page.waitForChanges();

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const descriptionSlot = page.root.querySelector('[slot="description"]');
      expect(descriptionSlot).toBeTruthy();

      const event = new Event('click');
      page.rootInstance.preventDefault(event);
      expect(event.defaultPrevented).toBe(true);
    });
  });
});
