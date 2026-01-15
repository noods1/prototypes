import { Component, h, Prop, Element, Event, EventEmitter, State, Watch, Host, Method } from '@stencil/core';
import classNames from 'classnames';
import { parse, format, isSameMinute, getSeconds, getMinutes, getHours } from 'date-fns';
import { dir } from '@src/utils/utils';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { IDisabledTimeFn, IDisabledAmFn } from '../../../entities';

const prefix = 'ks-time-panel';
const MAX_NUM = 9;
const DEFAULT_FORMAT = 'HH:mm:ss';
const DEFAULT_TIME = '00:00:00';

@Component({
  tag: 'ks-time-panel',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsTimePanel {
  ['ks-name'] = 'ks-time-panel';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsTimePanelElement;

  /**
   * @locale {en} The currently selected time string.
   * @locale {zh} 当前选中的时间字符串。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: string;

  /**
   * @locale {en} The format of the time string, conforming to date-fns format tokens. Default is "HH:mm:ss".
   * @locale {zh} 时间字符串的格式，遵循 date-fns 格式标记。默认为 "HH:mm:ss"。
   */
  @Prop() format = DEFAULT_FORMAT;

  /**
   * @locale {en} The step for hour selection. Default is 1.
   * @locale {zh} 小时选择的步长。默认为 1。
   */
  @Prop() hourStep = 1;

  /**
   * @locale {en} An internal property used to trigger updates, typically when the active time unit (hour, minute, second) changes focus in a parent component, signaling this panel to synchronize its view.
   * @locale {zh} 用于触发更新的内部属性，通常在父组件中活动时间单位（小时、分钟、秒）焦点改变时使用，通知此面板同步其视图。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() cur: number;

  /**
   * @locale {en} Whether to display the hour selection column. Default is true.
   * @locale {zh} 是否显示小时选择列。默认为 true。
   */
  @Prop() showHour = true;

  /**
   * @locale {en} Whether to display the minute selection column. Default is true.
   * @locale {zh} 是否显示分钟选择列。默认为 true。
   */
  @Prop() showMinute = true;

  /**
   * @locale {en} Whether to display the second selection column. Default is false.
   * @locale {zh} 是否显示秒选择列。默认为 false。
   */
  @Prop() showSecond = false;

  /**
   * @locale {en} The step for minute selection. Default is 1.
   * @locale {zh} 分钟选择的步长。默认为 1。
   */
  @Prop() minuteStep = 1;

  /**
   * @locale {en} The step for second selection. Default is 1.
   * @locale {zh} 秒选择的步长。默认为 1。
   */
  @Prop() secondStep = 1;

  /**
   * @locale {en} Indicates if this panel is for selecting the start time in a time range. This affects the behavior of `disabled*` functions.
   * @locale {zh} 指示此面板是否用于选择时间范围中的开始时间。这会影响 `disabled*` 函数的行为。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() isStart: boolean;

  /**
   * @locale {en} Whether to use a 12-hour clock instead of a 24-hour clock.
   * @locale {zh} 是否使用 12 小时制而不是 24 小时制。
   */
  @Prop() isHour12 = false;
  /**
   * @locale {en} A function to disable specific hours. It receives the hour (0-23), current selected time string, and `isStart` flag as arguments and should return `true` if the hour is disabled.
   * @locale {zh} 用于禁用特定小时的函数。它接收小时 (0-23)、当前选定的时间字符串和 `isStart` 标志作为参数，如果该小时被禁用，则应返回 `true`。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledHours: IDisabledTimeFn;
  /**
   * @locale {en} A function to disable specific minutes. It receives the minute (0-59), current selected time string, and `isStart` flag as arguments and should return `true` if the minute is disabled.
   * @locale {zh} 用于禁用特定分钟的函数。它接收分钟 (0-59)、当前选定的时间字符串和 `isStart` 标志作为参数，如果该分钟被禁用，则应返回 `true`。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledMinutes: IDisabledTimeFn;
  /**
   * @locale {en} A function to disable specific seconds. It receives the second (0-59), current selected time string, and `isStart` flag as arguments and should return `true` if the second is disabled.
   * @locale {zh} 用于禁用特定秒的函数。它接收秒 (0-59)、当前选定的时间字符串和 `isStart` 标志作为参数，如果该秒被禁用，则应返回 `true`。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledSeconds: IDisabledTimeFn;
  /**
   * @locale {en} A function to disable AM or PM selection when `isHour12` is true. It receives 'AM' or 'PM', current selected time string, and `isStart` flag as arguments and should return `true` if the AM/PM option is disabled.
   * @locale {zh} 当 `isHour12` 为 true 时，用于禁用 AM 或 PM 选择的函数。它接收 'AM' 或 'PM'、当前选定的时间字符串和 `isStart` 标志作为参数，如果 AM/PM 选项被禁用，则应返回 `true`。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledAm: IDisabledAmFn;
  /**
   * @locale {en} Custom event triggered when the selected time changes. The event detail contains the new time string in the specified `format`.
   * @locale {zh} 当选定时间更改时触发的自定义事件。事件详细信息包含按指定 `format` 格式化的新时间字符串。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<string>;

  @Watch('value')
  watchValue(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      if (!newValue) {
        this.dateValue = parse(DEFAULT_TIME, DEFAULT_FORMAT, new Date());
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        this.am = 'AM';
      } else {
        this.dateValue = parse(newValue, this.format, new Date());
      }
      this.gotoTime();
    }
  }

  @Watch('cur')
  handleCurChange() {
    this.dateValue = parse(this.value, this.format, new Date());
    if (!this.value) {
      this.dateValue = new Date();
    }
    this.gotoTime();
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() dateValue: Date;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  hourContainerRef: HTMLElement;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  minuteContainerRef: HTMLElement;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  secondContainerRef: HTMLElement;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  amContainerRef: HTMLElement;

  hours = [];
  minutes = [];
  seconds = [];
  ams = [];

  @State() hour = 0;
  @State() minute = 0;
  @State() second = 0;
  @State() am = 'AM';

  private cycleHour = false;
  private cycleMinute = false;
  private cycleSecond = false;

  private is12: boolean = this.isHour12;

  SCROLL_DEFAULT_DURATION = 120;

  SCROLL_OFFSET_SPACING = 36;

  componentWillLoad() {
    this.is12 = this.format.includes('a') || this.isHour12;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.hours = this.generateTime(this.is12 ? 12 : 24, this.hourStep);
    this.cycleHour = this.hours.length > MAX_NUM;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.minutes = this.generateTime(60, this.minuteStep);
    this.cycleMinute = this.minutes.length > MAX_NUM;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.seconds = this.generateTime(60, this.secondStep);
    this.cycleSecond = this.seconds.length > MAX_NUM;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.ams = ['AM', 'PM'];
    this.dateValue = this.value
      ? parse(this.value, this.format, new Date())
      : parse('00:00:00', 'HH:mm:ss', new Date());
  }

  componentDidLoad() {
    this.gotoTime();
  }

  get selectedTime() {
    return this.value === undefined ? format(this.dateValue, this.format) : this.value;
  }

  /**
   * @locale {en} Scrolls the time columns to reflect the current `value` or internal `dateValue`.
   * This method is typically called internally when the value changes, the component loads, or `cur` prop changes.
   * @locale {zh} 滚动时间列以反映当前的 `value` 或内部 `dateValue`。
   * 此方法通常在值更改、组件加载或 `cur` 属性更改时内部调用。
   */
  @Method()
  async gotoTime() {
    if (this.value) {
      const ampm = format(this.dateValue, 'a');
      this.showHour &&
        (this.hour = this.is12
          ? Number(format(this.dateValue, 'h')) === 12
            ? 0
            : Number(format(this.dateValue, 'h'))
          : getHours(this.dateValue));
      this.showMinute && (this.minute = getMinutes(this.dateValue));
      this.showSecond && (this.second = getSeconds(this.dateValue));
      this.is12 && (this.am = ampm);
      this.showHour && this.cycleHour && this.scrollTo(this.hourContainerRef, this.hour / this.hourStep);
      this.showMinute && this.cycleMinute && this.scrollTo(this.minuteContainerRef, this.minute / this.minuteStep);
      this.showSecond && this.cycleSecond && this.scrollTo(this.secondContainerRef, this.second / this.secondStep);
    } else {
      this.showHour && this.cycleHour && this.scrollTo(this.hourContainerRef, this.hour / this.hourStep);
      this.showMinute && this.cycleMinute && this.scrollTo(this.minuteContainerRef, this.minute / this.minuteStep);
      this.showSecond && this.cycleSecond && this.scrollTo(this.secondContainerRef, this.second / this.secondStep);
    }
  }

  generateTime(length: number, step = 1) {
    const original = Array.from(new Array(Math.ceil(length / step)), (va, index) =>
      length === 12 && index === 0 ? 12 : index * step,
    );
    return original.length > MAX_NUM ? [...original, ...original, ...original] : original;
  }

  pickHour(value: number) {
    const hourValue = this.is12 && this.am === 'PM' ? value + 12 : value;
    if (this.disabledHours?.(hourValue, this.selectedTime, this.isStart)) {
      return;
    }
    const dateValue = new Date(this.dateValue);
    dateValue.setHours?.(hourValue);
    if (this.value === undefined) {
      this.hour = value;
      this.dateValue = dateValue;
      this.cycleHour && this.scrollTo(this.hourContainerRef, value / this.hourStep);
    }
    this.dispatchValueChange(dateValue);
  }

  pickMinute(value: number) {
    if (this.disabledMinutes?.(value, this.selectedTime, this.isStart)) {
      return;
    }
    const dateValue = new Date(this.dateValue);
    dateValue.setMinutes?.(value);
    if (this.value === undefined) {
      this.minute = value;
      this.dateValue = dateValue;
      this.cycleMinute && this.scrollTo(this.minuteContainerRef, value / this.minuteStep);
    }
    this.dispatchValueChange(dateValue);
  }

  pickSecond(value: number) {
    if (this.disabledSeconds?.(value, this.selectedTime, this.isStart)) {
      return;
    }
    const dateValue = new Date(this.dateValue);
    dateValue.setSeconds?.(value);
    if (this.value === undefined) {
      this.second = value;
      this.dateValue = dateValue;
      this.cycleSecond && this.scrollTo(this.secondContainerRef, value / this.secondStep);
    }
    this.dispatchValueChange(dateValue);
  }

  pickAm(value: string) {
    if (this.disabledAm?.(value, this.selectedTime, this.isStart)) {
      return;
    }
    this.am = value;

    const dateValue = parse(
      `${this.formatTime(this.is12 && this.hour === 0 ? 12 : this.hour)}:${this.formatTime(this.minute)}:${this.formatTime(this.second)} ${value}`,
      'hh:mm:ss a',
      new Date(),
    );
    if (this.value === undefined) {
      this.dateValue = dateValue;
    }
    // this.scrollTo(this.amContainerRef, value==='PM'?1:0);
    this.dispatchValueChange(dateValue);
  }

  formatTime(value: number) {
    return String(value).padStart(2, '0');
  }

  handleScroll(container: HTMLElement, type: 'hour' | 'minute' | 'second') {
    if (this.isAnimating) return;
    const scrollPosition = container.scrollTop;
    const itemHeight = this.SCROLL_OFFSET_SPACING;
    const maxScroll = (itemHeight * this[`${type}s`].length) / 3;
    if (scrollPosition >= 2 * maxScroll || scrollPosition === 0) {
      container.scrollTop = maxScroll;
    }
  }

  private isAnimating = false;

  runScrollAnimationFrame(container: HTMLElement, to: number, duration: number = this.SCROLL_DEFAULT_DURATION) {
    if (duration <= 0) return;

    this.isAnimating = true;
    const startTime = performance.now();
    const startPos = container.scrollTop;
    const distance = to - startPos;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      container.scrollTop = startPos + distance * progress;
      if (progress < 1 && Math.abs(container.scrollTop - to) > 1) {
        requestAnimationFrame(animate);
      } else {
        container.scrollTop = to;
        this.isAnimating = false;
      }
    };

    requestAnimationFrame(animate);
  }

  // eslint-disable-next-line require-await, @stencil-community/required-jsdoc
  /**
   * @locale {en} Dispatches the `ksChange` event with the formatted time string derived from the provided `dateValue`.
   * It ensures that all relevant time parts (hour, minute, second, AM/PM) are valid before emitting.
   * @locale {zh} 使用从提供的 `dateValue` 派生的格式化时间字符串来分发 `ksChange` 事件。
   * 它在发出事件前确保所有相关的时间部分（小时、分钟、秒、AM/PM）均有效。
   * @param dateValue The Date object representing the new time.
   */
  @Method()
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  async dispatchValueChange(dateValue) {
    if (
      (!this.showHour || this.hour >= 0) &&
      (!this.showMinute || this.minute >= 0) &&
      (!this.showSecond || this.second >= 0) &&
      (!this.is12 || this.am)
    ) {
      this.ksChange.emit(format(dateValue, this.format));
    }
  }

  scrollTo(container: HTMLElement, index = 0, duration: number = this.SCROLL_DEFAULT_DURATION) {
    this.runScrollAnimationFrame(container, this.SCROLL_OFFSET_SPACING * index, duration);
  }

  render() {
    // const style = this.width ? { width: `${this.width}px` } : {};
    return (
      <Host dir={dir()} ks-time-panel>
        <div dir={dir()} class={`${prefix}`} part="self">
          {this.showHour && (
            <div
              onScroll={() => this.cycleHour && this.handleScroll(this.hourContainerRef, 'hour')}
              class={`${prefix}-hours`}
              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
              ref={(ref) => (this.hourContainerRef = ref)}
              data-testid="panel-index-qZMqVr"
            >
              {this.hours.map((hour) => (
                <div
                  class={classNames(`${prefix}-item`, {
                    [`${prefix}-item--active`]: this.hour === (this.is12 && hour === 12 ? 0 : hour) && this.hour >= 0,
                    [`${prefix}-item--disable`]: this.disabledHours?.(hour, this.selectedTime, this.isStart),
                  })}
                  onClick={this.pickHour.bind(this, this.is12 && hour === 12 ? 0 : hour)}
                  data-testid="panel-index-4UuLor"
                >
                  {format(new Date().setHours(hour), 'HH')}
                </div>
              ))}
            </div>
          )}

          {this.showMinute && (
            <div
              class={`${prefix}-minutes`}
              onScroll={() => this.cycleMinute && this.handleScroll(this.minuteContainerRef, 'minute')}
              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
              ref={(ref) => (this.minuteContainerRef = ref)}
              data-testid="panel-index-r3A7wi"
            >
              {this.minutes.map((minute) => {
                isSameMinute(this.dateValue, minute);
                return (
                  <div
                    class={classNames(`${prefix}-item`, {
                      [`${prefix}-item--active`]: this.minute === minute && this.minute >= 0,
                      [`${prefix}-item--disable`]: this.disabledMinutes?.(minute, this.selectedTime, this.isStart),
                    })}
                    onClick={this.pickMinute.bind(this, minute)}
                    data-testid="panel-index-ePgydu"
                  >
                    {format(new Date().setMinutes(minute), 'mm')}
                  </div>
                );
              })}
            </div>
          )}

          {this.showSecond && (
            <div
              class={`${prefix}-seconds`}
              onScroll={() => this.cycleSecond && this.handleScroll(this.secondContainerRef, 'second')}
              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
              ref={(ref) => (this.secondContainerRef = ref)}
              data-testid="panel-index-kXCXvx"
            >
              {this.seconds.map((second) => (
                <div
                  class={classNames(`${prefix}-item`, {
                    [`${prefix}-item--active`]: this.second === second && this.second >= 0,
                    [`${prefix}-item--disable`]: this.disabledSeconds?.(second, this.selectedTime, this.isStart),
                  })}
                  onClick={this.pickSecond.bind(this, second)}
                  data-testid="panel-index-s5VuCt"
                >
                  {format(new Date().setSeconds(second), 'ss')}
                </div>
              ))}
            </div>
          )}

          {this.is12 && (
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            <div class={`${prefix}-am`} ref={(ref) => (this.amContainerRef = ref)}>
              {this.ams.map((item) => (
                <div
                  class={classNames(`${prefix}-item`, {
                    [`${prefix}-item--active`]: item === this.am,
                    [`${prefix}-item--disable`]: this.disabledAm?.(item, this.selectedTime, this.isStart),
                  })}
                  onClick={this.pickAm.bind(this, item)}
                  data-testid="panel-index-6gKaCK"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
