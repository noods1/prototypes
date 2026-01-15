import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsStatusIndicator } from '../index';
import { KsStatusIcon } from '../ks-status-icon';

describe('ks-status-indicator component', () => {
  // Basic rendering
  describe('basic rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [KsStatusIndicator, KsStatusIcon],
        template: () => <ks-status-indicator></ks-status-indicator>,
      });

      const host = page.root;
      expect(host).toHaveAttribute('ks-status-indicator');
      expect(host).toEqualAttribute('role', 'status');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const wrapper = page.root.shadowRoot.querySelector('.status-indicator');
      expect(wrapper).toBeTruthy();
      expect(wrapper).toHaveClass('status-indicator--inProgress');
      expect(wrapper).toHaveClass('status-indicator--md');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const dot = page.root.shadowRoot.querySelector('.status-indicator--dot');
      expect(dot).toBeTruthy();
      expect(dot).toHaveClass('status-indicator--dot--md');
    });
  });

  // Variant and size props
  describe('variant and size', () => {
    it('should render with variant success', async () => {
      const page = await newSpecPage({
        components: [KsStatusIndicator, KsStatusIcon],
        template: () => <ks-status-indicator variant="success"></ks-status-indicator>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const wrapper = page.root.shadowRoot.querySelector('.status-indicator');
      expect(wrapper).toHaveClass('status-indicator--success');
    });

    it('should render with variant error', async () => {
      const page = await newSpecPage({
        components: [KsStatusIndicator, KsStatusIcon],
        template: () => <ks-status-indicator variant="error"></ks-status-indicator>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const wrapper = page.root.shadowRoot.querySelector('.status-indicator');
      expect(wrapper).toHaveClass('status-indicator--error');
    });

    it('should render with size sm', async () => {
      const page = await newSpecPage({
        components: [KsStatusIndicator, KsStatusIcon],
        template: () => <ks-status-indicator size="sm"></ks-status-indicator>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const wrapper = page.root.shadowRoot.querySelector('.status-indicator');
      expect(wrapper).toHaveClass('status-indicator--sm');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const dot = page.root.shadowRoot.querySelector('.status-indicator--dot');
      expect(dot).toHaveClass('status-indicator--dot--sm');
    });
  });

  // Slot rendering
  describe('slot', () => {
    it('should render default slot content', async () => {
      const page = await newSpecPage({
        components: [KsStatusIndicator, KsStatusIcon],
        template: () => <ks-status-indicator>Online</ks-status-indicator>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.textContent).toContain('Online');
    });
  });

  // Accessibility and part attributes
  describe('accessibility', () => {
    it('should have ks-status-indicator and role attributes on host', async () => {
      const page = await newSpecPage({
        components: [KsStatusIndicator, KsStatusIcon],
        template: () => <ks-status-indicator></ks-status-indicator>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.hasAttribute('ks-status-indicator')).toBe(true);
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.getAttribute('role')).toBe('status');
    });

    it('should have dir attribute', async () => {
      const page = await newSpecPage({
        components: [KsStatusIndicator, KsStatusIcon],
        template: () => <ks-status-indicator></ks-status-indicator>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.getAttribute('dir')).toBe('ltr');
    });
  });

  // CSS class logic
  describe('CSS class logic', () => {
    it('should apply correct base and modifier classes', async () => {
      const page = await newSpecPage({
        components: [KsStatusIndicator, KsStatusIcon],
        template: () => <ks-status-indicator variant="warning" size="sm"></ks-status-indicator>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const wrapper = page.root.shadowRoot.querySelector('.status-indicator');
      expect(wrapper).toHaveClass('status-indicator');
      expect(wrapper).toHaveClass('status-indicator--warning');
      expect(wrapper).toHaveClass('status-indicator--sm');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const dot = page.root.shadowRoot.querySelector('.status-indicator--dot');
      expect(dot).toHaveClass('status-indicator--dot--sm');
    });
  });

  // Edge cases
  describe('edge cases', () => {
    it('should handle empty slot', async () => {
      const page = await newSpecPage({
        components: [KsStatusIndicator, KsStatusIcon],
        template: () => <ks-status-indicator></ks-status-indicator>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const wrapper = page.root.shadowRoot.querySelector('.status-indicator');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(wrapper.textContent.trim()).toBe('');
    });

    it('should handle special characters in slot', async () => {
      const specialText = '& < > " \\\'';
      const page = await newSpecPage({
        components: [KsStatusIndicator, KsStatusIcon],
        template: () => <ks-status-indicator>{specialText}</ks-status-indicator>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.textContent).toContain(specialText);
    });

    it('should handle long slot content', async () => {
      const longText = 'A'.repeat(1000);
      const page = await newSpecPage({
        components: [KsStatusIndicator, KsStatusIcon],
        template: () => <ks-status-indicator>{longText}</ks-status-indicator>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.textContent).toContain(longText);
    });
  });
});
