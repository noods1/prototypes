import {
  Component,
  State,
  Watch,
  ComponentInterface,
  Element,
  Host,
  Prop,
  Event,
  h,
  EventEmitter,
} from '@stencil/core';
import { Slot, Slots } from '@src/utils/decorators';
import { CheckboxGroupValue, DropdownListMenu, DropdownMenuItem, RadioValue } from '@src/entities';
import { getTargetParentComponent } from '@src/utils/utils';
import classnames from 'classnames';
import { sendActionTracking } from '@src/utils/tracking';
import { registerPluginManager } from '@src/utils/plugin';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { AdditionalTags, AssetTileContent, AssetTileMediaType, TagsType } from '@src/entities/components/asset-tile';

const prefix = 'asset-tile';

/**
 * @slot icon - Slot for a custom icon, displayed if `image` prop is not set and the tile is not in a 'block' state.
 * @slot player - Slot for a custom media player or content, displayed when `playing` is true and the tile is not in a 'block' state.
 * @slot status-content - Slot for custom content to be displayed inside the tooltip when the tile has a status (e.g., 'error', 'pending', 'warning').
 * @slot content-wrapper - Slot for custom assetTileContent area
 */
@Component({
  tag: 'ks-asset-tile',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsAssetTile implements ComponentInterface {
  ['ks-name'] = 'ks-asset-tile';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsAssetTileElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  parentEl: (HTMLKsRadioGroupElement | HTMLKsCheckboxGroupElement) & { _getValue: () => RadioValue };

  /**
   * @locale {zh} 媒体类型，用于区分视频、图片、轮播图等
   * @locale {en} The type of media, used to distinguish video, image, carousel, etc.
   */
  @Prop() mediaType: AssetTileMediaType = 'image';

  /**
   * @locale {zh} 附加标签，用于展示AI、推荐等标签
   * @locale {en} Additional tags, used to display tags such as AI, recommendation, etc.
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() additionalTags: AdditionalTags;

  /**
   * @locale {zh} 资产卡片内容，用于展示标题、描述、头像等
   * @locale {en} Asset tile content, used to display title, description, avatar, etc.
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() assetTileContent: AssetTileContent;

  /**
   * @locale {en} URL of the image to display as the tile background. If provided and not empty, it overrides any content in the 'icon' slot.
   * @locale {zh} 作为区块背景显示的图片链接。如果提供且不为空，它将覆盖 'icon' 插槽中的任何内容。
   */
  @Prop() image = '';
  /**
   * @locale {en} Indicates if media content is currently playing. If true, the 'player' slot content is shown.
   * @locale {zh} 指示媒体内容当前是否正在播放。如果为 true，则显示 'player' 插槽的内容。
   */
  @Prop() playing = false;
  /**
   * @locale {en} The size of the component. Affects overall dimensions and internal element scaling.
   * @locale {zh} 组件的尺寸。影响整体尺寸和内部元素的缩放。
   */
  @Prop() size: 'sm' | 'md' | 'lg' | 'xl' = 'sm';
  /**
   * @locale {en} Determines the type of selection control displayed. 'none' means no selection control. 'radio' or 'checkbox' displays the respective control.
   * @locale {zh} 决定显示的选择控件类型。'none' 表示不显示选择控件。'radio' 或 'checkbox' 分别显示对应的单选或多选控件。
   */
  @Prop() select: 'none' | 'radio' | 'checkbox' = 'checkbox';
  /**
   * @locale {en} The aspect ratio of the component's visual area.
   * @locale {zh} 组件视觉区域的宽高比。
   */
  @Prop() ratio: '1:1' | '16:9' = '1:1';
  /**
   * @locale {en} Loading state of the component. An object with `percent` (0-100) and `isLoading` (boolean).
   * @locale {zh} 组件的加载状态。一个包含 `percent` (0-100的数字) 和 `isLoading` (布尔值) 的对象。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() loading: { percent: number; isLoading: boolean };
  /**
   * @locale {en} The value associated with this asset tile, used when it's part of a selection group (radio or checkbox).
   * @locale {zh} 与此资源区块关联的值，当它是选择组（单选或多选）的一部分时使用。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: number | string;
  /**
   * @locale {en} Controls the selected state of the tile when `select` is 'radio' or 'checkbox'. Can be used for controlled component behavior.
   * @locale {zh} 当 `select` 为 'radio' 或 'checkbox' 时，控制区块的选中状态。可用于受控组件行为。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() checked: boolean;
  /**
   * @locale {en} If true, the asset tile is non-interactive and visually styled as disabled.
   * @locale {zh} 如果为 true，资源区块将不可交互，并在视觉上呈现为禁用状态。
   */
  @Prop() disabled = false;
  /**
   * @locale {en} Specifies how the background image (from `image` prop) should be resized to fit its container. 'cover' scales the image to maintain its aspect ratio while filling the element’s entire content box. 'contain' scales the image to maintain its aspect ratio while fitting within the element’s content box.
   * @locale {zh} 指定背景图片（来自 `image` 属性）应如何调整大小以适应其容器。'cover' 会缩放图片以保持其宽高比，同时填充元素的整个内容框。'contain' 会缩放图片以保持其宽高比，同时使其适应元素的内容框。
   */
  @Prop() mode: 'cover' | 'contain' = 'cover';
  /**
   * @locale {en} Visual status indicator for the tile. 'default' shows no special status. 'error' displays an error indicator.
   * @locale {zh} 区块的视觉状态指示器。'default' 不显示特殊状态。'error' 显示错误指示器。
   */
  @Prop() status: 'default' | 'error' | 'pending' | 'warning' = 'default';
  /**
   * @locale {en} If true, the tile enters a blocked state, displaying a block icon and reason (if provided), and disabling interactions.
   * @locale {zh} 如果为 true，区块进入阻塞状态，显示阻塞图标和原因（如果提供），并禁用交互。
   */
  @Prop() block = false;
  /**
   * @locale {en} Reason for the blocked state, displayed in a tooltip. This property is only effective when `block` is true.
   * @locale {zh} 阻塞状态的原因，在tooltip中显示。此属性仅在 `block` 为 true 时生效。
   */
  @Prop() blockReason = '';

  /**
   * @locale {en} Defines the action icon displayed on the tile. If set to 'more', the `actionSource` prop must be provided to populate the dropdown menu.
   * @locale {zh} 定义在区块上显示的操作图标。如果设置为 'more'，则必须提供 `actionSource` 属性来填充下拉菜单。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() action: 'edit' | 'delete' | 'full screen' | 'more';

  /**
   * @locale {en} Data source for the dropdown menu when `action` is set to 'more'.
   * @locale {zh} 当 `action` 设置为 'more' 时，用于下拉菜单的数据源。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() actionSource: DropdownListMenu;

  /**
   * @locale {en} Text content for the badge displayed on the tile. This is often used to show duration for media type or show number of carousel type.
   * @locale {zh} 在区块上显示的徽章的文本内容。通常用于显示媒体类型的时长或者轮播图数量。
   */
  @Prop() badge = '';

  /**
   * @locale {en} If true, a TikTok icon badge is displayed on the tile.
   * @locale {zh} 如果为 true，则在区块上显示一个 TikTok 图标徽章。
   */
  @Prop() showTiktok = false;

  /**
   * @locale {en} If true, the asset tile will stretch to fill the container's width
   * @locale {zh} 如果为 true，资源区块将拉伸以填充容器的宽度
   */
  @Prop() freeStretch = true;

  @State() _checked = false;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() parentValue: RadioValue | CheckboxGroupValue;

  @State() __additionalTags: TagsType[] = [];

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'icon' }) iconSlot: Slots;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'player' }) playerSlot: Slots;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'status-content' }) statusContentSlot: Slots;
  /**
   * @locale {en} Custom event triggered when the tile's checked state changes (either by direct click on the tile if `select` is not 'none', or by interaction with the internal checkbox/radio). Emits the new checked state (boolean).
   * @locale {zh} 当区块的选中状态改变时触发的自定义事件（如果 `select` 不是 'none'，则通过直接点击区块或通过与内部多选/单选框交互）。发出新的选中状态（布尔值）。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<boolean>; // 禁止冒泡，防止事件冒泡到radio group组件的valuechange事件
  /**
   * @locale {en} Custom event triggered when the 'action' is clicked.
   * @locale {zh} 当 'action' 被点击时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksAction: EventEmitter<string | DropdownMenuItem>;

  @Watch('checked')
  checkedWatcher(val: boolean) {
    this._checked = val;
  }

  @Watch('size')
  sizeWatcher() {
    this.setIconSize();
  }

  @Watch('additionalTags')
  additionalTagsWatcher() {
    const array: TagsType[] = [];
    if (this.additionalTags?.recommendation)
      array.push({
        type: 'recommend',
        content: 'Recommended',
      });
    if (this.additionalTags?.ai) array.push({ type: 'ai' });
    this.additionalTags?.others?.forEach((content) => array.push({ type: 'normal', content }));
    this.__additionalTags = array;
  }

  constructor() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  private observer: MutationObserver;

  updateParentValue = (e: CustomEvent) => {
    this.parentValue = e.detail;
  };

  handleValueChange(event: Partial<Event> & { detail: boolean }) {
    this.ksChange?.emit(event.detail);
    if (this.checked === undefined && !this.parentEl) {
      this._checked = event.detail;
    }
    sendActionTracking(this.el, { eventType: 'change', componentParams: { value: event.detail } });
  }

  private setIconSize() {
    let size = 48;
    switch (this.size) {
      case 'sm':
        size = 48;
        break;
      default:
        size = 64;
        break;
    }

    if (this.iconSlot) {
      this.iconSlot[0]?.setAttribute('size', `${size}px`);
    }
  }

  private renderSelectBox() {
    const select =
      this.select === 'checkbox' ? (
        <ks-checkbox
          onKsChange={this.handleValueChange.bind(this)}
          value={this.value}
          checked={this._checked}
          disabled={this.disabled}
          data-testid="ks-asset-tile-index-9aiCBq"
        />
      ) : (
        <ks-radio
          onKsChange={this.handleValueChange.bind(this)}
          value={this.value}
          checked={this._checked}
          disabled={this.disabled}
          data-testid="ks-asset-tile-index-szed22"
        />
      );

    return <div class={`${prefix}__select-box`}>{select}</div>;
  }

  private renderBage() {
    return (
      <div class={`${prefix}__badges`}>
        {this.mediaType !== 'image' && (
          <span class={'badge'}>
            {this.mediaType === 'carousel' && <ks-icon-picture size={14}></ks-icon-picture>}
            {this.badge}
          </span>
        )}

        {this.showTiktok && (
          <span class={'badge'}>
            <ks-icon-tiktok size={14}></ks-icon-tiktok>
          </span>
        )}
      </div>
    );
  }

  private renderStatus() {
    if (this.status === 'default') return null;
    if (this.status === 'pending')
      return (
        <ks-tag size={this.size !== 'sm' ? 'md' : 'sm'} class={`${prefix}__status__pending`}>
          Pending
        </ks-tag>
      );
    return (
      <ks-status-icon
        size={this.size !== 'sm' ? 'md' : 'sm'}
        class={`${prefix}__status__${this.status}`}
        variant={this.status}
        stroke="#ffffff"
      ></ks-status-icon>
    );
  }

  private renderAction() {
    if (this.action === 'more') {
      return (
        <div class={`${prefix}__action`}>
          <ks-dropdown-menu
            onClick={(e) => {
              e.stopPropagation();
            }}
            onKsValueChange={({ detail }) => {
              this.ksAction.emit(detail[0]);
            }}
            selectable={false}
            trigger="click"
            dataSource={this.actionSource}
            data-testid="ks-asset-tile-index-royWtj"
          >
            <ks-button size="sm" shape="square" data-testid="ks-asset-tile-index-aQsLdn">
              <ks-icon-more-vertical size="14" />
            </ks-button>
          </ks-dropdown-menu>
        </div>
      );
    } else {
      switch (this.action) {
        case 'delete':
          return <ks-icon-delete size="14" />;
        case 'edit':
          return <ks-icon-edit size="14" />;

        default:
          return <ks-icon-full-screen size="14" />;
      }
    }
  }

  private renderAssetTileContent() {
    const { title, description, detailInfos, avatar } = this.assetTileContent;
    const titleCls = classnames({
      [`${prefix}__title`]: true,
      [`${prefix}__title__bold`]: (description || (detailInfos && detailInfos.length > 0)) && !avatar,
      [`${prefix}__title__avatar`]: avatar,
    });
    return (
      <slot name="content-wrapper">
        <div class={`${prefix}__content`}>
          <div class={`${prefix}__title__container`}>
            {avatar && <img class={`${prefix}__avatar`} src={avatar}></img>}
            <div class={titleCls}>{title}</div>
          </div>
          {description && <div class={`${prefix}__desc`}>{description}</div>}
          {detailInfos && detailInfos.length > 0 && (
            <div class={`${prefix}__detail__container`}>
              {detailInfos.map((info) => (
                <div class={`${prefix}__detail`}>{info}</div>
              ))}
            </div>
          )}
        </div>
      </slot>
    );
  }

  private additionalTag(tag: TagsType) {
    const isAi = tag.type === 'ai';

    if (isAi)
      return (
        <ks-tooltip content="AI Generation">
          <ks-tag size="sm" variant="new">
            <ks-icon-smart-plus size="14" />
          </ks-tag>
        </ks-tooltip>
      );

    return (
      <ks-tag size="sm" variant={tag.type === 'recommend' ? 'info' : 'neutral'}>
        {tag.content}
      </ks-tag>
    );
  }

  private renderAdditionalTags() {
    const showMore = this.__additionalTags.length > 2;
    const renderTags = this.__additionalTags.slice(0, 2);

    return (
      <div class={`${prefix}__additional_tags`}>
        {renderTags.map((tag) => this.additionalTag(tag))}
        {showMore && (
          <ks-tooltip>
            <div slot="content">
              {this.__additionalTags.slice(2).map((tag, index) => (
                <div>{index + 2 !== this.__additionalTags.length - 1 ? `${tag.content},` : tag.content}</div>
              ))}
            </div>
            <ks-tag size="sm">+{`${this.__additionalTags.length - renderTags.length}`}</ks-tag>
          </ks-tooltip>
        )}
      </div>
    );
  }

  private get progressSize() {
    switch (this.size) {
      case 'lg':
        return 'sm';
      case 'xl':
        return 'md';
      default:
        return 'xs';
    }
  }

  addBroadcastEventListener() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.parentEl?.removeEventListener(`ks-${this.select}-broadcast`, this.updateParentValue);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.parentEl?.addEventListener(`ks-${this.select}-broadcast`, this.updateParentValue);
  }

  componentWillLoad() {
    if (this.checked !== undefined) this._checked = this.checked;
    this.additionalTagsWatcher();
  }

  componentDidLoad() {
    // this.parentEl = getTargetParentComponent(this.el, 'ks-checkbox-group');
    if (this.select !== 'none') {
      this.parentEl = getTargetParentComponent(this.el, `ks-${this.select}-group`);
      if (this.parentEl) {
        const pValue = this.parentEl?._getValue?.();
        this.parentValue = pValue;
      }
      this.addBroadcastEventListener();
    }

    this.setIconSize();
    this.observer = new MutationObserver(() => {
      this.setIconSize();
    });
    this.observer.observe(this.el, {
      childList: true,
    });
  }

  connectedCallback() {
    if (this.select !== 'none') {
      this.addBroadcastEventListener();
    }
  }

  disconnectedCallback() {
    if (!this.el.isConnected && this.select !== 'none') {
      // 真实被删除
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.parentEl?.removeEventListener(`ks-${this.select}-broadcast`, this.updateParentValue);
    }
  }

  render() {
    const containerStyle = {
      background:
        this.image && !this.block
          ? `url(${this.image}) 50% / ${this.mode} no-repeat`
          : `var(--ks-color-neutral-surface2${this.disabled ? 'Disabled' : ''})`,
    };

    const cls = classnames({
      [`${prefix}--checked`]:
        this.select !== 'none' &&
        (this.loading === undefined || !this.loading.isLoading) &&
        (this._checked ||
          (this.value &&
            (this.parentValue === this.value || (this.parentValue as CheckboxGroupValue)?.includes(this.value)))),
      [`${prefix}__vertical`]: this.ratio === '16:9',
      [`${prefix}__block`]: this.block,
      [`${prefix}__error`]: this.status === 'error' && this.image,
      [`${prefix}__${this.size}__stretch`]: this.freeStretch,
      [`${prefix}__${this.size}`]: !this.freeStretch,
    });

    const blockSize = this.size === 'sm' ? 42 : 56;

    return (
      <Host ks-thumnail>
        <div
          style={containerStyle}
          class={`${prefix} ${this.disabled ? `${prefix}__disabled` : ''} ${cls}`}
          onClick={(event) => {
            const target = event.target as HTMLElement;
            if (
              this.disabled ||
              this.loading?.isLoading ||
              target.getAttribute('ks-checkbox') !== null ||
              target.getAttribute('ks-radio') !== null ||
              this.block
            ) {
              return;
            }
            this.parentEl?._change(this.value);
            const detail = this.select === 'checkbox' ? !this._checked : true;
            this.handleValueChange({ detail });
          }}
          data-testid="ks-asset-tile-index-nvY97b"
        >
          {!this.block && this.select !== 'none' && !this.loading?.isLoading && this.renderSelectBox()}
          {!this.block && this.iconSlot && !this.image && <slot name="icon"></slot>}
          {!this.block && this.playerSlot && this.playing && (
            <div class={{ [`${prefix}__player`]: true }}>
              <slot name="player"></slot>
            </div>
          )}

          {!this.block && this.badge && this.renderBage()}
          {!this.block && this.status !== 'default' && !this.disabled && (
            <span class={`${prefix}__status`}>
              <ks-tooltip>
                {this.statusContentSlot && (
                  <div class={`${prefix}__status__content`} slot="body">
                    <slot name="status-content"></slot>
                  </div>
                )}
                {this.renderStatus()}
              </ks-tooltip>
            </span>
          )}

          {!this.block &&
            this.action &&
            typeof this.action !== 'boolean' &&
            (this.action === 'more' ? (
              this.renderAction()
            ) : (
              <ks-button
                onClick={(event) => {
                  event.stopPropagation();
                  this.ksAction?.emit(this.action);
                  sendActionTracking(this.el, { eventType: 'click', subEventType: 'action' });
                }}
                size="sm"
                shape="square"
                class={`${prefix}__action`}
                data-testid="ks-asset-tile-index-bohWFE"
              >
                {this.renderAction()}
              </ks-button>
            ))}

          {!this.block && this.loading && this.loading.isLoading && (
            <div class={`${prefix}__loading`}>
              <div class={`${prefix}__loading-ring`}>
                <ks-progress variant={'ring'} percent={this.loading.percent} size={this.progressSize}></ks-progress>
                <span>Loading.....</span>
              </div>
            </div>
          )}

          {this.block && (
            <ks-tooltip contentStyle={{ maxWidth: '240px' }} disabled={!this.blockReason} content={this.blockReason}>
              <div class={`${prefix}__block-container`}>
                <ks-icon-block-none size={blockSize}></ks-icon-block-none>
              </div>
            </ks-tooltip>
          )}
        </div>
        {(this.assetTileContent || this.additionalTags) && (
          <div class={`${prefix}__extra ${prefix}__${this.size}`}>
            {this.assetTileContent && this.renderAssetTileContent()}
            {this.additionalTags && this.renderAdditionalTags()}
          </div>
        )}
      </Host>
    );
  }
}
