import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ForgetPasswordScreen() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            router.navigate('./login')
          }}
        >
          <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
        </TouchableOpacity>


        <Text style={styles.headerTitle}>RECUPERAR SENHA</Text>
        <Image
          source={require('@/assets/images/logo_ballet_world.png')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        placeholderTextColor="#D9BCA7"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Enviar Email de Recuperação</Text>
      </TouchableOpacity>

      <Text style={styles.infoText}>
        Insira o email associado à sua conta. Você receberá um link para redefinir sua senha.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDEAE2',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  backButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#781A1A',
  },
  logo: {
    width: 50,
    height: 50,
  },
  label: {
    fontSize: 16,
    color: '#6E4F3A',
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#EED3C3',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 40,
    color: '#6E4F3A',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#5C2E2E',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: 30,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 14,
    color: '#6E4F3A',
    marginTop: 20,
    textAlign: 'center',
    lineHeight: 20,
  },
});