import { Components } from '@src/components';
import { GuidanceContent } from '../../entities/components/info';
export const InternalRenderDynamicSlots = (
  props: Partial<Components.KsGuidance>,
  wrapWithSlot: (slotName: string, children: unknown) => unknown,
) => {
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  const renderedNodes = [];
  const pushRenderedNode = (item: GuidanceContent) => {
    if (typeof item.content === 'function') {
      renderedNodes.push(wrapWithSlot(`slot-content-${item.id}`, item.content()));
    }
    if (item.link && typeof item.link === 'function') {
      renderedNodes.push(wrapWithSlot(`slot-link-${item.id}`, item.link()));
    }
  };
  props.guidanceContent?.forEach?.(pushRenderedNode);

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  return renderedNodes;
};
