import { StyleSheet } from 'react-native'
import { LOGO_BORDER_RADIUS, LOGO_FONT_SIZE, } from './constants'

const LOGO_SIZE = LOGO_FONT_SIZE
export const splashStyles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    content: {
        alignItems: 'center',
    },
    logoBox: {
        width: LOGO_SIZE,
        height: LOGO_SIZE,
        borderRadius: LOGO_BORDER_RADIUS,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    logoText: {
        fontSize: LOGO_SIZE,
        fontWeight: '700',
    },
    appName: {
        marginBottom: 8,
    },
    tagline: {
        opacity: 0.8,
    },
})