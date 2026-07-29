// export interface UserAddress {
//   area: string;
//   building: string;
//   city: string;
//   street: string;
//   id: string;
//   label?: string;
//   isDefault: boolean;
// }

export interface AddressDoc {
  id?: string;
  label: string;
  flatNum: string;
  street: string;
  landmark?: string;
  latitude: number;
  longitude: number;
  createdAt: string;
}

export interface DarbarUser {
  uid: string;
  phone: string;
  firstName: string;
  isRegistered: boolean;
  fcmToken: string | null;
  isNotificationEnabled: boolean;
  // addresses: UserAddress[]; no need since integrated geolocation but still keep incase
  createdAt: string;
}
