import { Component, h, Prop, Element, Host } from '@stencil/core';
import classnames from 'classnames';
import { Slot, Slots } from '@src/utils/decorators';
import { dir } from '@src/utils/utils';
import { registerPluginManager } from '@src/utils/plugin';
import { CardSize } from '../../entities';

const prefix = 'ks-card';

/**
 * @slot title - The slot for the card's title section. Overrides the `title` prop if provided.
 * @slot extra - The slot for extra content in the card's header, usually on the right.
 */
@Component({
  tag: 'ks-card',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsCard {
  ['ks-name'] = 'ks-card';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsCardElement;
  /**
   * @locale {en} The size of the card. Can be one of the following values: `"md"` or `"sm"`.
   * @locale {zh} 卡片的尺寸。可选值为：`"md"` 或 `"sm"`。
   */
  @Prop() size: CardSize = 'md';
  /**
   * @locale {en} The title of the card, which is displayed prominently at the top.
   * @locale {zh} 卡片的标题，显示在顶部。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() title: string;
  /**
   * @locale {en} Optional suffix to be displayed next to the card title, providing additional information or context.
   * @locale {zh} 可选的后缀，显示在卡片标题旁边，提供额外的信息或上下文。
   */
  @Prop() titleSuffix?: string;

  /**
   * @locale {en} Reference to the 'extra' slot, used for content in the card's header, typically on the right.
   * @locale {zh} 对 'extra' 插槽的引用，用于卡片头部右侧的额外内容。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'extra' }) extraSlot: Slots;
  /**
   * @locale {en} Reference to the 'title' slot, used for the card's title section. Overrides the `title` prop if provided.
   * @locale {zh} 对 'title' 插槽的引用，用于卡片的标题部分。如果提供，则会覆盖 `title` 属性。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'title' }) titleSlot: Slots;
  /**
   *  @locale {en} The default slot for the main content of the card body.
   *  @locale {zh} 卡片主体内容的默认插槽。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: '_default' }) defaultSlot: Slots;

  constructor() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  render() {
    const cls = classnames(prefix, `${prefix}--${this.size}`);
    return (
      <Host dir={dir()} ks-card>
        <div dir={dir()} class={cls} part="self">
          {(this.extraSlot || this.title || this.titleSlot) && (
            <div class={classnames(`${prefix}__head`, `${prefix}__head--${this.size}`)} part="head header">
              <slot name="title">
                <div class={`${prefix}__head-title`}>
                  <div class={`${prefix}__head-mainTitle`}>{this.title}</div>
                  {this.titleSuffix && <div class={`${prefix}__head-optionalTitle`}>{`· ${this.titleSuffix}`}</div>}
                </div>
              </slot>
              <slot name="extra"></slot>
            </div>
          )}
          {this.defaultSlot && (
            <div class={`${prefix}__body`} part="body">
              <slot></slot>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
