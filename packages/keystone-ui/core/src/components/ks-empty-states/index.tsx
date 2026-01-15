import { Component, h, Prop, Host, ComponentInterface, Element } from '@stencil/core';
import { dir } from '@src/utils/utils';
import classNames from 'classnames';
import { Slot, Slots } from '@src/utils/decorators';

const prefix = 'empty-states';

/**
 * @slot illustration - Allows customization of the illustration area.
 * @slot description - Allows customization of the description content. If provided, this content will be used instead of the `description` prop.
 * @slot ctas - Allows customization of the call-to-action (CTA) buttons area.
 */
@Component({
  tag: 'ks-empty-states',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsEmptyStates implements ComponentInterface {
  ['ks-name'] = 'ks-empty-states';

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsEmptyStatesElement;

  /**
   * @locale {en} The size of the empty state component. Possible values are `"md"` and `"sm"`.
   * @locale {zh} 空状态组件的大小。可选值为 `"md"` 和 `"sm"`。
   */
  @Prop() size: 'md' | 'sm' = 'md';
  /**
   * @locale {en} The title displayed in the empty state header.
   * @locale {zh} 空状态头部显示的标题。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() title: string;

  /**
   * @locale {en} A description displayed in the empty state, providing more context or information.
   * @locale {zh} 空状态中显示的描述，提供更多上下文或信息。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() description: string;
  /**
   * @locale {en} Indicates whether to show the illustration in the empty state. When `true`, the illustration is displayed.
   * @locale {zh} 指示空状态中是否显示插图。当值为 `true` 时，插图将被显示。
   */
  @Prop() showIllustration = true;
  /**
   * @locale {en} Indicates whether the empty state should be automatically centered within its container. This can be a boolean value or the string `fixed`.
   * When `true`, the component is centered.
   * When `fixed`, the component is centered with fixed positioning.
   * @locale {zh} 指示空状态组件是否应自动在其容器内居中。此属性可以是布尔值或字符串 `fixed`。
   * 当值为 `true` 时，组件将居中显示。
   * 当值为 `fixed` 时，组件将使用固定定位居中。
   */
  @Prop() autoCenter: boolean | 'fixed' = false;

  /**
   * @locale {en} The component that display in the cta button area
   * @locale {zh} CTA 按钮区域的组件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'ctas' }) ctas: Slots;

  render() {
    return (
      <Host dir={dir()} ks-empty-states ks-auto-center={String(this.autoCenter || false)}>
        <div class={classNames(prefix)}>
          <div class={classNames(`${prefix}--container`, `${prefix}--${this.size}`)}>
            {this.showIllustration && (
              <div class={classNames(`${prefix}__illustration`, this.size)}>
                <slot name="illustration">
                  <div class="default-illustration" />
                </slot>
              </div>
            )}
            {this.title && <div class={`${prefix}__title`}>{this.title}</div>}
            <div class={`${prefix}__description`}>
              <slot name="description">{this.description}</slot>
            </div>
            {this.ctas && (
              <div class={`${prefix}__ctas`}>
                <slot name="ctas"></slot>
              </div>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
