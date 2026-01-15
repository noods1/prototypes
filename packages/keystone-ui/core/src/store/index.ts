import { createStore } from '@stencil/store';
import type { Locale } from '@fe-infra/keystone-locales';
import type { LockScroll, ZIndex } from '../entities';
import { LOCKSCROLL, ZINDEX } from '../utils/constants';
import { getDefaultLocale, loadTimezoneOffset } from '@src/integrations';

const store = createStore<{
  config: {
    locale: Locale;
    lockScroll: LockScroll;
    zIndex: ZIndex;
  };
  i18n: {
    timezoneOffset: number;
    timezoneName: string;
    /** 用于区分用户 i18n 时区是否由用户手动设置的标志位 */
    isManuallySet: boolean;
  };
}>({
  config: {
    locale: getDefaultLocale(),
    lockScroll: LOCKSCROLL,
    zIndex: ZINDEX,
  },
  i18n: {
    timezoneOffset: 0,
    timezoneName: '',
    isManuallySet: false,
  },
});

(function initAsyncState() {
  loadTimezoneOffset().then((timezoneInfo) => {
    if (timezoneInfo && !store.get('i18n').isManuallySet) {
      const { value = 0, timezone } = timezoneInfo || {};
      store.set('i18n', { timezoneOffset: value, timezoneName: timezone, isManuallySet: false });
    }
  });
})();

export default store;
