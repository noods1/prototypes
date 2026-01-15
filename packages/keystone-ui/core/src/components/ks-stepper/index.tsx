import { Component, Host, h, Prop, Element, Watch, Fragment } from '@stencil/core';
import anime from 'animejs';
import { dir } from '@src/utils/utils';
import { Slot, type Slots } from '@src/utils/decorators';
import type { StepperOrientation } from '../../entities';

const prefix = 'stepper';

@Component({
  tag: 'ks-stepper',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsStepper {
  ['ks-name'] = 'ks-stepper';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsStepperElement;

  /**
   * @locale {en} Is the entire process currently disabled
   * @locale {zh} 当前整个流程是否为禁用状态
   */
  @Prop() disabled = false;

  /**
   * @locale {en} The current active step in the process. This value controls which step is highlighted as active.
   * @locale {zh} 当前流程中的活动步骤。此值控制哪个步骤被高亮显示为活动步骤。
   */
  @Prop() activeStep = 1;
  /**
   * @locale {en} The orientation of the step bar. Can be one of the following values: `horizontal` or `vertical`.
   * @locale {zh} 步骤条的方向。可以是以下值之一：`horizontal` 或 `vertical`。
   */
  @Prop() orientation: StepperOrientation = 'horizontal';
  /**
   * @locale {en} Indicates whether to display the content of inactive steps. When `true`, the content of steps that are not active will still be shown.
   * @locale {zh} 指示是否显示非活动步骤的内容。当为 `true` 时，未激活步骤的内容仍然会显示。
   */
  @Prop() showInactiveContent = false;
  /**
   * @locale {en} Default slot for `ks-step` components. Each `ks-step` element provided here will be rendered as a step in the stepper.
   * @locale {zh} 用于 `ks-step` 组件的默认插槽。此处提供的每个 `ks-step` 元素都将作为步骤条中的一个步骤进行渲染。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: '_default', filter: (node: Element) => node['ks-name'] === 'ks-step' })
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  defaultSlots: Slots<HTMLKsStepElement>;

  @Watch('activeStep')
  activeStepWatcher(newVal: number, oldVal?: number) {
    if (newVal === oldVal) {
      return;
    }
    if (this.orientation !== 'vertical') {
      return;
    }
    if (this.showInactiveContent) {
      return;
    }

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const stepEl = this.el.shadowRoot.querySelectorAll<HTMLDivElement>(`.${prefix}__item-content`);
    anime({
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      targets: stepEl[oldVal - 1],
      duration: 200,
      easing: 'cubicBezier(0.4, 0, 0.2, 1)',
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      height: [stepEl[oldVal - 1].scrollHeight, 0],
      complete: () => {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        stepEl[oldVal - 1].style.height = '';
      },
    });
    anime({
      targets: stepEl[newVal - 1],
      duration: 200,
      easing: 'cubicBezier(0.4, 0, 0.2, 1)',
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      height: [0, stepEl[newVal - 1].scrollHeight],
    });
  }

  renderHorionztalStepper() {
    return this.defaultSlots?.map((_, index) => {
      const step = index + 1;
      const hasIconSlots = this.el.querySelector(`*[slot=icon${step}]`) !== null;
      const disabled = this.disabled || _.disabled;

      return (
        <Fragment>
          <div
            class={{
              [`${prefix}__item`]: true,
              [`${prefix}__item--active`]: this.activeStep === step,
              [`${prefix}__item--disabled`]: disabled,
            }}
          >
            {hasIconSlots ? <slot name={`icon${step}`} /> : <span>{`${step}`.padStart(2, '0')}</span>}
            <div class={`${prefix}__item-label`}>
              <slot name={`label${step}`} />
            </div>
          </div>
          {step < this.defaultSlots.length && <ks-divider class={`${prefix}__divider`} orientation="horizontal" />}
        </Fragment>
      );
    });
  }

  renderVerticalStepper() {
    return this.defaultSlots?.map((_, index) => {
      const step = index + 1;
      const isCurrentStep = this.activeStep === step;
      const hasIconSlots = this.el.querySelector(`*[slot=icon${step}]`) !== null;
      const disabled = this.disabled || _.disabled;

      return (
        <div
          class={{
            [`${prefix}__item`]: true,
            [`${prefix}__item--active`]: isCurrentStep,
            [`${prefix}__item--disabled`]: disabled,
          }}
        >
          <div class={`${prefix}__item-header`}>
            {hasIconSlots ? (
              <slot name={`icon${step}`} />
            ) : (
              <span style={{ 'font-variant-numeric': 'lining-nums tabular-nums' }}>{`${step}`.padStart(2, '0')}</span>
            )}
            {step < this.defaultSlots.length && <ks-divider class={`${prefix}__divider`} orientation="vertical" />}
          </div>
          <div class={`${prefix}__item-container`}>
            <div class={`${prefix}__item-label`}>
              <slot name={`label${step}`} />
            </div>
            <div
              class={{
                [`${prefix}__item-content`]: true,
                [`${prefix}__item-content--active`]: isCurrentStep || this.showInactiveContent,
              }}
            >
              <slot name={`content${step}`} />
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <Host dir={dir()} ks-stepper>
        <div class={`${prefix} ${prefix}--${this.orientation}`}>
          {this.orientation === 'horizontal' ? this.renderHorionztalStepper() : this.renderVerticalStepper()}
        </div>
      </Host>
    );
  }
}
