import {
  Component,
  h,
  Prop,
  EventEmitter,
  Event,
  Watch,
  State,
  ComponentInterface,
  Host,
  Element,
  Fragment,
} from '@stencil/core';
import { ks } from '@fe-infra/keystone-design-tokens';
import { Slot, Slots } from '@src/utils/decorators';
import anime from 'animejs';
import { dir } from '@src/utils/utils';
import { InfoVariant, InfoOrientation, GuidanceContent } from '../../entities';
import { InternalRenderDynamicSlots } from '@src/utils/guidance/utils';
import { registerPluginManager } from '@src/utils/plugin';
import { sendActionTracking } from '@src/utils/tracking';
import { SvgFilledTips } from './SvgFilledTips';

const prefix = 'guidance';

const ICON_MAP = (type: 'primary' | 'success' | 'neutral' | 'warning' | 'error') => {
  switch (type) {
    case 'primary':
      return <ks-icon-filled-info innerColor={ks.color.primary.onFillLow} />;
    case 'success':
      return <ks-icon-filled-check innerColor={ks.color.success.onFillLow} />;
    case 'neutral':
      return <ks-icon-filled-info innerColor={ks.color.neutral.onFillLow} />;
    case 'warning':
      return <ks-icon-filled-warning innerColor={ks.color.warning.onFillLow} />;
    case 'error':
      return <ks-icon-filled-caution innerColor={ks.color.error.onFillLow} />;
    default:
      return null;
  }
};

/**
 * @slot icon - Allows customization of the icon displayed in the guidance.
 * @slot closebtn - Allows customization of the close button.
 * @slot title - Allows customization of the title area of the guidance.
 * @slot link - Allows customization of the link area, e.g., for "View more/less" functionality or other action links.
 * @slot secondaryLink - Allows customization of the secondary link area, e.g., for "View more/less" functionality or other action links.
 */
@Component({
  tag: 'ks-guidance',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsGuidance implements ComponentInterface {
  ['ks-name'] = 'ks-guidance';
  // eslint-disable-next-line no-undef
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsGuidanceElement;
  /**
   * @locale {en} The variant of the info message. Possible values include `"info-high"`, `"warning"`, `"error"`, `"success"` and `"info-low"`.
   * @locale {zh} 提示信息的变体。可选值包括 `"info-high"`、`"warning"`、`"error"`、`"success"` 和 `"info-low"`。
   */
  @Prop() variant: InfoVariant = 'info-low';
  /**
   * @locale {en} The orientation of the info message. Possible values are `horizontal` or `vertical`. If `guidanceContent` is provided and has items, the orientation will be forced to `vertical`. Default: `vertical`.
   * @locale {zh} 提示信息的方向。可选值为 `horizontal` 或 `vertical`。如果提供了 `guidanceContent` 且包含项目，则方向将强制为 `vertical`。默认：`vertical`。
   */
  @Prop() orientation: InfoOrientation = 'vertical';
  /**
   * @locale {en} Indicates whether the info message is currently visible. If `undefined`, defaults to `true`. When `true`, the info message is displayed.
   * @locale {zh} 指示提示信息当前是否可见。如果为 `undefined`，则默认为 `true`。当值为 `true` 时，提示信息显示。
   */
  @Prop() show?: boolean;
  /**
   * @locale {en} Indicates whether to show an icon in the info message. When `true`, an icon is displayed.
   * @locale {zh} 指示是否在提示信息中显示图标。当值为 `true` 时，显示图标。
   */
  @Prop() showIcon = true;
  /**
   * @locale {en} Indicates whether the info message has a close button. When `true`, a close button is displayed.
   * @locale {zh} 指示提示信息是否具有关闭按钮。当值为 `true` 时，显示关闭按钮。
   */
  @Prop() hasClose = true;
  /**
   * @locale {en} Indicates whether to disable animations for the info message. When `true`, animations are disabled.
   * @locale {zh} 指示是否禁用提示信息的动画效果。当值为 `true` 时，禁用动画。
   */
  @Prop() disableAnimation = false;
  /**
   * @locale {en} An array of guidance content objects. Each object represents a piece of guidance information,
   * which can include an ID, link, and other relevant data. This is used to render multiple guidance items.
   * @locale {zh} 引导内容对象数组。每个对象代表一条引导信息，可包含 ID、链接和其他相关数据，用于渲染多个引导项。
   */
  @Prop() guidanceContent: GuidanceContent[] = [];
  /**
   * @locale {en} Indicates whether to show the "View more/less" functionality.
   * When `true`, a "View more/less" link will be displayed if there is collapsible content.
   * @locale {zh} 指示是否显示“查看更多/更少”功能。当值为 `true` 时，如果存在可折叠内容，将显示“查看更多/更少”链接。
   */
  @Prop() showExpandCollapse = false;
  /**
   * @locale {en} Indicates whether the guidance content is collapsed.
   * When `true`, the collapsible part of the guidance content will be hidden.
   * @locale {zh} 指示引导内容是否处于折叠状态。当值为 `true` 时，引导内容的可折叠部分将被隐藏。
   */
  @Prop() collapsed = false;

  @Prop() compact = false;

  /**
   * @locale {en} Custom event triggered when the info message is closed.
   * @locale {zh} 当提示信息被关闭时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksClose: EventEmitter<void>;
  /**
   * @locale {en} Custom event triggered when the info message is clicked.
   * @locale {zh} 当提示信息被点击时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksLinkClick: EventEmitter<undefined | number | string>;
  /**
   * @locale {en} Custom event triggered when the secondary link of the info message is clicked.
   * @locale {zh} 当提示信息的第二个次要链接被点击时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksSecondaryLinkClick: EventEmitter<undefined | number | string>;
  /**
   * @locale {en} Custom event triggered after the info message has closed.
   * @locale {zh} 当提示信息关闭后触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksAfterClose: EventEmitter<void>;
  /**
   * @locale {en} Custom event triggered after the info message has closed.
   * @locale {zh} 当提示信息关闭后触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksExpandCollapse: EventEmitter<boolean>;
  /**
   * @locale {en} The title of the guidance, which is displayed prominently at the top.
   * @locale {zh} guidance 的标题，显示在顶部。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'title' }) titleSlot: Slots;
  /**
   * @locale {en} The link area of the guidance, which is displayed prominently at the end.
   * @locale {zh} guidance 的link区域，显示在末尾。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'link' }) linkSlot: Slots;
  /**
   * @locale {en} The secondary link area of the guidance, which is displayed prominently at the end.
   * @locale {zh} guidance 的 第二个次要 link，显示在末尾。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'secondaryLink' }) secondaryLinkSlot: Slots;
  /**
   * 控制动画显隐
   */
  @State() visible: boolean = this.show ?? true;

  @State() __collapsed = false;

  @Watch('show')
  handleWatch(val: boolean) {
    if (this.disableAnimation) {
      this.visible = val;
      return;
    }
    anime({
      targets: this.el,
      height: val ? '' : 0,
      opacity: val ? 1 : 0,
      duration: 200,
      easing: 'cubicBezier(0.4, 0, 0.2, 1)',
      complete: () => {
        if (val) {
          // Reset height to empty string to ensure proper animation on subsequent transitions.
          this.el.style.height = '';
        }

        this.visible = val;

        if (!val) {
          this.ksAfterClose.emit();
        }
      },
    });
  }

  @Watch('collapsed')
  handleCollapse() {
    this.__collapsed = this.collapsed;
  }

  constructor() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  close = () => {
    if (typeof this.visible !== 'boolean') {
      this.visible = false;
    }
    this.ksClose?.emit();
    sendActionTracking(this.el, { eventType: 'close' });
  };

  handleExpandCollapse() {
    this.__collapsed = !this.__collapsed;
    this.ksExpandCollapse.emit(this.__collapsed);
  }

  static __internal_renderDynamicSlots(
    props: Partial<KsGuidance>,
    wrapWithSlot: (slotName: string, children: unknown) => unknown,
  ) {
    return InternalRenderDynamicSlots(props, wrapWithSlot);
  }

  componentWillLoad(): void {
    this.visible = this.show ?? true;
    if (this.guidanceContent) this.__collapsed = this.collapsed;
  }

  render() {
    const variant = this.variant === 'info-high' ? 'primary' : this.variant === 'info-low' ? 'neutral' : this.variant;
    const orientation = this.guidanceContent.length > 0 ? 'vertical' : this.orientation;
    const cls = {
      [prefix]: true,
      [`${prefix}--${orientation}`]: true,
      [`${prefix}--${variant}`]: true,
      [`${prefix}--compact`]: this.compact,
    };
    const content =
      this.guidanceContent.length > 0 && orientation === 'vertical' ? (
        <div class={{ ['content']: true, ['content-close']: this.__collapsed }}>
          <div class={{ ['content-container']: true, ['content-container-close-multiple']: this.__collapsed }}>
            {this.guidanceContent.map((info, index) => (
              <Fragment>
                <div
                  class={`${prefix}__body-content ${this.titleSlot && index === 0 ? '' : `${prefix}__body-content-no_title`}`}
                  part="content"
                >
                  <slot name={`slot-content-${info.id}`}></slot>
                </div>
                {info.link && (
                  <div class={`${prefix}__body-link`} part="link">
                    {/* FIXME: remove info variant after confirming with designer */}
                    <ks-link
                      variant={variant}
                      onClick={() => {
                        this.ksLinkClick?.emit(info.id);
                        sendActionTracking(this.el, {
                          eventType: 'click',
                          subEventType: 'info',
                          componentParams: { id: info.id },
                        });
                      }}
                      data-testid="ks-guidance-index-w1UGyK"
                    >
                      <slot name={`slot-link-${info.id}`}></slot>
                    </ks-link>
                  </div>
                )}
                {(index !== this.guidanceContent.length - 1 || this.showExpandCollapse) && (
                  <ks-divider variant={variant} />
                )}
              </Fragment>
            ))}
          </div>
          {this.showExpandCollapse && (
            <div class={`${prefix}__link`} part="link">
              <ks-link
                onClick={() => {
                  this.handleExpandCollapse();
                  sendActionTracking(this.el, {
                    eventType: 'click',
                    componentParams: { text: this.linkSlot.map((item) => item.textContent).join('\n') },
                  });
                }}
                variant={variant}
                data-testid="ks-guidance-index-4FuCAx"
              >
                <slot name="link">
                  <span class={{ [`${prefix}__link-view`]: true, [`${prefix}__link-view-rotate`]: !this.__collapsed }}>
                    View {this.__collapsed ? 'more' : 'less'}
                    <ks-icon-chevron-down class={'chevron'} size={14}></ks-icon-chevron-down>
                  </span>
                </slot>
              </ks-link>
            </div>
          )}
        </div>
      ) : (
        <Fragment>
          <div
            class={{
              ['content-container-close']: this.__collapsed,
              [`${prefix}__body-content`]: true,
              [`${prefix}__body-content-no_title`]: !this.titleSlot,
            }}
            part="content"
          >
            <slot></slot>
          </div>
          {(!this.showExpandCollapse || this.orientation === 'horizontal') &&
            (!!this.linkSlot || !!this.secondaryLinkSlot) && (
              <div class={`${prefix}__links-container`}>
                {this.linkSlot && (
                  <div class={`${prefix}__body-link`} part="link">
                    {/* FIXME: remove info variant after confirming with designer */}
                    <ks-link
                      variant={variant}
                      onClick={() => {
                        this.ksLinkClick?.emit();
                        sendActionTracking(this.el, {
                          eventType: 'click',
                          componentParams: { text: this.linkSlot.map((item) => item.textContent).join('\n') },
                        });
                      }}
                      data-testid="ks-guidance-index-gFEcgu"
                    >
                      <slot name="link"></slot>
                    </ks-link>
                  </div>
                )}

                {this.linkSlot && this.secondaryLinkSlot && <div class={`${prefix}__links-divider`} />}

                {this.secondaryLinkSlot && (
                  <div class={`${prefix}__body-link`} part="link">
                    {/* FIXME: remove info variant after confirming with designer */}
                    <ks-link
                      variant={variant}
                      onClick={() => {
                        this.ksSecondaryLinkClick?.emit();
                        sendActionTracking(this.el, {
                          eventType: 'click',
                          componentParams: { text: this.secondaryLinkSlot.map((item) => item.textContent).join('\n') },
                        });
                      }}
                      data-testid="ks-guidance-index-d78HDX"
                    >
                      <slot name="secondaryLink"></slot>
                    </ks-link>
                  </div>
                )}
              </div>
            )}

          {this.showExpandCollapse && this.orientation === 'vertical' && (
            <div class={`${prefix}__link`} part="link">
              <ks-link
                onClick={() => {
                  this.handleExpandCollapse();
                  sendActionTracking(this.el, {
                    eventType: 'click',
                    componentParams: { text: this.linkSlot.map((item) => item.textContent).join('\n') },
                  });
                }}
                variant={variant}
                data-testid="ks-guidance-index-mQ4tVh"
              >
                <slot name="link">
                  <span class={{ [`${prefix}__link-view`]: true, [`${prefix}__link-view-rotate`]: !this.__collapsed }}>
                    View {this.__collapsed ? 'more' : 'less'}
                    <ks-icon-chevron-down class={'chevron'} size={14}></ks-icon-chevron-down>
                  </span>
                </slot>
              </ks-link>
            </div>
          )}
        </Fragment>
      );

    return (
      <Host dir={dir()} ks-guidance role="guidance">
        {this.visible ? (
          <div dir={dir()} class={cls} part="self">
            {this.showIcon && (
              <div class={`${prefix}__icon ${this.titleSlot ? `${prefix}__icon-title` : `${prefix}__icon-no_title`}`}>
                <slot name="icon">{variant === 'support' ? <SvgFilledTips /> : ICON_MAP(variant)}</slot>
              </div>
            )}

            <div class={`${prefix}__body`} part="body">
              {this.titleSlot && (
                <div class={`${prefix}__body-title`} part="title">
                  <slot name="title"></slot>
                </div>
              )}

              {content}
            </div>
            {this.hasClose && (
              <div class={`${prefix}__close`} onClick={this.close} data-testid="ks-guidance-index-iQPhqh">
                <slot name="closebtn">
                  <ks-button variant="text" shape="square" size="xs">
                    <ks-icon-close size="14" />
                  </ks-button>
                </slot>
              </div>
            )}
          </div>
        ) : null}
      </Host>
    );
  }
}
