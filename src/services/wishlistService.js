import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config/firebase';

const LOCAL_KEY = 'mma301_wishlist';
const COLLECTION = 'wishlist';

async function getLocal() {
  const value = await AsyncStorage.getItem(LOCAL_KEY);
  return value ? JSON.parse(value) : [];
}

export async function getWishlist() {
  if (!isFirebaseConfigured) return getLocal();
  const snapshot = await getDocs(collection(db, COLLECTION));
  return snapshot.docs.map((item) => item.data());
}

export async function saveWishlist(product) {
  if (isFirebaseConfigured) {
    await setDoc(doc(db, COLLECTION, String(product.id)), product);
    return;
  }
  const items = await getLocal();
  if (!items.some((item) => item.id === product.id)) await AsyncStorage.setItem(LOCAL_KEY, JSON.stringify([...items, product]));
}

export async function removeWishlist(productId) {
  if (isFirebaseConfigured) {
    await deleteDoc(doc(db, COLLECTION, String(productId)));
    return;
  }
  const items = await getLocal();
  await AsyncStorage.setItem(LOCAL_KEY, JSON.stringify(items.filter((item) => item.id !== productId)));
}
