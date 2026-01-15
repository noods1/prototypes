import { InternalRenderDynamicSlots } from '../utils';
import { GuidanceContent } from '../../../entities/components/info';

describe('InternalRenderDynamicSlots', () => {
  let mockWrapWithSlot: jest.MockedFunction<(slotName: string, children: unknown) => unknown>;

  beforeEach(() => {
    mockWrapWithSlot = jest.fn((slotName: string, children: unknown) => ({
      slotName,
      children,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('props.guidanceContent?.forEach?.(pushRenderedNode) coverage', () => {
    it('should handle undefined guidanceContent', () => {
      const props = { guidanceContent: undefined };
      const result = InternalRenderDynamicSlots(props, mockWrapWithSlot);

      expect(result).toEqual([]);
      expect(mockWrapWithSlot).not.toHaveBeenCalled();
    });

    it('should handle empty guidanceContent array', () => {
      const props = { guidanceContent: [] };
      const result = InternalRenderDynamicSlots(props, mockWrapWithSlot);

      expect(result).toEqual([]);
      expect(mockWrapWithSlot).not.toHaveBeenCalled();
    });

    it('should handle guidanceContent without forEach method', () => {
      const props = { guidanceContent: 'not-an-array' as any };
      const result = InternalRenderDynamicSlots(props, mockWrapWithSlot);

      expect(result).toEqual([]);
      expect(mockWrapWithSlot).not.toHaveBeenCalled();
    });

    // it('should process single item with content function', () => {
    //   const mockContent = () => 'Test content';
    //   const guidanceContent: GuidanceContent[] = [
    //     {
    //       id: 'test-1',
    //       content: mockContent,
    //     },
    //   ];
    //   const props = { guidanceContent };

    //   const result = InternalRenderDynamicSlots(props, mockWrapWithSlot);

    //   expect(result).toHaveLength(1);
    //   expect(mockWrapWithSlot).toHaveBeenCalledWith('slot-content-test-1', 'Test content');
    //   expect(result[0]).toEqual({
    //     slotName: 'slot-content-test-1',
    //     children: 'Test content',
    //   });
    // });

    // it('should process single item with both content and link functions', () => {
    //   const mockContent = () => 'Test content';
    //   const mockLink = () => 'Test link';
    //   const guidanceContent: GuidanceContent[] = [
    //     {
    //       id: 'test-2',
    //       content: mockContent,
    //       link: mockLink,
    //     },
    //   ];
    //   const props = { guidanceContent };

    //   const result = InternalRenderDynamicSlots(props, mockWrapWithSlot);

    //   expect(result).toHaveLength(2);
    //   expect(mockWrapWithSlot).toHaveBeenCalledWith('slot-content-test-2', 'Test content');
    //   expect(mockWrapWithSlot).toHaveBeenCalledWith('slot-link-test-2', 'Test link');
    //   expect(result[0]).toEqual({
    //     slotName: 'slot-content-test-2',
    //     children: 'Test content',
    //   });
    //   expect(result[1]).toEqual({
    //     slotName: 'slot-link-test-2',
    //     children: 'Test link',
    //   });
    // });

    // it('should process multiple items with content functions', () => {
    //   const guidanceContent: GuidanceContent[] = [
    //     {
    //       id: 'item-1',
    //       content: () => 'Content 1',
    //     },
    //     {
    //       id: 'item-2',
    //       content: () => 'Content 2',
    //       link: () => 'Link 2',
    //     },
    //   ];
    //   const props = { guidanceContent };

    //   const result = InternalRenderDynamicSlots(props, mockWrapWithSlot);

    //   expect(result).toHaveLength(3);
    //   expect(mockWrapWithSlot).toHaveBeenCalledWith('slot-content-item-1', 'Content 1');
    //   expect(mockWrapWithSlot).toHaveBeenCalledWith('slot-content-item-2', 'Content 2');
    //   expect(mockWrapWithSlot).toHaveBeenCalledWith('slot-link-item-2', 'Link 2');
    // });

    // it('should handle content function returning different types', () => {
    //   const guidanceContent: GuidanceContent[] = [
    //     {
    //       id: 'number-content',
    //       content: () => 42,
    //     },
    //     {
    //       id: 'element-content',
    //       content: () => ({ type: 'div', props: {} }),
    //     },
    //   ];
    //   const props = { guidanceContent };

    //   const result = InternalRenderDynamicSlots(props, mockWrapWithSlot);

    //   expect(result).toHaveLength(2);
    //   expect(mockWrapWithSlot).toHaveBeenCalledWith('slot-content-number-content', 42);
    //   expect(mockWrapWithSlot).toHaveBeenCalledWith('slot-content-element-content', { type: 'div', props: {} });
    // });

    it('should skip items where content is not a function', () => {
      const guidanceContent: GuidanceContent[] = [
        {
          id: 'invalid-content',
          content: 'not-a-function' as any,
        },
      ];
      const props = { guidanceContent };

      const result = InternalRenderDynamicSlots(props, mockWrapWithSlot);

      expect(result).toHaveLength(0);
    });
  });
});
