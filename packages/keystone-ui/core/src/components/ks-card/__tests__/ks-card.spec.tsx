import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsCard } from '../index';

describe('ks-card component', () => {
  // Basic rendering tests
  describe('basic rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [KsCard],
        template: () => <ks-card>Card content</ks-card>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const card = page.root.shadowRoot.querySelector('.ks-card');
      expect(card).toBeTruthy();
      expect(card).toHaveClass('ks-card');
      expect(card).toHaveClass('ks-card--md');
      expect(card).toEqualAttribute('part', 'self');
      expect(card).toEqualAttribute('dir', 'ltr');
    });

    it('should render with title prop', async () => {
      const page = await newSpecPage({
        components: [KsCard],
        template: () => <ks-card title="Test Title">Card content</ks-card>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const head = page.root.shadowRoot.querySelector('.ks-card__head');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const title = page.root.shadowRoot.querySelector('.ks-card__head-mainTitle');

      expect(head).toBeTruthy();
      expect(title).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(title.textContent).toEqual('Test Title');
      expect(head).toEqualAttribute('part', 'head header');
    });

    it('should render with title and titleSuffix', async () => {
      const page = await newSpecPage({
        components: [KsCard],
        template: () => (
          <ks-card title="Test Title" titleSuffix="Optional">
            Card content
          </ks-card>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const mainTitle = page.root.shadowRoot.querySelector('.ks-card__head-mainTitle');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const optionalTitle = page.root.shadowRoot.querySelector('.ks-card__head-optionalTitle');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(mainTitle.textContent).toEqual('Test Title');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(optionalTitle.textContent).toEqual('· Optional');
    });
  });

  // Size tests
  describe('size variants', () => {
    it('should render with medium size by default', async () => {
      const page = await newSpecPage({
        components: [KsCard],
        template: () => <ks-card>Card content</ks-card>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const card = page.root.shadowRoot.querySelector('.ks-card');
      expect(card).toHaveClass('ks-card--md');
    });

    it('should render with small size', async () => {
      const page = await newSpecPage({
        components: [KsCard],
        template: () => <ks-card size="sm">Card content</ks-card>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const card = page.root.shadowRoot.querySelector('.ks-card');
      expect(card).toHaveClass('ks-card--sm');
    });

    it('should apply size to head section', async () => {
      const page = await newSpecPage({
        components: [KsCard],
        template: () => (
          <ks-card size="sm" title="Test Title">
            Card content
          </ks-card>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const head = page.root.shadowRoot.querySelector('.ks-card__head');
      expect(head).toHaveClass('ks-card__head--sm');
    });
  });

  // Complex scenarios
  describe('complex scenarios', () => {
    it('should render complete card with all features', async () => {
      const page = await newSpecPage({
        components: [KsCard],
        template: () => (
          <ks-card size="sm" title="Main Title" titleSuffix="Optional">
            <button slot="extra">Action</button>
            <div slot="title">Custom Title</div>
            <p>Main content paragraph</p>
            <button>Card action</button>
          </ks-card>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const card = page.root.shadowRoot.querySelector('.ks-card');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const head = page.root.shadowRoot.querySelector('.ks-card__head');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const body = page.root.shadowRoot.querySelector('.ks-card__body');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const customTitle = page.root.querySelector('[slot="title"]');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const extraButton = page.root.querySelector('[slot="extra"]');

      expect(card).toHaveClass('ks-card--sm');
      expect(head).toHaveClass('ks-card__head--sm');
      expect(head).toBeTruthy();
      expect(body).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(customTitle.textContent).toEqual('Custom Title');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(extraButton.textContent).toEqual('Action');
    });

    it('should handle card with only head content', async () => {
      const page = await newSpecPage({
        components: [KsCard],
        template: () => <ks-card title="Only Title"></ks-card>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const head = page.root.shadowRoot.querySelector('.ks-card__head');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const body = page.root.shadowRoot.querySelector('.ks-card__body');

      expect(head).toBeTruthy();
      expect(body).toBeFalsy();
    });
  });

  // CSS class logic tests
  describe('CSS class logic', () => {
    it('should apply correct base classes', async () => {
      const page = await newSpecPage({
        components: [KsCard],
        template: () => <ks-card>Card content</ks-card>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const card = page.root.shadowRoot.querySelector('.ks-card');
      expect(card).toHaveClass('ks-card');
      expect(card).toHaveClass('ks-card--md');
    });

    it('should apply correct head classes', async () => {
      const page = await newSpecPage({
        components: [KsCard],
        template: () => <ks-card title="Test Title">Card content</ks-card>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const head = page.root.shadowRoot.querySelector('.ks-card__head');
      expect(head).toHaveClass('ks-card__head');
      expect(head).toHaveClass('ks-card__head--md');
    });

    it('should apply correct title classes', async () => {
      const page = await newSpecPage({
        components: [KsCard],
        template: () => <ks-card title="Test Title">Card content</ks-card>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const titleContainer = page.root.shadowRoot.querySelector('.ks-card__head-title');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const mainTitle = page.root.shadowRoot.querySelector('.ks-card__head-mainTitle');

      expect(titleContainer).toHaveClass('ks-card__head-title');
      expect(mainTitle).toHaveClass('ks-card__head-mainTitle');
    });
  });

  // Edge cases
  describe('edge cases', () => {
    it('should handle empty string title', async () => {
      const page = await newSpecPage({
        components: [KsCard],
        template: () => <ks-card title="">Card content</ks-card>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const head = page.root.shadowRoot.querySelector('.ks-card__head');

      expect(head).toBeFalsy();
    });

    it('should handle empty string titleSuffix', async () => {
      const page = await newSpecPage({
        components: [KsCard],
        template: () => (
          <ks-card title="Test Title" titleSuffix="">
            Card content
          </ks-card>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const optionalTitle = page.root.shadowRoot.querySelector('.ks-card__head-optionalTitle');
      expect(optionalTitle).toBeFalsy();
    });

    it('should handle whitespace-only title', async () => {
      const page = await newSpecPage({
        components: [KsCard],
        template: () => <ks-card title="   ">Card content</ks-card>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const head = page.root.shadowRoot.querySelector('.ks-card__head');
      expect(head).toBeTruthy();
    });

    it('should handle whitespace-only titleSuffix', async () => {
      const page = await newSpecPage({
        components: [KsCard],
        template: () => (
          <ks-card title="Test Title" titleSuffix="   ">
            Card content
          </ks-card>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const optionalTitle = page.root.shadowRoot.querySelector('.ks-card__head-optionalTitle');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(optionalTitle.textContent).toEqual('·    ');
    });

    it('should handle very long title and suffix', async () => {
      const longTitle = 'A'.repeat(1000);
      const longSuffix = 'B'.repeat(1000);

      const page = await newSpecPage({
        components: [KsCard],
        template: () => (
          <ks-card title={longTitle} titleSuffix={longSuffix}>
            Card content
          </ks-card>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const mainTitle = page.root.shadowRoot.querySelector('.ks-card__head-mainTitle');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const optionalTitle = page.root.shadowRoot.querySelector('.ks-card__head-optionalTitle');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(mainTitle.textContent).toEqual(longTitle);
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(optionalTitle.textContent).toEqual(`· ${longSuffix}`);
    });

    it('should handle special characters in title and suffix', async () => {
      const page = await newSpecPage({
        components: [KsCard],
        template: () => (
          <ks-card title={'Title with & < > " \' chars'} titleSuffix={'Suffix with & < > " \' chars'}>
            Card content
          </ks-card>
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const mainTitle = page.root.shadowRoot.querySelector('.ks-card__head-mainTitle');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const optionalTitle = page.root.shadowRoot.querySelector('.ks-card__head-optionalTitle');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(mainTitle.textContent).toEqual('Title with & < > " \' chars');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(optionalTitle.textContent).toEqual('· Suffix with & < > " \' chars');
    });
  });
});
