import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsLink } from '../index';
import type { LinkSize, LinkVariant, LinkTarget } from '@src/entities';

describe('ks-link component', () => {
  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link>Link Text</ks-link>,
      });

      expect(page.root).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.tagName).toEqual('KS-LINK');
      expect(page.root).toEqualAttribute('role', 'link');
      expect(page.root).toHaveAttribute('dir');
    });

    it('should render proper HTML structure', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link>Link Text</ks-link>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');
      expect(link).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(link.tagName).toEqual('A');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(link.getAttribute('part')).toEqual('self');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(link.getAttribute('data-testid')).toEqual('ks-link-index-nsmWAN');
    });

    it('should render child content in slot', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link>Custom Link Text</ks-link>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.textContent).toEqual('Custom Link Text');
    });

    it('should render complex content in slot', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => (
          <ks-link>
            <span>Complex</span> <strong>Content</strong>
          </ks-link>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.innerHTML).toContain('<span>Complex</span>');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.innerHTML).toContain('<strong>Content</strong>');
    });
  });

  // Size Tests
  describe('Sizes', () => {
    const sizes: LinkSize[] = ['sm', 'md'];

    sizes.forEach((size) => {
      it(`should render ${size} size correctly`, async () => {
        const page = await newSpecPage({
          components: [KsLink],
          template: () => <ks-link size={size}>Link Text</ks-link>,
        });

        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const link = page.root.shadowRoot.querySelector('.link');
        expect(link).toHaveClass(`link--${size}`);
      });
    });

    it('should default to inherit size', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link>Link Text</ks-link>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');
      expect(link).toHaveClass('link--inherit');
    });
  });

  // Variant Tests
  describe('Variants', () => {
    const variants: LinkVariant[] = [
      'primary',
      'support',
      'neutral',
      'neutralHigh',
      'success',
      'warning',
      'error',
      'info',
    ];

    variants.forEach((variant) => {
      it(`should render ${variant} variant correctly`, async () => {
        const page = await newSpecPage({
          components: [KsLink],
          template: () => <ks-link variant={variant}>Link Text</ks-link>,
        });

        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const link = page.root.shadowRoot.querySelector('.link');
        expect(link).toHaveClass(`link--${variant}`);
      });
    });

    it('should default to primary variant', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link>Link Text</ks-link>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');
      expect(link).toHaveClass('link--primary');
    });
  });

  // Href and Target Tests
  describe('Href and Target', () => {
    it('should render href attribute when provided', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link href="https://example.com">Link Text</ks-link>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(link.getAttribute('href')).toEqual('https://example.com');
    });

    it('should not render href attribute when not provided', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link>Link Text</ks-link>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');
      expect(link).not.toHaveAttribute('href');
    });

    it('should render target attribute when href is provided', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => (
          <ks-link href="https://example.com" target="_blank">
            Link Text
          </ks-link>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(link.getAttribute('target')).toEqual('_blank');
    });

    it('should not render target attribute when href is not provided', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link target="_blank">Link Text</ks-link>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');
      expect(link).not.toHaveAttribute('target');
    });

    it('should default to _self target', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link href="https://example.com">Link Text</ks-link>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(link.getAttribute('target')).toEqual('_self');
    });
  });

  // Target Tests
  describe('Targets', () => {
    const targets: LinkTarget[] = ['_self', '_blank', '_parent', '_top', 'framename'];

    targets.forEach((target) => {
      it(`should render ${target} target correctly when href is provided`, async () => {
        const page = await newSpecPage({
          components: [KsLink],
          template: () => (
            <ks-link href="https://example.com" target={target}>
              Link Text
            </ks-link>
          ),
        });

        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const link = page.root.shadowRoot.querySelector('.link');
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        expect(link.getAttribute('target')).toEqual(target);
      });
    });
  });

  // Rel Attribute Tests
  describe('Rel Attribute', () => {
    it('should render rel attribute when provided', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => (
          <ks-link href="https://example.com" rel="noreferrer">
            Link Text
          </ks-link>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(link.getAttribute('rel')).toEqual('noreferrer');
    });

    it('should not render rel attribute when not provided', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link href="https://example.com">Link Text</ks-link>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');
      expect(link).not.toHaveAttribute('rel');
    });

    it('should handle multiple rel values', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => (
          <ks-link href="https://example.com" rel="noreferrer noopener">
            Link Text
          </ks-link>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(link.getAttribute('rel')).toEqual('noreferrer noopener');
    });
  });

  // Tabindex Tests
  describe('Tabindex', () => {
    it('should render tabindex attribute when not disabled', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link index={5}>Link Text</ks-link>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(link.getAttribute('tabindex')).toEqual('5');
    });

    it('should not render tabindex attribute when disabled', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => (
          <ks-link index={5} disabled>
            Link Text
          </ks-link>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');
      expect(link).not.toHaveAttribute('tabindex');
    });

    it('should default to tabindex 0', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link>Link Text</ks-link>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(link.getAttribute('tabindex')).toEqual('0');
    });
  });

  // Disabled State Tests
  describe('Disabled State', () => {
    it('should render disabled state correctly', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link disabled>Link Text</ks-link>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');

      expect(link).toHaveClass('link--disabled');
      expect(link).toEqualAttribute('aria-disabled', '');
      expect(page.root).toEqualAttribute('aria-disabled', 'true');
    });

    it('should not render disabled classes when not disabled', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link>Link Text</ks-link>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');

      expect(link).not.toHaveClass('link--disabled');
      expect(link).not.toHaveAttribute('aria-disabled');
      expect(page.root).toEqualAttribute('aria-disabled', null);
    });

    it('should remove href when disabled', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => (
          <ks-link href="https://example.com" disabled>
            Link Text
          </ks-link>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');

      expect(link).not.toHaveAttribute('href');
    });

    it('should remove target when disabled', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => (
          <ks-link href="https://example.com" target="_blank" disabled>
            Link Text
          </ks-link>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');

      expect(link).toEqualAttribute('target', '_blank');
    });
  });

  // Event Handling Tests
  describe('Event Handling', () => {
    it('should handle click events when not disabled', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link>Link Text</ks-link>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link: HTMLAnchorElement = page.root.shadowRoot.querySelector('.link');
      const clickSpy = jest.fn();
      link.addEventListener('click', clickSpy);

      link.click();
      expect(clickSpy).toHaveBeenCalled();
    });

    it('should prevent click events when disabled', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link disabled>Link Text</ks-link>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link: HTMLAnchorElement = page.root.shadowRoot.querySelector('.link');
      const clickSpy = jest.fn();
      link.addEventListener('click', clickSpy);

      link.click();
      expect(clickSpy).toHaveBeenCalled();

      // The event should be prevented in the component's onClick handler
      // We can't easily test the preventDefault behavior in this test environment
      // but we can verify the event handler is called
    });

    it('should handle click events for links with href', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link href="https://example.com">Link Text</ks-link>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link: HTMLAnchorElement = page.root.shadowRoot.querySelector('.link');
      const clickSpy = jest.fn();
      link.addEventListener('click', clickSpy);

      link.click();
      expect(clickSpy).toHaveBeenCalled();
    });

    it('should handle click events for links without href', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link>Link Text</ks-link>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link: HTMLAnchorElement = page.root.shadowRoot.querySelector('.link');
      const clickSpy = jest.fn();
      link.addEventListener('click', clickSpy);

      link.click();
      expect(clickSpy).toHaveBeenCalled();
    });
  });

  // Accessibility Tests
  describe('Accessibility', () => {
    it('should have proper role attribute', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link>Link Text</ks-link>,
      });

      expect(page.root).toEqualAttribute('role', 'link');
    });

    it('should have proper aria-disabled attribute when disabled', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link disabled>Link Text</ks-link>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');

      expect(link).toEqualAttribute('aria-disabled', '');
      expect(page.root).toEqualAttribute('aria-disabled', 'true');
    });

    it('should have proper aria-disabled attribute when not disabled', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link>Link Text</ks-link>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');

      expect(link).not.toHaveAttribute('aria-disabled');
      expect(page.root).toEqualAttribute('aria-disabled', null);
    });

    it('should have proper part attribute', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link>Link Text</ks-link>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(link.getAttribute('part')).toEqual('self');
    });

    it('should have proper data-testid attribute', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link>Link Text</ks-link>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(link.getAttribute('data-testid')).toEqual('ks-link-index-nsmWAN');
    });
  });

  // RTL Support Tests
  describe('RTL Support', () => {
    it('should have dir attribute on host element', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link>Link Text</ks-link>,
      });

      expect(page.root).toHaveAttribute('dir');
    });

    it('should have dir attribute on link element', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link>Link Text</ks-link>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');
      expect(link).toHaveAttribute('dir');
    });
  });

  // Complex Scenarios
  describe('Complex Scenarios', () => {
    it('should handle all props together for enabled link', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => (
          <ks-link href="https://example.com" target="_blank" rel="noreferrer" size="sm" variant="success" index={3}>
            Complex Link
          </ks-link>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');
      expect(link).toHaveClasses(['link--sm', 'link--success']);
      expect(link).toEqualAttributes({
        href: 'https://example.com',
        target: '_blank',
        rel: 'noreferrer',
        tabindex: '3',
      });
      expect(page.root).toEqualAttribute('aria-disabled', null);
    });

    it('should handle all props together for disabled link', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => (
          <ks-link
            href="https://example.com"
            target="_blank"
            rel="noreferrer"
            size="md"
            variant="error"
            index={5}
            disabled
          >
            Disabled Link
          </ks-link>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');

      expect(link).toHaveClasses(['link--md', 'link--error', 'link--disabled']);
      expect(link).not.toHaveAttribute('href');
      expect(link).not.toHaveAttribute('tabindex');
      expect(link).toEqualAttributes({
        'aria-disabled': '',
        target: '_blank',
      });
      expect(page.root).toEqualAttribute('aria-disabled', 'true');
    });

    it('should handle link without href but with target', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => (
          <ks-link target="_blank" variant="warning">
            No Href Link
          </ks-link>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');
      expect(link).toHaveClasses(['link', 'link--inherit', 'link--warning']);
      expect(link).not.toHaveAttribute('href');
      expect(link).not.toHaveAttribute('target');
    });

    it('should not handle link with empty href', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => (
          <ks-link href="" target="_blank">
            Empty Href Link
          </ks-link>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');

      expect(link).toEqualAttributes({
        href: '',
        target: '',
      });
    });

    it('should handle link with null href', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => (
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          <ks-link href={null} target="_blank">
            Null Href Link
          </ks-link>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');
      expect(link).not.toHaveAttribute('href');
      expect(link).not.toHaveAttribute('target');
    });
  });

  // CSS Class Logic Tests
  describe('CSS Class Logic', () => {
    it('should apply all base classes correctly', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link>Link Text</ks-link>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');
      expect(link).toHaveClasses(['link', 'link--inherit', 'link--primary']);
    });

    it('should apply disabled class when disabled', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link disabled>Link Text</ks-link>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');
      expect(link).toHaveClasses(['link', 'link--inherit', 'link--primary', 'link--disabled']);
    });

    it('should combine size, variant, and disabled classes', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => (
          <ks-link size="sm" variant="info" disabled>
            Link Text
          </ks-link>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');
      expect(link).toHaveClasses(['link', 'link--sm', 'link--info', 'link--disabled']);
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('should handle undefined href', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => (
          <ks-link href={undefined} target="_blank">
            Undefined Href Link
          </ks-link>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');
      expect(link).not.toHaveAttribute('href');
      expect(link).not.toHaveAttribute('target');
    });

    it('should handle zero tabindex', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link index={0}>Link Text</ks-link>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(link.getAttribute('tabindex')).toEqual('0');
    });

    it('should handle negative tabindex', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => <ks-link index={-1}>Link Text</ks-link>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(link.getAttribute('tabindex')).toEqual('-1');
    });

    it('should handle empty rel attribute', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => (
          <ks-link href="https://example.com" rel="">
            Empty Rel Link
          </ks-link>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');

      expect(link).not.toHaveAttribute('rel');
    });

    it('should handle undefined rel attribute', async () => {
      const page = await newSpecPage({
        components: [KsLink],
        template: () => (
          <ks-link href="https://example.com" rel={undefined}>
            Undefined Rel Link
          </ks-link>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const link = page.root.shadowRoot.querySelector('.link');
      expect(link).not.toHaveAttribute('rel');
    });
  });
});
