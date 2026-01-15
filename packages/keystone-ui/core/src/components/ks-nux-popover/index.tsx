import { Placement, Strategy } from '@floating-ui/dom';
import { NuxPopoverData } from '@src/entities/components/nux-popover';
import {
  Component,
  ComponentInterface,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  Element,
  State,
  Watch,
} from '@stencil/core';
import classNames from 'classnames';
import { registerPluginManager } from '@src/utils/plugin';
import { sendActionTracking, sendDurationTracking, sendExposeTracking } from '@src/utils/tracking';
import { Slot, Slots } from '@src/utils/decorators';

const prefix = 'ks-nux-popover';
const DEFAULT_PLACEMENT = 'top';

/**
 * @slot content - content of the popover
 */
@Component({
  tag: 'ks-nux-popover',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsNuxPopover implements ComponentInterface {
  ['ks-name'] = 'ks-nux-popover';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsNuxPopoverElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  bodyRef: HTMLBodyElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  tooltipRef: HTMLKsTooltipElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  tooltipBodyRef;
  /**
   * @locale {en} The data object containing the content to be displayed within the NUX popover (e.g., title, text, image, buttons).
   * @locale {zh} 数据对象，包含要在 NUX 浮层中显示的内容（例如：标题、文本、图片、按钮）。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() dataSource: NuxPopoverData;
  /**
   * @locale {en} Specifies the layout direction of the content (e.g., image and text) within the NUX popover.
   * @locale {zh} 指定 NUX 浮层内部内容（例如图片和文本）的布局方向。
   */
  @Prop() direction: 'vertical' | 'horizontal' = 'vertical';
  /**
   * @locale {en} Delay before the bubble card is shown when triggered, in milliseconds.
   * @locale {zh} 触发后显示气泡卡片的延迟时间，以毫秒为单位。
   */
  @Prop() enterDelay = 0;
  /**
   * @locale {en} Delay before the bubble card is hidden when triggered, in milliseconds.
   * @locale {zh} 触发后隐藏气泡卡片的延迟时间，以毫秒为单位。
   */
  @Prop() leaveDelay = 0;
  /**
   * @locale {en} The placement of the bubble card relative to the target element. Can be one of the following values:
   * `top`, `right`, `bottom`, `left`, `top-start`, `top-end`,
   * `right-start`, `right-end`, `bottom-start`, `bottom-end`,
   * `left-start` or `left-end`.
   * @locale {zh} 气泡卡片相对于目标元素的位置。可选值包括
   * `top`、`right`、`bottom`、`left`、`top-start`、`top-end`、
   * `right-start`、`right-end`、`bottom-start`、`bottom-end`、
   * `left-start` 或 `left-end`。
   */
  @Prop() placement: Placement = DEFAULT_PLACEMENT;
  /**
   * @locale {en} Indicates whether the bubble card should automatically shift position based on available space.
   * @locale {zh} 指示气泡卡片是否应根据可用空间自动调整位置。
   */
  @Prop() autoShift = true;
  /**
   * @locale {en} The positioning strategy for the bubble card. Can be either `"absolute"` or `"fixed"`.
   * @locale {zh} 气泡卡片的定位策略。可以是 `"absolute"` 或 `"fixed"`。
   */
  @Prop() strategy: Strategy = 'fixed';
  /**
   * @locale {en} The offset between the bubble card and the target element.
   * @locale {zh} 气泡卡片与目标元素之间的偏移量。
   */
  @Prop() gapOffset = 0;
  /**
   * @locale {en} The offset for positioning the bubble card at the start.
   * @locale {zh} 在起始位置上定位气泡卡片的偏移量。
   */
  @Prop() startOffset = 0;
  /**
   * @locale {en} Control the display of bubble cards
   * @locale {zh} 控制气泡卡片的显示
   */
  @Prop() visible = false;
  /**
   * @locale {en} The anchor element to which the bubble card is attached.
   * @locale {zh} 气泡卡片附加的锚点元素。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() anchorEl: HTMLElement | (() => HTMLElement); // TODO 支持内外键用法切换的场景
  /**
   * @deprecated Only for compatibility with non-Keystone overlay components.
   * @locale {en} Disable the [top layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer) API with `position: fixed`.
   * @locale {zh} 禁用 [top layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer) API 并用 `position: fixed` 替代。
   */
  @Prop() deprecatedDisableTopLayer = false;
  /**
   * @deprecated Only for compatibility with non-Keystone overlay components.
   * @locale {en} Override the zIndex setting, effective only with `deprecatedDisableTopLayer = true`.
   * @locale {zh} 覆盖 zIndex 设置, 仅当 `deprecatedDisableTopLayer = true` 时生效。
   */
  @Prop() deprecatedZIndexOverride = 1;
  /**
   * @locale {en} Whether to prevent interaction with elements behind the popover when it is visible.
   * @locale {zh} 当浮层可见时，是否阻止与背后元素的交互。
   */
  @Prop() preventInteraction = false;
  /**
   * @private 外部慎用
   * @locale {en} Whether to append the popover to the body.
   * @locale {zh} 是否将浮层附加到 body 上。
   */
  @Prop() appendToBody = false;
  /**
   * @locale {en} Whether the tooltip is visible when the reference element is hidden.
   * @locale {zh} 当参考元素隐藏时，气泡卡片是否可见。
   */
  @Prop() hideOnAnchorExit = false;
  /**
   * @locale {en} Triggered when a button in a bubble card is clicked, key: the key of the current popover; text: the text of the button currently clicked; buttonKey: the key of the button currently clicked (if any)
   * @locale {zh} 气泡卡片内按钮点击时触发,key: 当前popover的key; text: 当前点击的按钮的文案; buttonKey: 当前点击的按钮的key（如果有的话）
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksButtonClick: EventEmitter<{
    key: number | string;
    text: string;
    buttonKey?: string | number;
  }>;

  /**
   * @locale {en} Custom event that triggers when the visibility of the bubble card changes.
   * @locale {zh} 自定义事件，当气泡卡片的可见性发生变化时触发。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksVisibleChange: EventEmitter<boolean>;

  @State() innerVisible = false;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: '_default' }) defaultSlots: Slots<HTMLSlotElement>;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'content' }) contentSlots: Slots<HTMLSlotElement>;

  private isMoved = false;

  @Watch('visible')
  onVisibleChange(newValue: boolean) {
    this.innerVisible = newValue;
  }

  @Watch('innerVisible')
  onInnerVisibleChange(newValue: boolean) {
    if (!this.preventInteraction) {
      return;
    }
    if (newValue) {
      this.bodyRef.classList.add('unscrollable');
    } else {
      this.bodyRef.classList.remove('unscrollable');
    }
  }
  componentWillLoad() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.bodyRef = document.querySelector('body');
  }

  appendToDocumentBody() {
    if (this.appendToBody && !this.isMoved) {
      const slot = this.contentSlots?.[0];
      slot && this.tooltipRef.querySelector('slot[name="content"]')?.replaceChildren(slot);
      document.body.appendChild(this.tooltipRef);
      this.isMoved = true;
    }
  }

  componentDidLoad() {
    this.innerVisible = this.visible;
    this.appendToDocumentBody();
    if (this.innerVisible && this.preventInteraction) {
      this.bodyRef.classList.add('unscrollable');
    }
  }

  componentDidUpdate(): void {
    this.appendToDocumentBody();
  }

  disconnectedCallback(): void {
    if (this.preventInteraction) {
      this.bodyRef.classList.remove('unscrollable');
    }

    if (this.appendToBody && this.isMoved) {
      if (this.tooltipRef.parentElement === document.body) {
        document.body.removeChild(this.tooltipRef);
        this.isMoved = false;
      }
    }
  }

  constructor() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  render() {
    const classes = classNames(`${prefix}`, `${prefix}__${this.direction}`);
    return (
      <Host ks-nux-popover>
        <ks-tooltip
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          ref={(el) => (this.tooltipRef = el)}
          deprecatedDisableTopLayer={this.deprecatedDisableTopLayer}
          deprecatedZIndexOverride={this.deprecatedZIndexOverride}
          anchorEl={this.anchorEl || this.defaultSlots?.[0]}
          startOffset={this.startOffset}
          gapOffset={this.gapOffset}
          strategy={this.strategy}
          placement={this.placement}
          autoShift={this.autoShift}
          enterDelay={this.enterDelay}
          leaveDelay={this.leaveDelay}
          hideOnAnchorExit={this.hideOnAnchorExit}
          color="var(--ks-color-support-fillLow)"
          visible={this.visible}
          onKsVisibleChange={({ detail }) => {
            if (detail) {
              sendExposeTracking(this.el, { eventType: 'popup' });
              sendDurationTracking(this.el, { eventType: 'popup', reset: true });
            } else {
              sendDurationTracking(this.el, { eventType: 'popup' });
            }
            this.ksVisibleChange.emit(detail);
            if (this.visible === undefined) {
              this.innerVisible = detail;
            }
          }}
          data-testid="ks-nux-popover-index-mK9k4r"
        >
          <div ref={(el) => (this.tooltipBodyRef = el)} class={classes} slot="body">
            {this.dataSource.image && (
              <div class={`${prefix}__img`}>
                <img src={this.dataSource.image} alt="" />
              </div>
            )}

            <div class={`${prefix}__body`}>
              {this.dataSource.title && (
                <div class={`${prefix}__body--title`}>
                  <ks-text variant="labelLg" color="var(--ks-color-neutral-highOnSurface)">
                    {this.dataSource.title}
                  </ks-text>
                </div>
              )}
              <slot name="content">
                {this.dataSource.content && (
                  <div class={`${prefix}__body--content`}>
                    <ks-text variant="labelSm" color="var(--ks-color-neutral-highOnSurface)">
                      {this.dataSource.content}
                    </ks-text>
                  </div>
                )}
              </slot>

              {(this.dataSource.buttons?.length > 0 || (this.dataSource.total && this.dataSource.current)) && (
                <div class={`${prefix}__body--footer`}>
                  {this.dataSource.total && this.dataSource.current && (
                    <div class="page">
                      <ks-text variant="labelSm" color="var(--ks-color-neutral-highOnSurface)">
                        {`${this.dataSource.current} / ${this.dataSource.total}`}
                      </ks-text>
                    </div>
                  )}

                  <div class="buttons">
                    {this.dataSource.buttons?.map((button) => (
                      <div
                        onClick={() => {
                          if (button.loading) {
                            return;
                          }
                          const params = {
                            key: this.dataSource.key,
                            text: button.text,
                            buttonKey: button.key,
                          };
                          this.ksButtonClick.emit(params);
                          sendActionTracking(this.el, {
                            eventType: 'click',
                            subEventType: 'button',
                            componentParams: params,
                          });
                        }}
                        class={`button-${button.variant} button`}
                        key={button.key}
                        data-testid="ks-nux-popover-index-aunGbQ"
                      >
                        {button.loading ? <ks-icon-loading class={`${prefix}__loading-icon`} size={14} /> : button.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {!this.appendToBody && <slot></slot>}
        </ks-tooltip>
        {this.appendToBody && <slot></slot>}
        {this.preventInteraction && this.innerVisible && <div class={`${prefix}__overlay`} />}
      </Host>
    );
  }
}
