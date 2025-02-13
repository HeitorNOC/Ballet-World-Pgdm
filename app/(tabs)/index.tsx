import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const WelcomeScreen = () => {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text style={styles.header}>World Ballet</Text>
      <Image
        source={require('@/assets/images/logo_ballet_world.png')}
        style={styles.image}
      />
      <Text style={styles.welcomeText}>Bem Vindo!</Text>
      <Text style={styles.description}>
        World Ballet: o palco perfeito para o seu ballet!
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.navigate('../auth/login')
        }}>
        <Text style={styles.buttonText}>Começar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDEAE2',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#781A1A',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#781A1A',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#B73F3F',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
