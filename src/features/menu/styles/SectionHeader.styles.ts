import { Platform, StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    listContent: {
        paddingBottom: 40,
    },
    headerContainer: {
        // Semi-transparent background for a modern, high-end "glass" look when sticky
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 14,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',

        // Luxury brands use soft, deep ambient shadows rather than harsh borders
        ...Platform.select({
            ios: {
                shadowColor: '#070b12',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.03,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    leftColumn: {
        flexDirection: 'column',
        gap: 3, // Modern structural layout spacing
    },
    headerTitle: {
        fontSize: 21,
        // Uses ultra-bold weight and tight tracking characteristic of premium editorial UI
        fontWeight: '900',
        color: '#090a0f',
        letterSpacing: -0.6,
    },
    metaText: {
        fontSize: 11,
        fontWeight: '500',
        color: '#8b8e99',
        textTransform: 'uppercase',
        letterSpacing: 0.8, // Elegant tracking on smaller uppercase text
    },
    minimalistDivider: {
        height: 24,
        width: 3,
        borderRadius: 1.5,
        backgroundColor: '#10b981', // Emerald green luxury accent (change to #fc8019 if you prefer brand orange)
        marginBottom: 4,
    },
})
