import { Component, Host, h, Prop, Event, EventEmitter, State, Element, Watch } from '@stencil/core';
import { dir } from '@src/utils/utils';
import {
  DropdownMenu,
  DBtnSize,
  BtnVariant,
  DropdownMenuItem,
  BtnShape,
  DropdownGroupItem,
  DropdownItem,
} from '../../entities';
import { Placement } from '@floating-ui/dom';
import { registerPluginManager } from '@src/utils/plugin';
import { sendActionTracking, sendDurationTracking, sendExposeTracking } from '@src/utils/tracking';
import { internalRenderDynamicSlots } from '@src/utils/dropdown';
import { KsDropdownMenu } from '../ks-dropdown-menu';
import { Slot, Slots } from '@src/utils/decorators';

const prefix = 'dropdown-button';

/**
 * @slot footer - Slot for the footer.
 * @slot content - Slot for the content.
 */
@Component({
  tag: 'ks-dropdown-button',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsDropdownButton {
  ['ks-name'] = 'ks-dropdown-button';
  // eslint-disable-next-line no-undef
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsDropdownButtonElement;

  // props ---------------------------------------
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

  // @Prop() popoverSize: PopoverSize;
  /**
   * @locale {en} Indicates whether the dropdown menu is currently visible.
   * @locale {zh} 指示下拉菜单当前是否可见。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() visible: boolean;
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
   * @locale {en} The variant of the button, representing its type. Can be one of the following values: `"default"`, `"primary"`, `"secondary"`, `"tertiary"`, `"text"` or `"inverse"`.
   * @locale {zh} 按钮的变体，表示其类型。可选值为：`"default"`、`"primary"`、`"secondary"`、`"tertiary"`、`"text"` 或 `"inverse"`。
   */
  @Prop() variant: BtnVariant = 'default';
  /**
   * @locale {en} The size of the button. Can be one of the following values: `"xs"`, `"sm"`, `"md"` or `"lg"`.
   * @locale {zh} 按钮的尺寸。可选值为：`"xs"`、`"sm"`、`"md"` 或 `"lg"`。
   */
  @Prop() size: DBtnSize = 'md';
  /**
   * @locale {en} Indicates whether the button is disabled. If set to `true`, the button will be unclickable and visually indicate its disabled state.
   * @locale {zh} 指示按钮是否被禁用。如果设置为 `true`，按钮将不可点击，并且会以视觉方式指示其禁用状态。
   */
  @Prop() disabled = false;
  /**
   * @locale {en} Indicates whether the button is in a loading state. If set to `true`, a loading indicator will be displayed on the button, preventing user interaction until the loading is complete.
   * @locale {zh} 指示按钮是否处于加载状态。如果设置为 `true`，按钮上将显示加载指示器，直到加载完成之前用户无法与其交互。
   */
  @Prop() loading = false;

  /**
   * @locale {en} The shape of the button. Can be one of the following values: `"angle"`, `"round"`, `"cycle"` or `"square"`.
   * @locale {zh} 按钮的形状。可选值为：`"angle"`、`"round"`、`"cycle"` 或 `"square"`。
   */
  @Prop() shape: BtnShape = 'angle';
  /**
   * @locale {en} The list has a default height, available for `overlayHeight` to override. If `"auto"` is passed, the height will be auto-scaled.
   * @locale {zh} 列表有默认最大高度，可用 `overlayHeight` 覆盖。若传入 `"auto"`，则高度为不限。
   */
  @Prop() overlayHeight: string | number | { min?: string | number; max?: string | number } = { max: 381 };
  // /**
  //  * @locale {en} Indicates whether the button should take up the full width of its container. If set to `true`, the button will be displayed as a block element.
  //  * @locale {zh} 指示按钮是否应该占据其容器的全部宽度。如果设置为 `true`，按钮将显示为块级元素。
  //  */
  // @Prop() block = false;

  // 外部事件 ---------
  /**
   * @locale {en} Custom event triggered when the item in the dropdown menu clicks.
   * @locale {zh} 当下拉菜单的选项被点击时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksClickItem: EventEmitter<DropdownMenuItem>;
  /**
   * @locale {en} Custom event triggered when the visibility of the dropdown menu changes.
   * @locale {zh} 当下拉菜单的可见性变化时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksVisibleChange: EventEmitter<boolean>;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() _visible: boolean;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'footer' }) footerSlot: Slots;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'content' }) contentSlot: Slots;

  static __internal_renderDynamicSlots(
    props: Partial<KsDropdownMenu>,
    wrapWithSlot: (slotName: string, children: unknown) => unknown,
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    renderVisItem,
    searchValue = '',
  ) {
    // FIXME 目前无论 searchValue 是什么都会 trigger 列表所有项的 `renderContent`，需要过滤下改善性能
    return internalRenderDynamicSlots(props, wrapWithSlot, renderVisItem, searchValue);
  }

  renderSlot() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const renderedNodes = [];
    const createSlot = (type: string, itemId: string | number, groupId?: string | number, tabId?: string) => {
      const slotName = `slot-${type}-${itemId}${groupId ? '-' + groupId : ''}${tabId ? `-${tabId}` : ''}`;

      return (
        <slot
          key={slotName}
          name={slotName}
          slot={slotName}
          data-testid={`ks-dropdown-button-index-2CkrwN-${slotName}`}
        />
      );
    };
    const createAvatarIconSlot = (type: string, itemId: string | number) => {
      const slotName = `slot-${type}-${itemId}`;
      // FIXME 缺失一个 item hover 状态的参数，Ads Creation 2.0 中比较常用
      return (
        <slot
          key={slotName}
          name={slotName}
          slot={slotName}
          data-testid={`ks-dropdown-button-index-n7Wib6-${slotName}`}
        />
      );
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
          renderedNodes.push(createSlot(type, item.id, item.groupId, tabId));
        }
      });
    };
    const pushRenderedAvatarIcon = (item: DropdownGroupItem) => {
      const slotConfigs = [{ renderFn: item.avatarIcon, type: 'avatar-icon' }];
      slotConfigs.forEach(({ renderFn, type }) => {
        if (typeof renderFn === 'function') {
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          renderedNodes.push(createAvatarIconSlot(type, item.id));
        }
      });
    };
    const pushDropdownItem = (item: DropdownItem, tabId?: string) => {
      if (item.type === 'group') {
        pushRenderedAvatarIcon(item);
        item.children.forEach((child) => {
          pushRenderedNode(child, tabId);
        });
      } else {
        pushRenderedNode(item, tabId);
      }
    };

    const getDropdownItemList = (dropdownItem: DropdownItem[]) => dropdownItem;
    if (this.dataSource?.type === 'list') {
      const items = getDropdownItemList(this.dataSource?.items);
      items.forEach((item) => {
        pushDropdownItem(item);
      });
    } else {
      this.dataSource?.tabs.forEach((tab) => {
        if (typeof tab.renderTab === 'function') {
          renderedNodes.push(<slot name={`slot-tab-${tab.tabId}`} slot={`slot-tab-${tab.tabId}`}></slot>);
        }
        const list = getDropdownItemList(tab.items);
        list.forEach((item) => {
          pushDropdownItem(item, tab.tabId);
        });
      });
    }
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    return renderedNodes;
  }

  @Watch('visible')
  handleVisibleChange(newValue: boolean) {
    this._visible = newValue;
  }

  constructor() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  componentWillLoad() {
    this._visible = this.visible;
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  onKsVisibleChange = ({ detail }) => {
    if (this.visible === undefined) {
      this._visible = detail;
    }
    this.ksVisibleChange.emit(detail);

    if (detail) {
      sendExposeTracking(this.el, { eventType: 'popup' });
      sendDurationTracking(this.el, { eventType: 'popup', reset: true });
    } else {
      sendDurationTracking(this.el, { eventType: 'popup' });
    }
  };

  render() {
    const iconClasses = {
      [`${prefix}__icon`]: true,
      [`${prefix}__icon--reverse`]: this._visible,
    };
    return (
      <Host class={prefix} dir={dir()}>
        <ks-dropdown-menu
          dataSource={this.dataSource}
          onKsValueChange={({ detail }) => {
            this.ksClickItem.emit(detail[0]);
            this.onKsVisibleChange({ detail: false });
            sendActionTracking(this.el, {
              eventType: 'click',
              subEventType: 'items',
              componentParams: { value: detail[0] },
            });
          }}
          onKsVisibleChange={this.onKsVisibleChange}
          placement={this.placement}
          visible={this._visible}
          gapOffset={this.gapOffset}
          startOffset={this.startOffset}
          selectable={false}
          isMultiple={false}
          overlayHeight={this.overlayHeight}
          data-testid="ks-dropdown-button-index-oLYCHn"
        >
          <ks-button
            shape={this.shape}
            size={this.size}
            variant={this.variant}
            loading={this.loading}
            disabled={this.disabled}
            onClick={() => sendActionTracking(this.el, { eventType: 'click', subEventType: 'button' })}
            data-testid="ks-dropdown-button-index-7kV8ZG"
          >
            <slot></slot>
            <ks-icon-chevron-down size={this.size === 'md' ? 16 : 14} class={iconClasses} />
          </ks-button>
          {this.renderSlot()}
          {this.footerSlot && <slot name="footer" slot="footer"></slot>}
          {this.contentSlot && <slot name="content" slot="content"></slot>}
        </ks-dropdown-menu>
      </Host>
    );
  }
}
