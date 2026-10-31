import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function ProductCard({ product, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: 'white', padding: 10, marginBottom: 10, borderRadius: 10 },
  image: { width: 90, height: 90, resizeMode: 'contain' },
  info: { flex: 1, paddingLeft: 12, justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: '600' },
  category: { color: '#6b7280', marginVertical: 5 },
  price: { color: '#dc2626', fontSize: 17, fontWeight: 'bold' },
});
