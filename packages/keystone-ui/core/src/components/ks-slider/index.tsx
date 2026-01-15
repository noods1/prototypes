import {
  Component,
  Host,
  h,
  Prop,
  State,
  Fragment,
  Watch,
  Element,
  Event,
  type ComponentInterface,
  type EventEmitter,
} from '@stencil/core';
import { dir, isRTL } from '@src/utils/utils';
import { sendActionTracking } from '@src/utils/tracking';
import { registerPluginManager } from '@src/utils/plugin';
import { valueToPercent, percentToValue, findClosestIndex } from './utils';

import type { SliderLabel, SliderMark, SliderStatus } from '../../entities';
import { debounce } from 'lodash-es';
import { formatToLocalizedNumber } from '@src/utils/i18n/number';

const prefix = 'slider';

@Component({
  tag: 'ks-slider',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsSlider implements ComponentInterface {
  ['ks-name'] = 'ks-slider';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsSliderElement;

  dragging = false;
  previousIndex = 0;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  sliderRef: HTMLDivElement;
  @State() currentValue: number | number[] = 0;

  @State() __showTooltip = false;

  /**
   * @locale {en} The status of the slider. Can be one of the following values: `"default"`, `"error"`.
   * @locale {zh} 滑动输入器的状态。可选值包括: `"default"`、`"error"`。
   */
  @Prop() status: SliderStatus = 'default';
  /**
   * @locale {en} Indicates whether the slider is disabled. When `true`, the slider will be inactive and cannot be interacted with.
   * @locale {zh} 指示滑动输入器是否被禁用。当为 `true` 时，滑动输入器将处于非活动状态，无法交互。
   */
  @Prop() disabled = false;
  /**
   * @locale {en} The minimum value of the slider's range.
   * @locale {zh} 滑动输入器的最小值。
   */
  @Prop() min = 0;
  /**
   * @locale {en} The maximum value of the slider's range.
   * @locale {zh} 滑动输入器的最大值。
   */
  @Prop() max = 100;
  /**
   * @locale {en} The step interval between selectable values on the slider.
   * @locale {zh} 滑动输入器的步进值。
   */
  @Prop() step = 1;
  /**
   * @locale {en} Marks indicating specific values along the slider's range. Can be an array of objects with a `value` and optional `label`, or a boolean to show or hide default marks.
   * @locale {zh} 滑动输入器的标记，指示滑动范围内的特定值。可以是包含 `value` 和可选 `label` 的对象数组，或者是一个布尔值，用于显示或隐藏默认标记。
   */
  @Prop() marks: SliderMark[] | boolean = false;
  /**
   * @locale {en} The current value of the slider. Can be a single number for a standard slider or an array of numbers for a range slider. Used for controlled component behavior. If provided, the slider's state is managed externally.
   * @locale {zh} 滑动输入器的当前值。对于标准滑块，可以是单个数字；对于范围滑块，可以是数字数组。用于受控组件行为。如果提供此属性，则滑块的状态由外部管理。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() value;
  /**
   * @locale {en} An array of label configurations for the slider's indicators/thumbs. Each object in the array can specify a `label` text and a `show` boolean to control visibility. Corresponds to each value in a range slider or the single value in a standard slider.
   * @locale {zh} 滑块指示器/滑块的标签配置数组。数组中的每个对象可以指定 `label` 文本和 `show` 布尔值来控制可见性。对应于范围滑块中的每个值或标准滑块中的单个值。
   */
  @Prop() label: SliderLabel[] = [];
  /**
   * @locale {en} The default value of the slider when it is first rendered. Used if `value` is not provided.
   * @locale {zh} 滑动输入器首次渲染时的默认值。如果未提供 `value` 属性，则使用此值。
   */
  @Prop() defaultValue: number | number[] = 0;

  @Prop() tooltipVisible = true;

  /**
   * @locale {en} An array of strings to be displayed as content within the tooltips for each slider indicator/handle. The order of strings corresponds to the order of values in a range slider, or a single string for a standard slider.
   * @locale {zh} 一个字符串数组，用作每个滑块指示器/滑块的工具提示内容。字符串的顺序对应于范围滑块中值的顺序，对于标准滑块则为单个字符串。
   */
  @Prop() tooltipContent: string[] = [];
  /**
   * @locale {en} Custom event triggered when the value of the slider changes. This event is fired every time the user adjusts the slider's value. The event detail contains the new value(s).
   * @locale {zh} 滑动输入器的值更改时触发的自定义事件。每次用户调整滑动输入器的值时都会触发此事件。事件详细信息包含新的值。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<number | number[]>;

  /**
   * @locale {en} Custom event triggered when the value of the slider changes. This event is fired every time the user adjusts the slider's value. The event detail contains the new value(s).
   * @locale {zh} 滑动输入器的值更改时触发的自定义事件。每次用户调整滑动输入器的值时都会触发此事件。事件详细信息包含新的值。
   */
  @Event({ bubbles: false, composed: false }) ksChangeComplete?: EventEmitter<number | number[]>;

  componentWillLoad() {
    if (this.value === undefined) {
      this.currentValue = this.defaultValue;
    } else {
      this.currentValue = this.value;
    }

    this.bindMouseMoveSlider = this.handleMouseMoveSlider.bind(this);
    this.bindMouseUpSlider = this.handleMouseUpSlider.bind(this);
  }

  @Watch('value')
  valueWatcher(val: number | number[]) {
    this.currentValue = val;
  }

  @Watch('defaultValue')
  defaultValueWatcher(val: number | number[]) {
    if (this.value === undefined) {
      this.currentValue = val;
    }
  }

  private isHover = false;

  constructor() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  getNewValue(x: number) {
    const { width, left } = this.sliderRef.getBoundingClientRect();
    let percent = (x - left) / width;
    if (isRTL()) {
      percent = 1 - percent;
    }

    let newValue = percentToValue(percent, this.min, this.max);
    if (this.step) {
      newValue = Math.round((newValue - this.min) / this.step) * this.step + this.min;
    } else {
      const values = (Array.isArray(this.marks) ? this.marks : this.steppedMarks).map((x) => x.value);
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      newValue = values[findClosestIndex(values, newValue)];
    }

    newValue = Math.max(this.min, Math.min(newValue, this.max));

    let activeIndex = 0;
    if (Array.isArray(this.currentValue)) {
      activeIndex = this.dragging ? this.previousIndex : findClosestIndex(this.currentValue, newValue);
    }

    return { newValue, activeIndex };
  }

  handleMouseUpSlider(event: MouseEvent) {
    this.dragging = false;
    if (this.isHover) {
      this.__showTooltip = true;
    }
    const { newValue, activeIndex } = this.getNewValue(event.clientX);
    if (Array.isArray(this.currentValue)) {
      const newValues = [...this.currentValue];
      newValues.splice(activeIndex, 1, newValue);
      if (this.value === undefined) {
        this.currentValue = newValues;
      }
      this.ksChange.emit(newValues);
      this.ksChangeComplete?.emit(newValues);
      sendActionTracking(this.el, { eventType: 'change', componentParams: { value: newValues } });
    } else {
      if (this.value === undefined) {
        this.currentValue = newValue;
      }
      this.ksChange.emit(newValue);
      this.ksChangeComplete?.emit(newValue);
      sendActionTracking(this.el, { eventType: 'change', componentParams: { value: newValue } });
    }

    document.removeEventListener('mousemove', this.bindMouseMoveSlider);
    document.removeEventListener('mouseup', this.bindMouseUpSlider);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    document.removeEventListener('touchmove', this.bindMouseMoveSlider);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    document.removeEventListener('touchend', this.bindMouseUpSlider);
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  bindMouseUpSlider: (event: MouseEvent) => void;

  handleMouseMoveSlider(event: MouseEvent) {
    if (event.buttons === 0) {
      return;
    }

    const { newValue, activeIndex } = this.getNewValue(event.clientX);

    if (Array.isArray(this.currentValue)) {
      const newValues = [...this.currentValue];
      newValues.splice(activeIndex, 1, newValue);
      if (this.value === undefined) {
        this.currentValue = newValues;
      }
      this.ksChange.emit(newValues);
    } else {
      if (this.value === undefined) {
        this.currentValue = newValue;
      }
      this.ksChange.emit(newValue);
    }

    if (!this.dragging) {
      this.previousIndex = activeIndex;
      this.dragging = true;
    }
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  bindMouseMoveSlider: (event: MouseEvent) => void;

  handleMouseDownSlider(event: MouseEvent) {
    event.preventDefault();
    if (this.disabled) {
      return;
    }

    this.__showTooltip = false;

    const { newValue, activeIndex } = this.getNewValue(event.clientX);
    if (Array.isArray(this.currentValue)) {
      const newValues = [...this.currentValue];
      newValues.splice(activeIndex, 1, newValue);
      if (this.value === undefined) {
        this.currentValue = newValues;
      }
      this.ksChange.emit(newValues);
    } else {
      if (this.value === undefined) {
        this.currentValue = newValue;
      }
      this.ksChange.emit(newValue);
    }

    document.addEventListener('mousemove', this.bindMouseMoveSlider);
    document.addEventListener('mouseup', this.bindMouseUpSlider);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    document.addEventListener('touchmove', this.bindMouseMoveSlider);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    document.addEventListener('touchend', this.bindMouseUpSlider);
  }

  get trackOffset() {
    return valueToPercent(
      Array.isArray(this.currentValue) ? Math.min(...this.currentValue) : this.min,
      this.min,
      this.max,
    );
  }

  get trackWidth() {
    return (
      valueToPercent(
        Array.isArray(this.currentValue) ? Math.max(...this.currentValue) : this.currentValue,
        this.min,
        this.max,
      ) - this.trackOffset
    );
  }

  indicatorMouseEnter = debounce(() => {
    if (this.isHover) {
      this.__showTooltip = true;
    }
  }, 200);

  renderIndicator(value: number, index: number) {
    const percent = valueToPercent(value, this.min, this.max);
    const content =
      this.tooltipContent[index] || (!isNaN(percent) && percent !== Infinity && formatToLocalizedNumber(percent, 1));
    const showTooltip = this.__showTooltip && content ? true : false;
    return (
      <ks-tooltip
        class={`${prefix}__tooltip`}
        disabled={!this.tooltipVisible}
        visible={showTooltip}
        content={content || ''}
      >
        <span
          onMouseEnter={() => {
            this.isHover = true;
            this.indicatorMouseEnter();
          }}
          onMouseOut={() => {
            this.__showTooltip = false;
            this.isHover = false;
          }}
          data-index={index}
          class={`${prefix}__indicator`}
          part="handle"
          style={{ [isRTL() ? 'right' : 'left']: `${percent}%` }}
          data-testid="ks-slider-index-44tQGY"
        >
          {this.label[index] && this.label[index].show && (
            <ks-text variant="labelSm" theme="neutral" class={`${prefix}__label`}>
              {this.label[index].label}
            </ks-text>
          )}

          <input
            type="range"
            min={this.min}
            max={this.max}
            step={this.step}
            value={value}
            aria-valuemax={this.max}
            aria-valuemin={this.min}
            aria-valuenow={value}
            aria-valuetext={value}
          />
        </span>
      </ks-tooltip>
    );
  }

  get steppedMarks(): SliderMark[] {
    return [...Array(Math.floor((this.max - this.min) / this.step) + 1)].map((_, index) => ({
      value: this.min + this.step * index,
    }));
  }

  renderMarks(mark: SliderMark, index: number) {
    const percent = valueToPercent(mark.value, this.min, this.max);
    const isActive = Array.isArray(this.currentValue)
      ? mark.value >= Math.min(...this.currentValue) && mark.value <= Math.max(...this.currentValue)
      : mark.value <= this.currentValue;
    return (
      <Fragment>
        <span
          data-index={index}
          class={{ [`${prefix}__mark`]: true, [`${prefix}__mark--active`]: isActive }}
          style={{ [isRTL() ? 'right' : 'left']: `${percent}%` }}
        />

        {mark.label && (
          <span
            data-index={index}
            class={`${prefix}__label`}
            style={{ [isRTL() ? 'right' : 'left']: `${percent}%` }}
            aria-hidden="true"
          >
            {mark.label}
          </span>
        )}
      </Fragment>
    );
  }

  render() {
    const variant = this.status === 'default' ? 'primary' : 'error';
    const classes = {
      [prefix]: true,
      [`${prefix}--${variant}`]: true,
      [`${prefix}--disabled`]: this.disabled,
      [`${prefix}--labeled`]: Array.isArray(this.marks) && this.marks.some((x) => x.label),
    };
    return (
      <Host dir={dir()} ks-slider role="slider">
        <div
          dir={dir()}
          class={classes}
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          ref={(el) => (this.sliderRef = el)}
          onMouseDown={this.handleMouseDownSlider.bind(this)}
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          onTouchStart={this.handleMouseDownSlider.bind(this)}
          data-testid="ks-slider-index-i2ckxA"
        >
          <span class={`${prefix}__bar`} />
          <span
            class={`${prefix}__track`}
            style={{ [isRTL() ? 'right' : 'left']: `${this.trackOffset}%`, width: `${this.trackWidth}%` }}
          />

          {typeof this.marks === 'boolean'
            ? this.marks && this.steppedMarks.map(this.renderMarks.bind(this))
            : this.marks.map(this.renderMarks.bind(this))}
          {typeof this.currentValue === 'number'
            ? this.renderIndicator(this.currentValue, 0)
            : this.currentValue.map(this.renderIndicator.bind(this))}
        </div>
      </Host>
    );
  }
}
