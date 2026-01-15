import { isSupportedLocale, Locale } from '@fe-infra/keystone-locales';
import { isTTAM, loadTimezoneOffsetOfTTAM } from '@src/integrations/platform/ttam';

export async function loadTimezoneOffset() {
  try {
    if (isTTAM) {
      return (await loadTimezoneOffsetOfTTAM()) || 0;
    }
  } catch (e) {
    return;
  }

  return;
}

export function getDefaultLocale(): Locale {
  try {
    const localeInSharedGMPTCookie = document.cookie.match(/(^|;\s*)lang_type=([^;]*)/)?.pop() || '';
    if (isSupportedLocale(localeInSharedGMPTCookie)) {
      return localeInSharedGMPTCookie;
    }
  } catch (e) {
    // do nothing
  }

  return 'en';
}
