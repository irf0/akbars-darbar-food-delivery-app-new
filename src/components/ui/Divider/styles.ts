import { StyleSheet } from 'react-native'
import type { Theme } from '@theme'
import { DIVIDER_LABEL_GAP, DIVIDER_THICKNESS } from './constants'
import type { DividerVariant } from './types'

export const createDividerStyles = (
    colors: Theme['colors'],
    typography: Pick<Theme, 'fontSize' | 'fontFamily' | 'fontWeight'>,
    overrideColor?: string,
    variant: DividerVariant = 'solid',
) => {
    const borderColor = overrideColor ?? colors.border
    const borderStyle = variant // RN supports 'solid' | 'dashed' | 'dotted' natively

    return StyleSheet.create({
        // ─── Horizontal ──────────────────────────────────────────────
        horizontalContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
        },
        horizontalLine: {
            height: DIVIDER_THICKNESS,
            borderBottomWidth: DIVIDER_THICKNESS,
            borderColor,
            borderStyle,
        },

        // ─── Vertical ────────────────────────────────────────────────
        verticalContainer: {
            flexDirection: 'column',
            alignItems: 'center',
            // Height is intentionally NOT set here.
            // Consumers embed this in a flex row; alignSelf: 'stretch' (below)
            // makes it fill the parent's cross-axis automatically.
            alignSelf: 'stretch',
        },
        verticalLine: {
            flex: 1,
            width: DIVIDER_THICKNESS,
            borderLeftWidth: DIVIDER_THICKNESS,
            borderColor,
            borderStyle,
        },

        // ─── Label ───────────────────────────────────────────────────
        labelWrapper: {
            marginHorizontal: DIVIDER_LABEL_GAP,
        },
        labelText: {
            fontSize: typography.fontSize.xs,
            fontFamily: typography.fontFamily.regular,
            fontWeight: typography.fontWeight.medium as any,
            color: colors.textSecondary,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
        },
    })
}