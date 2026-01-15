import { Component, Prop, h, Host } from '@stencil/core';
import classnames from 'classnames';
import { dir, t, isRTL } from '@src/utils/utils';
import { BadgeType, BadgeVariant, BadgePlacement, AvatarSize } from '../../entities';
import { badgeMessages } from '@fe-infra/keystone-locales';

const prefix = 'badge';

/**
 * @slot sup - Custom content for the badge indicator itself (e.g., text or number). If not provided for `type="count"` or `type="content"`, default content based on props will be rendered.
 */
@Component({
  tag: 'ks-badge',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsBadge {
  ['ks-name'] = 'ks-badge';

  /**
   * @locale {en} Indicates whether the badge is displayed standalone, without being attached to any child content passed through the default slot. If `true`, placement props might not apply as it's not positioned relative to other content.
   * @locale {zh} 指示徽章是否独立显示，而不依附于通过默认插槽传入的任何子内容。如果为 `true`，则定位属性可能不适用，因为它不是相对于其他内容定位的。
   */
  @Prop() alone = false;
  /**
   * @locale {en} The type of the badge component. Can be one of the following values:
   * - `"count"`: Displays a numeric count (uses `count` and `overflowCount` props).
   * - `"dot"`: Displays a small dot indicator.
   * - `"content"`: Displays predefined text content (e.g., localized "New").
   * @locale {zh} 徽标组件的类型。可选值为：
   * - `"count"`：显示数字计数（使用 `count` 和 `overflowCount` 属性）。
   * - `"dot"`：显示一个小圆点指示器。
   * - `"content"`：显示预定义的文本内容（例如，本地化的“New”）。
   */
  @Prop() type: BadgeType = 'count';
  /**
   * @locale {en} The count value displayed on the badge. This property is only applicable when the badge `type` is `"count"`. It represents the numerical value shown in the badge.
   * @locale {zh} 徽标上显示的计数值。此属性仅适用于 `type` 为 `"count"` 的情况。它表示在徽标中显示的数值。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() count: number | string;
  /**
   * @locale {en} The maximum count value before the badge displays a `+` sign. If the actual count exceeds this value, the badge will show `overflowCount` instead of the actual number.
   * @locale {zh} 徽标显示 `+` 符号之前的最大计数值。如果实际计数超过此值，徽标将显示 `overflowCount`，而不是实际数字。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() overflowCount: number;
  /**
   * @locale {en} Indicates whether to display the badge when the count is zero. If set to `true`, the badge will be shown even when the count is 0; otherwise, it will be hidden.
   * @locale {zh} 指示当计数为 0 时是否显示徽标。如果设置为 `true`，则即使计数为 0，徽标也会显示；否则，将隐藏徽标。
   */
  @Prop() showZero = false;
  /**
   * @locale {en} The variant of the badge, representing its color type.
   * @locale {zh} 徽标的变体，表示其颜色种类。
   */
  @Prop() variant: BadgeVariant = 'error';
  /**
   * @locale {en} The placement of the badge relative to the content passed into the default slot. Not applicable if `alone` is `true`. Can be one of the following values: `"topleft"`, `"topright"`, `"bottomleft"` or `"bottomright"`.
   * @locale {zh} 徽章相对于默认插槽中内容的位置。如果 `alone` 为 `true`，则此属性不适用。可选值为：`"topleft"`、`"topright"`、`"bottomleft"` 或 `"bottomright"`。
   */
  @Prop() placement: BadgePlacement = 'topright';
  /**
   * @locale {en} Disabled state of badge
   * @locale {zh} 徽标的禁用态
   */
  @Prop() disabled = false;
  /**
   * @private 内部属性，勿用
   */
  @Prop() __avatarUsage = false;
  /**
   * @private 内部属性，勿用
   */
  @Prop() __avatarSize: AvatarSize = 'md';
  /**
   * @private 内部属性，勿用
   */
  @Prop() __inAvatar = false;

  reversePlacement = {
    topleft: 'topright',
    topright: 'topleft',
    bottomleft: 'bottomright',
    bottomright: 'bottomleft',
  };

  render() {
    const placement = isRTL() ? this.reversePlacement[this.placement] : this.placement;
    const style = this.type === 'dot' ? {} : this.type === 'count' ? {} : {};
    const prefixsup = `${prefix}__sup`;
    const classes = classnames([
      `${prefixsup}`,
      `${prefixsup}--${this.type} ${prefixsup}--color-${this.variant}`,
      { [`${prefixsup}--alone`]: this.alone },
      { [`${prefixsup}--dir-${placement}`]: !this.alone },
      {
        [`${prefixsup}__avatar`]: this.__avatarUsage && this.type === 'dot',
        [`${prefixsup}__avatar__lg`]: this.__avatarSize === 'lg' && this.__avatarUsage && this.type === 'dot',
        [`${prefixsup}__avatar__border`]: this.__inAvatar,
      },
    ]);
    return (
      <Host dir={dir()} ks-badge>
        <div dir={dir()} part="self" class={`${prefix}`}>
          <div>
            <slot></slot>
          </div>
          {!this.showZero && Number(this.count) === 0 ? (
            ''
          ) : (
            <sup style={style} class={classes}>
              {this.type === 'count' && (
                <slot name="sup">
                  {Number(this.count) > this.overflowCount ? `${this.overflowCount}+` : this.count}
                </slot>
              )}
              {this.type === 'content' && <slot name="sup">{t(badgeMessages.new)}</slot>}
              {this.disabled && <div class="disabled"></div>}
            </sup>
          )}
        </div>
      </Host>
    );
  }
}
