import { Host, h, Component, State, Prop, Event, type ComponentInterface, type EventEmitter } from '@stencil/core';
import { dir } from '@src/utils/utils';

const PREFIX = 'pager-jumper';

@Component({
  tag: 'ks-pagination-jumper',
  styleUrl: 'ks-pagination-jumper.scss',
  shadow: true,
})
export class KsPaginationJumper implements ComponentInterface {
  @State() internalValue = '';

  /**
   * Whether the input is disabled.
   */
  @Prop() disabled = false;

  /**
   * Emits when the page is jumped. The event carries a number value indicating the new page number.
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event() ksJump: EventEmitter<number>;

  private handleJumpPage = () => {
    if (this.disabled) return;

    const page = Number(this.internalValue);
    if (isNaN(page)) return;

    this.ksJump.emit(page);
    this.internalValue = '';
  };

  private handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.handleJumpPage();
    }
  };

  private handleChange = ({ detail }: CustomEvent<string>) => {
    this.internalValue = detail;
  };

  render() {
    const { disabled, internalValue } = this;

    return (
      <Host dir={dir()} ks-pagination-jumper>
        <ks-space compact class={`${PREFIX}__jump`} part="jump">
          <ks-input
            class={`${PREFIX}__input`}
            size="sm"
            type="number"
            placeholder="#"
            value={internalValue}
            disabled={disabled}
            onKsChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            data-testid="ks-pagination-index-iuKszv"
          />
          <ks-button
            class={`${PREFIX}__button`}
            size="sm"
            variant="inverse"
            disabled={disabled}
            onClick={this.handleJumpPage}
            data-testid="ks-pagination-index-sdz5ZP"
          >
            <slot />
          </ks-button>
        </ks-space>
      </Host>
    );
  }
}
