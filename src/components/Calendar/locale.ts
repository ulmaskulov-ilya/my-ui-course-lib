import { createContext, useContext } from 'react';

export type Locale = {
  locale: string;
  dir: 'ltr' | 'rtl';
  firstDayOfWeek: number;
  weekend: number[];
  messages: {
    calendar: {
      today: string;
      prevMonth: string;
      nextMonth: string;
    };
  };
};

export const ruRU: Locale = {
  locale: 'ru-RU',
  dir: 'ltr',
  firstDayOfWeek: 1,
  weekend: [6, 0],
  messages: {
    calendar: {
      today: 'Сегодня',
      prevMonth: 'Предыдущий месяц',
      nextMonth: 'Следующий месяц',
    },
  },
};

export const enUS: Locale = {
  locale: 'en-US',
  dir: 'ltr',
  firstDayOfWeek: 0,
  weekend: [6, 0],
  messages: {
    calendar: {
      today: 'Today',
      prevMonth: 'Previous month',
      nextMonth: 'Next month',
    },
  },
};

export const arEG: Locale = {
  locale: 'ar-EG',
  dir: 'rtl',
  firstDayOfWeek: 6,
  weekend: [5, 6],
  messages: {
    calendar: {
      today: 'اليوم',
      prevMonth: 'الشهر السابق',
      nextMonth: 'الشهر التالي',
    },
  },
};

export const allLocales: Locale[] = [ruRU, enUS, arEG];

export const LocaleContext = createContext<Locale>(ruRU);

export const useLocale = () => useContext(LocaleContext);

const formatterCache = new Map<string, Intl.DateTimeFormat>();

function getFormatter(
  locale: Locale,
  key: string,
  options: Intl.DateTimeFormatOptions,
): Intl.DateTimeFormat {
  const cacheKey = `${locale.locale}:${key}`;
  const cached = formatterCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const formatter = new Intl.DateTimeFormat(locale.locale, {
    calendar: 'gregory',
    ...options,
  });
  formatterCache.set(cacheKey, formatter);

  return formatter;
}

function stripYearSuffix(value: string): string {
  return value.replace(/\s*г\.\s*$/u, '').trim();
}

function capitalize(value: string, locale: string): string {
  if (!value) {
    return value;
  }

  return value.charAt(0).toLocaleUpperCase(locale) + value.slice(1);
}

export function formatMonthLabel(date: Date, locale: Locale): string {
  const formatter = getFormatter(locale, 'month', {
    month: 'long',
    year: 'numeric',
  });

  return capitalize(stripYearSuffix(formatter.format(date)), locale.locale);
}

export function formatDateLabel(date: Date, locale: Locale): string {
  const formatter = getFormatter(locale, 'date', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return stripYearSuffix(formatter.format(date));
}

export function formatDayNumber(date: Date, locale: Locale): string {
  return getFormatter(locale, 'day', { day: 'numeric' }).format(date);
}

export function formatFullDateLabel(date: Date, locale: Locale): string {
  return getFormatter(locale, 'full', { dateStyle: 'full' }).format(date);
}

export function formatWeekdayLabel(weekdayIndex: number, locale: Locale): string {
  const formatter = getFormatter(locale, 'weekday', {
    weekday: locale.locale.startsWith('ar') ? 'narrow' : 'short',
  });
  const referenceDate = new Date(2024, 0, 7 + weekdayIndex);

  return formatter.format(referenceDate);
}
