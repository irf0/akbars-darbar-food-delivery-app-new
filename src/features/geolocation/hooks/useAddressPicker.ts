import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import debounce from 'lodash.debounce';
import { useAddressStore } from '@features/geolocation/store/useAddressStore';
import { useOrderTypeStore } from '@store/useOrderTypeStore';
import {
  checkLocationPermission,
  getCurrentCoords,
  requestLocation,
  reverseGeocode,
} from '@utils/permissions/expopermissions';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '@navigation/types';
import { checkServiceability } from 'src/global/services/serviceabilityCheckService';
import { saveUserAddressToDb } from 'src/global/services/addressService';
import auth from '@react-native-firebase/auth';
import { getDistanceKm } from '@utils/getDistance';
import { formatAddress } from '@utils/formatAddress';

const FALLBACK_PROXIMITY_THRESHOLD_KM = 0.5;
const FALLBACK_LAT = 27.481815607680797;
const FALLBACK_LNG = 95.34053740534065;
const DEBOUNCE_DELAY_MS = 800;

export const useAddressPicker = () => {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const bottomSheetRef = useRef<BottomSheet | null>(null);
  const snapPoints = useMemo(() => ['42%', '20%'], []);

  const orderType = useOrderTypeStore((state) => state.orderType);
  const currentAddress = useOrderTypeStore((state) => state.address);

  const flatNum = useAddressStore((state) => state.flatNum);
  const landmark = useAddressStore((state) => state.landmark);
  const street = useAddressStore((state) => state.street);
  const label = useAddressStore((state) => state.label);
  const latitude = useAddressStore((state) => state.latitude);
  const longitude = useAddressStore((state) => state.longitude);

  const setPickup = useOrderTypeStore((state) => state.setPickup);
  const setDelivery = useOrderTypeStore((state) => state.setDelivery);

  const setFlatNum = useAddressStore((state) => state.setFlatNum);
  const setLandMark = useAddressStore((state) => state.setLandMark);
  const setStreet = useAddressStore((state) => state.setStreet);
  const setLabel = useAddressStore((state) => state.setLabel);
  const setLatitude = useAddressStore((state) => state.setLatitude);
  const setLongitude = useAddressStore((state) => state.setLongitude);

  const [isLoadingGPS, setIsLoadingGPS] = useState(true);
  const [addressInfoMessage, setAddressInfoMessage] = useState<string | null>(null);
  const [showServiceabilityModal, setShowServiceabilityModal] = useState<boolean>(false);
  const [showMapSelectionWarningModal, setShowMapSelectionWarningModal] = useState<boolean>(false);

  const wasAlreadyValidOrderType =
    orderType === 'takeaway' || (orderType === 'delivery' && !!currentAddress);

  const currentUserId = auth().currentUser?.uid;

  //request permission and feed zustand store
  const fetchLocation = useCallback(async () => {
    try {
      const { status } = await requestLocation();

      if (status === 'granted') {
        const coords = await getCurrentCoords();
        setLatitude(coords?.latitude ?? null);
        setLongitude(coords?.longitude ?? null);
      } else {
        setLatitude(FALLBACK_LAT);
        setLongitude(FALLBACK_LNG);
      }
    } catch (error) {
      console.error('fetchLocation caught error:', error);
    } finally {
      setIsLoadingGPS(false);
    }
  }, [setLatitude, setLongitude]);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  //debounce to prevent pin drag spam
  const debouncedLocationUpdate = useMemo(
    () =>
      debounce(async (lat: number, lng: number) => {
        setLatitude(lat);
        setLongitude(lng);

        const { granted } = await checkLocationPermission();
        if (!granted) {
          setStreet('');
          setAddressInfoMessage('Location permissions are off. Move the pin or type below.');
          return;
        }

        const address = await reverseGeocode(lat, lng);
        setStreet(address ?? "Couldn't load address. Please confirm your pin position.");
      }, DEBOUNCE_DELAY_MS),
    [setLatitude, setLongitude, setStreet, setAddressInfoMessage],
  );

  useEffect(() => {
    return () => debouncedLocationUpdate.cancel();
  }, [debouncedLocationUpdate]);

  const handleConfirmPress = async () => {
    if (isLoadingGPS) return; // guard from double-tap

    if (latitude == null || longitude == null) return;

    setIsLoadingGPS(true);

    try {
      const { granted } = await checkLocationPermission();
      if (!granted) {
        const distanceFromFallback = getDistanceKm(latitude, longitude, FALLBACK_LAT, FALLBACK_LNG);
        if (
          distanceFromFallback < FALLBACK_PROXIMITY_THRESHOLD_KM &&
          (!street || street.trim() === '')
        ) {
          setShowMapSelectionWarningModal(true);
          return;
        }
      }

      const result = await checkServiceability(latitude, longitude);
      const serviceable = Boolean(result?.serviceable);

      if (!serviceable) {
        setShowServiceabilityModal(true);
        return; // finally will handle setIsLoadingGPS(false)
      }

      // Only commit orderType after the address is actually persisted
      await saveUserAddressToDb(currentUserId, {
        latitude,
        longitude,
        label: label || 'Home',
        street: street || '',
        flatNum: flatNum || '',
        landmark: landmark || '',
      });

      setDelivery({
        lat: latitude,
        lng: longitude,
        formattedAddress: formatAddress(flatNum, street, landmark),
      });
      setShowServiceabilityModal(false);

      if (wasAlreadyValidOrderType && navigation.canGoBack()) {
        navigation.goBack();
      }

      //no need for navigation here anymore since ordertype decides the stack swap
    } catch (error) {
      console.error('Something went wrong during serviceability confirmation:', error);
      // TODO: showToast('Something went wrong. Please try again.');
    } finally {
      setIsLoadingGPS(false);
    }
  };

  const handleModalConfirmPress = () => {
    setPickup();
    setShowServiceabilityModal(false);
    navigation.navigate('MainTabs', { screen: 'Home' });
  };

  return {
    bottomSheetRef,
    snapPoints,
    isLoadingGPS,
    addressInfoMessage,
    showServiceabilityModal,
    showMapSelectionWarningModal,
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
    setDelivery,
    setPickup,
    setShowMapSelectionWarningModal,
    setShowServiceabilityModal,
    debouncedLocationUpdate,
    handleConfirmPress,
    handleModalConfirmPress,
  };
};

// useCallback memoizes fetchLocation so it's stable across renders — required since it's a useEffect dependency, otherwise the effect would re-fire in an infinite loop
