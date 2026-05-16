import React, { useRef } from "react";
import {
    Pressable,
    ActivityIndicator,
    View,
    Animated,
} from "react-native";
import * as Haptics from "expo-haptics";

import { useTheme } from "@hooks/useTheme";
import { AppText } from "@ui/Text/AppText";
import { ButtonProps } from "./types";
import { styles } from "./styles";
import {
    getSizeTokens,
    getVariantContainerStyles,
    VARIANT_TEXT_COLOR,
} from "./constants";

export const AppButton = ({
    label,
    onPress,
    variant = "solid",
    size = "md",
    loading = false,
    disabled = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    style,
}: ButtonProps) => {
    const { colors, spacing, radius, fontSize } = useTheme();
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.96,
            useNativeDriver: true,
            speed: 50,
            bounciness: 4,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
            speed: 50,
            bounciness: 4,
        }).start();
    };

    const handlePress = async () => {
        if (disabled || loading) {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            return;
        }
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
    };

    const sizeTokens = getSizeTokens(spacing, fontSize)[size];
    const containerStyle = getVariantContainerStyles(colors, disabled)[variant];
    const textColor = disabled && variant !== "solid" && variant !== "danger"
        ? "textDisabled"
        : VARIANT_TEXT_COLOR[variant];

    return (
        <Animated.View style={[{ transform: [{ scale }] }, fullWidth && styles.fullWidth]}>
            <Pressable
                onPress={handlePress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={loading}
                accessible
                accessibilityRole="button"
                accessibilityLabel={label}
                accessibilityState={{ disabled: disabled || loading, busy: loading }}
                hitSlop={{ top: 8, bottom: 10, left: 8, right: 8 }}
                style={[
                    styles.base,
                    {
                        paddingVertical: sizeTokens.paddingVertical,
                        paddingHorizontal: sizeTokens.paddingHorizontal,
                        borderRadius: radius.md,
                        gap: sizeTokens.gap,
                        opacity: disabled ? 0.6 : 1,
                    },
                    containerStyle,
                    fullWidth && styles.fullWidth,
                    style,
                ]}
            >
                {!loading && leftIcon && (
                    <View style={styles.iconWrapper}>{leftIcon}</View>
                )}

                {loading ? (
                    <ActivityIndicator
                        size="small"
                        color={
                            variant === "solid" || variant === "danger"
                                ? colors.textInverse
                                : colors.primary
                        }
                    />
                ) : (
                    <AppText
                        variant="label"
                        weight="semibold"
                        color={textColor as any}
                        style={{ fontSize: sizeTokens.fontSize }}
                    >
                        {label}
                    </AppText>
                )}

                {!loading && rightIcon && (
                    <View style={styles.iconWrapper}>{rightIcon}</View>
                )}
            </Pressable>
        </Animated.View>
    );
};