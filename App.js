import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { CartProvider } from './src/context/CartContext';
import ProductListScreen from './src/screens/ProductListScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CartScreen from './src/screens/CartScreen';
import WishlistScreen from './src/screens/WishlistScreen';
import AIRecommendationScreen from './src/screens/AIRecommendationScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator screenOptions={{ headerTintColor: '#2563eb' }}>
          <Stack.Screen name="Products" component={ProductListScreen} options={{ title: 'Cửa hàng' }} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Chi tiết sản phẩm' }} />
          <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Giỏ hàng' }} />
          <Stack.Screen name="Wishlist" component={WishlistScreen} options={{ title: 'Sản phẩm đã lưu' }} />
          <Stack.Screen name="AIRecommendation" component={AIRecommendationScreen} options={{ title: 'AI gợi ý sản phẩm' }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Thông báo' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
