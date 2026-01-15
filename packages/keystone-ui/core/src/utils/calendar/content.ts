import { CalendarContent, Components } from '../../components';

export const InternalRenderDynamicSlots = (
  props: Partial<Components.KsCalendarMonth>,
  wrapWithSlot: (slotName: string, children: unknown) => unknown,
) => {
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  const renderedNodes = [];
  const pushRenderedNode = (item: CalendarContent) => {
    if (typeof item.content === 'function') {
      renderedNodes.push(wrapWithSlot(`slot-content-${item.date.getTime()}`, item.content()));
    }
  };
  props.renderContent?.forEach(pushRenderedNode);
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  return renderedNodes;
};
