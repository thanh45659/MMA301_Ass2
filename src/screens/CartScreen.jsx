import { Alert, Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useCart } from '../context/CartContext';
import { sendCartNotification } from '../services/notificationService';

export default function CartScreen() {
  const { cart, changeQuantity, removeFromCart, itemCount, total } = useCart();

  const remindMe = async () => {
    try {
      await sendCartNotification(itemCount);
      Alert.alert('Thông báo giỏ hàng', `Bạn đang có ${itemCount} sản phẩm trong giỏ hàng.`);
    } catch (e) {
      Alert.alert('Không thể gửi', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text style={styles.empty}>Giỏ hàng đang trống.</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
              <Text>${item.price} x {item.quantity}</Text>
              <View style={styles.actions}>
                <Button title="-" onPress={() => changeQuantity(item.id, -1)} />
                <Button title="+" onPress={() => changeQuantity(item.id, 1)} />
                <Button title="Xóa" color="#dc2626" onPress={() => removeFromCart(item.id)} />
              </View>
            </View>
          </View>
        )}
      />
      <View style={styles.summary}>
        <Text style={styles.total}>Số lượng: {itemCount}</Text>
        <Text style={styles.total}>Tổng: ${total.toFixed(2)}</Text>
        {itemCount > 0 && <Button title="Nhắc tôi về giỏ hàng" onPress={remindMe} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#f3f4f6' },
  item: { flexDirection: 'row', backgroundColor: 'white', padding: 10, borderRadius: 8, marginBottom: 10 },
  image: { width: 75, height: 75, resizeMode: 'contain' },
  info: { flex: 1, paddingLeft: 10, gap: 6 },
  title: { fontWeight: 'bold' },
  actions: { flexDirection: 'row', gap: 8 },
  summary: { backgroundColor: 'white', padding: 14, gap: 8, borderRadius: 8 },
  total: { fontSize: 18, fontWeight: 'bold' },
  empty: { textAlign: 'center', marginTop: 50, color: '#6b7280' },
});
