// hooks/useSecureStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEY = 'access_token';

// Verifica se está na web
const isWeb = Platform.OS === 'web';

// Salvar token
export async function saveToken(token: string) {
  try {
    if (isWeb) {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } else {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    }
  } catch (error) {
    console.error('Erro ao salvar o token:', error);
  }
}

// Obter token
export async function getToken() {
  try {
    if (isWeb) {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } else {
      return await SecureStore.getItemAsync(TOKEN_KEY);
    }
  } catch (error) {
    console.error('Erro ao buscar o token:', error);
    return null;
  }
}

// Remover token
export async function removeToken() {
  try {
    if (isWeb) {
      await AsyncStorage.removeItem(TOKEN_KEY);
    } else {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    }
  } catch (error) {
    console.error('Erro ao remover o token:', error);
  }
}
