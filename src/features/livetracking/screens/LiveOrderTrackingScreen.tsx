import React, { useRef } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import MapView, { LatLng, Marker, Polyline } from 'react-native-maps';
import { Entypo } from '@expo/vector-icons';
import { customMapStyles } from '@utils/customMapStyles';
import { lightColors } from 'src/theme/colors';
import { Image } from 'expo-image';
import { useActiveOrderListener } from '@hooks/useActiveOrderListener';
import { useLiveOrderTracking } from '../hooks/useLiveOrderTracking';
import { useAnimatedMarkerPosition } from '../hooks/useAnimatedMarkerPosition';
import { OrderStatusHeader } from '../components/OrderStatusHeader';
import { OrderDetailsSheet } from '../components/OrderDetailsSheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '@navigation/types';
import { useRiderProfile } from '../hooks/useRiderProfile';
import { useOrderETATimer } from '../hooks/useOrderETATimer';

const riderIcon = require('../../../../assets/rider-icon.png');

type NavProps = NativeStackScreenProps<AppStackParamList>;

export default function LiveOrderTrackingScreen({ navigation }: NavProps) {
  const { activeOrder } = useActiveOrderListener();
  const riderProfile = useRiderProfile(activeOrder?.assignedRiderId);
  const { etaText } = useOrderETATimer(activeOrder?.estimatedDeliveryAt);

  const mapRef = useRef<MapView>(null);

  const customerLocation: LatLng | null =
    activeOrder?.deliveryAddress?.latitude != null &&
    activeOrder?.deliveryAddress?.longitude != null
      ? {
          latitude: activeOrder.deliveryAddress.latitude,
          longitude: activeOrder.deliveryAddress.longitude,
        }
      : null;

  const { riderLocation, remainingRoute, riderHeading, isReady } = useLiveOrderTracking({
    assignedRiderId: activeOrder?.assignedRiderId,
    customerLocation,
  });

  console.log(riderLocation);

  const animatedRiderCoordinate = useAnimatedMarkerPosition(riderLocation);

  // const riderProfile = useRiderProfile(activeOrder?.assignedRiderId); // uncomment when ready

  if (!isReady || !riderLocation || !customerLocation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={lightColors.primary} />
        <Text style={styles.loadingText}>Locating your rider...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        userInterfaceStyle="light"
        customMapStyle={customMapStyles}
        initialRegion={{
          latitude: riderLocation.latitude,
          longitude: riderLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onMapReady={() => {
          mapRef.current?.fitToCoordinates([riderLocation, customerLocation], {
            edgePadding: { top: 180, right: 80, bottom: 180, left: 80 },
            animated: true,
          });
        }}>
        <Polyline coordinates={remainingRoute} strokeWidth={4} strokeColor={lightColors.primary} />

        <Marker coordinate={customerLocation} anchor={{ x: 0.5, y: 1 }}>
          <View style={styles.markerWrapper}>
            <View style={[styles.iconBadge, { backgroundColor: '#111827' }]}>
              <Entypo name="location-pin" size={22} color="#fff" />
            </View>
            <View style={styles.nameBubble}>
              <Text style={styles.nameBubbleText}>
                {activeOrder?.deliveryAddress?.label
                  ? activeOrder?.deliveryAddress?.label
                  : activeOrder?.customerName}
              </Text>
            </View>
          </View>
        </Marker>

        {animatedRiderCoordinate && (
          <Marker
            coordinate={animatedRiderCoordinate}
            anchor={{ x: 0.5, y: 0.5 }}
            flat={true}
            rotation={riderHeading}>
            <View style={styles.markerWrapper}>
              <Image source={riderIcon} style={{ width: 130, height: 130 }} resizeMode="contain" />
            </View>
          </Marker>
        )}
      </MapView>

      <OrderStatusHeader orderStatus={activeOrder?.orderStatus ?? 'preparing'} etaText={etaText} />

      <View style={styles.bottomSheetContainer}>
        <OrderDetailsSheet
          orderNumber={activeOrder?.orderNumber ?? ''}
          lineItems={activeOrder?.lineItems ?? []}
          deliveryInstructions={activeOrder?.deliveryInstructions}
          riderProfile={riderProfile}
          onDetailsPress={() => {
            navigation.navigate('OrderConfirmation', { orderId: activeOrder?.id });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bottomSheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 32,
  },
  markerWrapper: { alignItems: 'center' },
  iconBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  nameBubble: {
    marginTop: 6,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  nameBubbleText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#222',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563', // or lightColors.textSecondary if that token exists
  },
});
