import { cacheOrUpdate } from '@src/utils/cache';
import { getMonth, upperFirst } from '@src/utils/calendar';
import { i18nCapitalize } from '@src/utils/i18n/utils';

const WEEKDAY_MAX_SAFE_LENGTH = 4;
const WEEKDAY_IDEAL_LENGTH = 2;

const shortWeekdayFormatter = cacheOrUpdate('en-US', (locale) => new Intl.DateTimeFormat(locale, { weekday: 'short' }));
const narrowWeekdayFormatter = cacheOrUpdate(
  'en-US',
  (locale) => new Intl.DateTimeFormat(locale, { weekday: 'narrow' }),
);

export function getLocalizedWeekday(date: Date, locale = 'en-US') {
  let weekday = shortWeekdayFormatter(locale).format(date);
  if (weekday.length >= WEEKDAY_MAX_SAFE_LENGTH) {
    const narrowWeekday = narrowWeekdayFormatter(locale).format(date);
    if (!(weekday.length === WEEKDAY_MAX_SAFE_LENGTH && narrowWeekday.length !== WEEKDAY_IDEAL_LENGTH)) {
      weekday = narrowWeekday;
    }
  }
  weekday = i18nCapitalize(weekday, locale);
  return weekday;
}

const localizedMonthFormatter = cacheOrUpdate('en-US', (locale) => new Intl.DateTimeFormat(locale, { month: 'long' }));
export function getLocalizedMonth(date: Date, locale = 'en-US') {
  return upperFirst(localizedMonthFormatter(locale).format(date), locale);
}

export function getLocalizedMonthYear(date: Date, locale = 'en-US') {
  return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long' }).format(date);
}

export function getLocalizedYear(date: Date, locale = 'en-US') {
  return new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(date);
}

const GREGORY_CALENDAR_LOCALE_EXTENSION = '-u-ca-gregory';
const dateFormatter = cacheOrUpdate('en-US', (locale) => {
  if (!locale.endsWith(GREGORY_CALENDAR_LOCALE_EXTENSION)) {
    locale += GREGORY_CALENDAR_LOCALE_EXTENSION;
  }
  return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short', day: 'numeric', calendar: 'gregory' });
});

interface IOption {
  showMinute?: boolean;
  showSecond?: boolean;
  showHour?: boolean;
}

const timeFormatter = cacheOrUpdate('en-US', (locale) => {
  if (!locale.endsWith(GREGORY_CALENDAR_LOCALE_EXTENSION)) {
    locale += GREGORY_CALENDAR_LOCALE_EXTENSION;
  }
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    calendar: 'gregory',
  });
});

export function getLocalizedDate(date: Date, locale = 'en-US') {
  const dateFormatted = dateFormatter(locale).format(date);
  const month = getMonth(date, locale);
  // TODO: ru 俄语下会匹配不上
  return dateFormatted.replace(month, upperFirst(month, locale));
}

export function getLocalizedDateTime(
  date: Date,
  locale = 'en-US',
  options: IOption = { showMinute: true, showSecond: false, showHour: true },
) {
  const datetimeFormatter = cacheOrUpdate(
    'en-US',
    (locale, options: IOption) => {
      if (!locale.endsWith(GREGORY_CALENDAR_LOCALE_EXTENSION)) {
        locale += GREGORY_CALENDAR_LOCALE_EXTENSION;
      }
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: options.showHour ? 'numeric' : undefined,
        minute: options.showMinute ? 'numeric' : undefined,
        second: options.showSecond ? 'numeric' : undefined,
        calendar: 'gregory',
      });
    },
    options,
  );
  return datetimeFormatter(locale, options).format(date);
}

export function getLocalizedTime(date: Date, locale = 'en-US') {
  return timeFormatter(locale).format(date);
}
