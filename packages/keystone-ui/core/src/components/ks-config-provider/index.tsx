import { Component, h, Prop, Host, Watch, Element } from '@stencil/core';
import store from '@src/store';
import type { Direction, Locale, LockScroll, ZIndex } from '../../entities';
import { LOCKSCROLL, ZINDEX } from '@src/utils/constants';
import { registerPluginManager } from '@src/utils/plugin';

import type { Tracker, TrackerConfig } from '@src/plugins/plugin-tracking/types';
import { isSupportedLocale } from '@fe-infra/keystone-locales';
import { getDefaultLocale } from '@src/integrations';

/**
 * @deprecated To be removed in next major version. Use `setGlobalConfig` instead.
 * 下个 major 版本将会移除。使用 `setGlobalConfig` 来替代设置全局配置。
 */
@Component({
  tag: 'ks-config-provider',
  shadow: true,
})
export class KsConfigProvider {
  ['ks-name'] = 'ks-config-provider';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsConfigProviderElement;
  get globalConfig() {
    return store.get('config');
  }
  /**
   * @deprecated To be removed in next major version.
   * @locale {en} The direction of horizontal overflow for text and table columns. Default: ltr.
   * @locale {zh} 文本、表列水平溢出的方向。默认：ltr。
   */
  @Prop() direction: Direction = 'ltr';
  /**
   * @locale {en} Translation copy. Default: English.
   * @locale {zh} 翻译文案。默认：英文。
   */
  @Prop() locale: Locale | { __lang__: Locale } = getDefaultLocale(); // TODO 未来的 major 版本移除对历史 { __lang__: Locale } 格式的支持
  /**
   * @locale {en} For Modal and Drawer components, screen scrolling is disabled when they are displayed. This behavior can be configured via lockScroll. Default: { enabled: true, container: document.body }.
   * @locale {zh} Lock Scroll 对于 Modal 、 Drawer 组件，在显示时会禁用屏幕滚动，可以通过 lockScroll 来设置这一行为。默认：{ enabled: true, container: document.body }。
   */
  @Prop() lockScroll: LockScroll = LOCKSCROLL;
  /**
   * @locale {en} The initial z-index value for components. Modal/Drawer components follow zIndex.modal (internally auto-incrementing). Message/Notification components follow zIndex.message (no internal auto-increment, fixed z-index on the wrapper element). Default: { modal: 1000, message: 2000 }.
   * @locale {zh} 组件的层级初始值，modal/drawer/popover 组件遵循zIndex.modal（内部自增）， message/notification 组件遵循zIndex.message（内部不自增，固定层级在包装元素上）。默认：{ modal: 1000, message: 2000 }。
   */
  @Prop() zIndex: ZIndex = ZINDEX;
  /**
   * @locale {en} An instance for tracking event reporting, with its API design based on `@tt4b/platform-tracking-sdk`. You can directly use `@tt4b/platform-tracking-sdk` or implement custom reporting logic.
   * @locale {zh} 用于跟踪事件报告的实例，其API设计基于 `@tt4b/platform-tracking-sdk`。您可以直接使用 `@tt4b/platform-tracking-sdk` 或实现自定义报告逻辑。
   */
  @Prop() tracker: Tracker | null = null;
  /**
   * @locale {en} Configuration for the tracker. This object allows you to customize tracking behavior for all components. For detailed configuration, please see {@link TrackerConfig}.
   * @locale {zh} 跟踪器的配置。此对象允许您为所有组件自定义跟踪行为。有关详细配置，请参阅 {@link TrackerConfig}。
   */
  @Prop() trackerConfig: TrackerConfig = {};

  @Watch('locale')
  @Watch('zIndex')
  @Watch('lockScroll')
  updateConfig() {
    // TODO 未来的 major 版本移除对历史 { __lang__: Locale } 格式的支持
    const locale = typeof this.locale === 'object' ? this.locale?.__lang__ : this.locale;

    store.set('config', {
      locale: isSupportedLocale(locale) ? locale : 'en',
      lockScroll: { ...this.globalConfig.lockScroll, ...this.lockScroll },
      zIndex: { ...this.globalConfig.zIndex, ...this.zIndex },
    });
  }

  constructor() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  componentDidLoad() {
    this.updateConfig();
  }

  render() {
    return (
      <Host ks-config-provider>
        <slot />
      </Host>
    );
  }
}
