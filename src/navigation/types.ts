import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MenuItem } from '@types';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<AppStackParamList>;
};

export type AuthStackParamList = {
  Phone: undefined;
  OTP: { phoneNumber: string };
  Register: { phoneNumber: string };
  Welcome: undefined;
};
export type AppStackParamList = {
  OrderType: undefined;
  AddressPicker: undefined;
  AddressList: undefined;
  MainTabs: NavigatorScreenParams<BottomTabsParamList>;
  MenuDetail: { item: MenuItem };
  Search: undefined;
  Profile: undefined;
  Cart: undefined;
  Checkout: undefined;
  OrderConfirmation: { orderId: string; live?: boolean };
};
export type OrderTypeStackParamList = {
  OrderType: undefined;
  AddressPicker: undefined;
  AddressList: undefined;
};

export type BottomTabsParamList = {
  Home: undefined;
  Menu: { category?: string };
  OrderHistory: undefined;
  Profile: undefined;
};

export type AuthScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  T
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
