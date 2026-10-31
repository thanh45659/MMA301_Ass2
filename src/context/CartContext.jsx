import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();
const CART_KEY = 'mma301_cart';

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(CART_KEY)
      .then((value) => value && setCart(JSON.parse(value)))
      .catch((error) => console.log('Restore cart error:', error))
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (ready) AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, ready]);

  const addToCart = (product) => {
    setCart((oldCart) => {
      const found = oldCart.find((item) => item.id === product.id);
      if (found) return oldCart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...oldCart, { ...product, quantity: 1 }];
    });
  };

  const changeQuantity = (id, amount) => {
    setCart((oldCart) => oldCart
      .map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item)
      .filter((item) => item.quantity > 0));
  };

  const removeFromCart = (id) => setCart((oldCart) => oldCart.filter((item) => item.id !== id));
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return <CartContext.Provider value={{ cart, addToCart, changeQuantity, removeFromCart, itemCount, total }}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
