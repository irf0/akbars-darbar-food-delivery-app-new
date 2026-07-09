import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import { Entypo } from '@expo/vector-icons';
import { theme } from '@theme';
import { restaurantConfig } from '@config/restaurant.config';
import CustomAlertModal from '@components/CustomAlertModal';
import { AddressPickerForm } from '../components/AddressPickerForm';
import { useAddressPicker } from '../hooks/useAddressPicker';

const AddressPickerScreen = () => {
  const {
    bottomSheetRef,
    snapPoints,
    isLoadingGPS,
    addressInfoMessage,
    isServiceable,
    flatNum,
    landmark,
    street,
    latitude,
    longitude,
    setFlatNum,
    setLandMark,
    showServiceabilityModal,
    setShowServiceabilityModal,
    debouncedLocationUpdate,
    handleConfirmPress,
    handleModalConfirmPress,
  } = useAddressPicker();

  if (isLoadingGPS || latitude == null || longitude == null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{ latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
        onRegionChangeComplete={(region) => {
          debouncedLocationUpdate(region.latitude, region.longitude);
        }}>
        <Circle
          center={{
            latitude: restaurantConfig.restaurantLat,
            longitude: restaurantConfig.restaurantLong,
          }}
          radius={restaurantConfig.deliveryRadius * 1000}
          strokeColor="rgba(0, 122, 255, 0.5)"
          fillColor="rgba(0, 122, 255, 0.1)"
          strokeWidth={5}
        />
      </MapView>

      <View style={styles.centerPinContainer}>
        <Entypo name="location-pin" size={55} color={theme.colors.primary} />
      </View>

      <AddressPickerForm
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints}
        street={street}
        addressInfoMessage={addressInfoMessage}
        flatNum={flatNum}
        setFlatNum={setFlatNum}
        landmark={landmark}
        setLandMark={setLandMark}
        onConfirm={handleConfirmPress}
      />

      {!isServiceable && (
        <CustomAlertModal
          visible={showServiceabilityModal}
          title="Uh! Oh! You are outside our delivery range."
          message="You can move the pin or takeaway instead."
          icon={<Text style={styles.modalIcon}>📍</Text>}
          cancelText="Change Location"
          confirmText="Takeaway Instead"
          onCancel={() => setShowServiceabilityModal(true)}
          onConfirm={() => handleModalConfirmPress()}
        />
      )}
    </View>
  );
};

export default AddressPickerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerPinContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  modalIcon: {
    fontSize: 30,
  },
});
