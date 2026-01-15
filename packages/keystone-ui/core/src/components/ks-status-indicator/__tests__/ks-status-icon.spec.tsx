import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsStatusIcon } from '../ks-status-icon';

describe('ks-status-icon component', () => {
  // Basic rendering
  describe('basic rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [KsStatusIcon],
        template: () => <ks-status-icon></ks-status-icon>,
      });

      const host = page.root;
      expect(host).toHaveAttribute('ks-status-icon');
      expect(host).toEqualAttribute('role', 'status');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const wrapper = page.root.shadowRoot.querySelector('.status-icon');
      expect(wrapper).toBeTruthy();

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const icon = page.root.shadowRoot.querySelector('ks-icon-filled-info');
      expect(icon).toBeTruthy();
      expect(icon).toEqualAttribute('size', 24);
    });
  });

  // Variant and size props
  describe('variant and size', () => {
    it('should render with variant success', async () => {
      const page = await newSpecPage({
        components: [KsStatusIcon],
        template: () => <ks-status-icon variant="success"></ks-status-icon>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const icon = page.root.shadowRoot.querySelector('ks-icon-filled-check');
      expect(icon).toBeTruthy();
    });

    it('should render with variant error', async () => {
      const page = await newSpecPage({
        components: [KsStatusIcon],
        template: () => <ks-status-icon variant="error"></ks-status-icon>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const icon = page.root.shadowRoot.querySelector('ks-icon-filled-caution');
      expect(icon).toBeTruthy();
    });

    it('should render with variant warning', async () => {
      const page = await newSpecPage({
        components: [KsStatusIcon],
        template: () => <ks-status-icon variant="warning"></ks-status-icon>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const icon = page.root.shadowRoot.querySelector('ks-icon-filled-warning');
      expect(icon).toBeTruthy();
    });

    it('should render with variant suggestion', async () => {
      const page = await newSpecPage({
        components: [KsStatusIcon],
        template: () => <ks-status-icon variant="suggestion"></ks-status-icon>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const icon = page.root.shadowRoot.querySelector('ks-icon-filled-tips');
      expect(icon).toBeTruthy();
    });

    it('should render with variant neutral', async () => {
      const page = await newSpecPage({
        components: [KsStatusIcon],
        template: () => <ks-status-icon variant="neutral"></ks-status-icon>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const icon = page.root.shadowRoot.querySelector('ks-icon-filled-info');
      expect(icon).toBeTruthy();
    });

    it('should render with variant disapproval', async () => {
      const page = await newSpecPage({
        components: [KsStatusIcon],
        template: () => <ks-status-icon variant="disapproval"></ks-status-icon>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const icon = page.root.shadowRoot.querySelector('ks-icon-filled-disapproval');
      expect(icon).toBeTruthy();
    });

    it('should render with variant limitedApproval', async () => {
      const page = await newSpecPage({
        components: [KsStatusIcon],
        template: () => <ks-status-icon variant="limitedApproval"></ks-status-icon>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const icon = page.root.shadowRoot.querySelector('ks-icon-filled-limited-approval');
      expect(icon).toBeTruthy();
    });

    it('should render with variant successLow', async () => {
      const page = await newSpecPage({
        components: [KsStatusIcon],
        template: () => <ks-status-icon variant="successLow"></ks-status-icon>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const icon = page.root.shadowRoot.querySelector('ks-icon-filled-check');
      expect(icon).toBeTruthy();
    });

    it('should render with variant inProgress', async () => {
      const page = await newSpecPage({
        components: [KsStatusIcon],
        template: () => <ks-status-icon variant="inProgress"></ks-status-icon>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const icon = page.root.shadowRoot.querySelector('ks-icon-filled-in-progress');
      expect(icon).toBeTruthy();
    });

    it('should render with size sm', async () => {
      const page = await newSpecPage({
        components: [KsStatusIcon],
        template: () => <ks-status-icon size="sm"></ks-status-icon>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const icon = page.root.shadowRoot.querySelector('ks-icon-filled-info');
      expect(icon).toEqualAttribute('size', 16);
    });
  });

  // stroke prop
  describe('stroke prop', () => {
    it('should apply stroke color', async () => {
      const page = await newSpecPage({
        components: [KsStatusIcon],
        template: () => <ks-status-icon stroke="red"></ks-status-icon>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const wrapper = page.root.shadowRoot.querySelector('.status-icon') as HTMLElement;
      expect(wrapper.style.getPropertyValue('--ks-stroke-color')).toBe('red');
    });
  });

  // Accessibility and part attributes
  describe('accessibility', () => {
    it('should have ks-status-icon and role attributes on host', async () => {
      const page = await newSpecPage({
        components: [KsStatusIcon],
        template: () => <ks-status-icon></ks-status-icon>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.hasAttribute('ks-status-icon')).toBe(true);
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.getAttribute('role')).toBe('status');
    });

    it('should have dir attribute', async () => {
      const page = await newSpecPage({
        components: [KsStatusIcon],
        template: () => <ks-status-icon></ks-status-icon>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.getAttribute('dir')).toBe('ltr');
    });
  });
});
