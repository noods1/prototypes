import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsEmptyStates } from '../index';

describe('ks-empty-states component', () => {
  // Basic rendering
  describe('basic rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [KsEmptyStates],
        template: () => <ks-empty-states></ks-empty-states>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const container = page.root.shadowRoot.querySelector('.empty-states--container');
      expect(container).toBeTruthy();
      expect(container).toHaveClass('empty-states--md');
      // Should render default illustration
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const illustration = page.root.shadowRoot.querySelector('.default-illustration');
      expect(illustration).toBeTruthy();
    });

    it('should render with title and description props', async () => {
      const page = await newSpecPage({
        components: [KsEmptyStates],
        template: () => <ks-empty-states title="No Data" description="Nothing to show."></ks-empty-states>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const title = page.root.shadowRoot.querySelector('.empty-states__title');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const desc = page.root.shadowRoot.querySelector('.empty-states__description');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(title.textContent).toBe('No Data');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(desc.textContent).toBe('Nothing to show.');
    });
  });

  // Size variants
  describe('size variants', () => {
    it('should render with size md by default', async () => {
      const page = await newSpecPage({
        components: [KsEmptyStates],
        template: () => <ks-empty-states></ks-empty-states>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const container = page.root.shadowRoot.querySelector('.empty-states--container');
      expect(container).toHaveClass('empty-states--md');
    });
    it('should render with size sm', async () => {
      const page = await newSpecPage({
        components: [KsEmptyStates],
        template: () => <ks-empty-states size="sm"></ks-empty-states>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const container = page.root.shadowRoot.querySelector('.empty-states--container');
      expect(container).toHaveClass('empty-states--sm');
    });
  });

  // Illustration rendering
  describe('illustration', () => {
    it('should render default illustration when showIllustration is true', async () => {
      const page = await newSpecPage({
        components: [KsEmptyStates],
        template: () => <ks-empty-states showIllustration={true}></ks-empty-states>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const illustration = page.root.shadowRoot.querySelector('.default-illustration');
      expect(illustration).toBeTruthy();
    });
    it('should not render illustration when showIllustration is false', async () => {
      const page = await newSpecPage({
        components: [KsEmptyStates],
        template: () => <ks-empty-states showIllustration={false}></ks-empty-states>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const illustration = page.root.shadowRoot.querySelector('.default-illustration');
      expect(illustration).toBeFalsy();
    });
    it('should render custom illustration slot', async () => {
      const page = await newSpecPage({
        components: [KsEmptyStates],
        template: () => (
          <ks-empty-states>
            <div slot="illustration">Custom Illustration</div>
          </ks-empty-states>
        ),
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const slotContent = page.root.querySelector('[slot="illustration"]');
      expect(slotContent).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(slotContent.textContent).toBe('Custom Illustration');
    });
  });

  // Title and description
  describe('title and description', () => {
    it('should render title prop', async () => {
      const page = await newSpecPage({
        components: [KsEmptyStates],
        template: () => <ks-empty-states title="Empty!"></ks-empty-states>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const title = page.root.shadowRoot.querySelector('.empty-states__title');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(title.textContent).toBe('Empty!');
    });
    it('should render description prop', async () => {
      const page = await newSpecPage({
        components: [KsEmptyStates],
        template: () => <ks-empty-states description="No content."></ks-empty-states>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const desc = page.root.shadowRoot.querySelector('.empty-states__description');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(desc.textContent).toBe('No content.');
    });
    it('should render description slot over prop', async () => {
      const page = await newSpecPage({
        components: [KsEmptyStates],
        template: () => (
          <ks-empty-states description="Should not show">
            <span slot="description">Slot Description</span>
          </ks-empty-states>
        ),
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const slotContent = page.root.querySelector('[slot="description"]');
      expect(slotContent).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(slotContent.textContent).toBe('Slot Description');
    });
  });

  // CTA slot
  describe('cta slot', () => {
    it('should render ctas slot', async () => {
      const page = await newSpecPage({
        components: [KsEmptyStates],
        template: () => (
          <ks-empty-states>
            <button slot="ctas">Action</button>
          </ks-empty-states>
        ),
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const slotContent = page.root.querySelector('[slot="ctas"]');
      expect(slotContent).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(slotContent.textContent).toBe('Action');
    });
  });

  // autoCenter prop
  describe('autoCenter', () => {
    it('should set ks-auto-center to false by default', async () => {
      const page = await newSpecPage({
        components: [KsEmptyStates],
        template: () => <ks-empty-states></ks-empty-states>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.getAttribute('ks-auto-center')).toBe('false');
    });
    it('should set ks-auto-center to true when autoCenter is true', async () => {
      const page = await newSpecPage({
        components: [KsEmptyStates],
        template: () => <ks-empty-states autoCenter={true}></ks-empty-states>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.getAttribute('ks-auto-center')).toBe('true');
    });
    it('should set ks-auto-center to fixed when autoCenter is "fixed"', async () => {
      const page = await newSpecPage({
        components: [KsEmptyStates],
        template: () => <ks-empty-states autoCenter="fixed"></ks-empty-states>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.getAttribute('ks-auto-center')).toBe('fixed');
    });
  });

  // Accessibility and part attributes
  describe('accessibility', () => {
    it('should have ks-empty-states attribute on host', async () => {
      const page = await newSpecPage({
        components: [KsEmptyStates],
        template: () => <ks-empty-states></ks-empty-states>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.hasAttribute('ks-empty-states')).toBe(true);
    });
    it('should have dir attribute', async () => {
      const page = await newSpecPage({
        components: [KsEmptyStates],
        template: () => <ks-empty-states></ks-empty-states>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.getAttribute('dir')).toBe('ltr');
    });
  });

  // CSS class logic
  describe('CSS class logic', () => {
    it('should apply correct base classes', async () => {
      const page = await newSpecPage({
        components: [KsEmptyStates],
        template: () => <ks-empty-states size="sm"></ks-empty-states>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const container = page.root.shadowRoot.querySelector('.empty-states--container');
      expect(container).toHaveClass('empty-states--sm');
    });
    it('should apply correct illustration classes', async () => {
      const page = await newSpecPage({
        components: [KsEmptyStates],
        template: () => <ks-empty-states size="md"></ks-empty-states>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const illustration = page.root.shadowRoot.querySelector('.empty-states__illustration');
      expect(illustration).toHaveClass('md');
    });
  });

  // Edge cases
  describe('edge cases', () => {
    it('should handle empty title and description', async () => {
      const page = await newSpecPage({
        components: [KsEmptyStates],
        template: () => <ks-empty-states></ks-empty-states>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const title = page.root.shadowRoot.querySelector('.empty-states__title');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const desc = page.root.shadowRoot.querySelector('.empty-states__description');
      expect(title).toBeNull();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(desc.textContent).toBe('');
    });
    it('should handle special characters in title and description', async () => {
      const specialTitle = '& < > " \\\'';
      const specialDesc = '& < > " \\\'';
      const page = await newSpecPage({
        components: [KsEmptyStates],
        template: () => <ks-empty-states title={specialTitle} description={specialDesc}></ks-empty-states>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const title = page.root.shadowRoot.querySelector('.empty-states__title');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const desc = page.root.shadowRoot.querySelector('.empty-states__description');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(title.textContent).toBe(specialTitle);
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(desc.textContent).toBe(specialDesc);
    });
    it('should handle long title and description', async () => {
      const longTitle = 'A'.repeat(1000);
      const longDesc = 'B'.repeat(1000);
      const page = await newSpecPage({
        components: [KsEmptyStates],
        template: () => <ks-empty-states title={longTitle} description={longDesc}></ks-empty-states>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const title = page.root.shadowRoot.querySelector('.empty-states__title');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const desc = page.root.shadowRoot.querySelector('.empty-states__description');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(title.textContent).toBe(longTitle);
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(desc.textContent).toBe(longDesc);
    });
  });
});
