import {createTheme} from "@vanilla-extract/css";

export const defaultTokens = {
  buttonBorderRadius: '10px',
  buttonGap: '8px',

  buttonSmallHeight: "36px",
  buttonSmallPadding: "0 16px",
  buttonSmallFontSize: "14px",

  buttonMediumHeight: "44px",
  buttonMediumPadding: "0 20px",
  buttonMediumFontSize: "15px",

  buttonLargeHeight: "52px",
  buttonLargePadding: "0 24px",
  buttonLargeFontSize: "16px",

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
};

export type ThemeTokens = typeof defaultTokens;

export const [defaultThemeClass, vars] = createTheme(defaultTokens);