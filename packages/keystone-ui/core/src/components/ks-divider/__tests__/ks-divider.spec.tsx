import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsDivider } from '../index';
import type { DividerType, DividerOrientation, DividerVariant } from '@src/entities';

describe('ks-divider component', () => {
  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [KsDivider],
        template: () => <ks-divider></ks-divider>,
      });

      expect(page.root).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.tagName).toEqual('KS-DIVIDER');
      expect(page.root).toEqualAttribute('role', 'separator');
      expect(page.root).toEqualAttribute('aria-orientation', 'horizontal');
    });

    it('should render proper HTML structure for horizontal divider', async () => {
      const page = await newSpecPage({
        components: [KsDivider],
        template: () => <ks-divider></ks-divider>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const divider = page.root.shadowRoot.querySelector('.divider');

      expect(divider).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(divider.tagName).toEqual('HR');
      expect(divider).toHaveClasses(['divider', 'divider--horizontal']);
    });

    it('should render proper HTML structure for vertical divider', async () => {
      const page = await newSpecPage({
        components: [KsDivider],
        template: () => <ks-divider orientation="vertical"></ks-divider>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const divider = page.root.shadowRoot.querySelector('.divider');
      expect(divider).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(divider.tagName).toEqual('HR');
      expect(divider).toHaveClasses(['divider', 'divider--vertical']);
    });
  });

  // Orientation Tests
  describe('Orientations', () => {
    const orientations: DividerType[] = ['horizontal', 'vertical'];

    orientations.forEach((orientation) => {
      it(`should render ${orientation} orientation correctly`, async () => {
        const page = await newSpecPage({
          components: [KsDivider],
          template: () => <ks-divider orientation={orientation}></ks-divider>,
        });

        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const divider = page.root.shadowRoot.querySelector('.divider');

        expect(divider).toHaveClass(`divider--${orientation}`);
        expect(page.root).toEqualAttribute('aria-orientation', orientation);
      });
    });

    it('should default to horizontal orientation', async () => {
      const page = await newSpecPage({
        components: [KsDivider],
        template: () => <ks-divider></ks-divider>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const divider = page.root.shadowRoot.querySelector('.divider');

      expect(divider).toHaveClass('divider--horizontal');
      expect(page.root).toEqualAttribute('aria-orientation', 'horizontal');
    });
  });

  // Text Alignment Tests
  describe('Text Alignment', () => {
    const textAlignments: DividerOrientation[] = ['left', 'center', 'right'];

    textAlignments.forEach((alignment) => {
      it(`should render ${alignment} text alignment correctly`, async () => {
        const page = await newSpecPage({
          components: [KsDivider],
          template: () => <ks-divider textAlign={alignment}>Divider Text</ks-divider>,
        });

        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const divider = page.root.shadowRoot.querySelector('.divider');

        expect(divider).toHaveClasses(['divider--orientation', `divider--orientation-${alignment}`]);
      });
    });

    it('should not apply text alignment classes when no textAlign is set', async () => {
      const page = await newSpecPage({
        components: [KsDivider],
        template: () => <ks-divider>Divider Text</ks-divider>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const divider = page.root.shadowRoot.querySelector('.divider');

      expect(divider).not.toHaveClasses([
        'divider--orientation',
        'divider--orientation-left',
        'divider--orientation-center',
        'divider--orientation-right',
      ]);
    });

    it('should not apply text alignment classes for vertical dividers', async () => {
      const page = await newSpecPage({
        components: [KsDivider],
        template: () => (
          <ks-divider orientation="vertical" textAlign="center">
            Divider Text
          </ks-divider>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const divider = page.root.shadowRoot.querySelector('.divider');

      expect(divider).not.toHaveClass('divider--vertical');
    });
  });

  // Variant Tests
  describe('Variants', () => {
    const variants: DividerVariant[] = ['primary', 'support', 'neutral', 'success', 'warning', 'error'];

    variants.forEach((variant) => {
      it(`should render ${variant} variant correctly`, async () => {
        const page = await newSpecPage({
          components: [KsDivider],
          template: () => <ks-divider variant={variant}></ks-divider>,
        });

        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        expect(page.root.getAttribute('ks-color')).toEqual(variant);
      });
    });

    it('should default to neutral variant', async () => {
      const page = await newSpecPage({
        components: [KsDivider],
        template: () => <ks-divider></ks-divider>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.getAttribute('ks-color')).toEqual('neutral');
    });
  });

  // Dashed Tests
  describe('Dashed', () => {
    it('should render dashed divider correctly', async () => {
      const page = await newSpecPage({
        components: [KsDivider],
        template: () => <ks-divider dashed></ks-divider>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const divider = page.root.shadowRoot.querySelector('.divider');
      expect(divider).toHaveClass('divider--dashed');
    });

    it('should not have dashed class when not dashed', async () => {
      const page = await newSpecPage({
        components: [KsDivider],
        template: () => <ks-divider></ks-divider>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const divider = page.root.shadowRoot.querySelector('.divider');
      expect(divider).not.toHaveClass('divider--dashed');
    });

    it('should work with dashed and other props combined', async () => {
      const page = await newSpecPage({
        components: [KsDivider],
        template: () => (
          <ks-divider dashed variant="primary" textAlign="center">
            Dashed Text
          </ks-divider>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const divider = page.root.shadowRoot.querySelector('.divider');

      expect(divider).toHaveClasses(['divider--orientation', 'divider--orientation-center', 'divider--dashed']);
    });
  });

  // Content Slot Tests
  describe('Content Slot', () => {
    it('should render text content in horizontal divider', async () => {
      const page = await newSpecPage({
        components: [KsDivider],
        template: () => <ks-divider>Divider Text</ks-divider>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.textContent).toEqual('Divider Text');
    });

    it('should render empty inner text when no content provided', async () => {
      const page = await newSpecPage({
        components: [KsDivider],
        template: () => <ks-divider></ks-divider>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.textContent).toEqual('');
    });

    it('should not render inner text for vertical dividers', async () => {
      const page = await newSpecPage({
        components: [KsDivider],
        template: () => <ks-divider orientation="vertical">This should not appear</ks-divider>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const innerText = page.root.shadowRoot.querySelector('.divider__innertext');

      expect(innerText).toBeFalsy();
    });

    it('should render complex content in slot', async () => {
      const page = await newSpecPage({
        components: [KsDivider],
        template: () => (
          <ks-divider>
            <span>Complex</span> <strong>Content</strong>
          </ks-divider>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.innerHTML).toContain('<span>Complex</span>');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.innerHTML).toContain('<strong>Content</strong>');
    });
  });

  // Accessibility Tests
  describe('Accessibility', () => {
    it('should have proper role attribute', async () => {
      const page = await newSpecPage({
        components: [KsDivider],
        template: () => <ks-divider></ks-divider>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.getAttribute('role')).toEqual('separator');
    });

    it('should have proper aria-orientation for horizontal', async () => {
      const page = await newSpecPage({
        components: [KsDivider],
        template: () => <ks-divider></ks-divider>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.getAttribute('aria-orientation')).toEqual('horizontal');
    });

    it('should have proper aria-orientation for vertical', async () => {
      const page = await newSpecPage({
        components: [KsDivider],
        template: () => <ks-divider orientation="vertical"></ks-divider>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.getAttribute('aria-orientation')).toEqual('vertical');
    });

    it('should have proper part attributes', async () => {
      const page = await newSpecPage({
        components: [KsDivider],
        template: () => <ks-divider></ks-divider>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const divider = page.root.shadowRoot.querySelector('.divider');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(divider.getAttribute('part')).toEqual('self');
    });

    it('should have proper part attribute for vertical divider', async () => {
      const page = await newSpecPage({
        components: [KsDivider],
        template: () => <ks-divider orientation="vertical"></ks-divider>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const divider = page.root.shadowRoot.querySelector('.divider');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(divider.getAttribute('part')).toEqual('vertical');
    });
  });

  // RTL Support Tests
  describe('RTL Support', () => {
    it('should have dir attribute on host element', async () => {
      const page = await newSpecPage({
        components: [KsDivider],
        template: () => <ks-divider></ks-divider>,
      });

      expect(page.root).toHaveAttribute('dir');
    });

    it('should have dir attribute on hr element for horizontal divider', async () => {
      const page = await newSpecPage({
        components: [KsDivider],
        template: () => <ks-divider></ks-divider>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const divider = page.root.shadowRoot.querySelector('.divider');
      expect(divider).toHaveAttribute('dir');
    });
  });

  // Complex Scenarios
  describe('Complex Scenarios', () => {
    it('should handle all props together for horizontal divider', async () => {
      const page = await newSpecPage({
        components: [KsDivider],
        template: () => (
          <ks-divider orientation="horizontal" variant="success" textAlign="right" dashed>
            Complex Divider
          </ks-divider>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const divider = page.root.shadowRoot.querySelector('.divider');

      expect(divider).toHaveClasses(['divider--orientation', 'divider--orientation-right', 'divider--dashed']);
      expect(page.root).toEqualAttributes({
        'ks-color': 'success',
        'aria-orientation': 'horizontal',
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.textContent).toEqual('Complex Divider');
    });

    it('should handle all props together for vertical divider', async () => {
      const page = await newSpecPage({
        components: [KsDivider],
        template: () => (
          <ks-divider orientation="vertical" variant="error" dashed>
            This content should not appear
          </ks-divider>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const divider = page.root.shadowRoot.querySelector('.divider');
      expect(divider).toHaveClasses(['divider', 'divider--vertical', 'divider--dashed']);
      expect(divider).not.toHaveClass('divider--orientation');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.getAttribute('ks-color')).toEqual('error');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.getAttribute('aria-orientation')).toEqual('vertical');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const innerText = page.root.shadowRoot.querySelector('.divider__innertext');
      expect(innerText).toBeFalsy();
    });

    it('should handle text alignment without content', async () => {
      const page = await newSpecPage({
        components: [KsDivider],
        template: () => <ks-divider textAlign="center"></ks-divider>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const divider = page.root.shadowRoot.querySelector('.divider');
      expect(divider).toHaveClasses(['divider--orientation', 'divider--orientation-center']);

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const innerText = page.root.shadowRoot.querySelector('.divider__innertext');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(innerText.textContent).toEqual('');
    });

    it('should handle edge case of text alignment on vertical divider', async () => {
      const page = await newSpecPage({
        components: [KsDivider],
        template: () => (
          <ks-divider orientation="vertical" textAlign="center" variant="warning" dashed>
            Content
          </ks-divider>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const divider = page.root.shadowRoot.querySelector('.divider');

      expect(divider).toHaveClasses(['divider--orientation', 'divider--orientation-center', 'divider--dashed']);
      expect(divider).not.toHaveClass('divider--vertical');
      expect(page.root).toEqualAttributes({
        'ks-color': 'warning',
        'aria-orientation': 'vertical',
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const innerText = page.root.shadowRoot.querySelector('.divider__innertext');

      expect(innerText).toBeFalsy();
    });
  });

  // CSS Class Logic Tests
  describe('CSS Class Logic', () => {
    it('should apply orientation class when no textAlign is set', async () => {
      const page = await newSpecPage({
        components: [KsDivider],
        template: () => <ks-divider></ks-divider>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const divider = page.root.shadowRoot.querySelector('.divider');

      expect(divider).toHaveClass('divider--horizontal');
    });

    it('should not apply orientation class when textAlign is set', async () => {
      const page = await newSpecPage({
        components: [KsDivider],
        template: () => <ks-divider textAlign="center">Text</ks-divider>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const divider = page.root.shadowRoot.querySelector('.divider');

      expect(divider).not.toHaveClass('divider--horizontal');
      expect(divider).toHaveClass('divider--orientation');
      expect(divider).toHaveClass('divider--orientation-center');
    });

    it('should apply both orientation and text alignment classes correctly', async () => {
      const page = await newSpecPage({
        components: [KsDivider],
        template: () => <ks-divider textAlign="left">Text</ks-divider>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const divider = page.root.shadowRoot.querySelector('.divider');
      expect(divider).toHaveClasses(['divider', 'divider--orientation', 'divider--orientation-left']);
      expect(divider).not.toHaveClass('divider--horizontal');
    });
  });
});
