import { InternalRenderDynamicSlots } from '../utils';
import { Components } from '@src/components';
import { ItemType } from '../../../entities/components/info';

describe('InternalRenderDynamicSlots', () => {
  // Mock wrapWithSlot function
  const mockWrapWithSlot = jest.fn((slotName: string, children: unknown) => ({
    slotName,
    children,
  }));

  beforeEach(() => {
    mockWrapWithSlot.mockClear();
  });

  test('should return empty array when items is empty', () => {
    const props: Partial<Components.KsInlineAlert> = {
      items: [],
    };

    const result = InternalRenderDynamicSlots(props, mockWrapWithSlot);
    expect(result).toEqual([]);
    expect(mockWrapWithSlot).not.toHaveBeenCalled();
  });

  test('should return empty array when items is undefined', () => {
    const props: Partial<Components.KsInlineAlert> = {};

    const result = InternalRenderDynamicSlots(props, mockWrapWithSlot);
    expect(result).toEqual([]);
    expect(mockWrapWithSlot).not.toHaveBeenCalled();
  });

  test('should handle item.content as a function correctly', () => {
    const contentFn = () => 'content text';
    const props: Partial<Components.KsInlineAlert> = {
      items: [
        {
          id: 'item1',
          content: contentFn,
        } as ItemType,
      ],
    };

    const result = InternalRenderDynamicSlots(props, mockWrapWithSlot);

    expect(result.length).toBe(1);
    expect(mockWrapWithSlot).toHaveBeenCalledTimes(1);
    expect(mockWrapWithSlot).toHaveBeenCalledWith('slot-content-item1', 'content text');
  });

  test('should handle item.link as a function correctly', () => {
    const linkFn = () => 'link element';
    const props: Partial<Components.KsInlineAlert> = {
      items: [
        {
          id: 'item1',
          link: linkFn,
        } as ItemType,
      ],
    };

    const result = InternalRenderDynamicSlots(props, mockWrapWithSlot);

    expect(result.length).toBe(1);
    expect(mockWrapWithSlot).toHaveBeenCalledTimes(1);
    expect(mockWrapWithSlot).toHaveBeenCalledWith('slot-link-item1', 'link element');
  });

  test('should handle both content and link functions correctly', () => {
    const contentFn = () => 'content text';
    const linkFn = () => 'link element';
    const props: Partial<Components.KsInlineAlert> = {
      items: [
        {
          id: 'item1',
          content: contentFn,
          link: linkFn,
        } as ItemType,
      ],
    };

    const result = InternalRenderDynamicSlots(props, mockWrapWithSlot);

    expect(result.length).toBe(2);
    expect(mockWrapWithSlot).toHaveBeenCalledTimes(2);
    expect(mockWrapWithSlot).toHaveBeenCalledWith('slot-content-item1', 'content text');
    expect(mockWrapWithSlot).toHaveBeenCalledWith('slot-link-item1', 'link element');
  });

  test('should handle multiple items correctly', () => {
    const contentFn1 = () => 'content 1';
    const contentFn2 = () => 'content 2';
    const linkFn2 = () => 'link 2';

    const props: Partial<Components.KsInlineAlert> = {
      items: [
        {
          id: 'item1',
          content: contentFn1,
        } as ItemType,
        {
          id: 'item2',
          content: contentFn2,
          link: linkFn2,
        } as ItemType,
      ],
    };

    const result = InternalRenderDynamicSlots(props, mockWrapWithSlot);

    expect(result.length).toBe(3);
    expect(mockWrapWithSlot).toHaveBeenCalledTimes(3);
    expect(mockWrapWithSlot).toHaveBeenCalledWith('slot-content-item1', 'content 1');
    expect(mockWrapWithSlot).toHaveBeenCalledWith('slot-content-item2', 'content 2');
    expect(mockWrapWithSlot).toHaveBeenCalledWith('slot-link-item2', 'link 2');
  });
});
