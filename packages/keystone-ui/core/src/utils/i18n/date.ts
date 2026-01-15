import { cacheOrUpdate } from '@src/utils/cache';
import { i18nCapitalize } from './utils';

interface WeekInfo {
  firstDay: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  weekend: number[];
  minimalDays: number;
}

interface IntlLocaleNext extends Intl.Locale {
  getWeekInfo?: () => WeekInfo;
  weekInfo?: WeekInfo;
}

const getWeekInfo = cacheOrUpdate('en-US', (locale): WeekInfo => {
  const intlLocale: IntlLocaleNext = new Intl.Locale(locale);
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  return intlLocale.getWeekInfo?.() || intlLocale.weekInfo;
});

export function getFirstDayOfWeek(locale = 'en-US') {
  return getWeekInfo(locale)?.firstDay || 1;
}

// FIXME 浏览器兼容性优化
const i18nRelativeTimeFormatter = cacheOrUpdate(
  'en-US',
  (locale) => new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }),
);
export function i18nRelativeTime(value: number, unit: Intl.RelativeTimeFormatUnit, locale = 'en-US') {
  return i18nCapitalize(i18nRelativeTimeFormatter(locale).format(value, unit));
}

// @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
export const getTimeZoneNameFromOffset = (timezone, locale) => {
  const formattedTimeZone = Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    timeZoneName: 'long',
  }).format(new Date());

  return formattedTimeZone.split(' ').slice(1).join(' ');
};
