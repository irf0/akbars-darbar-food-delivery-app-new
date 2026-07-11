import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import { Entypo } from '@expo/vector-icons';
import { theme } from '@theme';
import { restaurantConfig } from '@config/restaurant.config';
import CustomAlertModal from '@components/CustomAlertModal';
import { AddressPickerForm } from '../components/AddressPickerForm';
import { useAddressPicker } from '../hooks/useAddressPicker';
import CustomLocationAccesModal from '../components/CustomLocationAccessModal';
import { customMapStyles } from '@utils/customMapStyles';

const AddressPickerScreen = () => {
  const {
    bottomSheetRef,
    snapPoints,
    isLoadingGPS,
    addressInfoMessage,
    flatNum,
    landmark,
    street,
    label,
    latitude,
    longitude,
    setLabel,
    setStreet,
    setFlatNum,
    setLandMark,
    showServiceabilityModal,
    setShowServiceabilityModal,
    showMapSelectionWarningModal,
    setShowMapSelectionWarningModal,
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
        onPanDrag={() => bottomSheetRef.current?.snapToIndex(0)} //shrinks the sheet on map drag
        userInterfaceStyle="light"
        customMapStyle={customMapStyles}
        style={styles.map}
        initialRegion={{ latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
        onRegionChangeComplete={(region) => {
          debouncedLocationUpdate(region.latitude, region.longitude);
          bottomSheetRef.current?.snapToIndex(1);
        }}>
        <Marker
          coordinate={{
            latitude: restaurantConfig.restaurantLat,
            longitude: restaurantConfig.restaurantLong,
          }}
          anchor={{ x: 0.5, y: 1 }}>
          <View style={styles.restaurantMarkerWrapper}>
            <View style={styles.restaurantIconBadge}>
              <Entypo name="shop" size={24} color="#ffffff" />
            </View>

            <View style={styles.restaurantNameBubble}>
              <Text style={styles.restaurantNameText} numberOfLines={1}>
                {restaurantConfig.name || 'Our Restaurant'}
              </Text>
            </View>
          </View>
        </Marker>

        <Circle
          center={{
            latitude: restaurantConfig.restaurantLat,
            longitude: restaurantConfig.restaurantLong,
          }}
          radius={restaurantConfig.deliveryRadius * 1000}
          strokeColor="rgba(231, 69, 69, 0.5)"
          fillColor="rgba(244, 244, 245, 0.63)"
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
        label={label}
        setLabel={setLabel}
        setStreet={setStreet}
        setFlatNum={setFlatNum}
        landmark={landmark}
        setLandMark={setLandMark}
        onConfirm={handleConfirmPress}
      />

      {showServiceabilityModal && ( //TODO: not visible when keyboard opens if 33% fix the bug.
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
      {showMapSelectionWarningModal && (
        <CustomLocationAccesModal
          visible={showMapSelectionWarningModal}
          title="Please Select a Location"
          message="Drag the map pin to your building or street location to continue"
          icon={<Text style={styles.modalIcon}>📍</Text>}
          // cancelText="Cancel"
          confirmText="Got it"
          onConfirm={() => setShowMapSelectionWarningModal(false)}
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

  restaurantMarkerContainer: {
    backgroundColor: '#ffffff',
    padding: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  restaurantMarkerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 2,
  },
  restaurantIconBadge: {
    backgroundColor: theme.colors.primary,
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  restaurantNameBubble: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 4,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  restaurantNameText: {
    color: '#1a1a1a',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
