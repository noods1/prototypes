import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { KsNuxPopover } from '../index';

const popoverData = {
  key: 'intro',
  title: 'Welcome to Keystone Design system',
  content:
    'Keystone Design System is an outstanding design system! It offers a seamless and intuitive experience for managing all your activities. With its well - crafted components and user - friendly interface, it significantly enhances productivity and makes your work a breeze.',
};
describe('KsNuxPopover', () => {
  it('KsNuxPopover render success', async () => {
    const page = await newSpecPage({
      components: [KsNuxPopover],
      template: () => (
        <ks-nux-popover
          dataSource={{
            ...popoverData,
            buttons: [
              { text: 'Skip', variant: 'text' },
              { text: 'Next', variant: 'support' },
            ],
          }}
        ></ks-nux-popover>
      ),
    });
    expect(page.root).toBeTruthy();
  });

  it('KsNuxPopover render success when appendToBody', async () => {
    const popoverData = {
      key: 'intro',
      title: 'Welcome to Keystone Design system',
      content:
        'Keystone Design System is an outstanding design system! It offers a seamless and intuitive experience for managing all your activities. With its well - crafted components and user - friendly interface, it significantly enhances productivity and makes your work a breeze.',
    };
    const page = await newSpecPage({
      components: [KsNuxPopover],
      template: () => (
        <ks-nux-popover
          appendToBody={true}
          dataSource={{
            ...popoverData,
            buttons: [
              { text: 'Skip', variant: 'text' },
              { text: 'Next', variant: 'support' },
            ],
          }}
        ></ks-nux-popover>
      ),
    });
    expect(page.root).toBeTruthy();
  });

  it('should append to body on update', async () => {
    const page = await newSpecPage({
      components: [KsNuxPopover],
      template: () => (
        <ks-nux-popover
          dataSource={{
            ...popoverData,
            buttons: [
              { text: 'Skip', variant: 'text' },
              { text: 'Next', variant: 'support' },
            ],
          }}
          appendToBody={false}
        ></ks-nux-popover>
      ),
    });
    expect(document.body.querySelector('ks-tooltip')).toBeNull();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    page.root.setAttribute('append-to-body', 'true');
    await page.waitForChanges();
    expect(document.body.querySelector('ks-tooltip')).not.toBeNull();
  });

  it('should clean up on disconnect when appendToBody is true', async () => {
    const page = await newSpecPage({
      components: [KsNuxPopover],
      template: () => (
        <ks-nux-popover
          dataSource={{
            ...popoverData,
            buttons: [
              { text: 'Skip', variant: 'text' },
              { text: 'Next', variant: 'support' },
            ],
          }}
          appendToBody={true}
          visible={true}
        ></ks-nux-popover>
      ),
    });
    await page.waitForChanges();
    expect(document.body.querySelector('ks-tooltip')).not.toBeNull();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    document.querySelector('ks-nux-popover').remove();
    await page.waitForChanges();
    expect(document.body.querySelector('ks-tooltip')).toBeNull();
  });

  it('should clean up on disconnect when preventInteraction is true', async () => {
    const page = await newSpecPage({
      components: [KsNuxPopover],
      template: () => (
        <ks-nux-popover
          dataSource={{
            ...popoverData,
            buttons: [
              { text: 'Skip', variant: 'text' },
              { text: 'Next', variant: 'support' },
            ],
          }}
          preventInteraction={true}
          visible={true}
        ></ks-nux-popover>
      ),
    });
    await page.waitForChanges();
    expect(document.body?.classList.contains('unscrollable')).toBe(true);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    page.root.remove();
    await page.waitForChanges();
    expect(document.body?.classList.contains('unscrollable')).toBe(false);
  });
});
