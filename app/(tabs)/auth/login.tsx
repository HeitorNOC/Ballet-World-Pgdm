import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { saveToken } from "../../../hooks/useSecureStorage";
import { api } from "../../../lib/axios";


export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleOnClickLogin() {
    if (!email || !password) {
      Alert.alert('Atenção', 'Informe login e senha');
      return;
    }

    try {
      // Chama a rota /login do Elysia
      const response = await api.post('/login', {
        email,
        password,
      });

      // Recebemos algo como: { token: "...jwt..." }
      const { token } = response.data;

      // Salvar token no SecureStore (ou outro)
      await saveToken(token);

      console.log('response: ', response)
      console.log('token: ', token)

      // Navegar para a tela de Welcome
      router.navigate('../welcome');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Erro no Login', 'Usuário ou senha inválidos');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>World Ballet</Text>
      <View>
        <Image
          source={require('@/assets/images/logo_ballet_world.png')}
          style={styles.image}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Login"
        placeholderTextColor="#D9BCA7"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#D9BCA7"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={() => router.navigate('/auth/resetPassword')}>
        <Text style={styles.link}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleOnClickLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.createButton]}
        onPress={() => router.navigate('/auth/signUp')}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos (mantivemos praticamente iguais)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDEAE2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#781A1A',
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 40,
    backgroundColor: '#EED3C3',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
    color: '#6E4F3A',
  },
  link: {
    color: '#781A1A',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  button: {
    width: '90%',
    height: 40,
    backgroundColor: '#5C2E2E',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  createButton: {
    backgroundColor: '#781A1A',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
