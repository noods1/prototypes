import { startOfMonth, endOfMonth, subDays, addDays, addMonths } from 'date-fns';
import { getFirstDayOfWeek } from '../i18n/date';

export const getWeekArray = (locale: string, date: Date) => {
  const weeks: Date[][] = [];
  const firstDayOfMonth = startOfMonth(date);
  const lastDayOfMonth = endOfMonth(date);
  const firstDayOfWeek = getFirstDayOfWeek(locale); // 获取周起始配置

  // 调整起始日期计算逻辑
  const startOffset = (firstDayOfMonth.getDay() - firstDayOfWeek + 7) % 7;
  let currentDate = subDays(firstDayOfMonth, startOffset);

  let monthEndReached = false;

  let currentWeek: Date[] = [];
  for (let i = 0; i < 42; i++) {
    // 日期有效性检查
    if (currentDate > lastDayOfMonth) {
      monthEndReached = true;
    }

    currentWeek.push(currentDate);
    currentDate = addDays(currentDate, 1);

    // 周分割逻辑
    if (currentWeek.length === 7 || i === 41) {
      // 增强周有效性检查
      const hasCurrentMonth = currentWeek.some(
        (day) => day.getMonth() === date.getMonth() && day.getFullYear() === date.getFullYear(),
      );

      if (hasCurrentMonth) {
        weeks.push(currentWeek);
      }
      currentWeek = [];

      // 终止条件优化
      if (monthEndReached && currentDate > addDays(lastDayOfMonth, 1)) {
        break;
      }
    }
  }

  return weeks;
};

export const getMonth = (date: Date, locale: string) => {
  const year = new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(date);
  return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }).format(date).replace(year, '').trim();
};

export const getMonths = (locale = 'en-US') => {
  const janurary = new Date(1970, 0);
  return Array.from({ length: 12 }, (_, k) => k).map((i) => getMonth(addMonths(janurary, i), locale));
};

export const getWeekdays = (locale = 'en-US', format: 'narrow' | 'short' = 'short') => {
  const sunday = new Date(1970, 0, 4);
  const daysFromSunday = getFirstDayOfWeek(locale);
  return Array.from({ length: 7 }, (_, k) => k).map((i) =>
    new Intl.DateTimeFormat(locale, { weekday: format }).format(addDays(sunday, daysFromSunday + i)),
  );
};

export const upperFirst = (str: string, locale: string) => str.charAt(0).toLocaleUpperCase(locale) + str.slice(1);
