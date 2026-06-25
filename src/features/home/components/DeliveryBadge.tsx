import { theme } from "@theme"
import { StyleSheet, Text, View } from "react-native"

export const DeliveryBadge = ({ enabled }: { enabled: boolean }) => {
    const t = theme
    return (
        <View style={[
            deliveryStyles.badge,
            { backgroundColor: enabled ? '#E8F5E9' : '#FEE2E2' }
        ]}>
            <View style={[
                deliveryStyles.dot,
                { backgroundColor: enabled ? '#22C55E' : t.colors.primary }
            ]} />
            <Text style={[
                deliveryStyles.text,
                { color: enabled ? '#166534' : '#7F1D1D' }
            ]}>
                {enabled ? 'Delivery Open' : 'Delivery Closed'}
            </Text>
        </View>
    )
}

const deliveryStyles = StyleSheet.create({
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    dot: { width: 6, height: 6, borderRadius: 3 },
    text: { fontSize: 11, fontWeight: '600' },
})