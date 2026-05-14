import { useTheme } from '@hooks/useTheme'
import { View, Text, TextInput, Animated, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import Feather from '@expo/vector-icons/Feather'
import { DISABLED_OPACITY, FOCUS_ANIMATION, getInputContainerStyle } from './constants'
import { InputProps } from './types'
import { inputStyles } from './styles'

const Input = ({ label, error, disabled, ...rest }: InputProps) => {
    const { colors, fontSize, fontFamily } = useTheme()
    const [isFocused, setIsFocused] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const borderColors = getInputContainerStyle(colors)
    const borderColor = error ? borderColors.error : isFocused ? borderColors.focused : borderColors.default

    const borderAnim = useRef(new Animated.Value(0)).current

    const handleFocus = () => {
        setIsFocused(true)
        Animated.timing(borderAnim, {
            toValue: 1,
            duration: FOCUS_ANIMATION.duration,
            useNativeDriver: false,
        }).start()
    }

    const handleBlur = () => {
        setIsFocused(false)
        Animated.timing(borderAnim, {
            toValue: 0,
            duration: FOCUS_ANIMATION.duration,
            useNativeDriver: false,
        }).start()
    }

    const animatedBorderColor = borderAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [borderColors.default, borderColors.focused],
    })

    return (
        // ✅ correct structure
        <View style={[inputStyles.container, { opacity: disabled ? DISABLED_OPACITY : 1 }]}>

            {label && (
                <Text style={[inputStyles.label, { color: colors.text, fontFamily: fontFamily.medium, fontSize: fontSize.sm }]}>
                    {label}
                </Text>
            )}

            <Animated.View style={[inputStyles.inputBox, {
                borderColor: error ? borderColors.error : animatedBorderColor
            }]}>
                <TextInput
                    style={[inputStyles.input, { color: colors.text, fontFamily: fontFamily.regular }]}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    editable={!disabled}
                    placeholderTextColor={colors.textDisabled}
                    {...rest}
                    secureTextEntry={rest.secureTextEntry ? !isPasswordVisible : false}
                />

                {rest.secureTextEntry && (
                    <Pressable
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <Feather
                            name={isPasswordVisible ? "eye" : "eye-off"}
                            size={18}
                            color={colors.textSecondary}
                        />
                    </Pressable>
                )}
            </Animated.View>

            {error && (
                <Text style={[inputStyles.errorText, { color: colors.error, fontFamily: fontFamily.regular, fontSize: fontSize.xs }]}>
                    {error}
                </Text>
            )}

        </View>
    )
}

export default Input

