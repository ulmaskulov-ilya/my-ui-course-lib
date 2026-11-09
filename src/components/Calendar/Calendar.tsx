import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';

import { Button } from '../Button';
import * as styles from './Calendar.css.ts';
import type { CalendarProps } from './Calendar.types.ts';
import {
  formatDateLabel,
  formatDayNumber,
  formatFullDateLabel,
  formatMonthLabel,
  formatWeekdayLabel,
  useLocale,
} from './locale.ts';

const startOfDay = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const startOfMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const isSameDay = (first: Date, second: Date): boolean =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

const isSameMonth = (first: Date, second: Date): boolean =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth();

const addDays = (date: Date, amount: number): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);

const addMonths = (date: Date, amount: number): Date =>
  new Date(date.getFullYear(), date.getMonth() + amount, 1);

const daysInMonth = (date: Date): number =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

const shiftMonth = (date: Date, amount: number): Date => {
  const targetMonth = addMonths(date, amount);

  return new Date(
    targetMonth.getFullYear(),
    targetMonth.getMonth(),
    Math.min(date.getDate(), daysInMonth(targetMonth)),
  );
};

const clampDateToMonth = (date: Date, month: Date): Date =>
  new Date(
    month.getFullYear(),
    month.getMonth(),
    Math.min(date.getDate(), daysInMonth(month)),
  );

const startOfWeek = (date: Date, weekStartsOn: number): Date => {
  const offset = (date.getDay() - weekStartsOn + 7) % 7;

  return addDays(date, -offset);
};

const toDateKey = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate(),
  ).padStart(2, '0')}`;

function buildMonthWeeks(month: Date, weekStartsOn: number): Array<Array<Date | null>> {
  const firstDay = startOfMonth(month);
  const offset = (firstDay.getDay() - weekStartsOn + 7) % 7;
  const totalDays = daysInMonth(month);
  const cellsCount = Math.ceil((offset + totalDays) / 7) * 7;
  const cells: Array<Date | null> = [];

  for (let index = 0; index < cellsCount; index += 1) {
    const dayNumber = index - offset + 1;

    cells.push(
      dayNumber >= 1 && dayNumber <= totalDays
        ? new Date(month.getFullYear(), month.getMonth(), dayNumber)
        : null,
    );
  }

  const weeks: Array<Array<Date | null>> = [];

  for (let index = 0; index < cells.length; index += 7) {
    weeks.push(cells.slice(index, index + 7));
  }

  return weeks;
}

function ChevronIcon({ next = false }: { next?: boolean }) {
  const className = [styles.chevron, next ? styles.chevronNext : undefined]
    .filter(Boolean)
    .join(' ');

  return (
    <svg
      className={className}
      viewBox="0 0 8 12"
      width="8"
      height="12"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M6.5 1 1.5 6l5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="2"
        y="3"
        width="12"
        height="11"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M2 6.25h12" stroke="currentColor" strokeWidth="1.5" />
      <rect x="4.75" y="1.25" width="1.5" height="3.5" rx="0.75" fill="currentColor" />
      <rect x="9.75" y="1.25" width="1.5" height="3.5" rx="0.75" fill="currentColor" />
    </svg>
  );
}

export function Calendar({
  value,
  onValueChange,
  month,
  onMonthChange,
  minDate,
  maxDate,
  isDateDisabled,
  autoFocus = false,
  className,
}: CalendarProps) {
  const locale = useLocale();
  const { messages } = locale;
  const isRtl = locale.dir === 'rtl';
  const weekStartsOn = locale.firstDayOfWeek;
  const today = useMemo(() => startOfDay(new Date()), []);

  const isMonthControlled = month != null;
  const [innerMonth, setInnerMonth] = useState<Date>(() =>
    startOfMonth(month ?? value ?? today),
  );
  const shownMonth = startOfMonth(isMonthControlled ? month : innerMonth);

  const selectedDate = value ? startOfDay(value) : null;

  const [focusedDate, setFocusedDate] = useState<Date>(() =>
    startOfDay(value ?? today),
  );
  const shouldFocusDateRef = useRef(false);
  const autoFocusDoneRef = useRef(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const minTimestamp = minDate ? startOfDay(minDate).getTime() : null;
  const maxTimestamp = maxDate ? startOfDay(maxDate).getTime() : null;

  const isDisabled = (date: Date): boolean => {
    const timestamp = startOfDay(date).getTime();

    if (minTimestamp !== null && timestamp < minTimestamp) {
      return true;
    }

    if (maxTimestamp !== null && timestamp > maxTimestamp) {
      return true;
    }

    return isDateDisabled?.(startOfDay(date)) ?? false;
  };

  const findEnabledDate = (
    start: Date,
    step: (date: Date) => Date,
  ): Date | null => {
    let candidate = start;

    for (let index = 0; index < 366; index += 1) {
      if (!isDisabled(candidate)) {
        return candidate;
      }

      candidate = step(candidate);
    }

    return null;
  };

  const setMonth = (nextMonth: Date) => {
    const normalized = startOfMonth(nextMonth);

    if (!isMonthControlled) {
      setInnerMonth(normalized);
    }

    onMonthChange?.(normalized);
  };

  const navigateMonth = (delta: number) => {
    const nextMonth = addMonths(shownMonth, delta);
    const baseDate = isSameMonth(focusedDate, shownMonth)
      ? focusedDate
      : startOfMonth(shownMonth);

    setMonth(nextMonth);
    setFocusedDate(clampDateToMonth(baseDate, nextMonth));
  };

  const shownMonthKey = `${shownMonth.getFullYear()}-${shownMonth.getMonth()}`;

  useEffect(() => {
    if (!shouldFocusDateRef.current) {
      return;
    }

    shouldFocusDateRef.current = false;
    const key = toDateKey(focusedDate);
    const node = gridRef.current?.querySelector<HTMLButtonElement>(
      `[data-date="${key}"]`,
    );

    node?.focus();
  }, [focusedDate, shownMonthKey]);

  const handleDayKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    date: Date,
  ) => {
    const getNextDate = (): Date | null => {
      switch (event.key) {
        case 'ArrowLeft': {
          const step = isRtl ? 1 : -1;
          return findEnabledDate(addDays(date, step), (current) =>
            addDays(current, step),
          );
        }
        case 'ArrowRight': {
          const step = isRtl ? -1 : 1;
          return findEnabledDate(addDays(date, step), (current) =>
            addDays(current, step),
          );
        }
        case 'ArrowUp':
          return findEnabledDate(addDays(date, -7), (current) =>
            addDays(current, -7),
          );
        case 'ArrowDown':
          return findEnabledDate(addDays(date, 7), (current) =>
            addDays(current, 7),
          );
        case 'Home':
          return findEnabledDate(
            startOfWeek(date, weekStartsOn),
            (current) => addDays(current, 1),
          );
        case 'End':
          return findEnabledDate(
            addDays(startOfWeek(date, weekStartsOn), 6),
            (current) => addDays(current, -1),
          );
        case 'PageUp':
          return findEnabledDate(shiftMonth(date, -1), (current) =>
            addDays(current, -1),
          );
        case 'PageDown':
          return findEnabledDate(shiftMonth(date, 1), (current) =>
            addDays(current, 1),
          );
        default:
          return null;
      }
    };

    const nextDate = getNextDate();

    if (!nextDate) {
      return;
    }

    event.preventDefault();
    shouldFocusDateRef.current = true;
    setFocusedDate(nextDate);

    if (!isSameMonth(nextDate, shownMonth)) {
      setMonth(nextDate);
    }
  };

  const handleSelect = (date: Date) => {
    if (isDisabled(date)) {
      return;
    }

    const normalized = startOfDay(date);
    setFocusedDate(normalized);
    onValueChange(normalized);
  };

  const handleToday = () => {
    const currentDate = startOfDay(new Date());

    setMonth(startOfMonth(currentDate));
    setFocusedDate(currentDate);

    if (!isDisabled(currentDate)) {
      onValueChange(currentDate);
    }
  };

  const weeks = buildMonthWeeks(shownMonth, weekStartsOn);

  const weekdayHeaders = Array.from({ length: 7 }, (_, index) => {
    const weekdayIndex = (weekStartsOn + index) % 7;

    return {
      weekdayIndex,
      label: formatWeekdayLabel(weekdayIndex, locale),
      isWeekend: locale.weekend.includes(weekdayIndex),
    };
  });

  const firstEnabledDate = findEnabledDate(startOfMonth(shownMonth), (date) =>
    addDays(date, 1),
  );
  const fallbackFocusDate =
    selectedDate && isSameMonth(selectedDate, shownMonth) && !isDisabled(selectedDate)
      ? selectedDate
      : (firstEnabledDate ?? startOfMonth(shownMonth));
  const tabbableDate =
    isSameMonth(focusedDate, shownMonth) && !isDisabled(focusedDate)
      ? focusedDate
      : fallbackFocusDate;
  const tabbableKey = toDateKey(tabbableDate);

  useEffect(() => {
    if (!autoFocus || autoFocusDoneRef.current) {
      return;
    }

    const node = gridRef.current?.querySelector<HTMLButtonElement>(
      `[data-date="${tabbableKey}"]`,
    );

    if (node) {
      autoFocusDoneRef.current = true;
      node.focus();
    }
  }, [autoFocus, tabbableKey]);

  return (
    <div
      className={[styles.calendar, className].filter(Boolean).join(' ')}
      dir={locale.dir}
      lang={locale.locale}
      role="group"
      aria-label={formatMonthLabel(shownMonth, locale)}
    >
      <div className={styles.header}>
        <button
          type="button"
          className={styles.navButton}
          aria-label={messages.calendar.prevMonth}
          onClick={() => navigateMonth(-1)}
        >
          <ChevronIcon />
        </button>

        <div className={styles.monthLabel} aria-live="polite">
          {formatMonthLabel(shownMonth, locale)}
        </div>

        <button
          type="button"
          className={styles.navButton}
          aria-label={messages.calendar.nextMonth}
          onClick={() => navigateMonth(1)}
        >
          <ChevronIcon next />
        </button>
      </div>

      <div className={styles.weekdays} aria-hidden="true">
        {weekdayHeaders.map((header) => (
          <div
            key={header.weekdayIndex}
            className={[
              styles.weekday,
              header.isWeekend ? styles.weekdayWeekend : undefined,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {header.label}
          </div>
        ))}
      </div>

      <div className={styles.weeks} ref={gridRef}>
        {weeks.map((week, weekIndex) => (
          <div className={styles.week} key={weekIndex}>
            {week.map((date, dayIndex) => {
              if (!date) {
                return (
                  <div
                    key={`empty-${weekIndex}-${dayIndex}`}
                    className={styles.dayCell}
                    aria-hidden="true"
                  />
                );
              }

              const key = toDateKey(date);
              const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
              const isToday = isSameDay(date, today);
              const isWeekend = locale.weekend.includes(date.getDay());
              const disabled = isDisabled(date);

              const dayClassName = [
                styles.dayButton,
                isWeekend ? styles.dayWeekend : undefined,
                isToday ? styles.dayToday : undefined,
                isSelected ? styles.daySelected : undefined,
                disabled ? styles.dayDisabled : undefined,
              ]
                .filter(Boolean)
                .join(' ');

              const dotClassName = [
                styles.dayDot,
                isToday ? styles.dayDotVisible : undefined,
                isToday && isSelected ? styles.dayDotSelected : undefined,
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <div key={key} className={styles.dayCell}>
                  <button
                    type="button"
                    className={dayClassName}
                    data-date={key}
                    tabIndex={key === tabbableKey ? 0 : -1}
                    disabled={disabled}
                    aria-pressed={isSelected}
                    aria-current={isToday ? 'date' : undefined}
                    aria-label={formatFullDateLabel(date, locale)}
                    onClick={() => handleSelect(date)}
                    onKeyDown={(event) => handleDayKeyDown(event, date)}
                  >
                    <span>{formatDayNumber(date, locale)}</span>
                    <span className={dotClassName} aria-hidden="true" />
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className={styles.divider} />

      <div className={styles.footer}>
        <span className={styles.footerDate}>
          {selectedDate ? formatDateLabel(selectedDate, locale) : ''}
        </span>

        <Button
          variant="outline"
          size="s"
          icon={<CalendarIcon />}
          onClick={handleToday}
        >
          {messages.calendar.today}
        </Button>
      </div>
    </div>
  );
}
