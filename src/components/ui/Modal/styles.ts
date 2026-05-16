import { Dimensions, StyleSheet } from 'react-native'
import type { Theme } from '@theme'
import { MODAL_SIZE_MAP } from './constants'
import type { ModalSize } from './types'

const SCREEN_WIDTH = Dimensions.get('window').width

export const createModalStyles = (
    colors: Theme['colors'],
    size: ModalSize,
) => {
    const tokens = MODAL_SIZE_MAP[size]
    const modalWidth = Math.min(SCREEN_WIDTH * tokens.widthPercent, tokens.maxWidth)
    const isFull = size === 'full'

    return StyleSheet.create({
        overlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: isFull ? 'flex-end' : 'center',
            alignItems: 'center',
            zIndex: 1000,
        },
        container: {
            width: isFull ? '100%' : modalWidth,
            backgroundColor: colors.surface,
            borderRadius: tokens.borderRadius,
            overflow: 'hidden',
            ...(isFull && { marginTop: 60 }),
        },
        header: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: tokens.padding,
            paddingBottom: 12,
        },
        headerText: {
            flex: 1,
            paddingRight: 12,
        },
        title: {
            fontSize: 18,
            color: colors.text,
        },
        subtitle: {
            fontSize: 14,
            color: colors.textSecondary,
            marginTop: 4,
            lineHeight: 20,
        },
        closeBtn: {
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: colors.surfaceAlt,
            alignItems: 'center',
            justifyContent: 'center',
        },
        divider: {
            height: 1,
            backgroundColor: colors.border,
            marginHorizontal: tokens.padding,
        },
        body: {
            padding: tokens.padding,
        },
        footer: {
            padding: tokens.padding,
            paddingTop: 12,
            gap: 8,
        },
        actionBtn: {
            paddingVertical: 13,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
        },
    })
}