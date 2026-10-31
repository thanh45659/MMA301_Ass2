import { useCallback, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ProductCard from '../components/ProductCard';
import { getWishlist, removeWishlist } from '../services/wishlistService';

export default function WishlistScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setError('');
      setItems(await getWishlist());
    } catch (e) {
      setError(e.message);
    }
  };

  useFocusEffect(useCallback(() => { load(); }, []));

  const remove = async (id) => {
    try {
      await removeWishlist(id);
      load();
    } catch (e) {
      Alert.alert('Lỗi', e.message);
    }
  };

  return (
    <View style={styles.container}>
      {error ? <><Text style={styles.error}>{error}</Text><Button title="Thử lại" onPress={load} /></> : null}
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={!error && <Text style={styles.empty}>Chưa có sản phẩm đã lưu.</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <ProductCard product={item} onPress={() => navigation.navigate('ProductDetail', { productId: item.id })} />
            <Button title="Bỏ lưu" color="#dc2626" onPress={() => remove(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#f3f4f6' },
  item: { marginBottom: 12 },
  empty: { textAlign: 'center', marginTop: 50, color: '#6b7280' },
  error: { color: '#dc2626', textAlign: 'center', margin: 20 },
});
