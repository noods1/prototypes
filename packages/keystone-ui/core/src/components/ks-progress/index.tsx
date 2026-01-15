import { Component, h, Prop, Host, Element, ComponentInterface } from '@stencil/core';
import classnames from 'classnames';
import { convertNum2PX, dir } from '@src/utils/utils';
import { progressAnimation } from '@src/utils/progress';
import { ProgressStatus, ProgressType, ProgressSize } from '../../entities';
import { Slot, Slots } from '@src/utils/decorators';

const prefix = 'progress';

const CIRCLE_BORDER_WIDTH = {
  md: 8,
  sm: 4,
  xs: 2,
};
const CIRCLE_WIDTH = {
  md: 120,
  sm: 84,
  xs: 40,
};

const COLORS = {
  stroke: 'var(--ks-color-neutral-surface3)', // 底色
  success: 'var(--ks-color-success-fill)',
  error: 'var(--ks-color-error-fill)',
  warning: 'var(--ks-color-warning-fill)',
  default: 'var(--ks-color-primary-fill)',
};

/**
 * @slot helpText - Allows customization of the help text displayed below the progress indicator. This slot is only rendered when the `variant` is 'bar'.
 * @slot percentText -  Allows customization of the percent text
 */
@Component({
  tag: 'ks-progress',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsProgress implements ComponentInterface {
  ['ks-name'] = 'ks-progress';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsProgressElement;
  /**
   * @locale {en} The current progress percentage, ranging from 0 to 100. This value indicates how much of the task has been completed.
   * @locale {zh} 当前进度百分比，范围从 0 到 100。此值指示任务已完成多少。
   */
  @Prop() percent = 0;
  /**
   * @locale {en} The status of the progress bar. Can be one of the following values: `"default"`, `"success"`, `"error"`, `"warning"`. In 'bar' mode, 'warning' has a distinct visual style. In 'ring' mode, 'warning' status visually defaults to the 'default' style for the ring and icon.
   * @locale {zh} 进度条的状态。可以是以下值之一：`"default"`、`"success"`、`"error"`、`"warning"`。在 'bar' 模式下，'warning' 状态有独特的视觉样式。在 'ring' 模式下，'warning' 状态在视觉上会回退到 'default' 样式的圆环和图标。
   */
  @Prop() status: ProgressStatus = 'default';
  /**
   * @locale {en} The visual representation of the progress bar. Can be one of the following values: `bar`, `ring`.
   * @locale {zh} 进度条的视觉表现。可以是以下值之一：`bar`、`ring`。
   */
  @Prop() variant: ProgressType = 'bar';

  @Prop() color?: string;
  /**
   * @locale {en} The size of the progress bar.
   * Can be one of the following values: `"md"`, `"sm"`, `"xs"`.
   * @locale {zh} 进度条的大小。可以是以下值之一：`"md"`、`"sm"`、`"xs"`。
   */
  @Prop() size: ProgressSize = 'md';
  /**
   * @locale {en} Indicates whether to show the label displaying the current progress. When `true`, the label will be visible.
   * @locale {zh} 指示是否显示当前进度的标签。当为 `true` 时，标签将可见。
   */
  @Prop() showLabel = true;
  /**
   * @locale {en} The width of the progress bar. This can be set to control the size of the progress display.
   * @locale {zh} 进度条的宽度。此属性可用于控制进度显示的大小。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() width: number | string;
  /**
   * @locale {en} The slot for the help text. This slot is only rendered when the `variant` is 'bar'.
   * @locale {zh} 帮助文本的插槽。此插槽仅在 `variant` 为 'bar' 时渲染。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'helpText' }) helpText: Slots;

  renderPercentInfo() {
    if (!this.showLabel) {
      return null;
    }
    const size = this.variant === 'ring' && this.size === 'xs' ? 'sm' : 'md';
    const status = this.variant === 'ring' && this.status === 'warning' ? 'default' : this.status;
    return (
      <div class={classnames(`${prefix}__label`, `${prefix}__label-${status}`)}>
        {(() => {
          switch (status) {
            case 'success':
              return <ks-status-icon variant="success" size={size} />;
            case 'error':
              return <ks-status-icon variant="error" size={size}></ks-status-icon>;
            case 'warning':
              return <ks-status-icon variant="warning" size={size}></ks-status-icon>;
            default:
              if (dir() === 'rtl') {
                return <slot name="percentText">{`%${Math.round(this.percent)}`}</slot>;
              }
              return <slot name="percentText">{`${Math.round(this.percent)}%`}</slot>;
          }
        })()}
      </div>
    );
  }

  renderProgressRing() {
    const { percent } = this;
    const circleSize = typeof this.width === 'string' ? parseInt(this.width) : this.width || CIRCLE_WIDTH[this.size];
    const borderWidth = CIRCLE_BORDER_WIDTH[this.size] || CIRCLE_BORDER_WIDTH.md;
    const perimeter = 2 * Math.PI * (circleSize / 2 - borderWidth / 2);
    const strokeDasharray = `${(perimeter * percent) / 100} ${perimeter * (1 - percent / 100)}`;

    const circleBgColor = COLORS.stroke;
    const circleForeColor = this.color ? this.color : this.status === 'warning' ? COLORS.default : COLORS[this.status];

    return (
      <div class={classnames(prefix, `${prefix}--${this.size}`, `${prefix}--${this.variant}`)} part="self">
        <svg width={circleSize} height={circleSize} viewBox={`0 0 ${circleSize} ${circleSize}`}>
          <circle
            stroke={circleBgColor}
            stroke-width={borderWidth}
            fill="transparent"
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={Math.abs(circleSize / 2 - borderWidth / 2)}
          />
          <circle
            stroke={circleForeColor}
            stroke-width={percent > 0 ? borderWidth : 0}
            fill="transparent"
            stroke-dasharray={strokeDasharray}
            transform={`matrix(0, -1, 1, 0, 0, ${circleSize})`}
            stroke-linecap="round"
            fill-rule="nonzero"
            stroke-linejoin="round"
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={Math.abs(circleSize / 2 - borderWidth / 2)}
            style={progressAnimation(this.percent, true)}
          />
        </svg>
        {this.renderPercentInfo()}
      </div>
    );
  }

  renderProgressBar() {
    const size = this.size === 'xs' ? 'sm' : this.size;
    return (
      <div class={classnames(prefix, `${prefix}--${size}`, `${prefix}--${this.variant}`)} part="self">
        <div class={`${prefix}__outer`} style={{ backgroundColor: COLORS.stroke }}>
          <div
            class={classnames(`${prefix}__inner`, `${prefix}__inner--${this.status}`)}
            style={{ width: `${this.percent}%`, backgroundColor: this.color ? this.color : COLORS[this.status] }}
          />
        </div>
        {this.renderPercentInfo()}
      </div>
    );
  }

  render() {
    const barStyle = { width: this.width === undefined ? '' : convertNum2PX(this.width) };
    return (
      <Host style={this.variant === 'bar' ? barStyle : {}} dir={dir()} ks-progress>
        {this.variant === 'ring' ? this.renderProgressRing() : this.renderProgressBar()}
        {this.helpText && this.variant === 'bar' && (
          <div class={classnames('helpText', this.status)}>
            <slot name="helpText"></slot>
          </div>
        )}
      </Host>
    );
  }
}
