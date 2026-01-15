import {
  Host,
  h,
  Component,
  State,
  Prop,
  Element,
  Event,
  Watch,
  type ComponentInterface,
  type EventEmitter,
} from '@stencil/core';
import { registerPluginManager } from '@src/utils/plugin';
import { dir } from '@src/utils/utils';
import { sendActionTracking } from '@src/utils/tracking';

const PREFIX = 'chip';

/**
 * @slot prefix - The slot for the prefix content.
 */
@Component({
  tag: 'ks-chip',
  styleUrl: 'ks-chip.scss',
  shadow: true,
})
export class KsChip implements ComponentInterface {
  ['ks-name'] = 'ks-chip';
  private isControlled = false;

  @Element() el!: HTMLKsChipElement;

  @State() internalSelected = false;

  /**
   * The text content displayed in the chip.
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() label: string;
  /**
   * Indicates whether the chip is disabled. If set to `true`, the chip will be unclickable and visually indicate its
   * disabled state.
   */
  @Prop() disabled = false;
  /**
   * Indicates whether the chip is selected by default. If set to `true`, the chip will be inselected state when first
   * rendered.
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() defaultSelected: boolean;
  /**
   * Indicates whether the chip is selected. If set to `true`, the chip will be in selected state.
   * This prop is controlled externally and will override the internal state.
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() selected: boolean;
  @Watch('selected')
  protected selectedWatcher(selected: boolean) {
    if (this.isControlled && selected !== undefined) {
      this.internalSelected = selected;
    }
  }
  /**
   * Emits when the chip's selected state changes. The event carries a boolean value indicating the new selected state.
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event() ksChange: EventEmitter<boolean>;

  constructor() {
    registerPluginManager(this.el);
  }

  componentWillLoad() {
    this.isControlled = this.selected !== undefined;
    this.internalSelected = this.isControlled ? this.selected : !!this.defaultSelected;
  }

  private handleClick = () => {
    if (this.disabled) return;

    const nextSelected = !this.internalSelected;

    if (!this.isControlled) {
      this.internalSelected = nextSelected;
    }

    this.ksChange.emit(nextSelected);
    sendActionTracking(this.el, { eventType: 'change', componentParams: { value: nextSelected } });
  };

  render() {
    const { internalSelected, disabled, label } = this;

    return (
      <Host dir={dir()} ks-chip>
        <div
          class={{
            [PREFIX]: true,
            [`${PREFIX}--active`]: internalSelected,
            [`${PREFIX}--disabled`]: disabled,
          }}
          onClick={this.handleClick}
          data-testid="ks-chip-ks-chip-n9wDKu"
        >
          <slot name="prefix" />
          <span class={`${PREFIX}-label`}>{label}</span>
        </div>
      </Host>
    );
  }
}
