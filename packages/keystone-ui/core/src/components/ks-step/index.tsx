import { Component, Host, h, Element, Prop, type ComponentInterface } from '@stencil/core';
import { dir, getTargetParentComponent } from '@src/utils/utils';
import { Slot, type Slots } from '@src/utils/decorators';

// const prefix = 'step';

/**
 * @slot icon - Slot for the step's icon.
 * @slot label - Slot for the step's label.
 */
@Component({
  tag: 'ks-step',
  shadow: true,
})
export class KsStepper implements ComponentInterface {
  ['ks-name'] = 'ks-step';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsStepElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  parentEl: HTMLKsStepperElement;
  /**
   * @locale {en} Whether the current step is disabled
   * @locale {zh} 当前步骤是否为禁用状态
   */
  @Prop() disabled = false;
  /**
   * @locale {en} Content provided to the 'icon' slot of this step. This content will be displayed as the step's icon within the parent stepper.
   * @locale {zh} 提供给此步骤 'icon' 插槽的内容。此内容将作为步骤的图标显示在父步骤条中。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'icon' }) iconSlots: Slots;
  /**
   * @locale {en} Content provided to the 'label' slot of this step. This content will be displayed as the step's label within the parent stepper.
   * @locale {zh} 提供给此步骤 'label' 插槽的内容。此内容将作为步骤的标签显示在父步骤条中。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'label' }) labelSlots: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: '_default' }) defaultSlots: Slots;

  componentWillLoad() {
    this.parentEl = getTargetParentComponent(this.el, 'ks-stepper');
    if (this.parentEl !== null) {
      const stepIndex =
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        Array.from(this.el.parentElement.children)
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          .filter((child) => child['ks-name'] === 'ks-step')
          .indexOf(this.el) + 1;

      const fragment = document.createDocumentFragment();
      this.iconSlots?.forEach((item) => {
        item.slot = `icon${stepIndex}`;
        fragment.appendChild(item);
      });
      this.labelSlots?.forEach((item) => {
        item.slot = `label${stepIndex}`;
        fragment.appendChild(item);
      });
      this.defaultSlots?.forEach((item) => {
        item.slot = `content${stepIndex}`;
        fragment.appendChild(item);
      });
      this.parentEl.appendChild(fragment);
    }
  }

  render() {
    return (
      <Host dir={dir()} ks-step>
        <slot name="icon" />
        <slot name="label" />
        <slot />
      </Host>
    );
  }
}
