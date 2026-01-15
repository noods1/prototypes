import { Components } from '@src/components';
import { TreeDataNode } from '../../entities/components/tree-view';

export const InternalRenderDynamicSlots = (
  props: Partial<Components.KsTreeView>,
  wrapWithSlot: (slotName: string, children: unknown) => unknown,
  // _renderVisItem = [],
) => {
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  const renderedNodes = [];
  const pushRenderedNode = (item: TreeDataNode) => {
    if (typeof item.renderOptions?.popover?.render === 'function') {
      renderedNodes.push(wrapWithSlot(`slot-pop-${item.key}`, item.renderOptions.popover.render()));
    }
  };
  if (!props.treeData) {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    return renderedNodes;
  }

  const traverse = (node: TreeDataNode) => {
    pushRenderedNode(node);

    if (node.children) {
      node.children.forEach(traverse);
    }
  };

  props.treeData.forEach(traverse);

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  return renderedNodes;
};
