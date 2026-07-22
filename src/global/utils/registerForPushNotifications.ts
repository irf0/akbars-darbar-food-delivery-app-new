import messaging from '@react-native-firebase/messaging';
import { Platform, PermissionsAndroid } from 'react-native';

export async function registerForPushNotificationsAsync(): Promise<{
  token: string | null;
  enabled: boolean;
}> {
  let enabled = false;

  if (Platform.OS === 'android') {
    if (Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      enabled = granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      enabled = true; // below Android 13, no prompt needed
    }
  } else if (Platform.OS === 'ios') {
    const authStatus = await messaging().requestPermission();
    enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      await messaging().registerDeviceForRemoteMessages();
    }
  }

  if (!enabled) {
    console.log('Notification permission denied — fetching token anyway');
  }

  // always fetch token, regardless of permission outcome
  const token = await messaging().getToken();

  return { token, enabled };
}
