import { style } from '@vanilla-extract/css';

import { vars } from '../../theme/theme.css.ts';

export const calendar = style({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.calendarGap,
  width: vars.calendarWidth,
  padding: vars.calendarPadding,
  background: vars.calendarBg,
  border: vars.calendarBorder,
  borderRadius: vars.calendarRadius,
  color: vars.calendarText,
  fontFamily: vars.fontFamily,
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  minHeight: vars.calendarNavSize,
  gap: vars.calendarGap,
});

export const navButton = style({
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 'none',
  width: vars.calendarNavSize,
  height: vars.calendarNavSize,
  padding: 0,
  background: vars.calendarNavBg,
  border: vars.calendarNavBorder,
  borderRadius: vars.calendarNavRadius,
  color: vars.calendarNavColor,
  cursor: 'pointer',
  transition: 'background-color 120ms ease',
  selectors: {
    '&:hover': {
      background: vars.calendarNavHoverBg,
    },
    '&:active': {
      background: vars.calendarNavActiveBg,
    },
    '&:focus-visible': {
      outline: `${vars.calendarFocusRingWidth} solid ${vars.calendarFocusRing}`,
      outlineOffset: vars.calendarFocusRingOffset,
    },
  },
});

export const chevron = style({
  display: 'block',
  flex: 'none',
  width: vars.calendarChevronWidth,
  height: vars.calendarChevronHeight,
  selectors: {
    '[dir="rtl"] &': {
      transform: 'scaleX(-1)',
    },
  },
});

export const chevronNext = style({
  transform: 'scaleX(-1)',
  selectors: {
    '[dir="rtl"] &': {
      transform: 'none',
    },
  },
});

export const monthLabel = style({
  flex: 1,
  margin: 0,
  textAlign: 'center',
  fontSize: vars.calendarMonthFontSize,
  lineHeight: vars.calendarMonthLineHeight,
  fontWeight: vars.calendarMonthFontWeight,
  whiteSpace: 'nowrap',
});

export const weekdays = style({
  display: 'grid',
  gridTemplateColumns: `repeat(7, ${vars.calendarDaySize})`,
  alignItems: 'center',
  height: vars.calendarWeekdayHeight,
});

export const weekday = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: vars.calendarWeekdayFontSize,
  lineHeight: vars.calendarWeekdayLineHeight,
  fontWeight: vars.calendarWeekdayFontWeight,
  color: vars.calendarTextMuted,
});

export const weekdayWeekend = style({
  color: vars.calendarWeekend,
});

export const weeks = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.calendarWeeksGap,
});

export const week = style({
  display: 'grid',
  gridTemplateColumns: `repeat(7, ${vars.calendarDaySize})`,
});

export const dayCell = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: vars.calendarDaySize,
  height: vars.calendarDaySize,
});

export const dayButton = style({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: vars.calendarDayGap,
  width: vars.calendarDaySize,
  height: vars.calendarDaySize,
  padding: 0,
  background: 'transparent',
  border: 'none',
  borderRadius: vars.calendarDayRadius,
  color: vars.calendarText,
  fontFamily: 'inherit',
  fontSize: vars.calendarDayFontSize,
  lineHeight: vars.calendarDayLineHeight,
  fontWeight: vars.calendarDayFontWeight,
  cursor: 'pointer',
  transition: 'background-color 120ms ease, color 120ms ease',
  selectors: {
    '&:hover': {
      background: vars.calendarHoverBg,
    },
    '&:active': {
      background: vars.calendarActiveBg,
    },
    '&:focus-visible': {
      outline: `${vars.calendarFocusRingWidth} solid ${vars.calendarFocusRing}`,
      outlineOffset: vars.calendarFocusRingOffsetInset,
    },
  },
});

export const dayWeekend = style({
  color: vars.calendarWeekend,
});

export const dayToday = style({
  fontWeight: vars.calendarDayFontWeightStrong,
});

export const daySelected = style({
  background: vars.calendarSelectedBg,
  color: vars.calendarSelectedText,
  fontWeight: vars.calendarDayFontWeightStrong,
  selectors: {
    '&:hover': {
      background: vars.calendarSelectedBg,
    },
    '&:active': {
      background: vars.calendarSelectedBg,
    },
    '&:focus-visible': {
      outlineColor: vars.calendarSelectedText,
    },
  },
});

export const dayDisabled = style({
  background: 'transparent',
  color: vars.calendarDisabled,
  cursor: 'not-allowed',
  selectors: {
    '&:hover': {
      background: 'transparent',
    },
    '&:active': {
      background: 'transparent',
    },
  },
});

export const dayDot = style({
  flex: 'none',
  width: vars.calendarTodayDotSize,
  height: vars.calendarTodayDotSize,
  borderRadius: vars.calendarTodayDotRadius,
  background: 'transparent',
});

export const dayDotVisible = style({
  background: vars.calendarTodayDot,
});

export const dayDotSelected = style({
  background: vars.calendarTodayDotSelected,
});

export const divider = style({
  width: '100%',
  height: vars.calendarDividerHeight,
  flex: 'none',
  background: vars.calendarDivider,
});

export const footer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  minHeight: vars.calendarNavSize,
  gap: vars.calendarGap,
});

export const footerDate = style({
  fontSize: vars.calendarFooterFontSize,
  lineHeight: vars.calendarFooterLineHeight,
  color: vars.calendarTextMuted,
});
