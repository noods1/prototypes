import { Component, h, Prop, ComponentInterface, Host } from '@stencil/core';
import classnames from 'classnames';
import { dir } from '@src/utils/utils';
import { StatusIconVariant } from '../../../entities';

const prefix = 'status-message';
/**
 * @part self - KsStatusIndicator component shadow root element.
 */
@Component({
  tag: 'ks-status-message',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsStatusMessage implements ComponentInterface {
  ['ks-name'] = 'ks-status-message';

  /**
   * @locale {en} Defines the visual variant of the status message. Can be one of the following values: `"neutral"`, `"success"`, `"warning"` or `"error"`.
   * @locale {zh} 定义状态消息的视觉变体。可选值包括：`"neutral"`、`"success"`、`"warning"` 或 `"error"`。
   */
  @Prop() variant: Exclude<
    StatusIconVariant,
    'info' | 'suggestion' | 'inProgress' | 'successLow' | 'disapproval' | 'limitedApproval'
  > = 'neutral';
  /**
   * @locale {en} To render text by passing a rich text string, it currently only supports parsing <a> tags in the text,
   * such as `You can <a href="help.com">learn more</a>.`
   * @locale {zh} 是否通过传递富文本字符串的形式渲染文本，目前只支持解析文案中的 <a> 标签，如 `You can <a href="help.com">learn more</a>.`
   */
  @Prop() richTextString = '';

  @Prop() cta?: { label: string; onClick: () => void };

  render() {
    const cls = classnames(prefix);
    return (
      <Host dir={dir()} ks-status-indicator role="status">
        <div class={cls}>
          <ks-status-icon class={`${prefix}__icon`} variant={this.variant} size={'sm'}></ks-status-icon>
          <ks-text richTextString={this.richTextString} theme={this.variant} variant={'labelSm'}>
            {!this.richTextString && <slot></slot>}
          </ks-text>
          {this.cta && (
            <ks-button variant="text" size="xs" onClick={this.cta.onClick} data-testid="ks-status-message-index-1hLFyX">
              <ks-icon-refresh size="14" />
              {this.cta.label}
            </ks-button>
          )}
        </div>
      </Host>
    );
  }
}
