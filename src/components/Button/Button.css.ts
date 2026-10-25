import {style, styleVariants} from "@vanilla-extract/css";
import {vars} from "../../theme/theme.css.ts";

export const button = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.buttonGap,
  border: "none",
  borderRadius: vars.buttonBorderRadius,
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  letterSpacing: '-0.1px',
  lineHeight: '20px',
  cursor: "pointer",
  boxSizing: "border-box",
  selectors: {
    '&:disabled, &[aria-disabled="true"]': {
      opacity: 0.4,
      cursor: "not-allowed",
    }
  }
})

export const size = styleVariants({
  s: {
    height: vars.buttonSmallHeight,
    padding: vars.buttonSmallPadding,
    fontSize: vars.buttonSmallFontSize,
  },
  m: {
    height: vars.buttonMediumHeight,
    padding: vars.buttonMediumPadding,
    fontSize: vars.buttonMediumFontSize,
  },
  l: {
    height: vars.buttonLargeHeight,
    padding: vars.buttonLargePadding,
    fontSize: vars.buttonLargeFontSize,
  }
})

export const variant = styleVariants({
  fill: {
    backgroundColor: vars.buttonFillBg,
    boxShadow: vars.buttonFillBoxShadow,
    color: vars.buttonFillColor,
    '&:hover:not(:disabled):not([aria-disabled="true"]), &[data-hover]:not(:disabled):not([aria-disabled="true"])': {
      backgroundColor: vars.buttonFillBgHover,
    },
    '&:active:not(:disabled):not([aria-disabled="true"]), &[data-active]:not(:disabled):not([aria-disabled="true"])': {
      backgroundColor: vars.buttonFillBgActive,
      boxShadow: vars.buttonFillBoxShadowActive,
    }
  },
  outline: {
    backgroundColor: vars.buttonOutlineBg,
    color: vars.buttonOutlineColor,
    border: vars.buttonOutlineBorder,
    boxShadow: vars.buttonOutlineBoxShadow,
    '&:hover:not(:disabled):not([aria-disabled="true"]), &[data-hover]:not(:disabled):not([aria-disabled="true"])': {
      backgroundColor: vars.buttonOutlineBgHover,
    },
    '&:active:not(:disabled):not([aria-disabled="true"]), &[data-active]:not(:disabled):not([aria-disabled="true"])': {
      backgroundColor: vars.buttonOutlineBgActive,
      boxShadow: vars.buttonOutlineBoxShadowActive,
    }
  },
  text: {
    backgroundColor: vars.buttonTextBg,
    color: vars.buttonTextColor,
    boxShadow: vars.buttonTextBoxShadow,
    '&:hover:not(:disabled):not([aria-disabled="true"]), &[data-hover]:not(:disabled):not([aria-disabled="true"])': {
      backgroundColor: vars.buttonTextBgHover,
    },
    '&:active:not(:disabled):not([aria-disabled="true"]), &[data-active]:not(:disabled):not([aria-disabled="true"])': {
      backgroundColor: vars.buttonTextBgActive,
      boxShadow: vars.buttonTextBoxShadowActive,
    }
  }
})