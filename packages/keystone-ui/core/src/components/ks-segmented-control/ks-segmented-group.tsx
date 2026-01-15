import {
  Component,
  h,
  Host,
  Element,
  Prop,
  Watch,
  Event,
  type ComponentInterface,
  type EventEmitter,
} from '@stencil/core';
import { dir } from '@src/utils/utils';
import { logger } from '@src/utils/logger';
import { Provide } from '@src/libs/runtime-context';
import { sendActionTracking } from '@src/utils/tracking';
import { registerPluginManager } from '@src/utils/plugin';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { SegmentedControlContext, type SegmentedControlContextValue } from '@src/context/segmented-control-context';

const PREFIX = 'segmented-group';

@Component({
  tag: 'ks-segmented-group',
  styleUrl: 'styles/ks-segmented-group.scss',
  shadow: true,
})
export class KsSegmentedGroup implements ComponentInterface {
  ['ks-name'] = 'ks-segmented-group';
  private isControlled = false;

  @Element() el!: HTMLKsSegmentedGroupElement;

  @Provide({ context: SegmentedControlContext }) context: SegmentedControlContextValue = {
    value: '',
    disabled: false,
  };

  /**
   * Indicates whether the segmented group is disabled. When `true`, the user will not be able to interact with the
   * segmented items.
   */
  @Prop() disabled = false;
  /**
   * The selected value of the segmented control. This prop is controlled externally and will override the internal
   * state.
   */
  @Prop() @Vue2ValueFix() value?: string | number;
  @Watch('value')
  protected valueWatcher(value: string) {
    if (this.isControlled && value !== undefined) {
      this.context = {
        ...this.context,
        value,
      };
    }
  }
  /**
   * The default selected value of the segmented control by default. If not empty, it will be in selected state when
   * first rendered.
   */
  @Prop() defaultValue: string | number = '';
  /**
   * Emits when the segment selector's selected state changes. The event carries a string indicating the new selected
   * state.
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<string | number>;

  constructor() {
    registerPluginManager(this.el);
  }

  componentWillLoad() {
    this.isControlled = this.value !== undefined;
    this.context = {
      disabled: this.disabled,
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      value: this.isControlled ? this.value : this.defaultValue,
      updateValue: this.changeItemValue,
    };
  }

  componentWillRender() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    logger.debug('ks-segmented-group componentWillRender. context:', this.context);
  }

  private changeItemValue = (value: string | number) => {
    if (!this.isControlled) {
      this.context = {
        ...this.context,
        value,
      };
    }

    this.ksChange.emit(value);

    sendActionTracking(this.el, { eventType: 'change', componentParams: { value } });
  };

  render() {
    const { disabled } = this.context;

    return (
      <Host dir={dir()} ks-segmented-group>
        <div
          dir={dir()}
          class={{
            [PREFIX]: true,
            [`${PREFIX}--disabled`]: disabled,
          }}
          role="group"
        >
          <slot />
        </div>
      </Host>
    );
  }
}
