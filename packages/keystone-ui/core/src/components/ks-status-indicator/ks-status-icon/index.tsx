import { Component, h, Prop, ComponentInterface, Host } from '@stencil/core';
import classnames from 'classnames';
import { dir } from '@src/utils/utils';
import { StatusIconVariant, StatusIconSize } from '../../../entities';
import { ks } from '@fe-infra/keystone-design-tokens';

const prefix = 'status-icon';
/**
 * @part self - KsStatusIcon component shadow root element.
 */
@Component({
  tag: 'ks-status-icon',
  shadow: true,
  styleUrl: 'index.scss',
})
export class KsStatusIcon implements ComponentInterface {
  ['ks-name'] = 'ks-status-icon';

  /**
   * @locale {en} Defines the visual variant of the status icon. Can be one of the following values: `"info"`, `"neutral"`, `"success"`, `"warning"`, `"error"` or `"suggestion"`.
   * @locale {zh} 定义状态图标的视觉变体。可选值包括：`"info"`、`"neutral"`、`"success"`、`"warning"`、`"error"` 或 `"suggestion"`。
   */
  @Prop() variant: StatusIconVariant = 'info';
  /**
   * @locale {en} Specifies the size of the status icon. Can be either `"md"` or `"sm"`.
   * @locale {zh} 指定状态图标的大小。可选值为 `"md"` 或 `"sm"`。
   */
  @Prop() size: StatusIconSize = 'md';
  /**
   * @locale {en} Defines the icon's outer border color
   * @locale {zh} 定义icon外部边框颜色
   */
  @Prop() stroke = '';

  getVariantIcon() {
    const size = this.size === 'md' ? 24 : 16;
    switch (this.variant) {
      case 'suggestion':
        return (
          <ks-icon-filled-tips
            size={size}
            color={ks.color.support.fillLow}
            innerColor={ks.color.support.onFillLow}
          ></ks-icon-filled-tips>
        );
      case 'error':
        return (
          <ks-icon-filled-caution
            size={size}
            color={ks.color.error.fillLow}
            innerColor={ks.color.error.onFillLow}
          ></ks-icon-filled-caution>
        );
      case 'warning':
        return (
          <ks-icon-filled-warning
            size={size}
            color={ks.color.warning.fillLow}
            innerColor={ks.color.warning.onFillLow}
          ></ks-icon-filled-warning>
        );
      case 'info':
        return (
          <ks-icon-filled-info
            size={size}
            color={ks.color.primary.fillLow}
            innerColor={ks.color.primary.onFillLow}
          ></ks-icon-filled-info>
        );
      case 'success':
        return (
          <ks-icon-filled-check
            size={size}
            color={ks.color.success.fillLow}
            innerColor={ks.color.success.onFillLow}
          ></ks-icon-filled-check>
        );
      case 'successLow':
        return (
          <ks-icon-filled-check
            size={size}
            color={ks.color.neutral.fillLow}
            innerColor={ks.color.neutral.onFillLow}
          ></ks-icon-filled-check>
        );
      case 'inProgress':
        return (
          <ks-icon-filled-in-progress
            size={size}
            color={ks.color.primary.fillLow}
            innerColor={ks.color.primary.onFillLow}
          ></ks-icon-filled-in-progress>
        );
      case 'disapproval':
        return <ks-icon-filled-disapproval size={size} color={ks.color.neutral.fillLow}></ks-icon-filled-disapproval>;
      case 'limitedApproval':
        return (
          <ks-icon-filled-limited-approval
            size={size}
            color={ks.color.neutral.fillLow}
          ></ks-icon-filled-limited-approval>
        );
      default:
        return (
          <ks-icon-filled-info
            size={size}
            color={ks.color.neutral.fillLow}
            innerColor={ks.color.neutral.onFillLow}
          ></ks-icon-filled-info>
        );
    }
  }

  render() {
    const cls = classnames(prefix);
    return (
      <Host dir={dir()} ks-status-icon role="status">
        <div class={cls} style={{ '--ks-stroke-color': `${this.stroke}` }}>
          {this.getVariantIcon()}
        </div>
      </Host>
    );
  }
}
