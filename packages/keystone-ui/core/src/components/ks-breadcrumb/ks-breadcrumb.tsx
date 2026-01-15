import {
  Component,
  h,
  Host,
  Prop,
  Element,
  Fragment,
  Event,
  type EventEmitter,
  type ComponentInterface,
} from '@stencil/core';
import { dir } from '@src/utils/utils';
import type { BreadcrumbItem, BreadcrumbDropdownItem, BreadcrumbSize } from '@src/entities/components/breadcrumb';
import type { DropdownMenuItem, DropdownListMenu } from '@src/entities/components/dropdown';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';

const prefix = 'breadcrumb';

@Component({
  tag: 'ks-breadcrumb',
  styleUrl: 'ks-breadcrumb.scss',
  shadow: true,
})
export class KsBreadcrumb implements ComponentInterface {
  ['ks-name'] = 'ks-breadcrumb';

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsBreadcrumbElement;

  /**
   * @locale {en} The size of the breadcrumb component. Accepts 'md' or 'large'.
   * @locale {zh} 面包屑组件的尺寸。可选值为 'md' 或 'large'。
   */
  @Prop() size: BreadcrumbSize = 'md';
  /**
   * @locale {en} An array of BreadcrumbItem objects that define the breadcrumb trail. Each item typically includes
   * `value` (display text), `href` (URL), `active` (boolean), and `disabled` (boolean).
   * @locale {zh} 一个 BreadcrumbItem 对象数组，用于定义面包屑路径。每个项目通常包含 `value`（显示文本）、`href`（链接地址）、
   * `active`（是否激活状态）和 `disabled`（是否禁用）。
   */
  @Prop() @Vue2ValueFix() value: (BreadcrumbItem | BreadcrumbDropdownItem)[] = [];
  /**
   * @locale {en} If true, hides the leading back arrow icon (chevron-left) when there is only one breadcrumb item.
   * This prop has no effect if there is more than one item or if items are configured to not show it.
   * @locale {zh} 如果为 true，则当只有一个面包屑项目时，隐藏头部的返回箭头图标 (向左的 V 形)。如果项目多于一个，
   * 或者组件配置为不显示该箭头，则此属性无效。
   */
  @Prop() hideBackArrow = false;

  /**
   * @locale {en} Emitted when a dropdown item in the breadcrumb is clicked. The event detail contains the id (value) of
   * the selected item.
   * @locale {zh} 当点击面包屑中的下拉菜单项时触发。事件 detail 包含所选项的 id（value）。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false }) ksClickDropdownItem: EventEmitter<string>;

  private renderBreadcrumbItem({ active, disabled, href, target, value }: BreadcrumbItem) {
    return (
      <li
        class={{
          [`${prefix}-item`]: true,
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          [`${prefix}-item--active`]: active,
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          [`${prefix}-item--disabled`]: disabled,
        }}
      >
        <a
          dir={dir()}
          target={href ? target || '_self' : undefined}
          href={disabled ? undefined : href}
          part="self"
          aria-disabled={!!disabled}
          aria-current={active ? 'page' : undefined}
        >
          {value}
        </a>
      </li>
    );
  }

  private onDropdownItemVisibilityChange = ({ detail, target: _target }: CustomEvent<boolean>) => {
    const expandClassName = `${prefix}-item--expanded`;
    const target = _target as HTMLKsDropdownMenuElement;

    detail && !target.disabled ? target.classList.add(expandClassName) : target.classList.remove(expandClassName);
  };

  private onDropdownItemSelect = ({ detail }: CustomEvent<DropdownMenuItem[]>) => {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.ksClickDropdownItem.emit(detail[0].id as string);
  };

  private renderBreadcrumbDropdownItem({ active, children, disabled, value, trigger }: BreadcrumbDropdownItem) {
    const dataSource: DropdownListMenu = {
      type: 'list',
      items: children.map(({ value, id, disabled }) => ({ type: 'single', id: id || value, content: value, disabled })),
    };

    return (
      <ks-dropdown-menu
        trigger={trigger || 'click'}
        disabled={disabled}
        dataSource={dataSource}
        selectable={false}
        onKsVisibleChange={this.onDropdownItemVisibilityChange}
        onKsValueChange={this.onDropdownItemSelect}
        data-testid="ks-breadcrumb-ks-breadcrumb-83pzQj"
      >
        <div
          class={{
            [`${prefix}-item`]: true,
            [`${prefix}-item--dropdown`]: true,
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            [`${prefix}-item--active`]: active,
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            [`${prefix}-item--disabled`]: disabled,
          }}
        >
          <span>{value}</span>
          <ks-icon-filled-chevron-down size="12" />
        </div>
      </ks-dropdown-menu>
    );
  }

  render() {
    const { value, hideBackArrow, size } = this;

    const shouldShowBackArrow = value.length === 1 && !hideBackArrow;
    const isSingleBreadcrumbItem = (item: BreadcrumbItem | BreadcrumbDropdownItem): item is BreadcrumbItem =>
      !('children' in item);

    return (
      <Host dir={dir()} ks-breadcrumb>
        <nav dir={dir()} class={{ [prefix]: true, [`${prefix}--${size}`]: true }} part="self" aria-label="breadcrumb">
          <ol class={`${prefix}__wrapper`}>
            {shouldShowBackArrow && (
              <li class={`${prefix}__back-arrow`} aria-hidden="true">
                <ks-icon-chevron-left size="14" />
              </li>
            )}

            {value?.map((item, index) => (
              <Fragment>
                {isSingleBreadcrumbItem(item)
                  ? this.renderBreadcrumbItem(item)
                  : this.renderBreadcrumbDropdownItem(item)}

                {index < value.length - 1 && (
                  <li class={`${prefix}__separator`} aria-hidden="true">
                    <ks-icon-chevron-right size="14" />
                  </li>
                )}
              </Fragment>
            ))}
          </ol>
        </nav>
      </Host>
    );
  }
}
