import { useAuthStore } from '@features/auth/store/useAuthStore';

export const useUserAddress = () => {
  const { user } = useAuthStore();

  const addresses = (user?.addresses ?? []).map((address) => ({
    id: address.id,
    label: address.label ?? 'Home',
    addressLine: [address.building, address.street, address.area, address.city]
      .filter(Boolean) //to filter out empty string fields
      .join(', '),
  }));

  const defaultAddressId = user?.addresses?.find((a) => a.isDefault)?.id ?? null;

  return { addresses, defaultAddressId };
};
