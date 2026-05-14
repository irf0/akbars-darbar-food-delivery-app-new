import React from "react";
import { Text as RNText, StyleSheet } from "react-native";
import { useTheme } from "@hooks/useTheme";
import { TextProps } from "./types";
import { getVariantStyles, WEIGHT_TO_FONT } from "./constants";

export const Text = ({
    variant = "body",
    weight,
    color = "text",
    align = "left",
    transform = "none",
    style,
    children,
    ...rest
}: TextProps) => {
    const { colors, fontSize, lineHeight, fontFamily } = useTheme();

    const variantStyle = getVariantStyles(fontSize, lineHeight, fontFamily)[variant];
    const weightStyle = weight ? { fontFamily: fontFamily[WEIGHT_TO_FONT[weight]] } : {};

    return (
        <RNText
            style={[
                variantStyle,
                weightStyle,
                {
                    color: colors[color],
                    textAlign: align,
                    textTransform: transform,
                },
                style,
            ]}
            {...rest}
        >
            {children}
        </RNText>
    );
};