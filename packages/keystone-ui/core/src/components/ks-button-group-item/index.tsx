import { ButtonGroupContext, ButtonGroupContextValue, POSITIONTAG } from '@src/context/button-group-context';
import { Consume } from '@src/libs/runtime-context';
import { Component, type ComponentInterface, Element, Host, Prop, State, h } from '@stencil/core';

const prefix = 'button-group-item';

@Component({
  tag: 'ks-button-group-item',
  styleUrl: 'index.scss',
  shadow: {
    delegatesFocus: true,
  },
})
export class KsButtonGroupItem implements ComponentInterface {
  ['ks-name'] = 'ks-button-group-item';
  @Element() el!: HTMLKsButtonGroupItemElement;

  // prettier-ignore
  @Consume({
    context: ButtonGroupContext,
    subscribe: true,
    path: ['value'],
  })
  @State()
  valueFromButtonGroup: ButtonGroupContextValue['value'];
  // prettier-ignore
  @Consume({
    context: ButtonGroupContext,
    subscribe: true,
    path: ['disabled'],
  })
  @State()
  disabledFromButtonGroup: ButtonGroupContextValue['disabled'];
  // prettier-ignore
  @Consume({
    context: ButtonGroupContext,
    subscribe: true,
    path: ['multiple'],
  })
  @State()
  multipleFromButtonGroup: ButtonGroupContextValue['multiple'];
  // prettier-ignore
  @Consume({
    context: ButtonGroupContext,
    subscribe: true,
    path: ['positionMap'],
  })
  @State()
  positionMapFromButtonGroup: ButtonGroupContextValue['positionMap'];
  @Consume({
    context: ButtonGroupContext,
    path: ['onValueChange'],
  })
  onValueChangeFromButtonGroup!: ButtonGroupContextValue['onValueChange'];

  /**
   * @locale {en} The value of the button group item.
   * @locale {zh} 按钮组项的值。
   */
  @Prop() value?: string;
  /**
   * @locale {en} Indicates whether the button group item is disabled. When `true`, the user will not be able to interact with the button.
   * @locale {zh} 指示按钮组项是否被禁用。当为 `true` 时，用户将无法与按钮进行交互。
   */
  @Prop() disabled?: boolean;
  /**
   * @locale {en} Indicates whether the button group item is disabled. When `true`, the user will not be able to interact with the button.
   * @locale {zh} 指示按钮组项是否被禁用。当为 `true` 时，用户将无法与按钮进行交互。
   */
  @Prop() hideCheckmark?: boolean;

  handleClick() {
    const disabled = this.disabledFromButtonGroup || this.disabled || false;
    if (this.value && !disabled) {
      this.onValueChangeFromButtonGroup(this.value);
    }
  }

  get selected() {
    if (this.valueFromButtonGroup && this.value) {
      return this.valueFromButtonGroup.includes(this.value);
    }
    return false;
  }

  get position() {
    return this.positionMapFromButtonGroup?.get(this.el);
  }

  render() {
    const disabled = this.disabledFromButtonGroup || this.disabled || false;
    const classes = {
      [prefix]: true,
      [`${prefix}__selected`]: this.selected,
      [`${prefix}__disabled`]: disabled,
      [`${prefix}__start`]: this.position === POSITIONTAG.START,
      [`${prefix}__end`]: this.position === POSITIONTAG.END,
      [`${prefix}__multiple`]: this.multipleFromButtonGroup || false,
    };
    return (
      <Host ks-button-group-item>
        <div
          class={classes}
          id="item"
          part="base"
          onClick={this.handleClick.bind(this)}
          onKeyPress={this.handleClick.bind(this)}
          data-testid="ks-button-group-item-index-wfoNyD"
        >
          <input />
          <ks-text variant="labelLg" theme="neutralHigh">
            <span class="label">
              <slot />
              {this.multipleFromButtonGroup && this.selected && !this.hideCheckmark && (
                <ks-icon-check-mark-small class={`${prefix}__selected-icon`} />
              )}
            </span>
          </ks-text>
        </div>
      </Host>
    );
  }
}
