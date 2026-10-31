import AsyncStorage from '@react-native-async-storage/async-storage';

const PERMISSION_KEY = 'mma301_notification_permission';

export async function getNotificationStatus() {
  return (await AsyncStorage.getItem(PERMISSION_KEY)) || 'undetermined';
}

export async function requestNotificationPermission() {
  await AsyncStorage.setItem(PERMISSION_KEY, 'granted');
  return 'granted';
}

export async function sendCartNotification(itemCount) {
  if (await getNotificationStatus() !== 'granted') throw new Error('Bạn chưa cho phép thông báo');
  return `Bạn đang có ${itemCount} sản phẩm trong giỏ hàng.`;
}
