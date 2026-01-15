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
} from '@stencil/core';
import { Slot, Slots } from '@src/utils/decorators';
import anime from 'animejs';
import { dir } from '@src/utils/utils';
import { registerPluginManager } from '@src/utils/plugin';
import { sendActionTracking, sendExposeTracking } from '@src/utils/tracking';
import { ArrowPaginationValue, Info } from '../../../entities';

/**
 * @slot title - Slot for a custom title for the current alert. If provided, it overrides the title from the `infos` prop for the currently displayed item.
 * @slot link - Slot for custom link content for the current alert. If provided, it overrides the link data from the `infos` prop for the currently displayed item.
 * @slot content - Slot for custom main content for the current alert. If provided, it overrides the content from the `infos` prop for the currently displayed item.
 */
@Component({
  tag: 'ks-multiple-global-alert',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsMultipleGlobalAlert implements ComponentInterface {
  ['ks-name'] = 'ks-multiple-global-alert';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsMultipleGlobalAlertElement;
  /**
   * @locale {en} An array of information objects to display. Each object in the array represents an individual global alert and can contain properties like `variant`, `title`, `content`, and `link`.
   * @locale {zh} 用于显示的信息对象数组。数组中的每个对象代表一个独立的警示横幅，可以包含如 `variant`、`title`、`content` 和 `link` 等属性。
   */
  @Prop() infos: Info[] = [];
  /**
   * @locale {en} Indicates whether the info message is currently visible. When `true`, the info message is displayed.
   * @locale {zh} 指示提示信息当前是否可见。当值为 `true` 时，提示信息显示。
   */
  @Prop() show = true;
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
   * @locale {en} Custom event triggered when an info message is closed by the user. Emits the index of the closed message from the `infos` array.
   * @locale {zh} 当用户关闭某条提示信息时触发的自定义事件。发出被关闭消息在 `infos` 数组中的索引。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksClose: EventEmitter<number>;
  /**
   * @locale {en} Custom event triggered when a link within an info message is clicked. Emits the index of the message (from the `infos` array) whose link was clicked.
   * @locale {zh} 当提示信息中的链接被点击时触发的自定义事件。发出其链接被点击的消息在 `infos` 数组中的索引。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksLinkClick: EventEmitter<number>;
  /**
   * @locale {en} Custom event triggered after an info message has completed its closing animation. Emits the index of the closed message from the `infos` array when triggered by user interaction via the inner global alert. Note: May emit without an index if triggered directly by programmatic changes to the `show` prop if `disableAnimation` is false.
   * @locale {zh} 当提示信息完成关闭动画后触发的自定义事件。当通过内部警示横幅的用户交互触发时，发出已关闭消息在 `infos` 数组中的索引。注意：如果通过编程方式更改 `show` 属性直接触发（且 `disableAnimation` 为 false），则可能不带索引发出。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksAfterClose: EventEmitter<number>;
  /**
   * @locale {en} Slot for a custom title. If content is provided to this slot, it will be used as the title for the currently displayed alert, overriding any title specified in the corresponding `infos` array item.
   * @locale {zh} 用于自定义标题的插槽。如果向此插槽提供内容，它将用作当前显示警示的标题，并覆盖 `infos` 数组对应项中指定的任何标题。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'title' }) titleSlot: Slots;
  /**
   * @locale {en} Slot for custom link content. If content is provided to this slot, it will be used for the link area of the currently displayed alert, overriding any link data specified in the corresponding `infos` array item.
   * @locale {zh} 用于自定义链接内容的插槽。如果向此插槽提供内容，它将用于当前显示警示的链接区域，并覆盖 `infos` 数组对应项中指定的任何链接数据。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'link' }) linkSlot: Slots;
  /**
   * 控制动画显隐
   */
  @State() visible: boolean = this.show;

  @State() currentIndex = 0;

  @Watch('show')
  handleWatch(val: boolean) {
    if (this.disableAnimation) {
      this.visible = val;
      return;
    }
    anime({
      targets: this.el,
      height: val ? 'auto' : 0,
      opacity: val ? 1 : 0,
      duration: 200,
      easing: 'cubicBezier(0.4, 0, 0.2, 1)',
      complete: () => {
        this.visible = val;

        if (!val) {
          this.ksAfterClose.emit();
        } else {
          sendExposeTracking(this.el, { eventType: 'visible' });
        }
      },
    });
  }

  constructor() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  componentWillLoad() {
    this.visible = this.show;
  }

  handleChange({ detail }: CustomEvent<ArrowPaginationValue>) {
    if (detail === 'left') {
      this.currentIndex = this.currentIndex - 1;
    } else {
      this.currentIndex = this.currentIndex + 1;
    }
    sendActionTracking(this.el, { eventType: 'change', componentParams: { info: this.infos[this.currentIndex] } });
  }

  render() {
    const info = this.infos[this.currentIndex];
    return (
      <Host dir={dir()} ks-multiple-global-alert role="alert">
        <ks-global-alert
          onKsLinkClick={() => {
            this.ksLinkClick.emit(this.currentIndex);
            sendActionTracking(this.el, {
              eventType: 'click',
              subEventType: 'link',
              componentParams: { link: this.linkSlot.map((item) => item.textContent).join('\n') },
            });
          }}
          onKsClose={() => {
            this.ksClose.emit(this.currentIndex);
            sendActionTracking(this.el, { eventType: 'close' });
          }}
          onKsAfterClose={() => this.ksAfterClose.emit(this.currentIndex)}
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          variant={info.variant || 'info'}
          showIcon={this.showIcon}
          hasClose={this.hasClose}
          data-testid="ks-multiple-global-alert-index-badDeg"
        >
          <ks-arrow-pagination
            slot="pagination"
            style={{
              position: 'relative',
              bottom: '0',
              left: '0',
              marginTop: '0',
            }}
            infinite={false}
            count={this.infos.length}
            currentIndex={this.currentIndex + 1}
            onKsChange={this.handleChange.bind(this)}
            data-testid="ks-multiple-global-alert-index-uDtKi9"
          ></ks-arrow-pagination>
          {/* </div> */}
          {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
          {(this.titleSlot || info.title) && (
            <slot name="title" slot="title">
              {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
              {info.title}
            </slot>
          )}

          {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
          {(this.linkSlot || info.link) && (
            <slot name="link" slot="link">
              {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
              <ks-link class={'link'} variant={info.variant} href={info.link.href} target={info.link.target}>
                {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
                {info.link.content}
              </ks-link>
            </slot>
          )}

          <slot name="content" slot="content">
            {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
            {info.content}
          </slot>
        </ks-global-alert>
      </Host>
    );
  }
}
