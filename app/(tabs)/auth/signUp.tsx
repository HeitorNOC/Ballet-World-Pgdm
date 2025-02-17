import { Ionicons } from '@expo/vector-icons';
import CheckBox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import bcrypt from 'react-native-bcrypt';
import { api } from '@/lib/axios'; 

export default function SignUpScreen() {
  const router = useRouter();
  const [isAluno, setIsAluno] = useState(false);
  const [isProfessor, setIsProfessor] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
    teacherCode: '',
  });

  // **Função para alternar checkboxes**
  const handleCheckboxChange = (type: 'student' | 'professor') => {
    if (type === 'student') {
      setIsAluno(true);
      setIsProfessor(false);
      setUserData({ ...userData, teacherCode: '' }); // Remove teacherCode se for aluno
    } else {
      setIsAluno(false);
      setIsProfessor(true);
    }
  };

  // **Função para salvar teacherCode**
  const handleSaveCode = () => {
    setUserData({ ...userData, teacherCode: newCode });
    setModalVisible(false);
  };

  function clearFields() {
    setIsAluno(false)
      setIsProfessor(false)
      setModalVisible(false)
      setUserData({
        name: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        confirmPassword: '',
        teacherCode: '',
      })
      setNewCode('')
  }

  const handleSignUp = async () => {
  if (!userData.name || !userData.email || !userData.phone || !userData.username || !userData.password) {
    Alert.alert('Erro', 'Todos os campos são obrigatórios!');
    return;
  }

  if (userData.password !== userData.confirmPassword) {
    Alert.alert('Erro', 'As senhas não coincidem!');
    return;
  }

  if (!isAluno && !isProfessor) {
    Alert.alert('Erro', 'Selecione um tipo de usuário (Aluno ou Professor)!');
    return;
  }

  if (isProfessor && !userData.teacherCode) {
    Alert.alert('Erro', 'Professores precisam de um código de professor.');
    return;
  }

  try {
    const hashPassword = (password: string) => {
      return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) reject(err)
          else resolve(hash)
        });
      });
    };

    const hashedPassword = await hashPassword(userData.password);
    console.log("Hash gerado:", hashedPassword);

    const payload = {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      username: userData.username,
      passwordHash: hashedPassword,
      teacherCode: isProfessor ? userData.teacherCode : '',
      userType: isAluno ? 'student' : 'professor',
    };

    const response = await api.post('/users', payload);

    clearFields();

    console.log('response:', response);

    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    router.push('../auth/login');

  } catch (error) {
    console.error(error);
    Alert.alert('Erro', 'Erro ao cadastrar usuário. Tente novamente.');
  }
};

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('./login')}>
          <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CADASTRO</Text>
        <Image source={require('@/assets/images/logo_ballet_world.png')} style={styles.logo} />
      </View>

      <Text style={styles.label}>Nome Completo</Text>
      <TextInput style={styles.input} placeholder="Nome completo" value={userData.name} onChangeText={(text) => setUserData({ ...userData, name: text })} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="Email" value={userData.email} onChangeText={(text) => setUserData({ ...userData, email: text })} />

      <Text style={styles.label}>Telefone</Text>
      <TextInput style={styles.input} placeholder="Telefone" value={userData.phone} onChangeText={(text) => setUserData({ ...userData, phone: text })} />

      <Text style={styles.label}>Nome de Usuário</Text>
      <TextInput style={styles.input} placeholder="Usuário" value={userData.username} onChangeText={(text) => setUserData({ ...userData, username: text })} />

      <Text style={styles.label}>Senha</Text>
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={userData.password} onChangeText={(text) => setUserData({ ...userData, password: text })} />

      <Text style={styles.label}>Confirme a Senha</Text>
      <TextInput style={styles.input} placeholder="Confirme a senha" secureTextEntry value={userData.confirmPassword} onChangeText={(text) => setUserData({ ...userData, confirmPassword: text })} />

      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxOption}>
          <CheckBox value={isAluno} onValueChange={() => handleCheckboxChange('student')} />
          <Text style={styles.checkboxText}>Aluno</Text>
        </View>
        <View style={styles.checkboxOption}>
          <CheckBox value={isProfessor} onValueChange={() => handleCheckboxChange('professor')} />
          <Text style={styles.checkboxText}>Professor</Text>
        </View>
      </View>

      {isProfessor && (
        <>
          <Text style={styles.label}>Código do Professor</Text>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>{userData.teacherCode ? 'Alterar Código' : 'Adicionar Código'}</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Digite o Código do Professor</Text>
            <TextInput style={styles.modalInput} placeholder="Código" value={newCode} onChangeText={setNewCode} />
            <View style={styles.modalButtons}>
              <Pressable style={[styles.modalButton, { backgroundColor: '#5C2E2E' }]} onPress={handleSaveCode}>
                <Text style={styles.buttonText}>Salvar</Text>
              </Pressable>
              <Pressable style={[styles.modalButton, { backgroundColor: '#888' }]} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#781A1A',
  },
  logo: {
    width: 50,
    height: 50,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    backgroundColor: '#D1B7A1',
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  iconText: {
    fontSize: 40,
    color: '#FFF',
    fontWeight: 'bold',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    padding: 4,
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
  disabledInput: {
    backgroundColor: '#EED3C3',
    opacity: 0.8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    gap: 50,
  },
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6E4F3A',
    marginBottom: 10,
  },
  modalInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
})
