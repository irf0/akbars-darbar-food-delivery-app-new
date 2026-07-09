import { lightColors } from './colors';
import { fontFamily, fontSize, lineHeight, fontWeight } from './typography';
import { spacing, radius, shadow } from './spacing';
import { layout } from './layout';

const base = {
  colors: lightColors,
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  spacing,
  radius,
  shadow,
  layout,
};

export const theme = base;

export type Theme = typeof base;
export type Colors = typeof lightColors;
