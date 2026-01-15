import { Component, h, Prop, Event, EventEmitter, Host, Element } from '@stencil/core';
import classnames from 'classnames';
import { dir } from '@src/utils/utils';
import { registerPluginManager } from '@src/utils/plugin';
import { TagSize, TagVariant } from '../../entities';
import { sendActionTracking } from '@src/utils/tracking';
import { Slot, Slots } from '@src/utils/decorators';

const prefix = 'tag';

const VariantMap = {
  info: 'primary',
  new: 'support',
  neutral: 'neutral',
  success: 'success',
  error: 'error',
  warning: 'warning',
};

/**
 * @slot icon - Slot for the icon.
 */
@Component({
  tag: 'ks-tag',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsTag {
  ['ks-name'] = 'ks-tag';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsTagElement;
  /**
   * @locale {en} Variant style of the tag. Can be one of the following values: `"info"`, `"new"`, `"neutral"`, `"success"`, `"error"`, `"warning"`.
   * @locale {zh} 标签的样式变体。可以是以下值之一：`"info"`、`"new"`、`"neutral"`、`"success"`、`"error"`、`"warning"`。
   */
  @Prop() variant: TagVariant = 'neutral';
  /**
   * @locale {en} Size of the tag. Can be `"sm"`, `"md"` or `"lg"`.
   * @locale {zh} 标签的尺寸。可以是 `"sm"`，`"md"` 或 `"lg"`。
   */
  @Prop() size?: TagSize = 'md';
  /**
   * @locale {en} Indicates whether the tag is disabled. When `true`, the tag is not interactive.
   * @locale {zh} 指示标签是否被禁用。当为 `true` 时，标签不可交互。
   */
  @Prop() disabled?: boolean;
  /**
   * @locale {en} If `true`, this property adds an indicator (a dot) to the tag.
   * @locale {zh} 如果为 `true`，将在标签上添加一个指示符（一个小点）。
   */
  @Prop() indicator?: boolean;
  /**
   * @locale {en} Indicates whether the tag is closable. When `true`, a close button will appear on the tag.
   * @locale {zh} 指示标签是否可关闭。当为 `true` 时，标签上会出现关闭按钮。
   */
  @Prop() closeable?: boolean;
  /**
   * @locale {en} Custom width for the tag. This can be used to set a specific width.
   * @locale {zh} 标签的自定义宽度。可用于设置特定宽度。
   */
  @Prop() width?: string;
  /**
   * @locale {en} Custom max width for the tag.
   * @locale {zh} 标签的自定义最大宽度。
   */
  @Prop() maxWidth?: string;

  /**
   * @locale {en} Indicates whether the tag is draggable.
   * @locale {zh} 指示标签是否可拖动。
   */
  @Prop() draggable = false;

  /**
   * @locale {en} Custom event triggered when the tag's close button is clicked. This event can be used to execute additional actions when the tag is closed.
   * @locale {zh} 点击标签的关闭按钮时触发的自定义事件。此事件可用于在标签关闭时执行额外的操作。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksClose: EventEmitter;

  /**
   * @locale {en} Custom event triggered when the drag icon is clicked.
   * @locale {zh} 点击拖拽图标时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksStartDrag: EventEmitter;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'icon' }) iconSlot: Slots;

  constructor() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  handleClose(event: Event) {
    if (!this.closeable || this.disabled) return;

    event.stopPropagation();
    this.ksClose.emit(event);
    sendActionTracking(this.el, { eventType: 'close' });
  }

  handleDragClick(event: Event) {
    if (!this.draggable || this.disabled) return;
    event.stopPropagation();
    this.ksStartDrag.emit(event);
  }

  render() {
    const className = classnames(`${prefix}`, `${prefix}--${VariantMap[this.variant]}`, `${prefix}--${this.size}`, {
      [`${prefix}--disabled`]: this.disabled,
      [`${prefix}--indicator`]: this.indicator,
      [`${prefix}--closeable`]: this.closeable,
    });
    const style = {
      width: this.width,
      maxWidth: this.maxWidth,
    };
    const iconSize = this.size === 'sm' ? '14' : '16';

    return (
      <Host dir={dir()} ks-tag aria-disabled={this.disabled ? 'true' : undefined}>
        <div
          onMouseDown={this.handleDragClick.bind(this)}
          dir={dir()}
          class={className}
          style={style}
          part="self"
          data-testid="ks-tag-index-hocgY9"
        >
          {this.indicator && (
            <div class={'indicator'}>
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="4" fill="currentColor" />
              </svg>
            </div>
          )}

          {this.draggable && this.variant === 'neutral' && (
            <div class={`${prefix}-drag-icon`}>
              <ks-icon-drag-item size={iconSize}></ks-icon-drag-item>
            </div>
          )}

          {this.iconSlot && <slot name="icon"></slot>}

          <span class={`${prefix}__text`}>
            <span class={`${prefix}__text__content`}>
              <slot></slot>
            </span>
          </span>
          {this.closeable && (
            <div
              class={`${prefix}__close-icon`}
              onClick={this.handleClose.bind(this)}
              part="close-icon"
              data-testid="ks-tag-index-4ruw4p"
            >
              <ks-icon-close-small size={iconSize} part="icon" />
            </div>
          )}
        </div>
      </Host>
    );
  }
}
