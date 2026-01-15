import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsAssetTile } from '../';
// @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
import { KsCheckboxGroup } from '../../ks-checkbox-group';
// @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
import { KsRadioGroup } from '../../ks-radio-group';
import { DropdownListMenu } from '@src/entities';

describe('ks-asset-tile', () => {
  it('renders correctly with minimal props', async () => {
    const page = await newSpecPage({
      components: [KsAssetTile],
      template: () => <ks-asset-tile></ks-asset-tile>,
    });
    expect(page.root).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('.asset-tile')).toBeTruthy();
  });

  describe('Props', () => {
    it('should render image background', async () => {
      const page = await newSpecPage({
        components: [KsAssetTile],
        template: () => <ks-asset-tile image="test.jpg" mode="contain"></ks-asset-tile>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const container = page.root.shadowRoot.querySelector('.asset-tile') as HTMLElement;
      expect(container.style.background).toContain('url(test.jpg) 50% / contain no-repeat');
    });

    it.each(['sm', 'md', 'lg', 'xl'])('should apply correct size class for size "%s"', async (size) => {
      const page = await newSpecPage({
        components: [KsAssetTile],
        template: () => <ks-asset-tile size={size as any} freeStretch={false}></ks-asset-tile>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.shadowRoot.querySelector(`.asset-tile__${size}`)).toBeTruthy();
    });

    it.each([
      ['sm', 'xs'],
      ['md', 'xs'],
      ['lg', 'sm'],
      ['xl', 'md'],
    ])('should have progressSize "%s" for size "%s"', async (size, expected) => {
      const page = await newSpecPage({
        components: [KsAssetTile],
        template: () => <ks-asset-tile size={size as any} loading={{ isLoading: true, percent: 50 }}></ks-asset-tile>,
      });
      await page.waitForChanges();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const progress = page.root.shadowRoot.querySelector('ks-progress');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(progress.getAttribute('size')).toBe(expected);
    });

    it('should apply stretch class when freeStretch is true', async () => {
      const page = await newSpecPage({
        components: [KsAssetTile],
        template: () => <ks-asset-tile size="sm" freeStretch={true}></ks-asset-tile>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.shadowRoot.querySelector('.asset-tile__sm__stretch')).toBeTruthy();
    });

    it('should apply vertical class for 16:9 ratio', async () => {
      const page = await newSpecPage({
        components: [KsAssetTile],
        template: () => <ks-asset-tile ratio="16:9"></ks-asset-tile>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.shadowRoot.querySelector('.asset-tile__vertical')).toBeTruthy();
    });

    it('should be disabled', async () => {
      const page = await newSpecPage({
        components: [KsAssetTile],
        template: () => <ks-asset-tile disabled={true}></ks-asset-tile>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.shadowRoot.querySelector('.asset-tile__disabled')).toBeTruthy();
    });

    it.each(['error', 'pending', 'warning'])('should display status icon for status "%s"', async (status) => {
      const page = await newSpecPage({
        components: [KsAssetTile],
        template: () => <ks-asset-tile status={status as any}></ks-asset-tile>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.shadowRoot.querySelector(`.asset-tile__status__${status}`)).toBeTruthy();
    });

    it('should render badges', async () => {
      const page = await newSpecPage({
        components: [KsAssetTile],
        template: () => <ks-asset-tile mediaType="video" badge="1:30" showTiktok={true}></ks-asset-tile>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const badges = page.root.shadowRoot.querySelectorAll('.asset-tile__badges .badge');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(badges[0].textContent).toContain('1:30');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(badges[1].querySelector('ks-icon-tiktok')).toBeTruthy();
    });
  });

  describe('Content', () => {
    it('should render assetTileContent', async () => {
      const content = {
        title: 'My Asset',
        description: 'Asset Description',
        detailInfos: ['Info 1', 'Info 2'],
        avatar: 'avatar.png',
      };
      const page = await newSpecPage({
        components: [KsAssetTile],
        template: () => <ks-asset-tile assetTileContent={content}></ks-asset-tile>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const contentRoot = page.root.shadowRoot;
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(contentRoot.querySelector('.asset-tile__title').textContent).toBe('My Asset');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(contentRoot.querySelector('.asset-tile__desc').textContent).toBe('Asset Description');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(contentRoot.querySelectorAll('.asset-tile__detail').length).toBe(2);
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(contentRoot.querySelector('.asset-tile__avatar')).toBeTruthy();
    });

    it('should render additionalTags', async () => {
      const tags = {
        recommendation: true,
        ai: true,
        others: ['Tag 1', 'Tag 2', 'Tag 3'],
      };
      const page = await newSpecPage({
        components: [KsAssetTile],
        template: () => <ks-asset-tile additionalTags={tags}></ks-asset-tile>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const tagsRoot = page.root.shadowRoot;
      // Renders first 2
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(tagsRoot.querySelectorAll('.asset-tile__additional_tags ks-tag').length).toBe(3);
      // Renders tooltip for the rest
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const tooltip = tagsRoot.querySelector('.asset-tile__additional_tags ks-tooltip');
      expect(tooltip).toBeTruthy();
    });
  });

  describe('Actions', () => {
    it.each(['edit', 'delete', 'full screen'])('should emit ksAction for action "%s"', async (action) => {
      const ksAction = jest.fn();
      const page = await newSpecPage({
        components: [KsAssetTile],
        template: () => <ks-asset-tile action={action as any} onKsAction={ksAction}></ks-asset-tile>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      (page.root.shadowRoot.querySelector('.asset-tile__action') as HTMLElement).click();
      await page.waitForChanges();
      expect(ksAction).toHaveBeenCalledWith(expect.objectContaining({ detail: action }));
    });

    it('should render dropdown for "more" action and emit event', async () => {
      const ksAction = jest.fn();
      const actionSource: DropdownListMenu = {
        type: 'list',
        items: [
          { id: '1', type: 'single' as const, content: 'Option 1' },
          { id: '2', type: 'single' as const, content: 'Option 2' },
          { id: '3', type: 'single' as const, content: 'Option 3' },
        ],
      };
      const page = await newSpecPage({
        components: [KsAssetTile],
        template: () => <ks-asset-tile action="more" actionSource={actionSource} onKsAction={ksAction}></ks-asset-tile>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const dropdown = page.root.shadowRoot.querySelector('ks-dropdown-menu');
      expect(dropdown).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      dropdown.dispatchEvent(new CustomEvent('ksValueChange', { detail: ['item1'] }));
      await page.waitForChanges();
      expect(ksAction).toHaveBeenCalledWith(expect.objectContaining({ detail: 'item1' }));
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      dropdown.click();
    });
  });

  describe('Selection & Interaction', () => {
    it('should emit ksChange on click', async () => {
      const ksChange = jest.fn();
      const page = await newSpecPage({
        components: [KsAssetTile],
        template: () => <ks-asset-tile select="checkbox" onKsChange={ksChange}></ks-asset-tile>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      (page.root.shadowRoot.querySelector('.asset-tile') as HTMLElement).click();
      await page.waitForChanges();
      expect(ksChange).toHaveBeenCalledWith(expect.objectContaining({ detail: true }));
    });

    it('should not emit ksChange when disabled', async () => {
      const ksChange = jest.fn();
      const page = await newSpecPage({
        components: [KsAssetTile],
        template: () => <ks-asset-tile select="checkbox" disabled={true} onKsChange={ksChange}></ks-asset-tile>,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      (page.root.shadowRoot.querySelector('.asset-tile') as HTMLElement).click();
      await page.waitForChanges();
      expect(ksChange).not.toHaveBeenCalled();
    });
  });
});
