/* eslint-disable max-lines */
import {
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  State,
  Element,
  Watch,
  forceUpdate,
  Fragment,
  readTask,
} from '@stencil/core';
import { cloneDeep, throttle, uniqBy, pickBy, isString, isElement, isNumber } from 'lodash-es';
import { convertNum2PX, dir, t } from '@src/utils/utils';
import { internalRenderDynamicSlots, flattenDropdownItems } from '@src/utils/dropdown';
import {
  DropdownMenu,
  DropdownSingleItem,
  PopoverPropTrigger,
  DropdownGroupItem,
  DropdownItem,
  DropdownMenuItem,
  DropdownTab,
  LoadFailedOption,
  CSSProperties,
  // DropdownMenuItemRenderOptions,
} from '../../entities';
import type { Placement } from '@floating-ui/dom';
import {
  Virtualizer,
  elementScroll,
  measureElement,
  observeElementOffset,
  observeElementRect,
} from '@tanstack/virtual-core';
import { Slot, Slots } from '@src/utils/decorators';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { registerPluginManager } from '@src/utils/plugin';
import { sendActionTracking, sendDurationTracking, sendExposeTracking } from '@src/utils/tracking';
import { ElementContext } from '@floating-ui/dom';
import { commonMessages, searchMessages } from '@fe-infra/keystone-locales';

const FOCUS_DELAY_TIME = 50;
const prefix = 'dropdown-menu';
let maxWidth = 0;
const getFuzzySearchIndex = (fullContent: string, pattern: string) =>
  fullContent?.toLocaleLowerCase().indexOf(pattern.toLowerCase());

function filterDataAttrs(attrs: Record<string, string | boolean>): Record<`data-${string}`, string | boolean> {
  return pickBy(attrs, (_, key) => key.startsWith('data-'));
}

/**
 * @slot header - Slot for custom header content within the dropdown panel.
 * @slot listHeader - Slot for custom list header content within the dropdown panel.
 * @slot content - Slot for the main custom content area within the dropdown panel.
 * @slot footer - Slot for custom footer content within the dropdown panel.
 * @slot empty - Slot for content to display when the dropdown panel is empty.
 * @slot error - Slot for content to display when the dropdown panel is load fail.
 * @slot loadFailCtas - Slot for cta button to display when the dropdown panel is load fail
 */
@Component({
  tag: 'ks-dropdown-menu',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsDropdownMenu {
  ['ks-name'] = 'ks-dropdown-menu';

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsDropdownMenuElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  popperRef: HTMLKsTooltipElement;
  bodyRef?: HTMLKsScrollbarElement;
  inputRef?: HTMLKsInputElement;

  @State() _activeId: (string | number)[] = [];
  @State() _activeTabId = '';
  @State() _searchValue = '';

  // props ---------------------------------------
  /**
   * @locale {en} Width of the dropdown menu.
   * @locale {zh} 下拉菜单的宽度。
   */
  @Prop() width = 'auto';
  /**
   * @locale {en} An array of IDs representing the currently active items in the dropdown menu.
   * @locale {zh} 当前下拉菜单中激活项目的 ID 数组。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: (string | number)[];
  /**
   * @locale {en} An object representing the dropdown menu configuration. It contains a `type` property, which can be one of the following values:
   * - `list`: Indicates that the menu is displayed as a list.
   * - `tabs`: Indicates that the menu is displayed as tabs.
   * @locale {zh} 表示下拉菜单配置的对象。包含一个 `type` 属性，可能的值有：
   * - `list`：表示菜单以列表形式展示。
   * - `tabs`：表示菜单以标签形式展示。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() dataSource: DropdownMenu;
  /**
   * @locale {en} Determines whether the dropdown menu allows multiple selections. When `true`, the dropdown menu allows multiple selections.
   * @locale {zh} 用于判断下拉菜单是否允许多选。当值为 `true` 时，下拉菜单允许多选。
   */
  @Prop() isMultiple?: boolean = false;
  /**
   * @locale {en} The ID of the currently active tab in the dropdown menu. This property is effective only when the `menu.type` is `tabs`.
   * @locale {zh} 下拉菜单中当前激活标签的 ID。当 `menu.type` 为 `tabs` 时，该属性有效。
   */
  @Prop() activeTabId = '';
  @Watch('activeTabId')
  onActiveTabIdChange() {
    this._activeTabId = this.activeTabId;
  }
  /**
   * @locale {en} Indicates whether the dropdown menu has a search input. When `true`, the dropdown menu has a search input.
   * @locale {zh} 指示下拉菜单是否具有搜索输入框。当值为 `true` 时，下拉菜单具有搜索输入框。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() searchable: boolean;
  /**
   * @locale {en} Placeholder text for the search input in the dropdown menu.
   * @locale {zh} 下拉菜单中搜索输入框的占位符文本。
   */
  @Prop() searchPlaceholder = '';
  /**
   * @locale {en} The current value of the search input in the dropdown menu.
   * @locale {zh} 下拉菜单中搜索输入框的当前值。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() searchValue: string;

  // FIXME 这个 `displaySearchText` 参数过于晦涩且场景边缘了，和需求方 @chenzihao 对齐方案后移除
  /**
   * @locale {en} The display text of the search input in the dropdown menu.
   * @locale {zh} 下拉菜单中搜索输入框的展示的文本。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() displaySearchText: string;

  /**
   * @locale {en} A custom search method used to filter options based on the query. It receives two arguments: `query` (the search input) and `option` (the option to be evaluated). This method should return `true` if the option matches the query.
   * @locale {zh} 自定义搜索方法，用于根据查询过滤选项。它接收两个参数：`query`（搜索输入）和 `option`（要评估的选项）。如果选项与查询匹配，则该方法应返回 `true`。
   */
  // eslint-disable-next-line no-unused-vars
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() search: (query: string, data: DropdownMenuItem) => boolean;

  // 一些需要透传到popover组件的值
  /**
   * @locale {en} The placement of the dropdown menu. Can be one of the following values:
   * `top`, `right`, `bottom`, `left`, `top-start`, `top-end`,
   * `right-start`, `right-end`, `bottom-start`, `bottom-end`,
   * `left-start`, and `left-end`.
   * @locale {zh} 下拉菜单的位置。可选值包括
   * `top`、`right`、`bottom`、`left`、`top-start`、`top-end`、
   * `right-start`、`right-end`、`bottom-start`、`bottom-end`、
   * `left-start` 和 `left-end`。
   */
  @Prop() placement: Placement = 'bottom-start';
  /**
   * @locale {en} The event that triggers the dropdown menu. Possible values are `click`, `hover`, `focus`, and `manual`. When `trigger` is set, `visible` does not need to be set separately.
   * @locale {zh} 触发下拉菜单的事件。可选值为 `click`、`hover`、`focus` 和 `manual`。当设置了 `trigger` 时，不需要额外设置 `visible`。
   */
  @Prop() trigger: PopoverPropTrigger = 'click';
  /**
   * @locale {en} Indicates whether the dropdown menu is currently visible.
   * @locale {zh} 指示下拉菜单当前是否可见。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() visible: boolean;
  /**
   * @locale {en} Delay in milliseconds before the dropdown menu appears when triggered.
   * @locale {zh} 触发时，下拉菜单出现前的延迟，单位为毫秒。
   */
  @Prop() enterDelay = 0;
  /**
   * @locale {en} Delay in milliseconds before the dropdown menu disappears when not triggered.
   * @locale {zh} 当未触发时，下拉菜单消失前的延迟，单位为毫秒。
   */
  @Prop() leaveDelay = 0;
  /**
   * @locale {en} The offset in pixels for the gap between the dropdown menu and its trigger element.
   * @locale {zh} 下拉菜单与其触发元素之间的间隙偏移，单位为像素。
   */
  @Prop() gapOffset = 0;
  /**
   * @locale {en} The offset in pixels for the starting position of the dropdown menu relative to its trigger element.
   * @locale {zh} 下拉菜单相对于其触发元素的起始位置偏移，单位为像素。
   */
  @Prop() startOffset = 0;
  /**
   * @locale {en} Indicates whether to allow checkbox selection of rows.
   * @locale {zh} 指示是否允许框选行。
   */
  @Prop() selectable = true;
  /**
   * @private experimental version for internal use only
   */
  @Prop() virtual = false;
  /**
   * @locale {en} Indicates whether the entire menu is loaded.
   * @locale {zh} 指示整个菜单是否加载状态
   */
  @Prop() loading = false;
  /**
   * @locale {en} The estimated height (px) of each item in the list, used for virtual scroll. When `virtual` is true, this height is applied to each item and used for placeholders.
   * @locale {zh} 列表中每个项目的估计高度（像素），用于虚拟滚动。当 `virtual` 为 true 时，此高度将应用于每个项目，并用作占位符。
   */
  @Prop() estimatedItemHeight?: number;

  /**
   * @private Internal prop for render layer, please don't use.
   */
  @Prop() __internal_bridged_dynamic_slot_render = true;

  /**
   * @private Internal prop for render layer, please don't use.
   */
  @Prop() wrapWithSlot: (slotName: string, children: unknown) => unknown = (slotName: string, children: unknown) =>
    children;

  /**
   * @private Internal prop for render layer, please don't use.
   */
  @Prop() setDynamicRenderDeps?: (items: unknown[]) => void;

  /**
   * @locale {en} Controls whether dropdown menu are disabled. When true, the Dropdown card is not visible.
   * @locale {zh} 控制是否禁用下拉菜单。当为 `true` 时，下拉菜单不可见。
   */
  @Prop() disabled: boolean | undefined;
  /**
   * @locale {en} Display the Item loaded at the end
   * @locale {zh} 展示末尾加载的Item
   */
  @Prop() loadItems = false;
  /**
   * @locale {en} Indicates whether the loading has failed.
   * @locale {zh} 指示加载是否失败
   */
  @Prop() loadFailed = false;
  /**
   * @locale {en} By default, the floating element is the one being checked for overflow.But you can also change the context to 'reference' to instead check its overflow relative to its clipping boundary.
   * @locale {zh} 默认情况下，要检查的是浮动元素是否溢出。但你也可以将上下文更改为‘reference’，以检查其相对于其剪切边界的溢出。
   */
  @Prop() elementContext: ElementContext = 'floating';
  /**
   * @locale {en} The options to display when the loading fails.
   * @locale {zh} 加载失败时要显示的选项。
   */
  @Prop() loadFailedOptions: LoadFailedOption = {};
  /**
   * @private 即将废弃
   * @deprecated 请使用更通用的 `overlayHeight="auto"` 替代
   * @locale {en} The list has a default maximum height, but when `listAutoHeight` is set to `true`, the maximum height is no longer restricted.
   * @locale {zh} 列表有默认最大高度，但当 `listAutoHeight` 设为 `true` 时，将不再限制最大高度。
   */
  @Prop() listAutoHeight = false;
  /**
   * @locale {en} The list has a default height, available for `overlayHeight` to override. If `"auto"` is passed, the height will be auto-scaled.
   * @locale {zh} 列表有默认最大高度，可用 `overlayHeight` 覆盖。若传入 `"auto"`，则高度为不限。
   */
  @Prop() overlayHeight: string | number | { min?: string | number; max?: string | number } = { max: 381 };
  /**
   * @locale {en} Custom event triggered when the value changes in the dropdown menu.
   * @locale {zh} 当下拉菜单中的值变化时触发的自定义事件只发送key。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksKeyChange: EventEmitter<(number | string)[]>;

  /**
   * @locale {en} Custom event triggered when the value changes in the dropdown menu.
   * @locale {zh} 当下拉菜单中的值变化时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksValueChange: EventEmitter<DropdownMenuItem[]>;
  /**
   * @locale {en} Custom event triggered when the visibility of the dropdown menu changes.
   * @locale {zh} 当下拉菜单的可见性变化时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksVisibleChange: EventEmitter<boolean>;
  /**
   * @locale {en} Custom event triggered when the search input value changes in the dropdown menu.
   * @locale {zh} 当下拉菜单中的搜索输入值变化时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksSearchChange: EventEmitter<string>;
  /**
   * @locale {en} Custom event triggered when the active tab changes in the dropdown menu.
   * @locale {zh} 当下拉菜单中的活动标签变化时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksTabsChange: EventEmitter<string>;
  /**
   * @locale {en} Triggered when the content in the drop-down menu reaches the bottom
   * @locale {zh} 当下拉菜单中内容触底时触发
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksHitBottom: EventEmitter<() => void>;

  @Slot({ slotname: '_default' }) private defaultSlot?: Slots;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'footer' }) footerSlot: Slots;

  @State() minWidth = 0;

  @State() renderVisItem = [];

  @State() renderDataList: DropdownItem[] = [];

  @State() renderTabDataList: DropdownTab[] = [];

  @State() isInputFocused = false;

  @Watch('value')
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  valueWatcher(val) {
    this._activeId = val || [];
  }

  @Watch('searchValue')
  searchValueWatcher(val = '') {
    this.handleSearchValueChange(val);
  }

  @Watch('dataSource')
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  dataChange(newVal) {
    if (this._searchValue) {
      this.handleSearchValueChange(this._searchValue);
    } else {
      if (newVal?.type === 'tabs') {
        this.renderTabDataList = newVal.tabs;
      } else {
        this.renderDataList = newVal.items;
      }
      if (this.virtual) {
        this.updateCustomDropMenuItem(this.renderVisItem);
      } else {
        this.setDynamicRenderDeps?.(
          KsDropdownMenu.__internal_renderDynamicSlots(this, this.wrapWithSlot, null, this._searchValue),
        );
      }
    }
  }

  constructor() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  private updateCustomDropMenuItem(renderVisItem) {
    let dataList = flattenDropdownItems(this.renderDataList).filter((item) => typeof item !== 'string');
    if (this.dataSource.type === 'tabs') {
      const currentTabIndex = Math.max(
        this.dataSource.tabs.findIndex((item) => item.tabId === this._activeTabId),
        0,
      );
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      dataList = flattenDropdownItems(this.renderTabDataList[currentTabIndex].items).filter(
        (item) => typeof item !== 'string',
      );
    }
    const items = dataList.slice(renderVisItem[0], renderVisItem[renderVisItem.length - 1] + 1).map((item) => item.id);
    this.setDynamicRenderDeps?.(
      KsDropdownMenu.__internal_renderDynamicSlots(this, this.wrapWithSlot, items, this._searchValue),
    );
    this.el.dispatchEvent(new CustomEvent('dropMenuItemUpdate', { detail: { items, searchValue: this._searchValue } }));
  }

  static __internal_renderDynamicSlots(
    props: Partial<KsDropdownMenu>,
    wrapWithSlot: (slotName: string, children: unknown) => unknown,
    renderVisItem: unknown[] | null | undefined,
    searchValue = '',
  ) {
    return internalRenderDynamicSlots(props, wrapWithSlot, renderVisItem, searchValue);
  }

  getMenuItemByIds(_ids: (string | number)[]): DropdownMenuItem[] {
    const getCorrespondingItems = (items: DropdownItem[]) =>
      items.flatMap((item) => (item.type === 'group' ? item.children : item)).filter(({ id }) => _ids.includes(id));

    if (this.dataSource.type === 'list') {
      return cloneDeep(getCorrespondingItems(this.dataSource.items));
    }

    if (this.dataSource.type === 'tabs') {
      return cloneDeep(this.dataSource.tabs.flatMap(({ items }) => getCorrespondingItems(items)));
    }

    return [];
  }

  // 内部方法
  handleItemClick(item: DropdownMenuItem) {
    if (item.disabled) return;
    let activeId = [...this._activeId];
    if (this.selectable && this._activeId.some((i) => i === item.id)) {
      activeId = activeId.filter((i) => i !== item.id);
    } else {
      activeId = this.isMultiple ? [...activeId, item.id] : [item.id];
    }
    if (!this.value) {
      this._activeId = activeId;
    }
    // 在搜索等场景，用户的 dataSource 的值会根据 search 的结果被过滤掉一些，这种情况不需要根据datasource过滤掉不需要的id
    const emitValue = uniqBy(this.getMenuItemByIds(activeId), 'id');
    this.ksValueChange.emit(emitValue);
    this.ksKeyChange.emit(activeId);
    sendActionTracking(this.el, {
      eventType: 'change',
      subEventType: 'items',
      componentParams: { value: emitValue },
    });

    if (!this.selectable || !this.isMultiple) {
      this.popperRef?.close?.();
    }
  }

  popoverAnimeFinished = () => {
    this.popperRef?.dispatchEvent(new CustomEvent('ks-popover-anime-finished'));
  };

  // FIXME 搜索需要 throttle 优化性能问题
  // TODO 多选 + cascading
  handleSearchValueChange = (value: string) => {
    this._searchValue = value;
    const isShowItem = (item: DropdownMenuItem) => {
      const des = item.renderOptions?.description;
      const desQuery = des || '';
      const contentQuery = item.content || '';
      return this.search
        ? this.search(this._searchValue, item)
        : getFuzzySearchIndex(contentQuery, this._searchValue) > -1 ||
            (desQuery && getFuzzySearchIndex(desQuery.toString(), this._searchValue) > -1);
    };
    if (this.dataSource?.type === 'list') {
      const renderList = this.dataSource.items
        .map((item: DropdownItem) => {
          if (item.type === 'group') {
            const children = item.children.filter(isShowItem);
            return {
              ...item,
              children,
            };
          } else {
            const show = isShowItem(item);
            return show ? item : null;
          }
        })
        .filter((item) => !!item);
      this.renderDataList = renderList;
    } else {
      this.renderTabDataList = this.dataSource?.tabs.map((tab) => ({
        tabId: tab.tabId,
        label: tab.label,
        items: tab.items.filter((item) => {
          if (item.type === 'group') {
            return item.children.filter(isShowItem);
          } else {
            return isShowItem(item);
          }
        }),
      }));
    }
    const virtualizeEnabled = this._virtualizerController.enabled;

    if (virtualizeEnabled) {
      const { virtualizer } = this._virtualizerController;
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const virtualRows = virtualizer.getVirtualItems().map((item) => item.index);
      this.updateCustomDropMenuItem(virtualRows);
    } else {
      this.setDynamicRenderDeps?.(
        KsDropdownMenu.__internal_renderDynamicSlots(this, this.wrapWithSlot, null, this._searchValue),
      );
    }
  };

  handleRequestError() {
    requestAnimationFrame(() => {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.bodyRef.scrollTop = this.bodyRef.scrollTop - 20;
    });
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  private reachBottomObserver: IntersectionObserver;
  setupReachBottomObserver = (reachBottomSentinel?: HTMLElement) => {
    // [IMPORTANT] 这里需要使用 readTask 来确保在元素已经渲染后再进行操作，尤其在切换 Tab 场景下存在分页重渲染
    readTask(() => {
      if (!reachBottomSentinel) {
        return;
      }

      this.cleanupReachBottomObserver();

      this.reachBottomObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          if (entry.isIntersecting) {
            this.ksHitBottom.emit(this.handleRequestError.bind(this));
            sendActionTracking(this.el, { eventType: 'scroll', subEventType: 'hitBottom' });
          }
        },
        {
          root: this.bodyRef,
          threshold: 0.1,
        },
      );

      this.reachBottomObserver.observe(reachBottomSentinel);
    });
  };
  cleanupReachBottomObserver() {
    if (this.reachBottomObserver) {
      this.reachBottomObserver.disconnect();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.reachBottomObserver = null;
    }
  }

  // 初始化处理 ------------
  componentWillLoad() {
    if (this.dataSource?.type === 'tabs') {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this._activeTabId = this.activeTabId || this.dataSource.tabs[0].tabId || '';
      this.renderTabDataList = this.dataSource?.tabs || [];
    } else {
      this.renderDataList = this.dataSource?.items || [];
    }
    this._searchValue = this.searchValue || '';
    this.handleSearchValueChange(this._searchValue);

    this._activeId = this.value || [];
  }

  renderMenuItemContent({
    item,
    searchIndex = -1,
    tabId,
  }: {
    item: DropdownMenuItem;
    searchIndex?: number;
    tabId: string;
  }) {
    // TODO: ks-text 去掉了 ellipsis 属性，增加了虚拟滚动之后可以加上
    const contentSlotName = `slot-content-${item.id}${item.groupId ? '-' + item.groupId : ''}${tabId ? `-${tabId}` : ''}`;
    if (!this.__internal_bridged_dynamic_slot_render && item.renderContent) {
      let element = item.renderContent(this.searchValue || '') as HTMLElement;
      if (typeof element === 'string' || typeof element === 'number') {
        const innerText = String(element);
        element = document.createElement('div');
        (element as HTMLDivElement).innerText = innerText;
      }
      if (!element || !(element instanceof HTMLElement)) {
        element = document.createElement('div');
      }
      element.slot = contentSlotName;
      const parrentElement = this.bodyRef && this.bodyRef.querySelector(`#${contentSlotName}`);
      const currentElement = parrentElement && parrentElement.querySelector(`[slot=${contentSlotName}]`);
      if (currentElement) {
        parrentElement.replaceChild(element, currentElement);
      } else {
        parrentElement && parrentElement.appendChild(element);
      }
    }

    const { avatar, description, popover, extra } = item.renderOptions || {};
    const highlightContent =
      searchIndex > -1 ? (
        <ks-text
          ellipsis={{
            maxline: 1,
            tooltip: !popover,
          }}
          variant="bodySm"
        >
          {searchIndex > 0 && <span>{item.content?.toString().slice(0, searchIndex)}</span>}
          <span data-highlight>
            {item.content?.toString().slice(searchIndex, this._searchValue.length + searchIndex)}
          </span>
          {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
          {searchIndex + this._searchValue.length < item.content?.length && (
            <span>{item.content?.toString().slice(this._searchValue.length + searchIndex)}</span>
          )}
        </ks-text>
      ) : (
        <ks-text
          ellipsis={{
            maxline: 1,
            tooltip: !popover,
          }}
          variant="bodySm"
        >
          {item.content?.toString()}
        </ks-text>
      );

    const desSlotName = `slot-des-${item.id}${item.groupId ? '-' + item.groupId : ''}${tabId ? `-${tabId}` : ''}`;
    if (!this.__internal_bridged_dynamic_slot_render && description && typeof description === 'function') {
      let element = description() as HTMLElement;
      if (typeof element === 'string' || typeof element === 'number') {
        const innerText = String(element);
        element = document.createElement('div');
        (element as HTMLDivElement).innerText = innerText;
      }
      if (!element || !(element instanceof HTMLElement)) {
        element = document.createElement('div');
      }
      element.slot = desSlotName;
      const parrentElement = this.bodyRef && this.bodyRef.querySelector(`#${desSlotName}`);
      const currentElement = parrentElement && parrentElement.querySelector(`[slot=${desSlotName}]`);
      if (currentElement) {
        parrentElement.replaceChild(element, currentElement);
      } else {
        parrentElement && parrentElement.appendChild(element);
      }
    }

    const extraSlotName = `slot-extra-${item.id}${item.groupId ? '-' + item.groupId : ''}${tabId ? `-${tabId}` : ''}`;
    if (!this.__internal_bridged_dynamic_slot_render && typeof extra === 'function') {
      const extraContent = extra();
      const extraSlot = isElement(extraContent) ? (extraContent as HTMLElement) : document.createElement('div');
      extraSlot.slot = extraSlotName;

      const parrentElement = this.bodyRef && this.bodyRef.querySelector(`#${extraSlotName}`);
      const currentElement = parrentElement && parrentElement.querySelector(`[slot=${extraSlotName}]`);
      if (currentElement) {
        parrentElement.replaceChild(extraSlot, currentElement);
      } else {
        parrentElement && parrentElement.appendChild(extraSlot);
      }
    }

    return (
      <div class={`${prefix}__list-item__content`}>
        {avatar && <ks-avatar size="sm" {...(typeof avatar === 'function' ? avatar(item) : avatar)} />}
        <div class={`${prefix}__list-item__content-text`}>
          {item.renderContent ? (
            <div id={contentSlotName}>
              <slot name={contentSlotName}></slot>
            </div>
          ) : (
            highlightContent
          )}

          {description &&
            (typeof description === 'function' ? (
              <div id={desSlotName}>
                <slot name={desSlotName}></slot>
              </div>
            ) : (
              <ks-text
                ellipsis={{
                  maxline: 2,
                  tooltip: !popover,
                }}
                variant="labelSm"
                class={`${prefix}__list-item__content-desc`}
              >
                {description}
              </ks-text>
            ))}
        </div>
        {/* FIXME 不知道这里为什么要加个 div，暂时先这么处理，后续要搞清楚移除掉 */}
        <div id={extraSlotName} style={{ display: 'contents' }} data-testid="ks-dropdown-menu-index-h9GFBC">
          <slot name={extraSlotName}></slot>
        </div>
      </div>
    );
  }
  renderMenuSingleItem(item: DropdownMenuItem, tabId?: string) {
    // 可以实现一个简单的搜索，无需用的watch
    if (!item) {
      // TODO: 当dataSorce改变的时候,virtualRow可能没有来得及更新, items[virtualRow.index] 可能为undefined
      return null;
    }
    const isSelected = this.selectable && this._activeId.some((i) => i === item.id);
    const contentQuery = item.content || '';

    const classes = {
      [`${prefix}__list-item`]: true,
      [`${prefix}__list-item--active`]: isSelected,
      [`${prefix}__list-item--disabled`]: item.disabled,
      [`${prefix}__list-item--multiple`]: this.isMultiple,
    };

    const searchIndex = contentQuery.toLowerCase().indexOf(this._searchValue?.toLowerCase());
    const renderedItem = (
      <li
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        {...filterDataAttrs(item.dataAttrs)}
        data-dropdown-item={item.id}
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        class={classes}
        onClick={(e) => {
          // Block click event from ks-checkbox
          e.preventDefault();
          this.handleItemClick(item as DropdownMenuItem);
        }}
        data-testid="ks-dropdown-menu-index-uqn2zb"
      >
        {this.selectable && this.isMultiple ? (
          <ks-checkbox style={{ width: '100%' }} checked={isSelected} disabled={item.disabled}>
            {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
            {this.renderMenuItemContent({ item, searchIndex, tabId })}
          </ks-checkbox>
        ) : (
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          this.renderMenuItemContent({ item, searchIndex, tabId })
        )}

        {this.selectable && !this.isMultiple && isSelected && <ks-icon-check-mark-small size="14" />}
      </li>
    );

    const { popover } = item.renderOptions || {};
    if (!popover) return renderedItem;

    const popoverOptions = typeof popover === 'function' ? {} : popover;
    const { render, ...rest } = popoverOptions;
    const slotName = `slot-pop-${item.id}${item.groupId ? '-' + item.groupId : ''}${tabId ? `-${tabId}` : ''}`;
    if (!this.__internal_bridged_dynamic_slot_render && render) {
      let element: HTMLDivElement = render() as HTMLDivElement;
      if (typeof element === 'string' || typeof element === 'number') {
        const innerText = String(element);
        element = document.createElement('div');
        (element as HTMLDivElement).innerText = innerText;
      }
      if (!element || !(element instanceof HTMLElement)) {
        element = document.createElement('div');
      }
      (element as HTMLDivElement).slot = slotName;
      const parrentElement = this.bodyRef && this.bodyRef.querySelector(`#${slotName}`);
      const currentElement = parrentElement && parrentElement.querySelector(`[slot=${slotName}]`);
      if (currentElement) {
        parrentElement.replaceChild(element, currentElement);
      } else {
        parrentElement && parrentElement.appendChild(element);
      }
    }
    return (
      <ks-tooltip
        class={`${prefix}__tooltip`}
        trigger="hover"
        {...rest}
        key={item.id}
        data-testid={`ks-dropdown-menu-index-j8HAZm-${item.id}`}
      >
        {render ? (
          <div id={slotName} slot="content">
            <slot name={slotName}></slot>
          </div>
        ) : (
          <ks-text slot="content" variant="bodySm">
            {popoverOptions.content || ''}
          </ks-text>
        )}

        {renderedItem}
      </ks-tooltip>
    );
  }
  renderMenuGroupItem({ item, tabId, index }: { item: DropdownGroupItem; tabId?: string; index?: number }) {
    if (item.children.length === 0 && !item.renderTitle) {
      return;
    }
    const initialGroupItem = index ? [<ks-divider class={`${prefix}__list-group-divider`} />] : [];
    return [
      ...initialGroupItem,
      ((item.title && item.children.length) || item.renderTitle) && (
        <li
          class={{
            [`${prefix}__list-group-title`]: true,
          }}
          aria-hidden="true"
        >
          <slot name={`slot-title-${item.id}${tabId ? '-' + tabId : ''}`}>
            {(item.avatarUrl || item.avatarIcon) && (
              <ks-avatar shape="square" size="sm" src={item.avatarUrl}>
                {item.avatarIcon && <slot name={`slot-avatar-icon-${item.id}`}></slot>}
              </ks-avatar>
            )}

            <div
              class={{
                [`${prefix}__list-group-title-content`]: true,
                [`${prefix}__list-group-title-label`]: item.descriptionStyle === 'label',
              }}
            >
              {item.title}
              {item.description && item.descriptionStyle !== 'label' && (
                <ks-tooltip size="md">
                  <ks-icon-help />
                  <ks-text slot="content" variant="labelSm" richTextString={item.description} />
                </ks-tooltip>
              )}

              {item.description && item.descriptionStyle === 'label' && (
                <span class={`${prefix}__list-group-title-description`}>{item.description}</span>
              )}
            </div>
          </slot>
        </li>
      ),
      ...item.children.map((_item) => this.renderMenuSingleItem(_item, tabId)),
    ];
  }

  renderSearchResult() {
    return (
      <div class={`${prefix}__searchResultsTitle`}>
        <ks-text variant="titleSm">{t(searchMessages.result)}</ks-text>
      </div>
    );
  }
  renderMenuList(items: DropdownItem[], tabId?: string) {
    const classes = { [`${prefix}__list`]: true, [`${prefix}__list--empty`]: items.length === 0 };

    const virtualizeEnabled = this._virtualizerController.enabled;
    const dataSourceList = flattenDropdownItems(items);
    const dataSourceDropDownItemList = dataSourceList.filter((item) => typeof item !== 'string');
    if (!dataSourceDropDownItemList.length || (this.dataSource.type === 'tabs' && this._activeTabId !== tabId)) {
      return this.renderEmpty();
    }

    // const hasSearchValue = isString(this.displaySearchText) ? !!this.displaySearchText : !!this._searchValue;
    // TODO searchValue 变化时的触底加载是否需要特殊处理？
    const reachBottomSentinel = <div class={`${prefix}__reach-bottom-sentinel`} ref={this.setupReachBottomObserver} />;

    if (virtualizeEnabled) {
      const { virtualizer } = this._virtualizerController;
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const virtualRows = virtualizer.getVirtualItems();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      virtualizer.setOptions({ ...virtualizer.options, count: dataSourceList.length });
      return (
        <Fragment>
          {this._searchValue && this.renderSearchResult()}
          <ul
            class={classes}
            style={{
              position: 'relative',
              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
              height: `${virtualizer.getTotalSize()}px`,
            }}
          >
            <div
              style={{
                width: '100%',
                position: 'absolute',
                top: '0',
                left: '0',
                // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                height: `${virtualizer.getTotalSize()}px`,
              }}
            >
              {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
              {virtualRows.map((virtualRow) =>
                typeof dataSourceList[virtualRow.index] !== 'string' ? (
                  <div
                    key={virtualRow.key.toString()}
                    style={{
                      minWidth: 'fit-content',
                      position: 'absolute',
                      width: '100%',
                      wordBreak: 'break-word',
                      top: '0px',
                      left: '0px',
                      height: `${virtualRow.size || this.estimatedItemHeight}px`,
                      // FIXME: virtualizer.measureElement(el)的时候可能dom没渲染导致size=0
                      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                      opacity: !virtualRows.find((item) => item.size === 0) ? '1' : '0',
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                    data-testid={`ks-dropdown-menu-index-wf42rn-${virtualRow.key.toString()}`}
                  >
                    {
                      <div
                        key={virtualRow.key.toString()}
                        data-index={virtualRow.index}
                        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                        ref={(el) => virtualizer.measureElement(el)}
                        data-testid={`ks-dropdown-menu-index-u4FrDm-${virtualRow.key.toString()}`}
                      >
                        {this.renderMenuSingleItem(dataSourceList[virtualRow.index] as DropdownSingleItem, tabId)}
                      </div>
                    }
                  </div>
                ) : (
                  <div
                    style={{
                      minWidth: 'fit-content',
                      position: 'absolute',
                      width: '100%',
                      wordBreak: 'break-word',
                      top: '0px',
                      left: '0px',
                      height: `${dataSourceList[virtualRow.index] ? 32 : 1}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <li
                      data-index={virtualRow.index}
                      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                      ref={(el) => virtualizer.measureElement(el)}
                      class={`${prefix}__list-group-title`}
                      aria-hidden="true"
                    >
                      {dataSourceList[virtualRow.index] ? dataSourceList[virtualRow.index] : <ks-divider />}
                    </li>
                  </div>
                ),
              )}
            </div>
          </ul>
          {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
          {virtualizer.getTotalSize() === 0 && this.renderEmpty()}
          {reachBottomSentinel}
        </Fragment>
      );
    }

    return (
      <Fragment>
        {this._searchValue && this.renderSearchResult()}
        <ul class={classes}>
          {items.map((item, index) => {
            switch (item.type) {
              case 'group':
                return this.renderMenuGroupItem({ item, tabId, index });
              case 'single':
                return this.renderMenuSingleItem(item, tabId);
              default:
                return null;
            }
          })}
        </ul>
        {reachBottomSentinel}
      </Fragment>
    );
  }
  renderMenu() {
    if (this.dataSource.type === 'list') {
      return this.renderDataList.length > 0 ? this.renderMenuList(this.renderDataList) : this.renderEmpty();
    }

    if (this.dataSource.type === 'tabs') {
      return (
        <ks-tabs
          __dropdownHeaderSticky
          type={this.dataSource?.tabType || 'lite'}
          class={`${prefix}__tabs`}
          activeId={`${this._activeTabId}`}
          onKsTabClick={({ detail }) => {
            this._activeTabId = detail;
            this.ksTabsChange.emit(detail);
            this._virtualizerController._cleanup?.();
            this._virtualizerController.enabled = false;
            this._virtualizerController.init();
            sendActionTracking(this.el, {
              eventType: 'change',
              subEventType: 'tabs',
              componentParams: { tabId: detail },
            });
          }}
          data-testid="ks-dropdown-menu-index-ebLEvg"
        >
          {this.renderTabDataList.map(({ tabId, label, items }) => (
            <ks-tabs-item
              key={tabId}
              data-tab-item={tabId}
              tabId={tabId}
              class={`${prefix}__tabs-item`}
              data-testid={`ks-dropdown-menu-index-txTEYo-${tabId}`}
            >
              <slot slot="header" name={`slot-tab-${tabId}`}>
                {label}
              </slot>
              {this._activeTabId === tabId &&
                (items.length > 0 ? this.renderMenuList(items, tabId) : this.renderEmpty())}
            </ks-tabs-item>
          ))}
        </ks-tabs>
      );
    }

    return null;
  }
  renderEmpty() {
    return (
      <div
        key={`empty-${this._activeTabId}`}
        class={`${prefix}__empty-or-failed`}
        data-testid={`ks-dropdown-menu-index-9Xbgdd-${`empty-${this._activeTabId}`}`}
      >
        <slot name="empty">
          <ks-empty-states size="sm" title={t(commonMessages.empty)} />
        </slot>
      </div>
    );
  }

  renderLoadFail() {
    return (
      <div
        key={`loadFail-${this._activeTabId}`}
        class={`${prefix}__empty-or-failed`}
        data-testid={`ks-dropdown-menu-index-iLuTWN-${`loadFail-${this._activeTabId}`}`}
      >
        <slot name="error">
          <ks-empty-states
            size="sm"
            title={this.loadFailedOptions.title || t(commonMessages.loadFail)}
            description={this.loadFailedOptions.description}
          >
            <div slot="illustration" class={`load-fail-illustration`}></div>
            <slot name="loadFailCtas" slot="ctas"></slot>
          </ks-empty-states>
        </slot>
      </div>
    );
  }

  handleInputFocus = () => {
    this.isInputFocused = true;
  };
  handleInputBlur = () => {
    this.isInputFocused = false;
  };

  _virtualizerController = {
    virtualizer: null,
    _cleanup: null as (() => void) | null,
    enabled: false,
    init: () => {
      // TODO 长期是否默认虚拟滚动开启?
      if (!this.virtual) {
        return;
      }

      // FIXME 监听 option 相关 props 的变化同步到 virtualizer
      // FIXME 关闭重开 Dropdown Menu 后有时滚动条无法保持原位置
      if (this._virtualizerController.enabled) {
        return;
      }

      this._virtualizerController.enabled = true;

      const virtualizer = new Virtualizer<HTMLElement, HTMLElement>({
        // 通用固定属性
        observeElementRect,
        observeElementOffset,
        scrollToFn: elementScroll,
        onChange: throttle((instance) => {
          // options.onChange?.(instance, sync)
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          const visItem = instance.getVirtualItems().map((item) => item.index);
          setTimeout(() => {
            const width = Math.max(
              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
              ...instance.getVirtualItems().map((item) => {
                const width = this.bodyRef?.querySelector(`[data-index="${item.index}"]`)?.scrollWidth || 0;
                return width;
              }),
            );
            if (width > 0 && width > maxWidth && this.bodyRef) {
              this.bodyRef.style.width = `${width + 8}px`;
              maxWidth = width;
            }
          }, 50);
          if (
            visItem[0] !== this.renderVisItem[0] ||
            visItem[visItem.length - 1] !== this.renderVisItem[this.renderVisItem.length - 1]
          ) {
            this.updateCustomDropMenuItem(visItem);
            this.renderVisItem = visItem;
          }
          forceUpdate(this.el);
        }, 50),
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        measureElement: (el, entry, virtualizer) => measureElement(el, entry, virtualizer) || this.estimatedItemHeight,
        // 视组件需要不同的属性
        count:
          this.dataSource?.type === 'list'
            ? this.dataSource.items?.length
            : (this.dataSource?.tabs.find((item) => item.tabId === this._activeTabId) || this.dataSource?.tabs[0])
                ?.items.length || 0,
        estimateSize: () => this.estimatedItemHeight || 54, // following suggestion of its doc to set it larger
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        getScrollElement: () => this.bodyRef,
        overscan: 4,
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this._virtualizerController.virtualizer = virtualizer;

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this._virtualizerController._cleanup = this._virtualizerController.virtualizer._didMount();
    },
  };

  connectedCallback() {
    this._virtualizerController.init();
  }

  disconnectedCallback() {
    this.cleanupReachBottomObserver();
    this._virtualizerController._cleanup?.();
  }

  componentDidRender() {
    const widthNum = this.width.endsWith('px') && parseInt(this.width);
    this.minWidth = !isNumber(widthNum) ? this.defaultSlot?.[0]?.clientWidth || 0 : widthNum;

    this._virtualizerController.init(); // FIXME check if this should run after every render()
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this._virtualizerController.virtualizer?._willUpdate();
  }

  get overlayStyle(): CSSProperties {
    if (this.listAutoHeight) {
      return { height: 'auto' };
    } else if (typeof this.overlayHeight === 'object') {
      return {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        minHeight: convertNum2PX(this.overlayHeight.min),
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        maxHeight: convertNum2PX(this.overlayHeight.max),
      };
    } else {
      return { height: convertNum2PX(this.overlayHeight) };
    }
  }
  render() {
    const hasSearchValue = isString(this.displaySearchText) ? !!this.displaySearchText : !!this._searchValue;
    return (
      <Host dir={dir()} ks-dropdown-menu>
        <ks-tooltip
          elementContext={this.elementContext}
          size="auto"
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          ref={(el) => (this.popperRef = el)}
          class={`${prefix}__popover`}
          trigger={this.trigger}
          placement={this.placement}
          disabled={this.disabled}
          visible={this.visible}
          enterDelay={this.enterDelay}
          leaveDelay={this.leaveDelay}
          noArrow={true}
          gapOffset={this.gapOffset}
          startOffset={this.startOffset}
          onKsAfterOpen={this.popoverAnimeFinished.bind(this)}
          unEmitOutClickEls={this.isMultiple ? [this.el] : []}
          onKsVisibleChange={({ detail }) => {
            this.ksVisibleChange.emit(detail);
            if (detail) {
              // 因为tooltip动画有延迟，所以input的渲染会晚一点需要setTimeout才能focus
              setTimeout(() => {
                this.inputRef?.focusInput();
                this.handleInputFocus();
              }, FOCUS_DELAY_TIME);
              sendExposeTracking(this.el, { eventType: 'popup' });
              sendDurationTracking(this.el, { eventType: 'popup', reset: true });
            } else {
              sendDurationTracking(this.el, { eventType: 'popup' });
            }
          }}
          data-testid="ks-dropdown-menu-index-ahD7fq"
        >
          <div class={`${prefix}__overlay`} style={this.overlayStyle} slot="body">
            <slot name="header" />
            <div class={`${prefix}__body`}>
              {this.searchable ? (
                <ks-input
                  ref={(el) => (this.inputRef = el)}
                  onFocus={this.handleInputFocus}
                  onBlur={this.handleInputBlur}
                  clearable={true}
                  class={`${prefix}__search`}
                  status="default"
                  // type="text"
                  style={{ width: '100%' }}
                  value={isString(this.displaySearchText) ? this.displaySearchText : this._searchValue}
                  placeholder={this.searchPlaceholder || t(searchMessages.placeholder)}
                  onKsChange={({ detail }) => {
                    if (this.searchValue === undefined) {
                      this.handleSearchValueChange(detail);
                    }
                    this.ksSearchChange.emit(detail);
                    sendActionTracking(this.el, {
                      eventType: 'change',
                      subEventType: 'search',
                      componentParams: { searchValue: detail },
                    });
                  }}
                  data-testid="ks-dropdown-menu-index-aaM2bd"
                >
                  {!this.isInputFocused && !hasSearchValue && <ks-icon-search slot="prefix" />}
                </ks-input>
              ) : null}
              <div class={`${prefix}__body-content`}>
                <ks-scrollbar
                  ref={(el) => (this.bodyRef = el)}
                  thin
                  class={prefix}
                  part="body"
                  style={{
                    width: this.width,
                    minWidth: `${this.minWidth}px`,
                  }}
                  data-testid="ks-dropdown-menu-index-eGMRLM"
                >
                  <slot name="listHeader" />
                  {/* 具名插槽允许自定义 */}
                  <slot name="content">
                    {this.loadFailed ? this.renderLoadFail() : this.dataSource ? this.renderMenu() : this.renderEmpty()}
                    {this.dataSource && this.loadItems && !this.loadFailed && (
                      <div class={'load-item'}>
                        <ks-spinner />
                      </div>
                    )}
                  </slot>
                </ks-scrollbar>

                {this.loading && <ks-spinner autoCenter class={'loading'} />}
              </div>
            </div>
            {this.footerSlot && (
              <div class={'footer'}>
                <slot name="footer" />
              </div>
            )}
          </div>
          {/* dropdown包裹内容，如需要active/hover的元素 */}
          <slot></slot>
        </ks-tooltip>
      </Host>
    );
  }
}
