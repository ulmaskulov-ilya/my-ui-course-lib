import { createGlobalTheme } from '@vanilla-extract/css';

export const defaultTokens = {
  fontFamily:
    "'Inter', 'Noto Sans Arabic'",

  buttonBorderRadius: '10px',
  buttonGap: '8px',

  buttonSmallHeight: '36px',
  buttonSmallPadding: '0 16px',
  buttonSmallFontSize: '14px',

  buttonMediumHeight: '44px',
  buttonMediumPadding: '0 20px',
  buttonMediumFontSize: '15px',

  buttonLargeHeight: '52px',
  buttonLargePadding: '0 24px',
  buttonLargeFontSize: '16px',

  buttonIconSize: '16px',
  buttonIconPaddingInlineStartS: '12px',
  buttonIconPaddingInlineEndS: '16px',
  buttonIconPaddingInlineStartM: '16px',
  buttonIconPaddingInlineEndM: '20px',
  buttonIconPaddingInlineStartL: '20px',
  buttonIconPaddingInlineEndL: '24px',

  buttonFillBg: '#17171b',
  buttonFillBoxShadow: '0 1px 2px rgba(0, 0, 0, 0.0784314)',
  buttonFillColor: '#ffffff',

  buttonFillBgHover: '#2d2d33',

  buttonFillBgActive: '#050506',
  buttonFillBoxShadowActive: 'none',

  buttonOutlineBg: 'transparent',
  buttonOutlineColor: '#17171b',
  buttonOutlineBorder: '1px solid #17171b',
  buttonOutlineBoxShadow: '0 1px 2px rgba(0, 0, 0, 0.0784314)',

  buttonOutlineBgHover: '#f4f4f5',

  buttonOutlineBgActive: '#e7e7ea',
  buttonOutlineBoxShadowActive: 'none',

  buttonTextBg: 'transparent',
  buttonTextColor: '#17171b',
  buttonTextBoxShadow: '0 1px 2px rgba(0, 0, 0, 0.0784314)',

  buttonTextBgHover: '#f4f4f5',

  buttonTextBgActive: '#e7e7ea',
  buttonTextBoxShadowActive: 'none',

  calendarWidth: '286px',
  calendarPadding: '16px',
  calendarGap: '12px',
  calendarRadius: '12px',
  calendarBorder: '1px solid #e4e4e7',
  calendarBg: '#ffffff',
  calendarText: '#18181b',
  calendarTextMuted: '#8e8e93',
  calendarWeekend: '#a1a1aa',
  calendarDisabled: '#d4d4d8',
  calendarOutside: '#c4c4ca',
  calendarDivider: '#e4e4e7',
  calendarDividerHeight: '1px',
  calendarFocusRing: '#18181b',
  calendarFocusRingWidth: '2px',
  calendarFocusRingOffset: '2px',
  calendarFocusRingOffsetInset: '-2px',

  calendarHoverBg: '#f4f4f5',
  calendarActiveBg: '#e4e4e7',
  calendarSelectedBg: '#18181b',
  calendarSelectedText: '#ffffff',
  calendarTodayDot: '#18181b',
  calendarTodayDotSelected: '#ffffff',

  calendarNavSize: '36px',
  calendarNavRadius: '8px',
  calendarNavBg: '#ffffff',
  calendarNavColor: '#18181b',
  calendarNavBorder: '1px solid #18181b',
  calendarNavHoverBg: '#f4f4f5',
  calendarNavActiveBg: '#e4e4e7',
  calendarChevronWidth: '8px',
  calendarChevronHeight: '12px',

  calendarMonthFontSize: '15px',
  calendarMonthLineHeight: 'normal',
  calendarMonthFontWeight: '600',

  calendarWeekdayHeight: '28px',
  calendarWeekdayFontSize: '11px',
  calendarWeekdayLineHeight: 'normal',
  calendarWeekdayFontWeight: '500',

  calendarDaySize: '36px',
  calendarDayRadius: '8px',
  calendarDayFontSize: '14px',
  calendarDayLineHeight: 'normal',
  calendarDayFontWeight: '400',
  calendarDayFontWeightStrong: '600',
  calendarDayGap: '1px',

  calendarTodayDotSize: '4px',
  calendarTodayDotRadius: '50%',

  calendarWeeksGap: '4px',

  calendarFooterFontSize: '13px',
  calendarFooterLineHeight: 'normal',

  calendarPageBg: '#f4f4f5',
  calendarPageText: '#18181b',
};

export type ThemeTokens = typeof defaultTokens;

export const vars = createGlobalTheme(':root', defaultTokens);

const darkOverrides: Partial<ThemeTokens> = {
  buttonFillBg: '#fafafa',
  buttonFillColor: '#18181b',
  buttonFillBgHover: '#e4e4e7',
  buttonFillBgActive: '#d4d4d8',
  buttonFillBoxShadow: '0 1px 2px rgba(0, 0, 0, 0.4)',

  buttonOutlineColor: '#fafafa',
  buttonOutlineBorder: '1px solid #fafafa',
  buttonOutlineBoxShadow: 'none',
  buttonOutlineBgHover: '#27272a',
  buttonOutlineBgActive: '#3f3f46',

  buttonTextColor: '#fafafa',
  buttonTextBgHover: '#27272a',
  buttonTextBgActive: '#3f3f46',

  calendarBorder: '1px solid #2d2d33',
  calendarBg: '#18181b',
  calendarText: '#fafafa',
  calendarTextMuted: '#a1a1aa',
  calendarWeekend: '#71717a',
  calendarDisabled: '#52525b',
  calendarOutside: '#3f3f46',
  calendarDivider: '#2d2d33',
  calendarFocusRing: '#fafafa',

  calendarHoverBg: '#27272a',
  calendarActiveBg: '#3f3f46',
  calendarSelectedBg: '#fafafa',
  calendarSelectedText: '#18181b',
  calendarTodayDot: '#fafafa',
  calendarTodayDotSelected: '#18181b',

  calendarNavBg: 'transparent',
  calendarNavColor: '#fafafa',
  calendarNavBorder: '1px solid #fafafa',
  calendarNavHoverBg: '#27272a',
  calendarNavActiveBg: '#3f3f46',

  calendarPageBg: '#09090b',
  calendarPageText: '#fafafa',
};

export const darkTokens: ThemeTokens = {
  ...defaultTokens,
  ...darkOverrides,
};

createGlobalTheme('[data-theme="dark"]', vars, darkTokens);
