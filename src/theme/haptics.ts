import * as Haptics from 'expo-haptics';

export const haptics = {
  tap: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), // chip select, toggle, minor UI
  select: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), // confirm choice
  success: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success), //order placed
  warning: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
  error: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
};
