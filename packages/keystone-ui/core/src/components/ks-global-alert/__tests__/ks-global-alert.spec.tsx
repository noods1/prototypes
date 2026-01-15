import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsGlobalAlert } from '../index';
import type { GlobalAlertVariant } from '@src/entities';

describe('ks-global-alert component', () => {
  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => <ks-global-alert>Alert Content</ks-global-alert>,
      });

      expect(page.root).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.tagName).toEqual('KS-GLOBAL-ALERT');
      expect(page.root).toEqualAttribute('role', 'alert');
      expect(page.root).toHaveAttribute('dir');
    });

    it('should render proper HTML structure when visible', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => <ks-global-alert>Alert Content</ks-global-alert>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const globalAlert = page.root.shadowRoot.querySelector('.global-alert');
      expect(globalAlert).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(globalAlert.tagName).toEqual('DIV');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(globalAlert.getAttribute('part')).toEqual('self');
    });

    it('should not render when visible is false', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => <ks-global-alert visible={false}>Alert Content</ks-global-alert>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const globalAlert = page.root.shadowRoot.querySelector('.global-alert');
      expect(globalAlert).toBeFalsy();
    });

    it('should render child content in default slot', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => <ks-global-alert>Custom Alert Content</ks-global-alert>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.textContent).toEqual('Custom Alert Content');
    });

    it('should render complex content in slot', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => (
          <ks-global-alert>
            <span>Complex</span> <strong>Content</strong>
          </ks-global-alert>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.innerHTML).toContain('<span>Complex</span>');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.innerHTML).toContain('<strong>Content</strong>');
    });
  });

  // Variant Tests
  describe('Variants', () => {
    const variants: GlobalAlertVariant[] = ['info', 'warning', 'error'];

    variants.forEach((variant) => {
      it(`should render ${variant} variant correctly`, async () => {
        const page = await newSpecPage({
          components: [KsGlobalAlert],
          template: () => <ks-global-alert variant={variant}>Alert Content</ks-global-alert>,
        });

        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const globalAlert = page.root.shadowRoot.querySelector('.global-alert');
        expect(globalAlert).toHaveClass(`global-alert--${variant}`);
      });
    });

    it('should default to info variant', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => <ks-global-alert>Alert Content</ks-global-alert>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const globalAlert = page.root.shadowRoot.querySelector('.global-alert');
      expect(globalAlert).toHaveClass('global-alert--info');
    });
  });

  // Icon Tests
  describe('Icon', () => {
    it('should render default icon when showIcon is true', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => <ks-global-alert>Alert Content</ks-global-alert>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const iconSlot = page.root.shadowRoot.querySelector('[name="icon"]');
      expect(iconSlot).toBeTruthy();

      // Check for default icon based on variant
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const icon = page.root.shadowRoot.querySelector('ks-icon-filled-info');
      expect(icon).toBeTruthy();
    });

    it('should not render icon when showIcon is false', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => <ks-global-alert showIcon={false}>Alert Content</ks-global-alert>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const iconSlot = page.root.shadowRoot.querySelector('[name="icon"]');
      expect(iconSlot).toBeFalsy();
    });

    it('should render custom icon when provided', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => (
          <ks-global-alert>
            Alert Content
            <div slot="icon">Custom Icon</div>
          </ks-global-alert>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const customIcon = page.root.querySelector('[slot="icon"]');
      expect(customIcon).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(customIcon.textContent).toEqual('Custom Icon');
    });

    it('should render correct icon for warning variant', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => <ks-global-alert variant="warning">Alert Content</ks-global-alert>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const icon = page.root.shadowRoot.querySelector('ks-icon-filled-warning');
      expect(icon).toBeTruthy();
    });

    it('should render correct icon for error variant', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => <ks-global-alert variant="error">Alert Content</ks-global-alert>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const icon = page.root.shadowRoot.querySelector('ks-icon-filled-caution');
      expect(icon).toBeTruthy();
    });
  });

  // Close Button Tests
  describe('Close Button', () => {
    it('should render close button when hasClose is true', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => <ks-global-alert>Alert Content</ks-global-alert>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const closeButton = page.root.shadowRoot.querySelector('.global-alert__close');
      expect(closeButton).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(closeButton.getAttribute('data-testid')).toEqual('ks-global-alert-index-8kHUB3');
    });

    it('should not render close button when hasClose is false', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => <ks-global-alert hasClose={false}>Alert Content</ks-global-alert>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const closeButton = page.root.shadowRoot.querySelector('.global-alert__close');
      expect(closeButton).toBeFalsy();
    });

    it('should render custom close button when provided', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => (
          <ks-global-alert>
            Alert Content
            <div slot="closebtn">Custom Close</div>
          </ks-global-alert>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const customClose = page.root.querySelector('[slot="closebtn"]');
      expect(customClose).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(customClose.textContent).toEqual('Custom Close');
    });

    it('should render default close button structure', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => <ks-global-alert>Alert Content</ks-global-alert>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const closeButton = page.root.shadowRoot.querySelector('.global-alert__close');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const button = closeButton.querySelector('ks-button');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const icon = closeButton.querySelector('ks-icon-close');

      expect(button).toBeTruthy();
      expect(icon).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(icon.getAttribute('size')).toEqual('14');
    });
  });

  // Title Slot Tests
  describe('Title Slot', () => {
    it.skip('should render title when provided', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => (
          <ks-global-alert>
            Alert Content
            <div slot="title">Alert Title</div>
          </ks-global-alert>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const title = page.root.querySelector('[slot="title"]');
      expect(title).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(title.textContent).toEqual('Alert Title');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const titleContainer = page.root.shadowRoot.querySelector('.global-alert__body-title');
      expect(titleContainer).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(titleContainer.getAttribute('part')).toEqual('title');
    });

    it('should not render title container when no title slot', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => <ks-global-alert>Alert Content</ks-global-alert>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const titleContainer = page.root.shadowRoot.querySelector('.global-alert__body-title');
      expect(titleContainer).toBeFalsy();
    });
  });

  // Content Slot Tests
  describe('Content Slot', () => {
    it('should render content slot when provided', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => (
          <ks-global-alert>
            Default Content
            <div slot="content">Additional Content</div>
          </ks-global-alert>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const content = page.root.querySelector('[slot="content"]');
      expect(content).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(content.textContent).toEqual('Additional Content');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const contentContainer = page.root.shadowRoot.querySelector('.global-alert__body-content');
      expect(contentContainer).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(contentContainer.getAttribute('part')).toEqual('content');
    });

    it('should render both default and content slots', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => (
          <ks-global-alert>
            Default Content
            <div slot="content">Additional Content</div>
          </ks-global-alert>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.textContent).toContain('Default Content');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.textContent).toContain('Additional Content');
    });
  });

  // Pagination Slot Tests
  describe('Pagination Slot', () => {
    it('should render pagination slot when provided', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => (
          <ks-global-alert>
            Alert Content
            <div slot="pagination">Page 1 of 3</div>
          </ks-global-alert>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const pagination = page.root.querySelector('[slot="pagination"]');
      expect(pagination).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(pagination.textContent).toEqual('Page 1 of 3');
    });
  });

  // Body Structure Tests
  describe('Body Structure', () => {
    it('should render body container correctly', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => <ks-global-alert>Alert Content</ks-global-alert>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const body = page.root.shadowRoot.querySelector('.global-alert__body');
      expect(body).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(body.getAttribute('part')).toEqual('body');
    });

    it('should render content container correctly', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => <ks-global-alert>Alert Content</ks-global-alert>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const content = page.root.shadowRoot.querySelector('.global-alert__body-content');
      expect(content).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(content.getAttribute('part')).toEqual('content');
    });
  });

  // Event Handling Tests
  describe('Event Handling', () => {
    it('should handle close button click', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => <ks-global-alert>Alert Content</ks-global-alert>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const closeButton = page.root.shadowRoot.querySelector('.global-alert__close') as HTMLElement;
      const closeSpy = jest.fn();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      page.root.addEventListener('ksClose', closeSpy);

      closeButton.click();
      expect(closeSpy).toHaveBeenCalled();
    });
  });

  // Animation Tests
  describe('Animation', () => {
    it('should handle visible prop changes with animation disabled', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => <ks-global-alert disableAnimation>Alert Content</ks-global-alert>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const globalAlert = page.root.shadowRoot.querySelector('.global-alert');
      expect(globalAlert).toBeTruthy();

      // Change visible prop
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      page.root.visible = false;
      await page.waitForChanges();

      // With animation disabled, it should immediately hide
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const hiddenAlert = page.root.shadowRoot.querySelector('.global-alert');
      expect(hiddenAlert).toBeFalsy();
    });

    it('should emit ksAfterClose event when animation completes', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => <ks-global-alert>Alert Content</ks-global-alert>,
      });

      const afterCloseSpy = jest.fn();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      page.root.addEventListener('ksAfterClose', afterCloseSpy);

      // Change visible prop to false
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      page.root.visible = false;
      await page.waitForChanges();

      expect(afterCloseSpy).toHaveBeenCalled();
    });
  });

  // Size Calculation Tests
  describe('Size Calculation', () => {
    it('should set default size to 16 for horizontal orientation', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => <ks-global-alert>Alert Content</ks-global-alert>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const icon = page.root.shadowRoot.querySelector('ks-icon-filled-info');
      expect(icon).toEqualAttribute('size', '16');
    });
  });

  // Accessibility Tests
  describe('Accessibility', () => {
    it('should have proper role attribute', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => <ks-global-alert>Alert Content</ks-global-alert>,
      });

      expect(page.root).toEqualAttribute('role', 'alert');
    });

    it('should have proper part attributes', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => <ks-global-alert>Alert Content</ks-global-alert>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const globalAlert = page.root.shadowRoot.querySelector('.global-alert');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(globalAlert.getAttribute('part')).toEqual('self');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const body = page.root.shadowRoot.querySelector('.global-alert__body');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(body.getAttribute('part')).toEqual('body');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const content = page.root.shadowRoot.querySelector('.global-alert__body-content');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(content.getAttribute('part')).toEqual('content');
    });
  });

  // RTL Support Tests
  describe('RTL Support', () => {
    it('should have dir attribute on host element', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => <ks-global-alert>Alert Content</ks-global-alert>,
      });

      expect(page.root).toHaveAttribute('dir');
    });

    it('should have dir attribute on global alert element', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => <ks-global-alert>Alert Content</ks-global-alert>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const globalAlert = page.root.shadowRoot.querySelector('.global-alert');
      expect(globalAlert).toHaveAttribute('dir');
    });
  });

  // Complex Scenarios
  describe('Complex Scenarios', () => {
    it('should handle all props together with all slots', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => (
          <ks-global-alert variant="warning" showIcon hasClose disableAnimation>
            Default Content
            <div slot="icon">Custom Icon</div>
            <div slot="title">Alert Title</div>
            <div slot="content">Additional Content</div>
            <div slot="link">Click Here</div>
            <div slot="pagination">Page 1 of 3</div>
          </ks-global-alert>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const globalAlert = page.root.shadowRoot.querySelector('.global-alert');
      expect(globalAlert).toHaveClasses(['global-alert', 'global-alert--horizontal', 'global-alert--warning']);

      // Check all slots are rendered
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.querySelector('[slot="icon"]')).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.querySelector('[slot="title"]')).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.querySelector('[slot="content"]')).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.querySelector('[slot="link"]')).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.querySelector('[slot="pagination"]')).toBeTruthy();

      // Check icon size for horizontal orientation
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const icon = page.root.shadowRoot.querySelector('ks-icon-filled-warning');
      expect(icon).toEqualAttribute('size', '16');
    });

    it('should handle minimal configuration', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => (
          <ks-global-alert showIcon={false} hasClose={false} disableAnimation>
            Minimal Content
          </ks-global-alert>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const globalAlert = page.root.shadowRoot.querySelector('.global-alert');
      expect(globalAlert).toBeTruthy();

      // Should not have icon or close button
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const iconSlot = page.root.shadowRoot.querySelector('[name="icon"]');
      expect(iconSlot).toBeFalsy();

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const closeButton = page.root.shadowRoot.querySelector('.global-alert__close');
      expect(closeButton).toBeFalsy();

      // Should have default classes
      expect(globalAlert).toHaveClasses(['global-alert', 'global-alert--horizontal', 'global-alert--info']);
    });
  });

  // CSS Class Logic Tests
  describe('CSS Class Logic', () => {
    it('should apply all base classes correctly', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => <ks-global-alert>Alert Content</ks-global-alert>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const globalAlert = page.root.shadowRoot.querySelector('.global-alert');
      expect(globalAlert).toHaveClasses(['global-alert', 'global-alert--horizontal', 'global-alert--info']);
    });

    it('should combine variant and orientation classes', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => <ks-global-alert variant="error">Alert Content</ks-global-alert>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const globalAlert = page.root.shadowRoot.querySelector('.global-alert');
      expect(globalAlert).toHaveClasses(['global-alert', 'global-alert--horizontal', 'global-alert--error']);
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('should handle empty content', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => <ks-global-alert></ks-global-alert>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const globalAlert = page.root.shadowRoot.querySelector('.global-alert');
      expect(globalAlert).toBeTruthy();
    });

    it('should handle only content slot', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => (
          <ks-global-alert>
            <div slot="content">Only Content</div>
          </ks-global-alert>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const content = page.root.querySelector('[slot="content"]');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(content.textContent).toEqual('Only Content');
    });
  });

  // Link Slot Tests
  describe.skip('Link Slot', () => {
    it('should render link area when link slot is provided', async () => {
      const page = await newSpecPage({
        components: [KsGlobalAlert],
        template: () => (
          <ks-global-alert>
            Alert Content
            <div slot="link">Click Here</div>
          </ks-global-alert>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const linkArea = page.root.shadowRoot.querySelector('.global-alert__body-link');
      expect(linkArea).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(linkArea.getAttribute('part')).toEqual('link');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(linkArea.getAttribute('data-testid')).toEqual('ks-global-alert-index-22C6cW');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.querySelector('[slot="link"]');
      expect(link).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(link.textContent).toEqual('Click Here');
    });
  });
});
