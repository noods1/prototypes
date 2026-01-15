import { Component, h, Prop, ComponentInterface, Host, Element } from '@stencil/core';
import classnames from 'classnames';
import { dir } from '@src/utils/utils';
import { registerPluginManager } from '@src/utils/plugin';
import { StatusVariant, StatusSize } from '../../entities';

const prefix = 'status-indicator';
/**
 * @part self - KsStatusIndicator component shadow root element.
 */
@Component({
  tag: 'ks-status-indicator',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsStatusIndicator implements ComponentInterface {
  ['ks-name'] = 'ks-status-indicator';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsStatusIndicatorElement;
  /**
   * @locale {en} Defines the visual variant of the status indicator. Can be one of the following values: `"inProgress"`, `"neutral"`, `"success"`, `"warning"` or `"error"`.
   * @locale {zh} 定义状态指示器的视觉变体。可选值包括：`"inProgress"`、`"neutral"`、`"success"`、`"warning"` 或 `"error"`。
   */
  @Prop() variant: StatusVariant = 'inProgress';
  /**
   * @locale {en} Specifies the size of the status indicator. Can be either `"md"` or `"sm"`.
   * @locale {zh} 指定状态指示器的大小。可选值为 `"md"` 或 `"sm"`。
   */
  @Prop() size: StatusSize = 'md';

  constructor() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  render() {
    const cls = classnames(prefix, `${prefix}--${this.variant}`, `${prefix}--${this.size}`);
    return (
      <Host dir={dir()} ks-status-indicator role="status">
        <div class={cls}>
          <div class={classnames(`${prefix}--dot`, `${prefix}--dot--${this.size}`)}></div>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
