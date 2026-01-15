import { Components } from '@src/components';
import { ItemType } from '../../entities/components/info';
export const InternalRenderDynamicSlots = (
  props: Partial<Components.KsInlineAlert>,
  wrapWithSlot: (slotName: string, children: unknown) => unknown,
) => {
  const renderedNodes: unknown[] = [];
  const pushRenderedNode = (item: ItemType) => {
    if (typeof item.content === 'function') {
      renderedNodes.push(wrapWithSlot(`slot-content-${item.id}`, item.content()));
    }
    if (item.link && typeof item.link === 'function') {
      renderedNodes.push(wrapWithSlot(`slot-link-${item.id}`, item.link()));
    }
  };
  props.items?.forEach?.(pushRenderedNode);

  return renderedNodes;
};
