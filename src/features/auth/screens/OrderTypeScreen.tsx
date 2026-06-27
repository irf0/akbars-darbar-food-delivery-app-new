import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCartStore } from '@store/cart/useCartStore'
import { theme } from '@theme'
import { useOrderTypeStore } from '@store/orderType/useOrderTypeStore'

const t = theme

const OPTIONS = [
    {
        type: 'delivery' as const,
        emoji: '🛵',
        label: 'Delivery',
        subtitle: 'Get it delivered to your door',
    },
    {
        type: 'takeaway' as const,
        emoji: '🥡',
        label: 'Takeaway',
        subtitle: 'Pick it up from the restaurant',
    },
]

const OrderTypeScreen = () => {
    const { setOrderType, orderType } = useOrderTypeStore()
    console.log(orderType)

    return (
        <SafeAreaView style={styles.container} edges={['top']}>

            {/* ── Hero Banner — matches HomeScreen hero ── */}
            <View style={styles.hero}>
                <Text style={styles.heroRestaurant}>Akbar's Darbar</Text>
                <Text style={styles.heroTagline}>✦ Enjoy the Royale Taste ✦</Text>
                <View style={styles.heroDivider} />
                <Text style={styles.heroWelcome}>Welcome back! How would{'\n'}you like your order today?</Text>
            </View>

            {/* ── Cards ── */}
            <View style={styles.cardsContainer}>
                {OPTIONS.map(({ type, emoji, label, subtitle }) => (
                    <TouchableOpacity
                        key={type}
                        style={styles.card}
                        onPress={() => setOrderType(type)}
                        activeOpacity={0.85}
                    >
                        {/* Icon area — red box like the + button in BestSeller cards */}
                        <View style={styles.cardIconBox}>
                            <Text style={styles.cardEmoji}>{emoji}</Text>
                        </View>

                        {/* Text */}
                        <View style={styles.cardText}>
                            <Text style={styles.cardLabel}>{label}</Text>
                            <Text style={styles.cardSubtitle}>{subtitle}</Text>
                        </View>

                        {/* Arrow — red like "See all" / "View all" in HomeScreen */}
                        <Text style={styles.cardArrow}>›</Text>
                    </TouchableOpacity>
                ))}
            </View>


        </SafeAreaView>
    )
}

export default OrderTypeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: t.colors.surface,
    },

    // ── Hero — same style as HomeScreen HeroBanner ────────────────────────────
    hero: {
        backgroundColor: t.colors.primary,
        marginHorizontal: 16,
        marginTop: 24,
        borderRadius: 20,
        paddingHorizontal: 24,
        paddingVertical: 32,
        // remove gap: 8
    },
    heroRestaurant: {
        fontSize: 28,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: 0.5,
        // no margin
    },
    heroTagline: {
        fontSize: 13,
        color: '#EAB308',
        fontStyle: 'italic',
        fontWeight: '600',
        letterSpacing: 0.5,
        marginBottom: 16, // space before divider
    },
    heroDivider: {
        width: 40,
        height: 2,
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginBottom: 12, // space after divider
    },
    heroWelcome: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 24,
        fontWeight: '400',
    },

    // ── Cards — same style as BestSeller cards ────────────────────────────────
    cardsContainer: {
        paddingHorizontal: 16,
        paddingTop: 24,
        gap: 12,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: t.colors.background,
        borderRadius: 16,
        padding: 16,
        gap: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
    },
    cardIconBox: {
        width: 52,
        height: 52,
        borderRadius: 12,
        backgroundColor: t.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardEmoji: {
        fontSize: 26,
    },
    cardText: {
        flex: 1,
        gap: 3,
    },
    cardLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: t.colors.text,
    },
    cardSubtitle: {
        fontSize: 12,
        color: t.colors.textSecondary,
        lineHeight: 16,
    },
    cardArrow: {
        fontSize: 26,
        color: t.colors.primary,
        fontWeight: '300',
    },

    // ── Footer ────────────────────────────────────────────────────────────────
    footer: {
        textAlign: 'center',
        fontSize: 12,
        color: t.colors.textSecondary,
        marginTop: 20,
    },
})