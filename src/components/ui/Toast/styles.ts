import { StyleSheet } from 'react-native'
import { TOAST_OFFSET } from './constants'

export const toastStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 16,
        right: 16,
        zIndex: 9999,
    },
    topPosition: {
        top: TOAST_OFFSET,
    },
    bottomPosition: {
        bottom: TOAST_OFFSET,
    },
    toast: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderLeftWidth: 4,
        gap: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 8,
    },
    iconCircle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    textCol: {
        flex: 1,
        gap: 2,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
    },
    subtitle: {
        fontSize: 13,
        opacity: 0.8,
    },
    actionBtn: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        flexShrink: 0,
    },
    actionText: {
        fontSize: 12,
        fontWeight: '600',
    },
    dismissBtn: {
        padding: 4,
        flexShrink: 0,
    },
})