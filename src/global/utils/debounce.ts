import debounce from 'lodash.debounce';

type LocationCallback = (lat: number, lng: number) => void;

export const createLocationDebounce = (callback: LocationCallback, delay: number = 800) => {
  const debouncedFn = debounce((lat, lng) => {
    callback(lat, lng);
  }, delay);

  return {
    execute: debouncedFn,
    cancel: () => debouncedFn.cancel(),
  };
};
