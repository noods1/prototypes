import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsButton } from '../index';
import type { BtnVariant, BtnSize, BtnShape, BtnHTMLType } from '@src/entities';

describe('ks-button component', () => {
  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [KsButton],
        template: () => <ks-button>Button</ks-button>,
      });

      expect(page.root).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.textContent).toEqual('Button');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.shadowRoot.querySelector('button')).toHaveClasses(['button--md', 'button--angle']);
    });

    it('should render with custom text content', async () => {
      const page = await newSpecPage({
        components: [KsButton],
        template: () => <ks-button>Custom Button Text</ks-button>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.textContent).toEqual('Custom Button Text');
    });

    it('should render proper HTML structure', async () => {
      const page = await newSpecPage({
        components: [KsButton],
        template: () => <ks-button>Button</ks-button>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const button = page.root.shadowRoot.querySelector('button');

      expect(button).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(button.tagName).toEqual('BUTTON');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(button.type).toEqual('button');
    });
  });

  // Variant Tests
  describe('Variants', () => {
    const variants: BtnVariant[] = ['default', 'primary', 'secondary', 'tertiary', 'text', 'inverse', 'alert'];

    variants.forEach((variant) => {
      it(`should render ${variant} variant correctly`, async () => {
        const page = await newSpecPage({
          components: [KsButton],
          template: () => <ks-button variant={variant}>Button</ks-button>,
        });

        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const button = page.root.shadowRoot.querySelector('button');

        expect(button).toBeTruthy();

        // Check that variant-specific classes are applied
        switch (variant) {
          case 'primary':
            expect(button).toHaveClasses(['button--type-contained', 'button--color-primary']);
            return;
          case 'secondary':
            expect(button).toHaveClasses(['button--type-contained', 'button--color-neutral']);
            return;
          case 'tertiary':
            expect(button).toHaveClasses(['button--type-outlined', 'button--color-neutral']);
            return;
          case 'text':
            expect(button).toHaveClasses(['button--type-plain', 'button--color-neutral']);
            return;
          case 'inverse':
            expect(button).toHaveClasses(['button--type-plain', 'button--color-primary']);
            return;
          case 'alert':
            expect(button).toHaveClasses(['button--type-contained', 'button--color-error']);
            return;
        }
      });
    });

    it('should apply correct variant mapping for primary', async () => {
      const page = await newSpecPage({
        components: [KsButton],
        template: () => <ks-button variant="primary">Button</ks-button>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const button = page.root.shadowRoot.querySelector('button');

      expect(button).toHaveClasses(['button--type-contained', 'button--color-primary']);
    });

    it('should apply correct variant mapping for secondary', async () => {
      const page = await newSpecPage({
        components: [KsButton],
        template: () => <ks-button variant="secondary">Button</ks-button>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const button = page.root.shadowRoot.querySelector('button');

      expect(button).toHaveClasses(['button--type-contained', 'button--color-neutral']);
    });
  });

  // Size Tests
  describe('Sizes', () => {
    const sizes: BtnSize[] = ['xs', 'sm', 'md', 'lg'];

    sizes.forEach((size) => {
      it(`should render ${size} size correctly`, async () => {
        const page = await newSpecPage({
          components: [KsButton],
          template: () => (
            <ks-button size={size} variant="text">
              Button
            </ks-button>
          ),
        });

        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const button = page.root.shadowRoot.querySelector('button');

        expect(button).toHaveClass(`button--${size}`);
      });
    });

    it('should adjust xs size to sm for non text or inverse variant', async () => {
      const page = await newSpecPage({
        components: [KsButton],
        template: () => (
          <ks-button variant="primary" size="xs">
            Button
          </ks-button>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const button = page.root.shadowRoot.querySelector('button');

      expect(button).toHaveClass('button--sm');
      expect(button).not.toHaveClass('button--xs');
    });
  });

  // Shape Tests
  describe('Shapes', () => {
    const shapes: BtnShape[] = ['angle', 'round', 'cycle', 'square'];

    shapes.forEach((shape) => {
      it(`should render ${shape} shape correctly`, async () => {
        const page = await newSpecPage({
          components: [KsButton],
          template: () => <ks-button shape={shape}>Button</ks-button>,
        });

        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const button = page.root.shadowRoot.querySelector('button');

        expect(button).toHaveClass(`button--${shape}`);
      });
    });
  });

  // State Tests
  describe('States', () => {
    it('should render disabled state correctly', async () => {
      const page = await newSpecPage({
        components: [KsButton],
        template: () => <ks-button disabled>Button</ks-button>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const button = page.root.shadowRoot.querySelector('button');

      expect(button).toHaveClass('button--disabled');
      expect(button).toHaveAttribute('disabled');
      expect(page.root).toEqualAttribute('aria-disabled', 'true');
    });

    it('should render loading state correctly', async () => {
      const page = await newSpecPage({
        components: [KsButton],
        template: () => <ks-button loading>Button</ks-button>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const button = page.root.shadowRoot.querySelector('button');

      expect(button).toHaveClass('button--loading');
      expect(button).toHaveClass('button--disabled');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const loadingIcon = page.root.shadowRoot.querySelector('ks-icon-loading');

      expect(loadingIcon).toBeTruthy();
      expect(loadingIcon).toHaveClass('button__loading-icon');
    });

    it('should render force active state correctly', async () => {
      const page = await newSpecPage({
        components: [KsButton],
        template: () => <ks-button forceActive>Button</ks-button>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const button = page.root.shadowRoot.querySelector('button');

      expect(button).toHaveClass('button--force-active');
    });

    it('should handle combined states', async () => {
      const page = await newSpecPage({
        components: [KsButton],
        template: () => (
          <ks-button disabled loading forceActive>
            Button
          </ks-button>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const button = page.root.shadowRoot.querySelector('button');

      expect(button).toHaveClasses(['button--disabled', 'button--loading', 'button--force-active']);
    });
  });

  // HTML Type Tests
  describe('HTML Types', () => {
    const htmlTypes: BtnHTMLType[] = ['button', 'submit', 'reset'];

    htmlTypes.forEach((type) => {
      it(`should render ${type} html type correctly`, async () => {
        const page = await newSpecPage({
          components: [KsButton],
          template: () => <ks-button htmlType={type}>Button</ks-button>,
        });

        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const button = page.root.shadowRoot.querySelector('button');

        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        expect(button.type).toBe(type);
      });
    });
  });

  // Layout Tests
  describe('Layout', () => {
    it('should render block layout correctly', async () => {
      const page = await newSpecPage({
        components: [KsButton],
        template: () => <ks-button block>Button</ks-button>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const button = page.root.shadowRoot.querySelector('button');

      expect(button).toHaveClass('button--block');
      expect(page.root).toHaveClass('button-host-block');
    });
  });

  // Loading State Tests
  describe('Loading State', () => {
    it('should show default loading spinner', async () => {
      const page = await newSpecPage({
        components: [KsButton],
        template: () => <ks-button loading>Button</ks-button>,
      });

      expect(page.root?.textContent).toBe('Button');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const loadingIcon = page.root.shadowRoot.querySelector('ks-icon-loading');

      expect(loadingIcon).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(loadingIcon.getAttribute('size')).toBe('16');
    });

    it('should show smaller loading icon for small sizes', async () => {
      const page = await newSpecPage({
        components: [KsButton],
        template: () => (
          <ks-button loading size="sm">
            Button
          </ks-button>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const loadingIcon = page.root.shadowRoot.querySelector('ks-icon-loading');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(loadingIcon.getAttribute('size')).toBe('14');
    });

    it('should show custom loading content when slot is provided', async () => {
      const page = await newSpecPage({
        components: [KsButton],
        template: () => (
          <ks-button loading>
            Button
            <div slot="loading">Custom Loading</div>
          </ks-button>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const customLoading = page.root.querySelector('[slot="loading"]');

      expect(customLoading).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(customLoading.textContent).toBe('Custom Loading');
    });

    it('should hide button content when loading', async () => {
      const page = await newSpecPage({
        components: [KsButton],
        template: () => <ks-button loading>Button Content</ks-button>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const button = page.root.shadowRoot.querySelector('button');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(button.textContent.trim()).not.toContain('Button Content');
    });

    it('should hide default slot when shape is square and loading', async () => {
      const page = await newSpecPage({
        components: [KsButton],
        template: () => (
          <ks-button shape="square" loading>
            Button
          </ks-button>
        ),
      });

      const defaultSlot = page.root?.shadowRoot?.querySelector('slot:not([name])');

      expect(defaultSlot).toBeNull();
    });
  });

  // Interaction Tests
  describe('Interactions', () => {
    it('should handle click events', async () => {
      const page = await newSpecPage({
        components: [KsButton],
        template: () => <ks-button>Button</ks-button>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const button = page.root.shadowRoot.querySelector('button');
      const clickSpy = jest.fn();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      button.addEventListener('click', clickSpy);

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      button.click();

      expect(clickSpy).toHaveBeenCalled();
    });

    it('should prevent click when disabled', async () => {
      const page = await newSpecPage({
        components: [KsButton],
        template: () => <ks-button disabled>Button</ks-button>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const button = page.root.shadowRoot.querySelector('button');

      expect(button).toHaveAttribute('disabled');
    });

    it('should prevent click when loading', async () => {
      const page = await newSpecPage({
        components: [KsButton],
        template: () => <ks-button loading>Button</ks-button>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const loadingIcon = page.root.shadowRoot.querySelector('.button__loading-icon');

      expect(loadingIcon).toBeTruthy();
    });
  });

  // Complex Scenarios
  describe('Complex Scenarios', () => {
    it('should handle all props together', async () => {
      const page = await newSpecPage({
        components: [KsButton],
        template: () => (
          <ks-button variant="primary" size="lg" shape="round" disabled loading block htmlType="submit" forceActive>
            Complex Button
          </ks-button>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const button = page.root.shadowRoot.querySelector('button');

      expect(button).toHaveClasses([
        'button--lg',
        'button--round',
        'button--type-contained',
        'button--color-primary',
        'button--disabled',
        'button--loading',
        'button--block',
        'button--force-active',
      ]);
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(button.type).toBe('submit');
      expect(page.root).toHaveClass('button-host-block');
    });

    it('should handle text variant with xs size adjustment', async () => {
      const page = await newSpecPage({
        components: [KsButton],
        template: () => (
          <ks-button variant="text" size="xs" loading>
            Small Text Button
          </ks-button>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const button = page.root.shadowRoot.querySelector('button');

      expect(button).toHaveClass('button--xs');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const loadingIcon = page.root.shadowRoot.querySelector('ks-icon-loading');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(loadingIcon.getAttribute('size')).toBe('14'); // sm size = 14px
    });
  });
});
