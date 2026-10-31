import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Button, FlatList, RefreshControl, StyleSheet, Text, TextInput, View } from 'react-native';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { getProducts } from '../services/productService';

const PAGE_SIZE = 10;

export default function ProductListScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const { itemCount } = useCart();

  const loadProducts = async (refresh = false) => {
    if (loading) return;
    setLoading(true);
    setError('');
    try {
      const skip = refresh ? 0 : products.length;
      const data = await getProducts(PAGE_SIZE, skip);
      setProducts(refresh ? data.products : [...products, ...data.products]);
      setHasMore(skip + data.products.length < data.total);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { loadProducts(true); }, []);

  const displayedProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return products.filter((item) => item.title.toLowerCase().includes(keyword));
  }, [products, search]);

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <Button title={`Giỏ (${itemCount})`} onPress={() => navigation.navigate('Cart')} />
        <Button title="Đã lưu" onPress={() => navigation.navigate('Wishlist')} />
        <Button title="AI" onPress={() => navigation.navigate('AIRecommendation', { products })} />
        <Button title="Thông báo" onPress={() => navigation.navigate('Settings')} />
      </View>
      <TextInput style={styles.input} placeholder="Tìm sản phẩm..." value={search} onChangeText={setSearch} />
      {error ? (
        <View style={styles.center}><Text style={styles.error}>{error}</Text><Button title="Thử lại" onPress={() => loadProducts(true)} /></View>
      ) : (
        <FlatList
          data={displayedProducts}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <ProductCard product={item} onPress={() => navigation.navigate('ProductDetail', { productId: item.id })} />}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadProducts(true); }} />}
          onEndReached={() => hasMore && !search && loadProducts(false)}
          onEndReachedThreshold={0.4}
          ListEmptyComponent={!loading && <Text style={styles.center}>Không có sản phẩm phù hợp.</Text>}
          ListFooterComponent={loading ? <ActivityIndicator size="large" color="#2563eb" /> : null}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6', padding: 12 },
  menu: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
  input: { backgroundColor: 'white', padding: 12, borderRadius: 8, marginBottom: 10 },
  center: { textAlign: 'center', marginTop: 30, alignItems: 'center', gap: 10 },
  error: { color: '#dc2626' },
});
