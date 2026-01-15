import store from '@src/store';
import { Locale } from '@src/entities';

const LOCALE_SEPARATOR: Record<string, { grouping: string; decimal: string }> = {
  fr: {
    grouping: ' ',
    decimal: ',',
  },
};
['de', 'es', 'id', 'it', 'pt-BR'].forEach(
  (localeCode) =>
    (LOCALE_SEPARATOR[localeCode] = {
      grouping: '.',
      decimal: ',',
    }),
);

let groupingSeparator: string;
let groupingSeparatorRegexp: RegExp;
let decimalSeparator: string;
let validCharSet: Set<string>;
function resetNumberLocalizationSetting(locale: Locale) {
  // TODO prettier this type
  const newGroupingSeparator = LOCALE_SEPARATOR[locale]?.grouping || ',';
  const newDecimalSeparator = LOCALE_SEPARATOR[locale]?.decimal || '.';

  if (newGroupingSeparator === groupingSeparator && newDecimalSeparator === decimalSeparator) {
    return;
  }

  groupingSeparator = newGroupingSeparator;
  decimalSeparator = newDecimalSeparator;

  validCharSet = new Set([groupingSeparator, decimalSeparator, ...'0123456789']);
  groupingSeparatorRegexp = new RegExp(`\\${groupingSeparator}`, 'g');
}

resetNumberLocalizationSetting(store.get('config').locale);
store.onChange('config', ({ locale }) => resetNumberLocalizationSetting(locale));

export function sanitizeLocalizedNumber(localizedNumber: string) {
  let sanitized = '';
  let hasEncounteredDecimalSeparator = false;

  for (const char of localizedNumber) {
    if (!validCharSet.has(char)) {
      continue;
    }

    if (char === decimalSeparator) {
      if (hasEncounteredDecimalSeparator) {
        break;
      }
      hasEncounteredDecimalSeparator = true;
    }
    sanitized += char;
  }

  return sanitized;
}

export function parseLocalizedNumber(localizedNumber: string): number | null {
  const numberString = localizedNumber.replace(groupingSeparatorRegexp, '').replace(decimalSeparator, '.');
  return numberString ? Number(numberString) : null;
}

const EN_US_GROUPING_REGEXP = new RegExp(',', 'g');
export function formatToLocalizedNumber(number: number, precision?: number) {
  let parts: string[];
  if (typeof precision === 'number') {
    parts = number.toFixed(precision).split('.');
  } else {
    parts = String(number).split('.');
  }

  parts[0] = Number(parts[0]).toLocaleString('en-US').replace(EN_US_GROUPING_REGEXP, groupingSeparator);

  return parts.join(decimalSeparator);
}
