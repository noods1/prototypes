import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsThumbnail } from '../index';
import { AnyHTMLElement } from '@stencil/core/internal';

// Mock a component that might be used in the slot
// @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
const MockSlotContent = (props: { slotName: string }) => <div slot={props.slotName}>{props.slotName} content</div>;

describe('ks-thumbnail component', () => {
  it('should render with default props', async () => {
    const page = await newSpecPage({
      components: [KsThumbnail],
      template: () => <ks-thumbnail></ks-thumbnail>,
    });
    await page.waitForChanges();
    const host = page.root;
    expect(host).toBeTruthy();
    const component = page.rootInstance as KsThumbnail;
    expect(component.size).toBe('md');
    expect(component.ratio).toBe('1:1');
    expect(component.image).toBe('');
    expect(component.actions).toEqual([]);
    expect(component.playable).toBe(false);
    expect(component.disabled).toBe(false);
    expect(component.mode).toBe('cover');
    expect(component.block).toBe(false);
    expect(component.blockReason).toBe('');
    expect(component.isMultiple).toBe(false);

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const thumbnailDiv = host.shadowRoot.querySelector('.thumbnail__container');
    expect(thumbnailDiv).toHaveClass('thumbnail__md');
  });

  it('should render with image background when image prop provided', async () => {
    const imageUrl = 'https://example.com/image.jpg';
    const page = await newSpecPage({
      components: [KsThumbnail],
      template: () => <ks-thumbnail image={imageUrl} mode="contain"></ks-thumbnail>,
    });
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const thumbnailDiv = page.root.shadowRoot.querySelector('.thumbnail') as AnyHTMLElement;
    expect(thumbnailDiv.style.background).toBe(`url(${imageUrl}) 50% / contain no-repeat`);
  });

  it('should render different sizes', async () => {
    const sizes: ('xs' | 'sm' | 'md' | 'lg' | 'xl')[] = ['xs', 'sm', 'md', 'lg', 'xl'];
    for (const size of sizes) {
      const page = await newSpecPage({
        components: [KsThumbnail],
        template: () => <ks-thumbnail size={size}></ks-thumbnail>,
      });
      await page.waitForChanges();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const thumbnailDiv = page.root.shadowRoot.querySelector('.thumbnail__container');
      expect(thumbnailDiv).toHaveClass(`thumbnail__${size}`);
    }
  });

  it('should render different ratios', async () => {
    const ratios: ('1:1' | '2:3' | '3:2')[] = ['1:1', '2:3', '3:2'];
    for (const ratio of ratios) {
      const page = await newSpecPage({
        components: [KsThumbnail],
        template: () => <ks-thumbnail ratio={ratio}></ks-thumbnail>,
      });
      await page.waitForChanges();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const thumbnailDiv = page.root.shadowRoot.querySelector('.thumbnail__container');
      const expectedRatioClass =
        ratio === '2:3' ? 'thumbnail__horizontal' : ratio === '3:2' ? 'thumbnail__vertical' : '';
      if (expectedRatioClass) {
        expect(thumbnailDiv).toHaveClass(expectedRatioClass);
      } else {
        // For 1:1, no specific ratio class like horizontal/vertical is added, only size class
        expect(thumbnailDiv).toHaveClass('thumbnail__'); // thumbnail and thumbnail__md (default size)
      }
    }
  });

  it('should render playable icon and emits ksPlay event', async () => {
    const ksPlaySpy = jest.fn();
    const page = await newSpecPage({
      components: [KsThumbnail],
      template: () => <ks-thumbnail playable={true}></ks-thumbnail>,
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    page.root.addEventListener('ksPlay', ksPlaySpy);
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const playIcon = page.root.shadowRoot.querySelector('ks-icon-overlay-play');
    expect(playIcon).not.toBeNull();
    (playIcon as HTMLElement).click();
    await page.waitForChanges();
    expect(ksPlaySpy).toHaveBeenCalledTimes(1);
  });

  it('should not render playable icon when disabled', async () => {
    const page = await newSpecPage({
      components: [KsThumbnail],
      template: () => <ks-thumbnail playable={true} disabled={true}></ks-thumbnail>,
    });
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const playIcon = page.root.shadowRoot.querySelector('ks-icon-filled-play');
    expect(playIcon).toBeNull();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const thumbnailDiv = page.root.shadowRoot.querySelector('.thumbnail') as AnyHTMLElement;
    expect(thumbnailDiv).toHaveClass('thumbnail__disabled');
    expect(thumbnailDiv.style.background).toContain('var(--ks-color-neutral-surface2Disabled)');
  });

  it('should render block state with reason in tooltip', async () => {
    const blockReason = 'This item is blocked.';
    const page = await newSpecPage({
      components: [KsThumbnail],
      template: () => <ks-thumbnail block={true} blockReason={blockReason}></ks-thumbnail>,
    });
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const thumbnailDiv = page.root.shadowRoot.querySelector('.thumbnail');
    expect(thumbnailDiv).toHaveClass('thumbnail__block');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const tooltip = page.root.shadowRoot.querySelector('ks-tooltip');
    expect(tooltip).not.toBeNull();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(tooltip.getAttribute('content')).toBe(blockReason);

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const blockIcon = page.root.shadowRoot.querySelector('ks-icon-block-none');
    expect(blockIcon).not.toBeNull();

    // Playable icon and actions should not be rendered
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('ks-icon-filled-play')).toBeNull();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('.thumbnail__mask')).toBeNull();
  });

  it('should not render icon slot when block is true', async () => {
    const page = await newSpecPage({
      components: [KsThumbnail],
      html: `<ks-thumbnail block="true"><ks-icon-filled-play slot="icon"></ks-icon-filled-play></ks-thumbnail>`,
    });
    await page.waitForChanges();
    // The slot element itself might still be there, but its content shouldn't be rendered due to conditional rendering
    // A better check is that the parent div of the slot is not rendered or the slot has no assigned elements visible
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const slotContainer = page.root.shadowRoot.querySelector('.thumbnail > slot[name="icon"]');
    expect(slotContainer).toBeNull(); // The direct child slot should not be there if block is true
  });

  it('should render multiple effect when isMultiple is true and size is lg or xl', async () => {
    const largeSizes: ('lg' | 'xl')[] = ['lg', 'xl'];
    for (const size of largeSizes) {
      const page = await newSpecPage({
        components: [KsThumbnail],
        template: () => <ks-thumbnail isMultiple={true} size={size}></ks-thumbnail>,
      });
      await page.waitForChanges();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const multipleDiv = page.root.shadowRoot.querySelector('.thumbnail__multiple');
      expect(multipleDiv).not.toBeNull();
      expect(multipleDiv).toHaveClass(`thumbnail__multiple-${size}`);
    }

    const smallSizes: ('xs' | 'sm')[] = ['xs', 'sm'];
    for (const size of smallSizes) {
      const page = await newSpecPage({
        components: [KsThumbnail],
        template: () => <ks-thumbnail isMultiple={true} size={size}></ks-thumbnail>,
      });
      await page.waitForChanges();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const multipleDiv = page.root.shadowRoot.querySelector('.thumbnail__multiple');
      expect(multipleDiv).toBeNull();
    }
  });

  it('should render a single action and emits ksAction', async () => {
    const ksActionSpy = jest.fn();
    const actions = [{ id: 'action1', render: () => <div style={{ height: '10px', width: '10px' }} /> }];
    const page = await newSpecPage({
      components: [KsThumbnail],
      template: () => <ks-thumbnail actions={actions}></ks-thumbnail>,
    });
    page.rootInstance.actions = actions;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    page.root.addEventListener('ksAction', ksActionSpy);
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const actionSlotSpan = page.root.shadowRoot.querySelector(
      '[data-testid="ks-thumbnail-index-vAd5zt-slot-content-action1"]',
    );
    expect(actionSlotSpan).not.toBeNull();
    (actionSlotSpan as HTMLElement).click();
    await page.waitForChanges();
    expect(ksActionSpy).toHaveBeenCalledWith(expect.objectContaining({ detail: 'action1' }));
  });

  it('should render image group when image is array and the size >= 2', async () => {
    const images = [
      'http://p16-tiktok-ads-sg.ibyteimg.com/tos-alisg-i-n82rq3yc7r-sg/2f72c647b761d242451e5699ea2ea2af.png~tplv-n82rq3yc7r-origin.image',
      'http://p16-tiktok-ads-sg.ibyteimg.com/tos-alisg-i-n82rq3yc7r-sg/908b43af6d44af0f3e9916031e057538.png~tplv-n82rq3yc7r-origin.image',
      'http://p16-tiktok-ads-sg.ibyteimg.com/tos-alisg-i-n82rq3yc7r-sg/great-2339957_1280.webp~tplv-n82rq3yc7r-origin.image',
      'http://p16-tiktok-ads-sg.ibyteimg.com/tos-alisg-i-n82rq3yc7r-sg/2f72c647b761d242451e5699ea2ea2af.png~tplv-n82rq3yc7r-origin.image',
    ];
    const page = await newSpecPage({
      components: [KsThumbnail],
      template: () => <ks-thumbnail size="xl" image={images}></ks-thumbnail>,
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const imgs = page.root.shadowRoot.querySelector('.thumbnail__grid');

    expect(imgs).not.toBeNull();
  });
  it('should not render image group when image is array and the size is 1', async () => {
    const images = [
      'http://p16-tiktok-ads-sg.ibyteimg.com/tos-alisg-i-n82rq3yc7r-sg/2f72c647b761d242451e5699ea2ea2af.png~tplv-n82rq3yc7r-origin.image',
    ];
    const page = await newSpecPage({
      components: [KsThumbnail],
      template: () => <ks-thumbnail size="xl" image={images}></ks-thumbnail>,
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const imgs = page.root.shadowRoot.querySelector('.thumbnail__grid');

    expect(imgs).toBeNull();
  });

  it('should not render image group when image is array and the size is 0', async () => {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const images = [];
    const page = await newSpecPage({
      components: [KsThumbnail],
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      template: () => <ks-thumbnail size="xl" image={images}></ks-thumbnail>,
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const imgs = page.root.shadowRoot.querySelector('.thumbnail__grid');

    expect(imgs).toBeNull();
  });
});
