import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CheckBox from 'expo-checkbox';
import { ScrollView } from 'react-native'; 

export default function SignUpScreen() {
  const [isAluno, setIsAluno] = useState(false);
  const [isProfessor, setIsProfessor] = useState(false);
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            router.navigate('./login');
          }}
        >
          <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>CADASTRO</Text>
        <Image
          source={require('../../../assets/images/logo_ballet_world.png')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.label}>Nome Completo</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome completo"
        placeholderTextColor="#D9BCA7"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        placeholderTextColor="#D9BCA7"
      />

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu telefone"
        placeholderTextColor="#D9BCA7"
      />

      <Text style={styles.label}>Nome de Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Escolha um nome de usuário"
        placeholderTextColor="#D9BCA7"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor="#D9BCA7"
        secureTextEntry
      />

      <Text style={styles.label}>Confirme sua Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirme sua senha"
        placeholderTextColor="#D9BCA7"
        secureTextEntry
      />

      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxOption}>
          <CheckBox value={isAluno} onValueChange={setIsAluno} />
          <Text style={styles.checkboxText}>Aluno</Text>
        </View>
        <View style={styles.checkboxOption}>
          <CheckBox value={isProfessor} onValueChange={setIsProfessor} />
          <Text style={styles.checkboxText}>Professor</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#FDEAE2',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 24,
    color: '#781A1A',
  },
  headerTitle: {
    fontSize: 26,
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
  },
  input: {
    backgroundColor: '#EED3C3',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 40,
    color: '#6E4F3A',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    gap: 50
  },
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  checkboxText: {
    color: '#6E4F3A',
    marginLeft: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#5C2E2E',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
