import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { getNotificationStatus, requestNotificationPermission, sendCartNotification } from '../services/notificationService';
import { useCart } from '../context/CartContext';

export default function SettingsScreen() {
  const [status, setStatus] = useState('undetermined');
  const { itemCount } = useCart();

  useEffect(() => {
    getNotificationStatus()
      .then(setStatus)
      .catch(() => setStatus('Không hỗ trợ trên Expo Go hiện tại'));
  }, []);

  const request = async () => {
    try {
      const newStatus = await requestNotificationPermission();
      setStatus(newStatus);
      if (newStatus !== 'granted') Alert.alert('Thông báo', 'Bạn đã từ chối quyền thông báo. App vẫn sử dụng bình thường.');
    } catch (e) {
      Alert.alert('Không thể mở thông báo', e.message);
    }
  };

  const test = async () => {
    try {
      await sendCartNotification(itemCount);
      Alert.alert('Thông báo giỏ hàng', `Bạn đang có ${itemCount} sản phẩm trong giỏ hàng.`);
    } catch (e) {
      Alert.alert('Lỗi', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quyền thông báo</Text>
      <Text style={styles.status}>Trạng thái: {status}</Text>
      <Button title="Yêu cầu quyền" onPress={request} />
      <Button title="Gửi thông báo thử" onPress={test} />
      <Text style={styles.note}>Thông báo dùng để nhắc người dùng về sản phẩm trong giỏ. Bản Expo Go này chạy chế độ mô phỏng để tránh lỗi native module.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 14, backgroundColor: 'white' },
  title: { fontSize: 22, fontWeight: 'bold' },
  status: { fontSize: 17 },
  note: { color: '#6b7280', lineHeight: 20 },
});
