import { Component, h, Host, Prop, Element, ComponentInterface } from '@stencil/core';
import classnames from 'classnames';
import { dir } from '@src/utils/utils';
import { registerPluginManager } from '@src/utils/plugin';
import { sendActionTracking } from '@src/utils/tracking';
import { BtnHTMLType, BtnSize, BtnType, BtnColor, BtnShape, BtnVariant } from '../../entities';

const prefix = 'button';
const BUTTON_GROUP_NAME = 'ks-button-group';

const variantMapping: Record<Exclude<BtnVariant, 'default'>, { type: BtnType; color: BtnColor }> = {
  primary: {
    type: 'contained',
    color: 'primary',
  },
  secondary: {
    type: 'contained',
    color: 'neutral',
  },
  tertiary: {
    type: 'outlined',
    color: 'neutral',
  },
  text: {
    type: 'plain',
    color: 'neutral',
  },
  inverse: {
    type: 'plain',
    color: 'primary',
  },
  alert: {
    type: 'contained',
    color: 'error',
  },
};

/**
 * @slot loading - Custom content to display when the button is in a loading state. If not provided, a default loading spinner (`ks-icon-loading`) is shown.
 */
@Component({
  tag: 'ks-button',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsButton implements ComponentInterface {
  ['ks-name'] = 'ks-button';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsButtonElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  type: BtnType;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  color: BtnColor;

  /**
   * @locale {en} The variant of the button, representing its type. Can be one of the following values: `"default"`, `"primary"`, `"secondary"`, `"tertiary"`, `"text"` or `"inverse"`.
   * @locale {zh} 按钮的变体，表示其类型。可选值为：`"default"`、`"primary"`、`"secondary"`、`"tertiary"`、`"text"` 或 `"inverse"`。
   */
  @Prop() variant: BtnVariant = 'default';
  /**
   * @locale {en} The size of the button. Can be one of the following values: `"xs"`, `"sm"`, `"md"` or `"lg"`.
   * @locale {zh} 按钮的尺寸。可选值为：`"xs"`、`"sm"`、`"md"` 或 `"lg"`。
   */
  @Prop() size: BtnSize = 'md';
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
   * @locale {en} The shape of the button, affecting its border radius and overall form. Can be one of the following values: `"angle"` (typically squared or slightly rounded corners), `"round"` (more rounded corners), `"cycle"` (circular), or `"square"` (sharp corners). Note: Design consistency for this prop might be under review.
   * @locale {zh} 按钮的形状，影响其边框半径和整体形态。可选值为：`"angle"`（通常为方形或略微圆角）、`"round"`（更圆的角）、`"cycle"`（圆形）或 `"square"`（直角）。注意：此属性的设计一致性可能正在审查中。
   */
  @Prop() shape: BtnShape = 'angle'; // FIXME 设计稿上没有这个参数，看看怎么移除掉
  /**
   * @locale {en} Indicates whether the button should take up the full width of its container. If set to `true`, the button will be displayed as a block element.
   * @locale {zh} 指示按钮是否应该占据其容器的全部宽度。如果设置为 `true`，按钮将显示为块级元素。
   */
  @Prop() block = false;
  /**
   * @locale {en} Sets the `type` attribute of the button element. This determines the button's behavior in forms and can be one of the following values: `"button"`, `"submit"` or `"reset"`.
   * @locale {zh} 设置按钮元素的 `type` 属性。这决定了按钮在表单中的行为，可选值为：`"button"`、`"submit"` 或 `"reset"`。
   */
  @Prop() htmlType: BtnHTMLType = 'button';

  /**
   * @locale {en} Force the button to stay in active style.
   * @locale {zh} 强制 button 停留在 active 状态样式。
   */
  @Prop() forceActive = false;

  constructor() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  render() {
    const size =
      this.variant === 'text' || this.variant === 'inverse' ? this.size : this.size !== 'xs' ? this.size : 'sm';
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const type = this.type || (variantMapping[this.variant]?.type ?? '');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const color = this.color || (variantMapping[this.variant]?.color ?? '');
    const cls = classnames(prefix, `${prefix}--${size}`, `${prefix}--${this.shape}`, {
      [`${prefix}--type-${type}`]: Boolean(type),
      [`${prefix}--color-${color}`]: Boolean(color),
      [`${prefix}--block`]: this.block,
      [`${prefix}--loading`]: this.loading,
      [`${prefix}--disabled`]: this.disabled || this.loading,
      [`${prefix}--force-active`]: this.forceActive,
    });

    const loadingIconSize = size === 'sm' || size === 'xs' ? 14 : 16;

    return (
      <Host
        dir={dir()}
        ks-button
        aria-disabled={this.disabled ? 'true' : null}
        class={classnames({
          [`${prefix}-host-block`]: this.block,
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          [`${prefix}-host-group`]: this.el.parentElement?.['ks-name'] === BUTTON_GROUP_NAME,
        })}
        onClick={() => sendActionTracking(this.el, { eventType: 'click' })}
        data-testid="ks-button-index-onaHQE"
      >
        <button dir={dir()} type={this.htmlType} disabled={!!this.disabled} class={cls} part="self">
          {this.loading ? (
            <div class={`${prefix}__loading-content`}>
              {/* FIXME loading state vertical alignment is still weird in button size="xs|sm" and loading=true */}
              <slot name="loading">
                <ks-icon-loading class={`${prefix}__loading-icon`} size={loadingIconSize} />
              </slot>
              {this.shape !== 'square' && <slot></slot>}
            </div>
          ) : (
            <slot></slot>
          )}
        </button>
      </Host>
    );
  }
}
