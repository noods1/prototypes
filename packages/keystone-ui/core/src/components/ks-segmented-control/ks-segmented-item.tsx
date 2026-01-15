import { Component, h, Host, Prop, Element, Event, type ComponentInterface, type EventEmitter } from '@stencil/core';
import { dir } from '@src/utils/utils';
import { logger } from '@src/utils/logger';
import { Consume } from '@src/libs/runtime-context';
import { registerPluginManager } from '@src/utils/plugin';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { SegmentedControlContext, type SegmentedControlContextValue } from '@src/context/segmented-control-context';

const PREFIX = 'segmented-item';

@Component({
  tag: 'ks-segmented-item',
  styleUrl: 'styles/ks-segmented-item.scss',
  shadow: true,
})
export class KsSegmentedItem implements ComponentInterface {
  ['ks-name'] = 'ks-segmented-item';

  @Element() el!: HTMLKsSegmentedItemElement;

  @Consume({ context: SegmentedControlContext, subscribe: true }) context?: SegmentedControlContextValue;

  /**
   * Indicates whether this specific item is disabled. If the parent `ks-segmented-group` is disabled, this item will
   * also be disabled regardless of this prop's value.
   */
  @Prop() disabled = false;
  /**
   * The unique value associated with this segmented item. This value is used to identify the item within the group.
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: string | number;
  /**
   * @deprecated Use `value` instead.
   */
  @Prop() selected = false;

  /**
   * @deprecated Use `change` event on `ks-segmented-group` instead.
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksClick: EventEmitter<string | number>;

  constructor() {
    registerPluginManager(this.el);
  }

  componentWillRender() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    logger.debug(`ks-segmented-item ${this.value} componentDidLoad. context:`, this.context);
  }

  private handleClick = () => {
    if (this.context?.disabled || this.disabled) return;

    this.context?.updateValue?.(this.value);
  };

  render() {
    const { value, disabled } = this;
    const { value: groupValue = '', disabled: groupDisabled = false } = this.context || {};

    return (
      <Host dir={dir()} ks-segmented-item ks-active={groupValue === value} ks-disabled={groupDisabled || disabled}>
        <label part="self" class={PREFIX} onClick={this.handleClick} data-testid="ks-segmented-item-index-oLb7CD">
          <div class={`${PREFIX}__label`}>
            <slot />
          </div>
        </label>
      </Host>
    );
  }
}
