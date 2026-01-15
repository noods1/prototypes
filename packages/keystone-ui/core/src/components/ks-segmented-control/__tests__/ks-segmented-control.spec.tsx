import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { KsSegmentedItem } from '../ks-segmented-item';
import { KsSegmentedGroup } from '../ks-segmented-group';

describe('KsSegmentedControl', () => {
  it('should set default selected value', async () => {
    const page = await newSpecPage({
      components: [KsSegmentedGroup, KsSegmentedItem],
      template: () => (
        <ks-segmented-group defaultValue="2">
          <ks-segmented-item value="1">Item 1</ks-segmented-item>
          <ks-segmented-item value="2">Item 2</ks-segmented-item>
        </ks-segmented-group>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const segmentedItems = page.root.querySelectorAll<HTMLKsSegmentedItemElement>('ks-segmented-item');

    expect(segmentedItems[1]).toHaveAttribute('ks-active');
  });

  it('should handle disabled state at item level', async () => {
    const page = await newSpecPage({
      components: [KsSegmentedGroup, KsSegmentedItem],
      template: () => (
        <ks-segmented-group>
          <ks-segmented-item disabled value="1">
            Item 1
          </ks-segmented-item>
          <ks-segmented-item value="2">Item 2</ks-segmented-item>
        </ks-segmented-group>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const segmentedItems = page.root.querySelectorAll<HTMLKsSegmentedItemElement>('ks-segmented-item');

    expect(segmentedItems[0]).toHaveAttribute('ks-disabled');
    expect(segmentedItems[1]).not.toHaveAttribute('ks-disabled');
  });

  it('should handle disabled state at group level', async () => {
    const page = await newSpecPage({
      components: [KsSegmentedGroup, KsSegmentedItem],
      template: () => (
        <ks-segmented-group disabled>
          <ks-segmented-item value="1">Item 1</ks-segmented-item>
          <ks-segmented-item value="2">Item 2</ks-segmented-item>
        </ks-segmented-group>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const segmentedItems = page.root.querySelectorAll<HTMLKsSegmentedItemElement>('ks-segmented-item');

    expect(segmentedItems[0]).toHaveAttribute('ks-disabled');
    expect(segmentedItems[1]).toHaveAttribute('ks-disabled');
  });

  it('should handle default value', async () => {
    const page = await newSpecPage({
      components: [KsSegmentedGroup, KsSegmentedItem],
      template: () => (
        <ks-segmented-group defaultValue="1">
          <ks-segmented-item value="1">Item 1</ks-segmented-item>
          <ks-segmented-item value="2">Item 2</ks-segmented-item>
        </ks-segmented-group>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const segmentedItems = page.root.querySelectorAll<HTMLKsSegmentedItemElement>('ks-segmented-item');

    expect(segmentedItems[0]).toHaveAttribute('ks-active');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    segmentedItems[1].shadowRoot.querySelector<HTMLElement>('[data-testid=ks-segmented-item-index-oLb7CD]').click();
    await page.waitForChanges();

    expect(segmentedItems[1]).toHaveAttribute('ks-active');
  });

  it('should handle controlled value', async () => {
    const page = await newSpecPage({
      components: [KsSegmentedGroup, KsSegmentedItem],
      template: () => (
        <ks-segmented-group
          value="1"
          onKsChange={function ({ detail }: CustomEvent<string | number>) {
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            (this as HTMLKsSegmentedGroupElement).value = detail;
          }}
        >
          <ks-segmented-item value="1">Item 1</ks-segmented-item>
          <ks-segmented-item value="2">Item 2</ks-segmented-item>
        </ks-segmented-group>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const segmentedItems = page.root.querySelectorAll<HTMLKsSegmentedItemElement>('ks-segmented-item');

    expect(segmentedItems[0]).toHaveAttribute('ks-active');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    segmentedItems[1].shadowRoot.querySelector<HTMLElement>('[data-testid=ks-segmented-item-index-oLb7CD]').click();
    await page.waitForChanges();

    expect(segmentedItems[1]).toHaveAttribute('ks-active');
  });

  it('', async () => {
    const page = await newSpecPage({
      components: [KsSegmentedGroup, KsSegmentedItem],
      template: () => (
        <ks-segmented-group defaultValue="1">
          <ks-segmented-item value="1">Item 1</ks-segmented-item>
          <ks-segmented-item value="2" disabled>
            Item 2
          </ks-segmented-item>
        </ks-segmented-group>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const segmentedItems = page.root.querySelectorAll<HTMLKsSegmentedItemElement>('ks-segmented-item');

    expect(segmentedItems[0]).toHaveAttribute('ks-active');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    segmentedItems[1].shadowRoot.querySelector<HTMLElement>('[data-testid=ks-segmented-item-index-oLb7CD]').click();
    await page.waitForChanges();

    expect(segmentedItems[0]).toHaveAttribute('ks-active');
  });
});
