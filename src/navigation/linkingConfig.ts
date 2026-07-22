import { LinkingOptions } from '@react-navigation/native';
import { Linking } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { RootStackParamList } from './types';

function buildLinkFromNotificationData(data?: { [key: string]: string | object }): string | null {
  const link = data?.link;
  return typeof link === 'string' ? link : null;
}

export const linkingConfig: LinkingOptions<RootStackParamList> = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      Auth: {
        screens: {
          Phone: 'login',
          OTP: 'otp',
          Register: 'register',
          Welcome: 'welcome',
        },
      },

      App: {
        screens: {
          MainTabs: {
            screens: {
              Home: 'home',
              Menu: 'menu/:category?',
              OrderHistory: 'order-history',
              Profile: 'profile',
            },
          },
          Search: 'search',
          Cart: 'cart',
          Checkout: 'checkout',
          OrderConfirmation: 'order/:orderId',
          OrderType: 'order-type',
          AddressPicker: 'address-picker',
          AddressList: 'address-list',
        },
      },
    },
  },

  async getInitialURL() {
    const remoteMessage = await messaging().getInitialNotification();
    const link = buildLinkFromNotificationData(remoteMessage?.data);
    if (link) return `myapp://${link}`;

    const url = await Linking.getInitialURL();
    return url;
  },

  subscribe(listener) {
    const unsubscribeNotification = messaging().onNotificationOpenedApp((remoteMessage) => {
      const link = buildLinkFromNotificationData(remoteMessage.data);
      if (link) listener(`myapp://${link}`);
    });

    const unsubscribeLinking = Linking.addEventListener('url', ({ url }) => listener(url));

    return () => {
      unsubscribeNotification();
      unsubscribeLinking.remove();
    };
  },
};
