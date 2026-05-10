import { TextVariant, TextWeight } from "./Text.types";
import { Theme } from "../../../theme";

export const getVariantStyles = (
    fontSize: Theme["fontSize"],
    lineHeight: Theme["lineHeight"],
    fontFamily: Theme["fontFamily"],
): Record<TextVariant, object> => ({
    h1: { fontSize: fontSize.h1, lineHeight: lineHeight.h1, fontFamily: fontFamily.bold },
    h2: { fontSize: fontSize.xxl, lineHeight: lineHeight.xxl, fontFamily: fontFamily.bold },
    h3: { fontSize: fontSize.xl, lineHeight: lineHeight.xl, fontFamily: fontFamily.semibold },
    h4: { fontSize: fontSize.lg, lineHeight: lineHeight.lg, fontFamily: fontFamily.semibold },
    bodyLarge: { fontSize: fontSize.md, lineHeight: lineHeight.md, fontFamily: fontFamily.regular },
    body: { fontSize: fontSize.base, lineHeight: lineHeight.base, fontFamily: fontFamily.regular },
    label: { fontSize: fontSize.sm, lineHeight: lineHeight.sm, fontFamily: fontFamily.medium },
    caption: { fontSize: fontSize.xs, lineHeight: lineHeight.xs, fontFamily: fontFamily.regular },
    tiny: { fontSize: fontSize.xs, lineHeight: lineHeight.xs, fontFamily: fontFamily.regular },
});

export const WEIGHT_TO_FONT: Record<TextWeight, keyof Theme["fontFamily"]> = {
    regular: "regular",
    medium: "medium",
    semibold: "semibold",
    bold: "bold",
};