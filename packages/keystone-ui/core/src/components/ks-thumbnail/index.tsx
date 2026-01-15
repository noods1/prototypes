import {
  Component,
  ComponentInterface,
  Element,
  Host,
  Prop,
  Event,
  h,
  EventEmitter,
  Watch,
  State,
} from '@stencil/core';
import type {
  ThumbnailSize,
  ThumbnailAction,
  DropdownSingleItem,
  DropdownMenuItem,
  DropdownListMenu,
} from '../../entities';
import { Slot, Slots } from '@src/utils/decorators';
import classnames from 'classnames';
import { registerPluginManager } from '@src/utils/plugin';

const prefix = 'thumbnail';

/**
 * @slot icon - The slot for displaying a custom icon within the thumbnail. Rendered only if the `block` prop is false and the slot is provided.
 */
@Component({
  tag: 'ks-thumbnail',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsThumbnail implements ComponentInterface {
  ['ks-name'] = 'ks-thumbnail';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsThumbnailElement;

  /**
   * @locale {en} Thumbnail size. Can be 'xs', 'sm', 'md', 'lg', 'xl'.
   * @locale {zh} Thumbnail的尺寸，可以为：xs、sm、md、lg、xl。
   */
  @Prop() size: ThumbnailSize = 'md';
  /**
   * @locale {en} The aspect ratio of the component. Can be '1:1', '2:3', '3:2'.
   * @locale {zh} 组件的长宽比。可以为 '1:1', '2:3', '3:2'。
   */
  @Prop() ratio: '1:1' | '2:3' | '3:2' = '1:1';
  /**
   * @locale {en} The image URL. If provided, it will be used as the background of the thumbnail. The content of the `icon` slot will be displayed on top of this background if provided and the `block` prop is false.
   * @locale {zh} 图片链接。如果提供，它将用作缩略图的背景。如果提供并且 `block` 属性为 false，则 `icon` slot 的内容将显示在此背景之上。
   */
  @Prop() image: string | string[] = '';
  /**
   * @locale {en} A list of actions (tools) to display. If more than one action is provided, a 'more' icon will be shown to access them via a dropdown. Not rendered if `block` prop is true.
   * @locale {zh} 可选工具列表。如果提供多个操作，将显示一个“更多”图标，通过下拉菜单访问它们。如果 `block` 属性为 true，则不呈现。
   */
  @Prop() actions: ThumbnailAction[] = [];
  /**
   * @locale {en} Whether to display a play button icon. If true, and the component is not `block` or `disabled`, clicking the play icon emits the `ksPlay` event.
   * @locale {zh} 是否展示播放按钮图标。如果为 true，并且组件未处于 `block` 或 `disabled` 状态，则点击播放图标会发出 `ksPlay` 事件。
   */
  @Prop() playable = false;
  /**
   * @locale {en} Whether to display a pause button icon. If true, and the component is not `block` or `disabled`, clicking the play icon emits the `ksPause` event.
   * @locale {zh} 是否展示暂停按钮图标。如果为 true，并且组件未处于 `block` 或 `disabled` 状态，则点击暂停图标会发出 `ksPause` 事件。
   */
  @Prop() playing = false;
  /**
   * @locale {en} If true, the component is visually styled as disabled, and the play button (if `playable` is true) will not be shown.
   * @locale {zh} 如果为 true，组件在视觉上将显示为禁用状态，并且如果 `playable` 为 true，则不会显示播放按钮。
   */
  @Prop() disabled = false;
  /**
   * @locale {en} Specifies how the background image (if provided via `image` prop) should be resized to fit its container. Can be 'cover' or 'contain'.
   * @locale {zh} 指定背景图片（如果通过 `image` prop 提供）应如何调整大小以适应其容器。可以为 'cover' 或 'contain'。
   */
  @Prop() mode: 'cover' | 'contain' = 'cover';
  /**
   * @locale {en} If true, the component displays a blocked state overlay. The `icon` slot, `playable` icon, and `actions` will not be rendered.
   * @locale {zh} 如果为 true，组件将显示阻塞状态覆盖层。`icon` slot、`playable` 图标和 `actions` 将不会呈现。
   */
  @Prop() block = false;
  /**
   * @locale {en} The reason for the component being in a blocked state. Displayed as a tooltip only when `block` is true.
   * @locale {zh} 组件处于阻塞状态的原因。仅当 `block` 为 true 时，作为工具提示显示。
   */
  @Prop() blockReason = '';

  /**
   * @locale {en} Indicates if the thumbnail represents multiple items, rendering a visual stacking effect. This effect is only applied when `size` is 'md', 'lg' or 'xl'.
   * @locale {zh} 指示缩略图是否代表多个项目，呈现视觉堆叠效果。此效果仅在 `size` 为 'md', 'lg' 或 'xl' 时应用。
   */
  @Prop() isMultiple = false;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() actionSource: DropdownListMenu;

  /**
   * @locale {en} Slot for a custom icon. Rendered only if `block` is false and content is provided to this slot.
   * @locale {zh} 用于自定义图标的插槽。仅当 `block` 为 false 且为此插槽提供了内容时才会呈现。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'icon' }) iconSlot: Slots;

  /**
   * @locale {en} Emitted when the play icon is clicked. The play icon is only visible if `playable` is true, and `block` and `disabled` are false.
   * @locale {zh} 当点击播放图标时发出。播放图标仅在 `playable` 为 true，且 `block` 和 `disabled` 为 false 时可见。
   */
  @Event({ bubbles: false, composed: false }) ksPlay!: EventEmitter<void>;
  /** Emitted when the pause icon is clicked. The pause icon is only visible if `playable` and `playing` is true, and `block` and `disabled` are false. */
  @Event({ bubbles: false, composed: false }) ksPause!: EventEmitter<void>;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksAction: EventEmitter<string | number>;

  @State() innerImages: string | string[] = '';

  @Watch('disabled')
  disabledWatcher() {
    this.setIcon();
  }

  @Watch('size')
  handleSizeChange() {
    this.setIcon();
  }

  constructor() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  private observer: MutationObserver;

  private getPlaySize() {
    switch (this.size) {
      case 'xs':
      case 'sm':
        return 16;
      case 'xl':
        return 32;
      default:
        return 24;
    }
  }

  private setIcon() {
    let size = 24;
    switch (this.size) {
      case 'xs':
        size = 14;
        break;
      case 'sm':
        size = 16;
        break;
      case 'md':
        size = 24;
        break;
      case 'lg':
        size = 32;
        break;
      case 'xl':
        size = 48;
        break;
      default:
        size = 24;
        break;
    }

    if (this.iconSlot) {
      this.iconSlot[0]?.setAttribute('size', `${size}px`);
    }
  }

  private reduceActions() {
    return this.actions.map<DropdownSingleItem>((item) => ({
      type: 'single',
      id: item.id,
      renderContent: item.render,
    }));
  }

  static __internal_renderDynamicSlots(
    props: Partial<KsThumbnail>,
    wrapWithSlot: (slotName: string, children: unknown) => unknown,
  ) {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const renderedNodes = [];
    props.actions?.forEach?.((item) => {
      const slotName = `slot-content-${item.id}`;
      renderedNodes.push(wrapWithSlot(slotName, item.render()));
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    return renderedNodes;
  }

  renderSlot() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const renderedNodes = [];
    const createSlot = (type: string, itemId: string | number) => {
      const slotName = `slot-${type}-${itemId}`;
      return (
        <span
          onClick={() => {
            this.ksAction.emit(itemId);
          }}
          key={slotName}
          slot={slotName}
          style={{ cursor: 'pointer' }}
          data-testid={`ks-thumbnail-index-vAd5zt-${slotName}`}
        >
          <slot key={slotName} name={slotName} data-testid={`ks-thumbnail-index-frLJ51-${slotName}`} />
        </span>
      );
    };
    const pushRenderedNode = (item: DropdownMenuItem) => {
      const slotConfigs = { renderFn: item.renderContent, type: 'content' };

      if (typeof slotConfigs.renderFn === 'function') {
        renderedNodes.push(createSlot(slotConfigs.type, item.id));
      }
    };

    if (this.actionSource?.type === 'list') {
      const items = this.actionSource?.items;
      items.forEach((item) => {
        pushRenderedNode(item as DropdownSingleItem);
      });
    }
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    return renderedNodes;
  }

  getBlockSize() {
    switch (this.size) {
      case 'xs':
        return 14;
      case 'sm':
      case 'md':
        return 16;
      case 'lg':
        return 24;
      case 'xl':
        return 32;
      default:
        return 16;
    }
  }
  @Watch('image')
  computedImages() {
    if (Array.isArray(this.image)) {
      if (this.image.length === 0) this.innerImages = '';
      if (this.image.length > 1 && (this.size === 'xl' || this.size === 'lg') && this.ratio === '1:1') {
        this.innerImages = this.image.slice(0, 4);
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      } else this.innerImages = this.image[0];
    } else this.innerImages = this.image;
  }

  componentWillLoad() {
    if (this.actions.length > 0) {
      this.actionSource = {
        type: 'list',
        items: [...this.reduceActions()],
      };
    }
    this.computedImages();
  }

  componentDidLoad() {
    this.setIcon();
    this.observer = new MutationObserver(() => {
      this.setIcon();
    });
    this.observer.observe(this.el, {
      childList: true,
    });
  }

  render() {
    const isImageArr = Array.isArray(this.innerImages);

    const containerStyle = {
      background:
        this.innerImages && !isImageArr
          ? `url(${this.innerImages}) 50% / ${this.mode} no-repeat`
          : `var(--ks-color-neutral-surface2${this.disabled ? 'Disabled' : ''})`,
    };

    const ratio = this.ratio === '2:3' ? 'horizontal' : this.ratio === '3:2' ? 'vertical' : '';

    const cls = classnames(`${prefix}__container`, `${prefix}__${ratio}`, {
      [`${prefix}__${this.size}`]: true,
    });

    const isMultiple = this.isMultiple && (this.size === 'lg' || this.size === 'xl' || this.size === 'md');

    return (
      <Host ks-thumnail>
        <div class={cls}>
          {isMultiple && (
            <div class={`${prefix}__multiple ${prefix}__multiple-${this.size} ${prefix}__multiple-${ratio}`}>
              <ks-divider class={'divider'}></ks-divider>
              <ks-divider class={'divider'}></ks-divider>
            </div>
          )}

          <div
            class={classnames(`${prefix}`, {
              [`${prefix}__disabled`]: this.disabled,
              [`${prefix}__block`]: this.block,
            })}
            style={containerStyle}
          >
            {!this.block && this.iconSlot && <slot name="icon"></slot>}
            {!this.block &&
              this.playable &&
              !this.disabled &&
              (this.playing ? (
                <ks-icon-overlay-pause
                  onClick={() => this.ksPause.emit()}
                  size={this.getPlaySize()}
                  data-testid="ks-thumbnail-index-wJiTEo"
                />
              ) : (
                <ks-icon-overlay-play
                  onClick={() => this.ksPlay.emit()}
                  size={this.getPlaySize()}
                  data-testid="ks-thumbnail-index-taorrS"
                />
              ))}

            {!this.block && (this.actions.length || this.playable) && (
              <div class={`${prefix}__mask`}>
                {this.actions.length > 1 ? (
                  <ks-dropdown-menu
                    style={{ justifyContent: 'center' }}
                    trigger="hover"
                    selectable={false}
                    dataSource={this.actionSource}
                    __internal_bridged_dynamic_slot_render={true}
                  >
                    <ks-icon-more-vertical color="white"></ks-icon-more-vertical>
                    {this.renderSlot()}
                  </ks-dropdown-menu>
                ) : (
                  this.renderSlot()
                )}
              </div>
            )}

            {this.block && (
              <ks-tooltip contentStyle={{ maxWidth: '240px' }} disabled={!this.blockReason} content={this.blockReason}>
                <div class={`${prefix}__block-container`}>
                  <ks-icon-block-none class={'block-icon'} size={this.getBlockSize()}></ks-icon-block-none>
                </div>
              </ks-tooltip>
            )}

            {isImageArr && (
              <div class={{ [`${prefix}__grid`]: isImageArr, [`${prefix}__grid__more`]: this.innerImages.length > 2 }}>
                {(this.innerImages as string[]).map((img, index) => (
                  <img
                    key={`${img}-${index}`}
                    class={`${prefix}__grid__img`}
                    src={img}
                    data-testid={`ks-thumbnail-index-b6v4vn-${`${img}-${index}`}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
