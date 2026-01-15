import { newSpecPage } from '@stencil/core/testing';
import { KsAnchor } from '../';
import { h } from '@stencil/core';
import type { AnchorItem } from '@src/entities';

describe('ks-anchor component', () => {
  const mockItems: AnchorItem[] = [
    {
      value: 'section1',
      label: 'Section 1',
      href: '#section1',
    },
    {
      value: 'section2',
      label: 'Section 2',
      href: '#section2',
      items: [
        {
          value: 'section2-1',
          label: 'Section 2.1',
          href: '#section2-1',
        },
      ],
    },
  ];

  describe('Basic Rendering', () => {
    it('should render title and items when component is initialized', async () => {
      const page = await newSpecPage({
        components: [KsAnchor],
        template: () => <ks-anchor title="Anchor Title" items={mockItems} collapseType="always" collapsed={false} />,
      });

      // Check title is rendered
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const title = page.root.shadowRoot.querySelector('.anchor__title');
      expect(title).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(title.textContent).toContain('Anchor Title');

      // Check items are rendered
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const items = page.root.shadowRoot.querySelectorAll('.anchor__content-label');
      expect(items.length).toBe(3); // 2 top-level + 1 nested
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(items[0].textContent).toContain('Section 1');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(items[1].textContent).toContain('Section 2');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(items[2].textContent).toContain('Section 2.1');
    });

    it('should apply active state to the specified active item when activeItem prop is provided', async () => {
      const page = await newSpecPage({
        components: [KsAnchor],
        template: () => (
          <ks-anchor
            title="Anchor Title"
            items={mockItems}
            activeItem="section2"
            collapseType="always"
            collapsed={false}
          />
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const activeItem = page.root.shadowRoot.querySelector('.anchor__content-label--active');
      expect(activeItem).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(activeItem.textContent).toContain('Section 2');
    });
  });

  describe('Collapse/Hide Behavior', () => {
    it('should show collapse button when collapseType is set to collapsible', async () => {
      const page = await newSpecPage({
        components: [KsAnchor],
        template: () => (
          <ks-anchor title="Anchor Title" items={mockItems} collapseType="collapsible" collapsed={false} />
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const collapseButton = page.root.shadowRoot.querySelector('ks-button[data-testid="ks-anchor-index-3JaHKw"]');
      expect(collapseButton).toBeTruthy();
    });

    it('should show hide button when collapseType is set to hideable', async () => {
      const page = await newSpecPage({
        components: [KsAnchor],
        template: () => <ks-anchor title="Anchor Title" items={mockItems} collapseType="hideable" collapsed={false} />,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const hideButton = page.root.shadowRoot.querySelector('ks-button[data-testid="ks-anchor-index-8mdmRx"]');
      expect(hideButton).toBeTruthy();
    });

    it('should toggle collapsed state when collapse button is clicked', async () => {
      const page = await newSpecPage({
        components: [KsAnchor],
        template: () => (
          <ks-anchor title="Anchor Title" items={mockItems} collapseType="collapsible" collapsed={false} />
        ),
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const collapseButton: HTMLKsButtonElement = page.root.shadowRoot.querySelector(
        'ks-button[data-testid="ks-anchor-index-3JaHKw"]',
      );

      // Initial state
      expect(page.rootInstance.collapsed).toBe(false);

      // Click to collapse
      collapseButton.click();
      await page.waitForChanges();
      expect(page.rootInstance.collapsed).toBe(true);

      // Click again to expand
      collapseButton.click();
      await page.waitForChanges();
      expect(page.rootInstance.collapsed).toBe(false);
    });

    it('should show hide button when collapseType is set to hideable', async () => {
      const page = await newSpecPage({
        components: [KsAnchor],
        template: () => <ks-anchor title="Anchor Title" items={mockItems} collapseType="hideable" collapsed={false} />,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const hideButton: HTMLKsButtonElement = page.root.shadowRoot.querySelector(
        'ks-button[data-testid="ks-anchor-index-8mdmRx"]',
      );
      expect(hideButton).toBeTruthy();

      // Test the hide/show functionality
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const initialIcon: HTMLKsIconFoldElement = hideButton.querySelector('ks-icon-fold');
      expect(initialIcon).toBeTruthy();

      // Click to hide
      hideButton.click();
      await page.waitForChanges();

      // Should show unfold icon when collapsed
      const unfoldIcon = hideButton.querySelector('ks-icon-unfold');
      expect(unfoldIcon).toBeTruthy();
    });
  });

  describe('Interactions', () => {
    it('should emit ksAnchorItemClick event with item value when an anchor item is clicked', async () => {
      const page = await newSpecPage({
        components: [KsAnchor],
        template: () => <ks-anchor title="Anchor Title" items={mockItems} collapseType="always" collapsed={false} />,
      });

      const mockHandler = jest.fn();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      page.root.addEventListener('ksAnchorItemClick', mockHandler);

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const firstItem: HTMLAnchorElement = page.root.shadowRoot.querySelector('.anchor__content-label');
      firstItem.click();

      expect(mockHandler).toHaveBeenCalled();
      expect(mockHandler.mock.calls[0][0].detail).toBe('section1');
    });

    it('should update active item when an anchor item is clicked', async () => {
      const page = await newSpecPage({
        components: [KsAnchor],
        template: () => <ks-anchor title="Anchor Title" items={mockItems} collapseType="always" collapsed={false} />,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const firstItem: HTMLAnchorElement = page.root.shadowRoot.querySelector('.anchor__content-label');
      firstItem.click();
      await page.waitForChanges();

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const activeItem = page.root.shadowRoot.querySelector('.anchor__content-label--active');
      expect(activeItem?.textContent).toContain('Section 1');
    });
  });

  describe('Edge Cases', () => {
    it('should render without errors when items array is empty', async () => {
      const page = await newSpecPage({
        components: [KsAnchor],
        template: () => <ks-anchor title="Anchor Title" items={[]} collapseType="always" collapsed={false} />,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const items = page.root.shadowRoot.querySelectorAll('.anchor__content-label');
      expect(items.length).toBe(0);
    });

    it('should render without errors when items prop is not provided', async () => {
      const page = await newSpecPage({
        components: [KsAnchor],
        template: () => <ks-anchor title="Anchor Title" collapseType="always" collapsed={false} />,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const items = page.root.shadowRoot.querySelectorAll('.anchor__content-label');
      expect(items.length).toBe(0);
    });
  });
});
