import React, { createContext, useContext, useMemo, useRef } from 'react'
import {
    Animated,
    Image,
    Pressable,
    View,
} from 'react-native'
import { useTheme } from '@hooks/useTheme'
import { Text } from '@ui/Text'
import {
    CARD_ANIMATION_DURATION,
    CARD_PRESS_SCALE,
    DEFAULTS,
} from './constants'
import { createCardStyles } from './styles'
import type {
    CardBodyProps,
    CardFooterProps,
    CardImageProps,
    CardProps,
    CardSubtitleProps,
    CardTitleProps,
} from './types'

// ─── Context ─────────────────────────────────────────────────────────────────
// Sub-components need access to the resolved styles without prop-drilling.

interface CardContextValue {
    styles: ReturnType<typeof createCardStyles>
}

const CardContext = createContext<CardContextValue | null>(null)

const useCardContext = () => {
    const ctx = useContext(CardContext)
    if (!ctx) throw new Error('Card sub-components must be used inside <Card>')
    return ctx
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const CardImage: React.FC<CardImageProps> = ({ source, aspectRatio = 16 / 9, style }) => {
    const { styles } = useCardContext()
    return (
        <Image
            source={source}
            style={[styles.image, { aspectRatio }, style]}
            resizeMode="cover"
        />
    )
}

const CardBody: React.FC<CardBodyProps> = ({ children, style }) => {
    const { styles } = useCardContext()
    return <View style={[styles.body, style]}>{children}</View>
}

const CardFooter: React.FC<CardFooterProps> = ({ children, style }) => {
    const { styles } = useCardContext()
    return (
        <View style={[styles.footer, styles.footerDivider, style]}>
            {children}
        </View>
    )
}

const CardTitle: React.FC<CardTitleProps> = ({ children, style }) => {
    const { styles } = useCardContext()
    return (
        <View style={[styles.title, style]}>
            <Text variant="h4" weight="semibold">
                {children}
            </Text>
        </View>
    )
}

const CardSubtitle: React.FC<CardSubtitleProps> = ({ children, style }) => {
    const { styles } = useCardContext()
    return (
        <View style={[styles.subtitle, style]}>
            <Text variant='body' color="secondary">
                {children}
            </Text>
        </View>
    )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

interface CardComponent extends React.FC<CardProps> {
    Image: typeof CardImage
    Body: typeof CardBody
    Footer: typeof CardFooter
    Title: typeof CardTitle
    Subtitle: typeof CardSubtitle
}

const AppCard: CardComponent = ({
    variant = DEFAULTS.variant,
    size = DEFAULTS.size,
    onPress,
    disabled = false,
    style,
    children,
}) => {
    const { colors, spacing, radius, shadow } = useTheme()

    const styles = useMemo(
        () => createCardStyles(colors, spacing, radius, shadow, variant, size),
        [colors, spacing, radius, shadow, variant, size],
    )

    const scale = useRef(new Animated.Value(1)).current

    const handlePressIn = () => {
        Animated.timing(scale, {
            toValue: CARD_PRESS_SCALE,
            duration: CARD_ANIMATION_DURATION,
            useNativeDriver: true,
        }).start()
    }

    const handlePressOut = () => {
        Animated.timing(scale, {
            toValue: 1,
            duration: CARD_ANIMATION_DURATION,
            useNativeDriver: true,
        }).start()
    }

    const content = (
        <CardContext.Provider value={{ styles }}>
            <Animated.View style={[styles.card, { transform: [{ scale }] }, style]}>
                {children}
            </Animated.View>
        </CardContext.Provider>
    )

    if (onPress) {
        return (
            <Pressable
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={disabled}
                accessibilityRole="button"
            >
                {content}
            </Pressable>
        )
    }

    return content
}

AppCard.Image = CardImage
AppCard.Body = CardBody
AppCard.Footer = CardFooter
AppCard.Title = CardTitle
AppCard.Subtitle = CardSubtitle

export { AppCard }
export default AppCard