import { StyleSheet } from 'react-native'
import { LOADER_SIZE_MAP } from './constants'
import type { LoaderSize } from './types'

export const createLoaderStyles = (size: LoaderSize, color: string) => {
    const tokens = LOADER_SIZE_MAP[size]

    return StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        spinnerRing: {
            width: tokens.spinnerSize,
            height: tokens.spinnerSize,
            borderRadius: tokens.spinnerSize / 2,
            borderWidth: tokens.spinnerSize * 0.1,
            borderColor: color + '30',       // faint full ring
            borderTopColor: color,           // solid leading edge
        },
        dotsRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.dotGap,
        },
        dot: {
            width: tokens.dotSize,
            height: tokens.dotSize,
            borderRadius: tokens.dotSize / 2,
            backgroundColor: color,
        },
        pulseCircle: {
            width: tokens.spinnerSize,
            height: tokens.spinnerSize,
            borderRadius: tokens.spinnerSize / 2,
            backgroundColor: color,
        },
        label: {
            marginTop: tokens.labelGap,
            fontSize: tokens.fontSize,
            color,
        },
    })
}