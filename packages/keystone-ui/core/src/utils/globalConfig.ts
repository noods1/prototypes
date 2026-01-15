import store from '@src/store';
import { Locale, LockScroll, ZIndex } from '@src/entities';
import { isEqual } from 'lodash-es';
import { isSupportedLocale } from '@fe-infra/keystone-locales';

function mergeIfNotEqual<T extends object>(oldObj: T, newObj?: Partial<T>): T {
  if (!newObj) {
    return oldObj;
  }

  const mergedObj = { ...oldObj, ...newObj };

  if (isEqual(oldObj, mergedObj)) {
    return oldObj;
  } else {
    return mergedObj;
  }
}

export function setGlobalConfig(
  config: Partial<{
    locale: Locale | { __lang__: Locale }; // TODO 未来的 major 版本移除对历史 { __lang__: Locale } 格式的支持
    lockScroll: LockScroll;
    zIndex: ZIndex;
    i18n: Partial<{
      timezoneOffset: number;
      timezoneName: string;
    }>;
  }>,
) {
  const oldConfig = store.get('config');

  // TODO 未来的 major 版本移除对历史 { __lang__: Locale } 格式的支持
  const locale = typeof config.locale === 'object' ? config.locale?.__lang__ : config.locale;

  store.set('config', {
    locale: isSupportedLocale(locale) ? locale : 'en',
    lockScroll: mergeIfNotEqual(oldConfig.lockScroll, config.lockScroll),
    zIndex: mergeIfNotEqual(oldConfig.zIndex, config.zIndex),
  });
  if (config.i18n) {
    store.set('i18n', mergeIfNotEqual(store.get('i18n'), { ...config.i18n, isManuallySet: true }));
  }
}
