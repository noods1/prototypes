import { isBoolean } from 'lodash-es';
import {
  DropdownMenuItem,
  DropdownItem,
  DropdownTab,
  CustomRenderFn,
  RenderContentFn,
  DropdownGroupItem,
} from '../../entities/components/dropdown';
import type { Components } from '@src/components';

// 打平函数
export const flattenDropdownItems = (
  items: DropdownItem[],
  groupId?: string | number,
): (DropdownMenuItem | string)[] => {
  const result: (DropdownMenuItem | string)[] = [];

  items.forEach((item) => {
    if (item.type !== 'group') {
      item.groupId = groupId;
      result.push(item as DropdownMenuItem);
    } else if (item.type === 'group') {
      result.push(item.title || '');
      const childrenTitles = flattenDropdownItems(item.children as DropdownItem[], item.id);
      result.push(...childrenTitles);
    }
  });

  return result;
};

export const internalRenderDynamicSlots = (
  props: Partial<Components.KsDropdownMenu>,
  wrapWithSlot: (slotName: string, children: unknown) => unknown,
  renderVisItem?: unknown[] | undefined | null,
  searchValue?: string,
) => {
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  const renderedNodes = [];
  const createSlot = (
    type: string,
    itemId: string | number,
    groupId?: string | number,
    tabId?: string,
    renderFn?: CustomRenderFn | RenderContentFn,
  ) => {
    const slotName = `slot-${type}-${itemId}${groupId ? '-' + groupId : ''}${tabId ? '-' + tabId : ''}`;
    // FIXME 缺失一个 item hover 状态的参数，Ads Creation 2.0 中比较常用
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    return wrapWithSlot(slotName, type === 'content' ? renderFn(searchValue) : renderFn());
  };
  const createAvatarIconSlot = (type: string, itemId: string | number, renderFn?: CustomRenderFn) => {
    const slotName = `slot-${type}-${itemId}`;
    // FIXME 缺失一个 item hover 状态的参数，Ads Creation 2.0 中比较常用
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    return wrapWithSlot(slotName, renderFn());
  };
  const pushRenderedNode = (item: DropdownMenuItem, tabId?: string) => {
    const slotConfigs = [
      { renderFn: item.renderContent, type: 'content' },
      { renderFn: item.renderOptions?.description, type: 'des' },
      { renderFn: item.renderOptions?.popover?.render, type: 'pop' },
      { renderFn: item.renderOptions?.extra, type: 'extra' },
    ];
    slotConfigs.forEach(({ renderFn, type }) => {
      if (typeof renderFn === 'function') {
        renderedNodes.push(createSlot(type, item.id, item.groupId, tabId, renderFn));
      }
    });
  };
  const pushRenderedAvatarIcon = (item: DropdownGroupItem) => {
    const slotConfigs = [{ renderFn: item.avatarIcon, type: 'avatar-icon' }];
    slotConfigs.forEach(({ renderFn, type }) => {
      if (typeof renderFn === 'function') {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        renderedNodes.push(createAvatarIconSlot(type, item.id, renderFn));
      }
    });
  };
  const pushRenderedTitle = (item: DropdownGroupItem, tabId?: string) => {
    if (typeof item.renderTitle === 'function') {
      renderedNodes.push(wrapWithSlot(`slot-title-${item.id}${tabId ? '-' + tabId : ''}`, item.renderTitle()));
    }
  };
  const pushDropdownItem = (item: DropdownItem, tabId?: string) => {
    if (item.type === 'group') {
      pushRenderedAvatarIcon(item);
      pushRenderedTitle(item, tabId);
      item.children.forEach((child) => {
        child.groupId = item.id;
        pushRenderedNode(child, tabId);
      });
    } else {
      pushRenderedNode(item, tabId);
    }
  };

  if (!props.dataSource) {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    return renderedNodes;
  }

  const getDropdownItemList = (dropdownItem: DropdownItem[]) => {
    let list = [];
    if (isBoolean(props.virtual) && props.virtual) {
      const items = flattenDropdownItems(dropdownItem);
      list = items.filter((item) => typeof item !== 'string' && (renderVisItem || []).includes(item?.id));
    } else {
      list = dropdownItem;
    }
    return list;
  };

  if (props.dataSource?.type === 'list') {
    const list = getDropdownItemList(props.dataSource?.items);
    list.forEach((item) => {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      pushDropdownItem(item);
    });
  } else if (props.dataSource?.type === 'tabs') {
    props.dataSource?.tabs.forEach((tab: DropdownTab) => {
      if (typeof tab.renderTab === 'function') {
        renderedNodes.push(wrapWithSlot(`slot-tab-${tab.tabId}`, tab.renderTab()));
      }
      const list = getDropdownItemList(tab.items);
      list.forEach((item) => {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        pushDropdownItem(item, tab.tabId);
      });
    });
  }
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  return renderedNodes;
};
