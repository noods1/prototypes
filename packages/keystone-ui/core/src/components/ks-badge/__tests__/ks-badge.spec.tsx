import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsBadge } from '../index';
// @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
import type { BadgeType, BadgeVariant, BadgePlacement, AvatarSize } from '@src/entities';

describe('ks-badge component', () => {
  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => <ks-badge>Content</ks-badge>,
      });

      expect(page.root).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.tagName).toEqual('KS-BADGE');
      expect(page.root).toHaveAttribute('dir');
    });

    it('should render proper HTML structure', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => <ks-badge>Content</ks-badge>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const badge = page.root.shadowRoot.querySelector('.badge');

      expect(badge).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(badge.tagName).toEqual('DIV');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(badge.getAttribute('part')).toEqual('self');
    });

    it('should render child content in default slot', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => <ks-badge>Child Content</ks-badge>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.textContent).toEqual('Child Content');
    });
  });

  // Badge Type Tests
  describe('Badge Types', () => {
    const types: BadgeType[] = ['count', 'dot', 'content'];

    types.forEach((type) => {
      it(`should render ${type} type correctly`, async () => {
        const page = await newSpecPage({
          components: [KsBadge],
          template: () => <ks-badge type={type}>Content</ks-badge>,
        });

        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const sup = page.root.shadowRoot.querySelector('.badge__sup');

        expect(sup).toHaveClass(`badge__sup--${type}`);
      });
    });

    it('should default to count type', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => <ks-badge>Content</ks-badge>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.shadowRoot.querySelector('.badge__sup');

      expect(sup).toHaveClass('badge__sup--count');
    });
  });

  // Count Logic Tests
  describe('Count Logic', () => {
    it('should display count value correctly', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => <ks-badge count={5}>Content</ks-badge>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.shadowRoot.querySelector('.badge__sup');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(sup.textContent).toEqualText('5');
    });

    it('should handle string count values', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => <ks-badge count="10">Content</ks-badge>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.shadowRoot.querySelector('.badge__sup');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(sup.textContent).toEqualText('10');
    });

    it('should handle overflow count', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => (
          <ks-badge count={150} overflowCount={99}>
            Content
          </ks-badge>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.shadowRoot.querySelector('.badge__sup');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(sup.textContent).toEqualText('99+');
    });

    it('should not show overflow when count is less than overflowCount', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => (
          <ks-badge count={50} overflowCount={99}>
            Content
          </ks-badge>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.shadowRoot.querySelector('.badge__sup');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(sup.textContent).toEqualText('50');
    });

    it('should hide badge when count is 0 and showZero is false', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => <ks-badge count={0}>Content</ks-badge>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.shadowRoot.querySelector('.badge__sup');

      expect(sup).toBeFalsy();
    });

    it('should show badge when count is 0 and showZero is true', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => (
          <ks-badge count={0} showZero>
            Content
          </ks-badge>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.shadowRoot.querySelector('.badge__sup');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(sup.textContent).toEqualText('0');
    });

    it('should show custom sup slot content', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => (
          <ks-badge count={5}>
            Content
            <span slot="sup">Custom</span>
          </ks-badge>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.querySelector('[slot="sup"]').textContent).toEqualText('Custom');
    });
  });

  // Content Type Tests
  describe('Content Type', () => {
    it('should display default content for content type', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => <ks-badge type="content">Content</ks-badge>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.shadowRoot.querySelector('.badge__sup');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(sup.textContent).toEqualText('New');
    });

    it('should show custom sup slot content for content type', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => (
          <ks-badge type="content">
            Content
            <span slot="sup">Custom Content</span>
          </ks-badge>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.querySelector('[slot="sup"]').textContent).toEqualText('Custom Content');
    });
  });

  // Variant Tests
  describe('Variants', () => {
    const variants: BadgeVariant[] = ['support', 'neutral', 'success', 'error', 'info'];

    variants.forEach((variant) => {
      it(`should render ${variant} variant correctly`, async () => {
        const page = await newSpecPage({
          components: [KsBadge],
          template: () => <ks-badge variant={variant}>Content</ks-badge>,
        });

        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const sup = page.root.shadowRoot.querySelector('.badge__sup');

        expect(sup).toHaveClass(`badge__sup--color-${variant}`);
      });
    });

    it('should default to error variant', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => <ks-badge>Content</ks-badge>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.shadowRoot.querySelector('.badge__sup');

      expect(sup).toHaveClass('badge__sup--color-error');
    });
  });

  // Placement Tests
  describe('Placements', () => {
    const placements: BadgePlacement[] = ['topleft', 'topright', 'bottomleft', 'bottomright'];

    placements.forEach((placement) => {
      it(`should render ${placement} placement correctly`, async () => {
        const page = await newSpecPage({
          components: [KsBadge],
          template: () => <ks-badge placement={placement}>Content</ks-badge>,
        });

        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const sup = page.root.shadowRoot.querySelector('.badge__sup');

        expect(sup).toHaveClass(`badge__sup--dir-${placement}`);
      });
    });

    it('should default to topright placement', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => <ks-badge>Content</ks-badge>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.shadowRoot.querySelector('.badge__sup');

      expect(sup).toHaveClass('badge__sup--dir-topright');
    });
  });

  // Alone Mode Tests
  describe('Alone Mode', () => {
    it('should render alone mode correctly', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => <ks-badge alone>Content</ks-badge>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.shadowRoot.querySelector('.badge__sup');

      expect(sup).toHaveClass('badge__sup--alone');
    });

    it('should not apply placement classes when alone', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => (
          <ks-badge alone placement="bottomleft">
            Content
          </ks-badge>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.shadowRoot.querySelector('.badge__sup');

      expect(sup).toHaveClass('badge__sup--alone');
      expect(sup).not.toHaveClass('badge__sup--dir-bottomleft');
    });

    it('should apply placement classes when not alone', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => <ks-badge placement="bottomleft">Content</ks-badge>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.shadowRoot.querySelector('.badge__sup');

      expect(sup).not.toHaveClass('badge__sup--alone');
      expect(sup).toHaveClass('badge__sup--dir-bottomleft');
    });
  });

  // Disabled State Tests
  describe('Disabled State', () => {
    it('should render disabled state correctly', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => <ks-badge disabled>Content</ks-badge>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const disabledDiv = page.root.shadowRoot.querySelector('.disabled');

      expect(disabledDiv).toBeTruthy();
    });

    it('should not render disabled div when not disabled', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => <ks-badge>Content</ks-badge>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const disabledDiv = page.root.shadowRoot.querySelector('.disabled');

      expect(disabledDiv).toBeFalsy();
    });
  });

  // Avatar Integration Tests
  describe('Avatar Integration', () => {
    it('should apply avatar classes when __avatarUsage is true and type is dot', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => (
          <ks-badge type="dot" __avatarUsage={true}>
            Content
          </ks-badge>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.shadowRoot.querySelector('.badge__sup');

      expect(sup).toHaveClass('badge__sup__avatar');
    });

    it('should not apply avatar classes when type is not dot', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => (
          <ks-badge type="count" __avatarUsage={true}>
            Content
          </ks-badge>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.shadowRoot.querySelector('.badge__sup');

      expect(sup).not.toHaveClass('badge__sup__avatar');
    });

    it('should apply large avatar class when __avatarSize is lg', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => (
          <ks-badge type="dot" __avatarUsage={true} __avatarSize="lg">
            Content
          </ks-badge>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.shadowRoot.querySelector('.badge__sup');

      expect(sup).toHaveClass('badge__sup__avatar__lg');
    });

    it('should apply avatar border class when __inAvatar is true', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => <ks-badge __inAvatar={true}>Content</ks-badge>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.shadowRoot.querySelector('.badge__sup');

      expect(sup).toHaveClass('badge__sup__avatar__border');
    });
  });

  // RTL Support Tests
  describe('RTL Support', () => {
    it('should have dir attribute on host element', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => <ks-badge>Content</ks-badge>,
      });

      expect(page.root).toHaveAttribute('dir');
    });

    it('should have dir attribute on badge element', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => <ks-badge>Content</ks-badge>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const badge = page.root.shadowRoot.querySelector('.badge');

      expect(badge).toHaveAttribute('dir');
    });
  });

  // Complex Scenarios
  describe('Complex Scenarios', () => {
    it('should handle all props together for count type', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => (
          <ks-badge
            type="count"
            count={150}
            overflowCount={99}
            variant="success"
            placement="bottomleft"
            showZero
            disabled
          >
            Complex Content
          </ks-badge>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.shadowRoot.querySelector('.badge__sup');

      expect(sup).toHaveClasses([
        'badge__sup',
        'badge__sup--count',
        'badge__sup--color-success',
        'badge__sup--dir-bottomleft',
      ]);
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(sup.textContent).toEqualText('99+');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const disabledDiv = page.root.shadowRoot.querySelector('.disabled');

      expect(disabledDiv).toBeTruthy();
    });

    it('should handle all props together for dot type', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => (
          <ks-badge type="dot" variant="support" placement="topleft" alone disabled>
            Dot Content
          </ks-badge>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.shadowRoot.querySelector('.badge__sup');

      expect(sup).toHaveClasses(['badge__sup', 'badge__sup--dot', 'badge__sup--color-support', 'badge__sup--alone']);
      expect(sup).not.toHaveClass('badge__sup--dir-topleft');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const disabledDiv = page.root.shadowRoot.querySelector('.disabled');

      expect(disabledDiv).toBeTruthy();
    });

    it('should handle all props together for content type', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => (
          <ks-badge type="content" variant="info" placement="topright">
            Content
            <span slot="sup">Custom Text</span>
          </ks-badge>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.shadowRoot.querySelector('.badge__sup');

      expect(sup).toHaveClasses([
        'badge__sup',
        'badge__sup--content',
        'badge__sup--color-info',
        'badge__sup--dir-topright',
      ]);
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.querySelector('[slot="sup"]').textContent).toEqualText('Custom Text');
    });

    it('should handle avatar integration with all avatar props', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => (
          <ks-badge type="dot" __avatarUsage={true} __avatarSize="lg" __inAvatar={true} variant="info">
            Avatar Content
          </ks-badge>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.shadowRoot.querySelector('.badge__sup');

      expect(sup).toHaveClasses([
        'badge__sup',
        'badge__sup--dot',
        'badge__sup--color-info',
        'badge__sup__avatar',
        'badge__sup__avatar__lg',
        'badge__sup__avatar__border',
      ]);
    });

    it('should handle zero count with showZero and custom slot', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => (
          <ks-badge count={0} showZero>
            Content
            <span slot="sup">Zero</span>
          </ks-badge>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.querySelector('[slot="sup"]');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(sup.textContent).toEqualText('Zero');
    });

    it('should handle edge case of overflow count equal to actual count', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => (
          <ks-badge count={99} overflowCount={99}>
            Content
          </ks-badge>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.shadowRoot.querySelector('.badge__sup');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(sup.textContent).toEqualText('99');
    });

    it('should handle negative count values', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => <ks-badge count={-5}>Content</ks-badge>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.shadowRoot.querySelector('.badge__sup');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(sup.textContent).toEqualText('-5');
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('should handle undefined count', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => <ks-badge>Content</ks-badge>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.shadowRoot.querySelector('.badge__sup');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(sup.textContent).toEqualText('');
    });

    it('should handle null count', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        template: () => <ks-badge count={null}>Content</ks-badge>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.shadowRoot.querySelector('.badge__sup');

      expect(sup).toBeFalsy();
    });

    it('should handle empty string count', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => <ks-badge count="">Content</ks-badge>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.shadowRoot.querySelector('.badge__sup');

      expect(sup).toBeFalsy();
    });

    it('should handle undefined overflowCount', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => <ks-badge count={150}>Content</ks-badge>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.shadowRoot.querySelector('.badge__sup');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(sup.textContent).toEqualText('150');
    });

    it('should handle zero overflowCount', async () => {
      const page = await newSpecPage({
        components: [KsBadge],
        template: () => (
          <ks-badge count={5} overflowCount={0}>
            Content
          </ks-badge>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const sup = page.root.shadowRoot.querySelector('.badge__sup');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(sup.textContent).toEqualText('0+');
    });
  });
});
