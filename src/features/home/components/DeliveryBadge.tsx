import { theme } from 'src/theme';
import { StyleSheet, Text, View } from 'react-native';

export const DeliveryBadge = ({ enabled }: { enabled: boolean }) => {
  return (
    <View
      style={[
        deliveryStyles.badge,
        { backgroundColor: enabled ? theme.colors.successBg : theme.colors.errorBg },
      ]}>
      <View
        style={[
          deliveryStyles.dot,
          { backgroundColor: enabled ? theme.colors.success : theme.colors.error },
        ]}
      />
      <Text
        style={[
          deliveryStyles.text,
          { color: enabled ? theme.colors.successText : theme.colors.errorText },
        ]}>
        {enabled ? 'Delivery Open' : 'Delivery Closed'}
      </Text>
    </View>
  );
};

const deliveryStyles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  text: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
});
