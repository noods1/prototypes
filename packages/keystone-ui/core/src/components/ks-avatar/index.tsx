import { Component, Prop, h, Host, Element } from '@stencil/core';
import classnames from 'classnames';
import { dir, getTargetParentComponent } from '@src/utils/utils';
import { AvatarPropShape, AvatarSize, BadgeType, BadgeVariant, BadgePlacement } from '../../entities';
import { Slot, type Slots } from '@src/utils/decorators';
import { KsTextVariant } from '@src/components';

const textVariantMap: Record<AvatarSize, KsTextVariant> = {
  xs: 'labelSm',
  sm: 'labelSm',
  md: 'labelMd',
  lg: 'labelLg',
};

const prefix = 'avatar';

/**
 * @slot overlap - Used to place elements on top of the avatar, often for badges or status indicators. only takes effect when size is lg
 */
@Component({
  tag: 'ks-avatar',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsAvatar {
  ['ks-name'] = 'ks-avatar';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsAvatarElement;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  avatarGroupEl: HTMLKsAvatarGroupElement;

  @Prop() disabled = false;

  /**
   * @locale {en} The shape of the avatar component. Can be one of the following values:
   * - `"circle"`: The avatar is displayed with a circular shape.
   * - `"square"`: The avatar is displayed with a square shape.
   * @locale {zh} 头像组件的形状。可选值为：
   * - `"circle"`：以圆形显示头像。
   * - `"square"`：以方形显示头像。
   */
  @Prop() shape: AvatarPropShape = 'circle';
  /**
   * @locale {en} The size of the avatar component. Can be one of the following values: `xs`, `"sm"`, `"md"`, or `"lg"`.
   * @locale {zh} 头像组件的尺寸。可选值为：`"xs"`, `"sm"`、`"md"` 或 `"lg"`。
   */
  @Prop() size: AvatarSize = 'md';
  /**
   * @locale {en} The source URL of the image for the avatar component. If not empty, the avatar will display an image.
   * @locale {zh} 头像组件的图片源 URL。如果不为空，将显示图片。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() src: string;
  /**
   * @locale {en} The text to display as a tooltip for the avatar image (when `src` is used). This is passed to the `title` attribute of the `<img>` tag.
   * @locale {zh} 当使用 `src` 属性显示图片时，作为图片工具提示显示的文本。此内容将传递给 `<img>` 标签的 `title` 属性。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() alt: string;
  /**
   * @locale {en} Controls the opening of the text label of the avatar component
   * @locale {zh} 控制头像组件的文本标签的开启
   */
  @Prop() showLabel = false;
  /**
   * @locale {en} The name portion of the text label
   * @locale {zh} 文本标签的姓名部分
   */
  @Prop() name = '';
  /**
   * @locale {en} The descriptive text displayed below the name in the label (if `showLabel` is true).
   * @locale {zh} 在标签中显示在姓名下方的描述性文本（如果 `showLabel` 为 true）。
   */
  @Prop() description = '';
  /**
   * @locale {en} Control badge display
   * @locale {zh} 控制badge的展示
   */
  @Prop() showBadge = false;
  /**
   * @locale {en} The type of the badge component. Can be one of the following values:
   * - `"count"`: Displays a numeric count.
   * - `"dot"`: Displays a small dot indicator.
   * - `"new"`: Displays a New content.
   * @locale {zh} 徽标组件的类型。可选值为：
   * - `"count"`：显示数字计数。
   * - `"dot"`：显示小点指示器。
   * - `"new"`：显示文案 new
   */
  @Prop() type: BadgeType = 'dot';
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
   * @locale {en} The placement of the badge relative to its associated icon. Can be one of the following values: `"topleft"`, `"topright"`, `"bottomleft"` or `"bottomright"`.When type is content, it automatically switches to support. When placement is bottomright, only success and info are effective.
   * @locale {zh} 徽标相对于其子元素的位置。可选值为：`"topleft"`、`"topright"`、`"bottomleft"` 或 `"bottomright"`。在type为content时自动切换为support，在placement为右下时，只有success和info生效
   */
  @Prop() placement: BadgePlacement = 'topright';

  /**
   * @locale {en} The components overlap in the lower right corner of the avatar. only takes effect when size is lg
   * @locale {zh} 头像组件右下角的 overlap 位置的组件。只有在size为lg时生效
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'overlap' }) overlapSlots: Slots;

  componentWillLoad() {
    this.avatarGroupEl = getTargetParentComponent(this.el, 'ks-avatar-group');
  }

  renderAvatar() {
    const classes = classnames([
      `${prefix}`,
      `${prefix}--${this.shape}`,
      `${prefix}--${this.size}`,
      { [`${prefix}--image`]: !!this.src },
      { [`${prefix}--disabled`]: this.disabled },
    ]);
    const style = {
      background: this.src
        ? this.disabled
          ? `url(${this.src}) lightgray 50% / cover no-repeat`
          : `url(${this.src}) lightgray 50% / cover no-repeat`
        : '',
    };
    return (
      <div class={`${prefix}-outer`}>
        <div dir={dir()} part="self" style={style} class={classes}>
          <slot></slot>
        </div>
        {this.overlapSlots && this.size === 'lg' && !this.disabled && (
          <div class={classnames([`${prefix}__overlap`, `${prefix}__overlap--${this.shape}`])}>
            <slot name="overlap"></slot>
          </div>
        )}
      </div>
    );
  }

  render() {
    const showBadge = !this.disabled && this.showBadge && !this.avatarGroupEl;
    const variant =
      this.placement === 'bottomright' && this.type === 'dot' && this.variant !== 'success' && this.variant !== 'info'
        ? 'info'
        : this.variant;
    const badgeVariant = this.type === 'content' ? 'support' : variant;
    return (
      <Host
        dir={dir()}
        ks-avatar
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        class={{ [`${prefix}-host-group`]: this.el.parentElement?.['ks-name'] === 'ks-avatar-group' }}
      >
        <div class={`${prefix}-container`}>
          {showBadge ? (
            <ks-badge
              type={this.type}
              showZero={this.showZero}
              count={this.count}
              overflowCount={this.overflowCount}
              variant={badgeVariant}
              placement={this.placement}
              __avatarUsage={this.shape === 'circle'}
              __avatarSize={this.size}
              __inAvatar
            >
              {this.renderAvatar()}
            </ks-badge>
          ) : (
            this.renderAvatar()
          )}
          {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
          {this.el.parentElement?.['ks-name'] !== 'ks-avatar-group' && this.showLabel && (
            <div class={`${prefix}-label`}>
              <ks-text variant={textVariantMap[this.size]}>{this.name}</ks-text>
              <ks-text variant="labelSm" theme="neutral">
                {this.description}
              </ks-text>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
