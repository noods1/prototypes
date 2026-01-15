import { globalThisAsyncCache } from '@src/utils/cache';

export const aadvid = new URLSearchParams(window.location.search).get('aadvid') || '';

// FIXME 增加未命中的 Slardar 报警？
export const isTTAM = Boolean(aadvid) && ['ads.tiktok.com', 'boei18n-ads.byteoversea.net'].includes(location.host);

export const loadTimezoneOffsetOfTTAM = globalThisAsyncCache('ttamMain-loadI18nInfo', () =>
  fetch(`/api/v3/i18n/account/extra/?aadvid=${aadvid}`)
    .then((res) => res.json())
    .then(({ data }) => data.timezone),
);
