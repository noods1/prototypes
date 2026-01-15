import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsTimeline } from '../index';
import type { TimelineItem } from '@src/entities';

describe('ks-timeline component', () => {
  // Basic rendering
  describe('basic rendering', () => {
    it('should render with default props (empty items)', async () => {
      const page = await newSpecPage({
        components: [KsTimeline],
        template: () => <ks-timeline></ks-timeline>,
      });

      const host = page.root;
      expect(host).toHaveAttribute('ks-timeline');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const wrapper = page.root.shadowRoot.querySelector('.timeline');
      expect(wrapper).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(wrapper.children.length).toBe(0);
    });

    it('should render with items', async () => {
      const items: TimelineItem[] = [
        { title: 'Step 1', description: 'Desc 1', content: 'Content 1' },
        { title: 'Step 2', description: 'Desc 2', content: 'Content 2' },
      ];
      const page = await newSpecPage({
        components: [KsTimeline],
        template: () => <ks-timeline items={items}></ks-timeline>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const timelineItems = page.root.shadowRoot.querySelectorAll('.timeline__item');
      expect(timelineItems.length).toBe(2);
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(timelineItems[0].textContent).toContain('Step 1');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(timelineItems[1].textContent).toContain('Step 2');
    });
  });

  // Active, complete, and disabled states
  describe('item states', () => {
    it('should apply active and complete classes', async () => {
      const items: TimelineItem[] = [{ title: 'A' }, { title: 'B' }, { title: 'C' }];
      const page = await newSpecPage({
        components: [KsTimeline],
        template: () => <ks-timeline items={items} active={1}></ks-timeline>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const timelineItems = page.root.shadowRoot.querySelectorAll('.timeline__item');
      expect(timelineItems[0]).toHaveClass('timeline__item--complete');
      expect(timelineItems[1]).toHaveClass('timeline__item--active');
      expect(timelineItems[2]).not.toHaveClass('timeline__item--active');
    });

    it('should apply disabled class to all items if timeline is disabled', async () => {
      const items: TimelineItem[] = [{ title: 'A' }, { title: 'B' }];
      const page = await newSpecPage({
        components: [KsTimeline],
        template: () => <ks-timeline items={items} disabled={true}></ks-timeline>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const timelineItems = page.root.shadowRoot.querySelectorAll('.timeline__item');
      expect(timelineItems[0]).toHaveClass('timeline__item--disabled');
      expect(timelineItems[1]).toHaveClass('timeline__item--disabled');
    });

    it('should apply disabled class to individual item', async () => {
      const items: TimelineItem[] = [{ title: 'A' }, { title: 'B', disabled: true }];
      const page = await newSpecPage({
        components: [KsTimeline],
        template: () => <ks-timeline items={items}></ks-timeline>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const timelineItems = page.root.shadowRoot.querySelectorAll('.timeline__item');
      expect(timelineItems[1]).toHaveClass('timeline__item--disabled');
    });
  });

  // Status prop and per-item status
  describe('status', () => {
    it('should apply timeline status to all items', async () => {
      const items: TimelineItem[] = [{ title: 'A', status: 'error' }, { title: 'B' }];
      const page = await newSpecPage({
        components: [KsTimeline],
        template: () => <ks-timeline items={items} status="error"></ks-timeline>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const timelineItems = page.root.shadowRoot.querySelectorAll('.timeline__item');
      expect(timelineItems[0]).toHaveClass('timeline__item--error');
      expect(timelineItems[1]).toHaveClass('timeline__item--error');
    });

    it('should apply per-item status if timeline status is default', async () => {
      const items: TimelineItem[] = [
        { title: 'A', status: 'error' },
        { title: 'B', status: 'default' },
      ];
      const page = await newSpecPage({
        components: [KsTimeline],
        template: () => <ks-timeline items={items} status="default"></ks-timeline>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const timelineItems = page.root.shadowRoot.querySelectorAll('.timeline__item');
      expect(timelineItems[0]).toHaveClass('timeline__item--error');
      expect(timelineItems[1]).toHaveClass('timeline__item--default');
    });
  });

  // Items with/without description/content
  describe('item content', () => {
    it('should render description and content if provided', async () => {
      const items: TimelineItem[] = [{ title: 'A', description: 'desc', content: 'cont' }];
      const page = await newSpecPage({
        components: [KsTimeline],
        template: () => <ks-timeline items={items}></ks-timeline>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const desc = page.root.shadowRoot.querySelector('.timeline__item-description');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const cont = page.root.shadowRoot.querySelector('.timeline__item-content');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(desc.textContent).toBe('desc');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(cont.textContent).toBe('cont');
    });

    it('should render empty description/content if not provided', async () => {
      const items: TimelineItem[] = [{ title: 'A' }];
      const page = await newSpecPage({
        components: [KsTimeline],
        template: () => <ks-timeline items={items}></ks-timeline>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const desc = page.root.shadowRoot.querySelector('.timeline__item-description');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const cont = page.root.shadowRoot.querySelector('.timeline__item-content');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(desc.textContent).toBe('');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(cont.textContent).toBe('');
    });
  });

  // CSS class logic
  describe('CSS class logic', () => {
    it('should apply correct base and modifier classes', async () => {
      const items: TimelineItem[] = [{ title: 'A', status: 'error', disabled: true }];
      const page = await newSpecPage({
        components: [KsTimeline],
        template: () => <ks-timeline items={items} active={0} disabled={true} status="error"></ks-timeline>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const item = page.root.shadowRoot.querySelector('.timeline__item');
      expect(item).toHaveClass('timeline__item');
      expect(item).toHaveClass('timeline__item--active');
      expect(item).toHaveClass('timeline__item--disabled');
      expect(item).toHaveClass('timeline__item--error');
    });
  });

  // Edge cases
  describe('edge cases', () => {
    it('should handle special characters in title/description/content', async () => {
      const special = '& < > " \\\'';
      const items: TimelineItem[] = [{ title: special, description: special, content: special }];
      const page = await newSpecPage({
        components: [KsTimeline],
        template: () => <ks-timeline items={items}></ks-timeline>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const item = page.root.shadowRoot.querySelector('.timeline__item');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(item.textContent).toContain(special);
    });

    it('should handle long text in title/description/content', async () => {
      const long = 'A'.repeat(1000);
      const items: TimelineItem[] = [{ title: long, description: long, content: long }];
      const page = await newSpecPage({
        components: [KsTimeline],
        template: () => <ks-timeline items={items}></ks-timeline>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const item = page.root.shadowRoot.querySelector('.timeline__item');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(item.textContent).toContain(long);
    });
  });
});
