import { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import ProductCard from '../components/ProductCard';
import { askGemini } from '../services/aiService';

export default function AIRecommendationScreen({ route, navigation }) {
  const products = route.params?.products || [];
  const [need, setNeed] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!need.trim()) return setError('Hãy nhập nhu cầu của bạn.');
    if (!products.length) return setError('Catalog đang trống, hãy quay lại tải sản phẩm.');
    setLoading(true);
    setError('');
    setResult(null);
    try {
      setResult(await askGemini(need, products));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Bạn đang cần sản phẩm như thế nào?</Text>
      <TextInput style={styles.input} value={need} onChangeText={setNeed} placeholder="Ví dụ: điện thoại giá vừa phải" multiline />
      <Button title="Nhờ AI gợi ý" onPress={ask} disabled={loading} />
      {loading && <ActivityIndicator style={styles.space} size="large" />}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {result ? (
        <View style={styles.result}>
          <Text style={styles.answer}>{result.text}</Text>
          <ProductCard product={result.product} onPress={() => navigation.navigate('ProductDetail', { productId: result.product.id })} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f3f4f6' },
  label: { fontSize: 17, fontWeight: 'bold', marginBottom: 8 },
  input: { backgroundColor: 'white', padding: 12, minHeight: 80, borderRadius: 8, marginBottom: 12, textAlignVertical: 'top' },
  space: { marginTop: 20 },
  error: { color: '#dc2626', marginTop: 20 },
  result: { marginTop: 20, gap: 12 },
  answer: { backgroundColor: '#dbeafe', padding: 12, borderRadius: 8, lineHeight: 21 },
});
