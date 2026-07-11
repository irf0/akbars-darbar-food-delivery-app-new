import { registerRootComponent } from 'expo';
import { LogBox } from 'react-native';

// 1. Intercept console.warn directly before any other package loads
const originalWarn = console.warn;
console.warn = (...args) => {
  const message = args.join(' ');
  // If the message contains our Firebase deprecation text, silently drop it
  if (
    message.includes('This method is deprecated') ||
    message.includes('rnfirebase.io/migrating-to-v22')
  ) {
    return;
  }
  originalWarn(...args);
};

// 2. Fallback backup for device-level UI alerts
LogBox.ignoreLogs([
  'This method is deprecated (as well as all React Native Firebase namespaced API)',
]);

import App from './App';

registerRootComponent(App);
