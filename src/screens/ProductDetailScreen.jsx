import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useCart } from '../context/CartContext';
import { getProductById } from '../services/productService';
import { saveWishlist } from '../services/wishlistService';

export default function ProductDetailScreen({ route, navigation }) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    getProductById(route.params?.productId).then(setProduct).catch((e) => setError(e.message));
  }, [route.params?.productId]);

  const saveProduct = async () => {
    try {
      await saveWishlist(product);
      Alert.alert('Thành công', 'Đã lưu sản phẩm.');
    } catch (e) {
      Alert.alert('Lỗi', e.message);
    }
  };

  if (error) return <View style={styles.center}><Text style={styles.error}>{error}</Text></View>;
  if (!product) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.buttons}>
        <Button title="Thêm vào giỏ" onPress={() => { addToCart(product); Alert.alert('Đã thêm', product.title); }} />
        <Button title="Lưu yêu thích" onPress={saveProduct} />
        <Button title="Xem giỏ hàng" onPress={() => navigation.navigate('Cart')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 18, backgroundColor: 'white', flexGrow: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: 260, resizeMode: 'contain' },
  title: { fontSize: 24, fontWeight: 'bold' },
  price: { fontSize: 22, color: '#dc2626', marginVertical: 10 },
  description: { fontSize: 16, lineHeight: 23, color: '#374151' },
  buttons: { marginTop: 20, gap: 10 },
  error: { color: '#dc2626' },
});
