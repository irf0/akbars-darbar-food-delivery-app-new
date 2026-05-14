import { TextProps as RNTextProps } from "react-native";
import { Colors } from "../../../theme";

export type TextVariant = "h1" | "h2" | "h3" | "h4" | "bodyLarge" | "body" | "label" | "caption" | "tiny";
export type TextWeight = "regular" | "medium" | "semibold" | "bold";
export type TextAlign = "left" | "center" | "right";
export type TextTransform = "none" | "uppercase" | "lowercase" | "capitalize";

export interface TextProps extends RNTextProps {
    variant?: TextVariant;
    weight?: TextWeight;
    color?: keyof Colors;
    align?: TextAlign;
    transform?: TextTransform;
    children: React.ReactNode;
}