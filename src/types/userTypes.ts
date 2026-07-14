// export interface UserAddress {
//   area: string;
//   building: string;
//   city: string;
//   street: string;
//   id: string;
//   label?: string;
//   isDefault: boolean;
// }

export interface DarbarUser {
  uid: string;
  phone: string;
  firstName: string;
  isRegistered: boolean;
  fcmToken: string;
  // addresses: UserAddress[]; no need since integrated geolocation but still keep incase
  createdAt: string;
}
