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
import { checkServiceabilityClient } from '@utils/clientServiceability';
import { restaurantConfig } from '@config/restaurant.config';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '@navigation/types';

const FALLBACK_LAT = 27.481815607680797;
const FALLBACK_LNG = 95.34053740534065;
const SERVICEABILITY_RADIUS_KM = 5;
const DEBOUNCE_DELAY_MS = 800;

export const useAddressPicker = () => {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const bottomSheetRef = useRef<BottomSheet | null>(null);
  const snapPoints = useMemo(() => ['33%'], []);

  const setOrderType = useOrderTypeStore((state) => state.setOrderType);

  const flatNum = useAddressStore((state) => state.flatNum);
  const landmark = useAddressStore((state) => state.landmark);
  const street = useAddressStore((state) => state.street);
  const latitude = useAddressStore((state) => state.latitude);
  const longitude = useAddressStore((state) => state.longitude);

  const setFlatNum = useAddressStore((state) => state.setFlatNum);
  const setLandMark = useAddressStore((state) => state.setLandMark);
  const setStreet = useAddressStore((state) => state.setStreet);
  const setLatitude = useAddressStore((state) => state.setLatitude);
  const setLongitude = useAddressStore((state) => state.setLongitude);

  const [isLoadingGPS, setIsLoadingGPS] = useState(true);
  const [addressInfoMessage, setAddressInfoMessage] = useState<string | null>(null);
  const [isServiceable, setIsServiceable] = useState(true);
  const [showServiceabilityModal, setShowServiceabilityModal] = useState(false);

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
          setAddressInfoMessage("Location off. We'll use your pinned map location instead.");
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

  //calls seviceability function from backend returns boolean result
  const handleConfirmPress = async () => {
    try {
      setIsLoadingGPS(true);
      if (latitude == null || longitude == null) return;

      const result = checkServiceabilityClient(
        //TODO:replace this block with server result.
        latitude,
        longitude,
        restaurantConfig.restaurantLat,
        restaurantConfig.restaurantLong,
        SERVICEABILITY_RADIUS_KM,
      );
      const serviceable = Boolean(result?.serviceable);
      setIsServiceable(serviceable);

      if (serviceable) {
        setShowServiceabilityModal(false);
        setOrderType('delivery');
        navigation.navigate('MainTabs', { screen: 'Home' });
      }

      setShowServiceabilityModal(!serviceable);
    } catch (error) {
      console.error('Something went wrong during serviceability confirmation:', error);
    } finally {
      setIsLoadingGPS(false);
    }
  };

  const handleModalConfirmPress = () => {
    setOrderType('takeaway');
    setShowServiceabilityModal(false);
    navigation.navigate('MainTabs', { screen: 'Home' });
  };

  return {
    bottomSheetRef,
    snapPoints,
    isLoadingGPS,
    addressInfoMessage,
    isServiceable,
    showServiceabilityModal,
    setShowServiceabilityModal,
    flatNum,
    landmark,
    street,
    latitude,
    longitude,
    setFlatNum,
    setLandMark,
    setIsServiceable,
    setOrderType,
    debouncedLocationUpdate,
    handleConfirmPress,
    handleModalConfirmPress,
  };
};

// useCallback memoizes fetchLocation so it's stable across renders — required since it's a useEffect dependency, otherwise the effect would re-fire in an infinite loop
