import {
  Component,
  Element,
  h,
  Prop,
  State,
  Watch,
  Method,
  Event,
  EventEmitter,
  Host,
  ComponentInterface,
} from '@stencil/core';
import anime from 'animejs';
import { t, dir, isRTL } from '@src/utils/utils';
import { DrawerCloseReason, DrawerPlacement, DrawerSize } from '../../entities';
import { Slot, AllSlots } from '@src/utils/decorators';
import { registerPluginManager } from '@src/utils/plugin';
import { sendActionTracking, sendDurationTracking, sendExposeTracking } from '@src/utils/tracking';
import { commonMessages } from '@fe-infra/keystone-locales';

const prefix = 'drawer';

/**
 * @slot sideNav - Slot for content to be displayed in the side navigation area when `withSideNav` is true.
 * @slot wrapper - Slot to override the entire inner structure of the drawer.
 * @slot header - Slot for custom header content. Overrides `titleText`.
 * @slot body - Slot for the main body content of the drawer. Contains the default slot.
 * @slot footer - Slot for custom footer content. Overrides default confirm/cancel buttons.
 * @slot footer-other - Slot for additional content on the left side of the footer.
 * @slot cancel-btn - Slot to customize the cancel button text or content.
 * @slot confirm-btn - Slot to customize the confirm button text or content.
 */
@Component({
  tag: 'ks-drawer',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsDrawer implements ComponentInterface {
  ['ks-name'] = 'ks-drawer';
  // 内部变量 ----------
  // eslint-disable-next-line no-undef
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsDrawerElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  underlayRef: HTMLElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  drawerRef: HTMLElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  maskRef: HTMLElement;
  reversePlacement = {
    left: 'right',
    right: 'left',
  };
  placementIcon = {
    left: <ks-icon-chevron-right />,
    right: <ks-icon-chevron-left />,
  };

  // props ----------
  /**
   * @locale {en} Whether the drawer is currently visible.
   * @locale {zh} 抽屉当前是否可见。
   */
  @Prop() visible = false;
  /**
   * @locale {en} The size of the drawer. Can be either `"md"` or `"lg"`.
   * @locale {zh} 抽屉的大小。可选值为 `"md"` 或 `"lg"`。
   */
  @Prop() size: DrawerSize = 'md';
  /**
   * @locale {en} Whether the drawer is displayed with a side navigation. If `true`, the drawer will be displayed with a side navigation.
   * @locale {zh} 抽屉是否显示侧边导航。当值为 `true` 时，显示侧边导航。
   */
  @Prop() withSideNav = false;
  /**
   * @locale {en} Whether the mask is shown. If `true`, an overlay outside the drawer will be displayed.
   * @locale {zh} 是否展示遮罩层。当值为 `true` 时，显示抽屉外的蒙层。
   */
  @Prop() mask = true;
  /**
   * @locale {en} Whether the drawer can be closed by clicking the mask outside the drawer. If `true`, the drawer can be closed by clicking the mask.
   * @locale {zh} 是否可以通过点击抽屉外的遮罩层关闭抽屉。当值为 `true` 时，可以通过点击遮罩层关闭抽屉。
   */
  @Prop() maskClosable = true;
  /**
   * @locale {en} Whether the drawer displays a confirmation button. If `true`, a confirmation button will be displayed.
   * @locale {zh} 抽屉是否显示确认按钮。当值为 `true` 时，显示确认按钮。
   */
  @Prop() confirmable = true;
  /**
   * @locale {en} Whether the drawer displays a cancel button. If `true`, a cancel button will be displayed.
   * @locale {zh} 抽屉是否显示取消按钮。当值为 `true` 时，显示取消按钮。
   */
  @Prop() cancelable = true;
  /**
   * @locale {en} The placement of the drawer, indicating which edge of the screen the drawer slides out from. Can be `'left'` or `'right'`. Default: `'right'`.
   * @locale {zh} 抽屉的滑出方向，指示抽屉从屏幕的哪一边滑出。可选值为 `'left'` 或 `'right'`。默认：`'right'`。
   */
  @Prop() placement: DrawerPlacement = 'right';
  /**
   * @locale {en} The text displayed as the title of the drawer.
   * @locale {zh} 抽屉的标题文本。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() titleText: string;
  /**
   * @locale {en} The text displayed on the confirm button.
   * @locale {zh} 确认按钮上的文本。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() confirmText: string;
  /**
   * @locale {en} The text displayed on the cancel button.
   * @locale {zh} 取消按钮上的文本。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() cancelText: string;
  /**
   * @locale {en} Whether the confirm button is disabled. If `true`, the confirm button will be disabled.
   * @locale {zh} 确认按钮是否禁用。当值为 `true` 时，确认按钮会被禁用。
   */
  @Prop() confirmDisabled = false;
  /**
   * @locale {en} Whether the cancel button is disabled. If `true`, the cancel button will be disabled.
   * @locale {zh} 取消按钮是否禁用。当值为 `true` 时，取消按钮会被禁用。
   */
  @Prop() cancelDisabled = false;
  /**
   * @locale {en} Whether the drawer has no header. If `true`, the header of the drawer will not be displayed.
   * @locale {zh} 抽屉是否没有标题栏。当值为 `true` 时，标题栏将不显示。
   */
  @Prop() noHeader = false;
  /**
   * @locale {en} Whether the drawer has no footer. If `true`, the footer of the drawer will not be displayed.
   * @locale {zh} 抽屉是否没有底部栏。当值为 `true` 时，底部栏将不显示。
   */
  @Prop() noFooter = false;
  /**
   * @locale {en} Whether the drawer is blocking interactions. When the value is `true`, the drawer will become a blocking interaction.
   * @locale {zh} 抽屉是否为阻塞式交互。当值为 `true` 时，抽屉会成为阻塞式交互。
   */
  @Prop() isTopLayer = false;

  /**
   * @locale {en} Whether the drawer is expandable when sideNav is present. If `true`, an expand button will be displayed in the header, allowing users to toggle between normal and expanded states.
   * @locale {zh} 显示侧边导航栏时抽屉是否为可展开状态。当值为 `true` 时，标题栏会显示展开按钮，用户可以切换抽屉的正常和展开状态。
   */
  @Prop() expandable = false;

  // Drawer生命周期 --------------------
  /**
   * @locale {en} A function called before the drawer opens.
   * @locale {zh} 抽屉打开前调用的函数。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() beforeOpen: () => Promise<boolean> | boolean | undefined;
  /**
   * @locale {en} A function called after the drawer opens.
   * @locale {zh} 抽屉打开后调用的函数。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() afterOpen: () => Promise<void> | void;
  /**
   * @locale {en} A function called before the drawer closes due to non-manual actions (e.g., mask click, confirm/cancel buttons). Return `false` to prevent the close. This function is not called if `KsDrawer.close()` is invoked with the reason 'manual' or without a reason.
   * @locale {zh} 抽屉因非手动操作（例如，点击遮罩层、确认/取消按钮）关闭前调用的函数，若返回 `false` 则阻止关闭。如果调用 `KsDrawer.close()` 时原因为 'manual' 或未提供原因，则不会触发此函数。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() beforeClose: (reason: DrawerCloseReason) => Promise<boolean> | boolean | undefined;
  // TODO afterClose 和 onClose 功能是否重叠，考虑删掉
  /**
   * @locale {en} A function called after the drawer closes.
   * @locale {zh} 抽屉关闭后调用的函数。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() afterClose: (reason: DrawerCloseReason) => Promise<void> | void;
  /**
   * @locale {en} The distance from the left edge of the screen in pixels, defining the left boundary of the drawer.
   * @locale {zh} 距离屏幕左侧的距离，单位为像素，定义抽屉的左边界。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() left: number;
  /**
   * @locale {en} The distance from the right edge of the screen in pixels, defining the right boundary of the drawer.
   * @locale {zh} 距离屏幕右侧的距离，单位为像素，定义抽屉的右边界。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() right: number;
  /**
   * @locale {en} The distance from the top edge of the screen in pixels, defining the top boundary of the drawer.
   * @locale {zh} 距离屏幕上侧的距离，单位为像素，定义抽屉的上边界。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() top: number;
  /**
   * @locale {en} The distance from the bottom edge of the screen in pixels, defining the bottom boundary of the drawer.
   * @locale {zh} 距离屏幕下侧的距离，单位为像素，定义抽屉的下边界。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() bottom: number;

  /**
   * @locale {en} Whether interaction with content behind the drawer is allowed when the drawer is open. If `true`, the drawer behaves non-modally: the mask will not be rendered (regardless of the `mask` prop), clicks will pass through to the content behind, and the underlay's width will be set to `fit-content`. The internal `ks-overlay` type will also be set to `popover`.
   * @locale {zh} 抽屉打开时是否允许与抽屉后面的内容进行交互。如果为 `true`，抽屉将表现为非模态：遮罩层将不会被渲染（忽略 `mask` prop 的值），点击事件会穿透到后面的内容，并且底层容器的宽度将设置为 `fit-content`。内部 `ks-overlay` 的类型也将设置为 `popover`。
   */
  @Prop() allowBackgroundInteraction = false;
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
  @Prop() deprecatedZIndexOverride = 0;

  // state --------------------
  @State() innerVisible: boolean = this.visible;
  @State() confirmLoading = false;
  @State() cancelLoading = false;
  @State() expanded = false;
  @State() expandTooltipVisible = false;
  private tooltipAnimating = false;

  /**
   * Tooltip visible logic needed to be enforced due to animation transition.
   */
  private setTooltipFor(val: boolean, time = 0): void {
    if (!this.tooltipAnimating) {
      this.expandTooltipVisible = val;
    }
    this.tooltipAnimating = true;
    setTimeout(() => {
      this.tooltipAnimating = false;
    }, time);
  }

  /**
   * @locale {en} The component that renders the header of the drawer.
   * @locale {zh} 渲染抽屉header的组件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'header' }) headerSlots: AllSlots;
  // watch --------------------
  @Watch('visible')
  watchVisible(newValue: boolean) {
    newValue ? this.open() : this.close('manual');
  }

  get innerPlacement() {
    if (['left', 'right'].includes(this.placement) && isRTL()) {
      return this.reversePlacement[this.placement];
    } else {
      return this.placement;
    }
  }

  // 交互事件 --------------------
  /**
   * @locale {en} Custome vent triggered when the confirm button is clicked.
   * @locale {zh} 点击确认按钮时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksConfirm: EventEmitter;
  /**
   * @locale {en} Custom event triggered when the cancel button is clicked.
   * @locale {zh} 点击取消按钮时触发的自定义事件。
   */

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksCancel: EventEmitter;
  /**
   * @locale {en} Custom event triggered when the drawer is closed.
   * @locale {zh} 抽屉关闭时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksClose: EventEmitter<DrawerCloseReason>;
  /**
   * @locale {en} Custom event triggered when the drawer is expanded/shrink.
   * @locale {zh} 抽屉完全展开/收起时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksExpandChange: EventEmitter<boolean>;

  // Method --------------------
  /**
   * @locale {en} Method to open the drawer.
   * @locale {zh} 打开抽屉的方法。
   */
  @Method()
  async open() {
    if (this.innerVisible) {
      return;
    }
    // TODO beforeOpen 是否破坏了受控模式的预期
    if ((await this.beforeOpen?.()) === false) {
      return;
    }
    await this.visibleByAnime(true);
    await this.afterOpen?.();
    sendExposeTracking(this.el, { eventType: 'popup' });
    sendDurationTracking(this.el, { eventType: 'popup', reset: true });
  }
  /**
   * @locale {en} Method to close the drawer.
   * @locale {zh} 关闭抽屉的方法。
   */
  @Method()
  async close(reason: DrawerCloseReason = 'manual') {
    if (!this.innerVisible) {
      return;
    }
    if (reason !== 'manual') {
      if ((await this.beforeClose?.(reason)) === false) {
        return;
      }
    }
    await this.visibleByAnime(false);
    this.ksClose.emit(reason);
    await this.afterClose?.(reason);
    sendDurationTracking(this.el, { eventType: 'popup' });
  }

  @Method()
  async expand(newExpand: boolean) {
    if (!this.innerVisible) {
      return;
    }
    this.ksExpandChange.emit(newExpand);
  }

  constructor() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  // 内部方法 --------------------
  async confirmHandler() {
    this.confirmLoading = true;
    this.ksConfirm.emit();
    await this.close('confirm');
    this.confirmLoading = false;
    sendActionTracking(this.el, { eventType: 'confirm' });
  }
  async closeHandler() {
    this.cancelLoading = true;
    this.ksCancel.emit();
    await this.close('close');
    this.cancelLoading = false;
    sendActionTracking(this.el, { eventType: 'close' });
  }
  async expandHandler() {
    this.expanded = !this.expanded;
    await this.expand(this.expanded);
  }
  async cancelHandler() {
    this.cancelLoading = true;
    this.ksCancel.emit();
    await this.close('cancel');
    this.cancelLoading = false;
    sendActionTracking(this.el, { eventType: 'cancel' });
  }

  visibleByAnime(val: boolean) {
    const translateXOffset = this.innerPlacement === 'left' ? '-100%' : '100%';
    const animeDuration = {
      md: 350,
      lg: 400,
    };

    return new Promise((resolve) => {
      const animate = anime.timeline({
        targets: this.underlayRef,
        begin: () => {
          if (val) {
            this.underlayRef.setAttribute('visible', '');
            this.innerVisible = true;
          }
        },
        complete: () => {
          if (!val) {
            this.underlayRef.removeAttribute('visible');
            this.innerVisible = false;
          }
          resolve(val);
        },
      });
      animate.add(
        {
          targets: this.drawerRef,
          duration: animeDuration[this.size],
          easing: val ? 'cubicBezier(0.4, 0, 0.2, 1)' : 'cubicBezier(0.32, 0, 0.67, 0)',
          translateX: val ? [{ value: translateXOffset }, { value: '0' }] : translateXOffset,
        },
        0,
      );
      if (this.maskRef) {
        animate.add(
          {
            targets: this.maskRef,
            duration: 200,
            easing: 'cubicBezier(0.4, 0, 0.2, 1)',
            opacity: val ? [{ value: 0 }, { value: 1 }] : 0,
          },
          0,
        );
      }
    });
  }

  componentDidLoad() {
    this.visible ? this.open() : this.close('manual');
  }

  get styles() {
    return {
      width: `calc(100vw - ${Number(this.left)}px - ${Number(this.right)}px)`,
      height: `calc(100vh - ${Number(this.top)}px - ${Number(this.bottom)}px)`,
      left: `${Number(this.left)}px`,
      top: `${Number(this.top)}px`,
      transform: `translateX(${this.innerVisible ? '0' : this.innerPlacement === 'left' ? '-100%' : '100%'})`,
    };
  }

  renderDrawerSide() {
    const closeButton = (
      <ks-button
        class={`${prefix}__close`}
        variant="secondary"
        shape="square"
        loading={this.cancelLoading}
        disabled={this.cancelDisabled}
        onClick={this.closeHandler.bind(this)}
        data-testid="ks-drawer-index-d44ASF"
      >
        <ks-icon-close />
      </ks-button>
    );

    const expandButton = (
      <ks-tooltip
        placement="top-start"
        highLight
        visible={this.expandTooltipVisible}
        content={this.expandTooltipVisible ? (this.expanded ? 'Collapse' : 'Expand') : ''}
        enterDelay={0}
        leaveDelay={0}
      >
        <ks-button
          class={`${prefix}__expand`}
          variant="text"
          shape="square"
          onClick={this.expandHandler.bind(this)}
          onPointerDown={() => this.setTooltipFor(false, 300)}
          onPointerEnter={() => this.setTooltipFor(true, 70)}
          onPointerLeave={() => this.setTooltipFor(false, 70)}
          data-testid="ks-drawer-index-6wwsQv"
        >
          {this.expanded ? <ks-icon-fold /> : <ks-icon-unfold />}
        </ks-button>
      </ks-tooltip>
    );

    if (!this.withSideNav) {
      return closeButton;
    }

    return (
      <div class={`${prefix}__side-nav`}>
        <div class={`${prefix}__side-nav-top`}>
          {closeButton}
          <slot name="sideNav"></slot>
        </div>
        {this.expandable && expandButton}
      </div>
    );
  }

  render() {
    const classes = `${prefix} ${prefix}--${this.size} ${prefix}--${this.innerPlacement} ${this.expanded ? `${prefix}--expanded` : ''}`;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const noHeader = this.noHeader || (!this.titleText && !this.headerSlots?.length);

    return (
      <Host dir={dir()} ks-drawer>
        <ks-overlay
          type={this.isTopLayer && !this.allowBackgroundInteraction ? 'dialog' : 'popover'}
          open={this.innerVisible}
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          onClose={this.close.bind(this)}
          data-testid="ks-drawer-index-aGYroL"
          deprecatedDisableTopLayer={this.deprecatedDisableTopLayer}
          deprecatedZIndexOverride={this.deprecatedZIndexOverride}
        >
          <div
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            ref={(el) => (this.underlayRef = el)}
            class={`${prefix}__underlay`}
            style={{
              left: this.styles.left,
              top: this.styles.top,
              width: this.allowBackgroundInteraction ? 'fit-content' : '',
            }}
          >
            {this.mask && !this.allowBackgroundInteraction && (
              <div
                // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                ref={(el) => (this.maskRef = el)}
                part="mask"
                class={{ [`${prefix}__mask`]: true, [`${prefix}__mask--visible`]: this.innerVisible }}
                style={{ left: this.styles.left, top: this.styles.top }}
                onClick={() => {
                  this.maskClosable && !this.cancelDisabled && this.closeHandler();
                }}
                data-testid="ks-drawer-index-nidsTB"
              />
            )}

            {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
            <div dir={dir()} ref={(el) => (this.drawerRef = el)} class={classes} part="self" style={this.styles}>
              <slot name="wrapper">
                {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
                <div class={`${prefix}__wrapper`} style={this.noFooter ? { paddingBottom: '0' } : null} part="wrapper">
                  <div
                    class={{ [`${prefix}__side`]: true, [`${prefix}__side--absolute`]: !this.withSideNav }}
                    part="side"
                  >
                    {this.renderDrawerSide()}
                  </div>

                  <div class={`${prefix}__panel`}>
                    {!noHeader && (
                      <slot name="header">
                        <div class={`${prefix}__header`} part="header">
                          {this.titleText}
                        </div>
                      </slot>
                    )}

                    <slot name="body">
                      <div class={`${prefix}__body`} part="body">
                        <slot></slot>
                      </div>
                    </slot>

                    {!this.noFooter && (
                      <slot name="footer">
                        <div class={`${prefix}__footer`} part="footer">
                          <div class={`${prefix}__footer__other`}>
                            <slot name="footer-other"></slot>
                          </div>
                          <div class={`${prefix}__footer__btns`}>
                            {this.cancelable && (
                              <ks-button
                                variant="tertiary"
                                disabled={this.cancelDisabled}
                                loading={this.cancelLoading}
                                onClick={this.cancelHandler.bind(this)}
                                data-testid="ks-drawer-index-bpufRo"
                              >
                                <slot name="cancel-btn">{this.cancelText ?? t(commonMessages.cancel)}</slot>
                              </ks-button>
                            )}

                            {this.confirmable && (
                              <ks-button
                                variant="primary"
                                disabled={this.confirmDisabled}
                                loading={this.confirmLoading}
                                onClick={this.confirmHandler.bind(this)}
                                data-testid="ks-drawer-index-4mnZ2Y"
                              >
                                <slot name="confirm-btn">{this.confirmText ?? t(commonMessages.confirm)}</slot>
                              </ks-button>
                            )}
                          </div>
                        </div>
                      </slot>
                    )}
                  </div>
                </div>
              </slot>
            </div>
          </div>
        </ks-overlay>
      </Host>
    );
  }
}
