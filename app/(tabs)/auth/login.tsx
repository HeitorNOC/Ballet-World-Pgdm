import { Image, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';


export default function LoginScreen() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>World Ballet</Text>

      <View>
        <Image
          source={require('../../../assets/images/logo_ballet_world.png')}
          style={styles.image}
        />
      </View>

      <TextInput style={styles.input} placeholder="Login" placeholderTextColor="#D9BCA7" />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#D9BCA7"
        secureTextEntry
      />
      <TouchableOpacity onPress={() => { router.navigate('/auth/resetPassword')}}>
        <Text style={styles.link}>Esqueci minha senha</Text>
      </TouchableOpacity>
{/* retirar no profile dps daqui pfv */}
      <TouchableOpacity style={styles.button} onPress={() => { router.navigate('../profile')}}> 
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
  
      <TouchableOpacity style={[styles.button, styles.createButton]} onPress={() => { router.navigate('/auth/signUp');}}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

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
    color: '#781A1A'
  },
  image: {
    width: 150,
    height: 150,
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