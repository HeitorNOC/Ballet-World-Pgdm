import { Ionicons } from '@expo/vector-icons'
import CheckBox from 'expo-checkbox'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
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
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'

// Tipos básicos para os dados do usuário
type UserData = {
  fullName: string
  email: string
  phone: string
  username: string
  password: string
  confirmPassword: string
  teacherCode: string | null
  profileImage: string | null
}

export default function SignUpScreen() {
  const router = useRouter()

  // Checkboxes
  const [isAluno, setIsAluno] = useState(false)
  const [isProfessor, setIsProfessor] = useState(false)

  // Estado do usuário
  const [userData, setUserData] = useState<UserData>({
    fullName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
    teacherCode: null,
    profileImage: null,
  })

  // Estado do Modal para TeacherCode
  const [modalVisible, setModalVisible] = useState(false)
  const [newCode, setNewCode] = useState('')

  // Função para atualizar dados do usuário
  function handleInput(field: keyof UserData, value: string) {
    setUserData((prev) => ({ ...prev, [field]: value }))
  }

  // Selecionar imagem (abre alerta com as opções)
  const pickImage = async () => {
    Alert.alert(
      'Selecionar Imagem',
      'Escolha uma opção',
      [
        { text: 'Galeria', onPress: openGallery },
        { text: 'Câmera', onPress: openCamera },
        { text: 'Cancelar', style: 'cancel' },
      ],
      { cancelable: true }
    )
  }

  // Abrir galeria
  const openGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!permission.granted) {
      alert('Permissão para acessar a galeria é necessária.')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled && result.assets.length > 0) {
      setUserData((prev) => ({
        ...prev,
        profileImage: result.assets[0].uri,
      }))
    }
  }

  // Abrir câmera
  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync()
    if (!permission.granted) {
      alert('Permissão para acessar a câmera é necessária.')
      return
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled && result.assets.length > 0) {
      setUserData((prev) => ({
        ...prev,
        profileImage: result.assets[0].uri,
      }))
    }
  }

  // Salvar TeacherCode quando modal for confirmado
  const handleSaveCode = () => {
    setUserData((prev) => ({ ...prev, teacherCode: newCode }))
    setModalVisible(false)
  }

  // Clique no botão Cadastrar
  const handleSignUp = () => {
    // Aqui você pode implementar a lógica de validação e envio ao backend
    // Por exemplo, checar se senhas coincidem, se isProfessor => precisa teacherCode ou não, etc.
    Alert.alert('Sucesso', 'Cadastro realizado! (Exemplo)')
    router.navigate('../welcome')
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.navigate('./login')}
        >
          <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>CADASTRO</Text>
        <Image
          source={require('@/assets/images/logo_ballet_world.png')}
          style={styles.logo}
        />
      </View>

      {/* Imagem do perfil (opcional) */}
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.iconContainer} onPress={pickImage}>
          {userData.profileImage ? (
            <Image source={{ uri: userData.profileImage }} style={styles.profileImage} />
          ) : (
            <>
              <Text style={styles.iconText}>
                {userData.fullName ? userData.fullName.charAt(0) : '?'}
              </Text>
              <Ionicons
                name="camera-outline"
                size={24}
                color="#FFF"
                style={styles.cameraIcon}
              />
            </>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Nome Completo</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome completo"
        placeholderTextColor="#D9BCA7"
        value={userData.fullName}
        onChangeText={(text) => handleInput('fullName', text)}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        placeholderTextColor="#D9BCA7"
        value={userData.email}
        onChangeText={(text) => handleInput('email', text)}
      />

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu telefone"
        placeholderTextColor="#D9BCA7"
        value={userData.phone}
        onChangeText={(text) => handleInput('phone', text)}
      />

      <Text style={styles.label}>Nome de Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Escolha um nome de usuário"
        placeholderTextColor="#D9BCA7"
        value={userData.username}
        onChangeText={(text) => handleInput('username', text)}
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor="#D9BCA7"
        secureTextEntry
        value={userData.password}
        onChangeText={(text) => handleInput('password', text)}
      />

      <Text style={styles.label}>Confirme sua Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirme sua senha"
        placeholderTextColor="#D9BCA7"
        secureTextEntry
        value={userData.confirmPassword}
        onChangeText={(text) => handleInput('confirmPassword', text)}
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

      {/* Se for professor, exibir teacherCode (igual ao Profile) */}
      {isProfessor && (
        <>
          <Text style={styles.label}>Código do Professor</Text>
          {userData.teacherCode ? (
            <>
              <TextInput
                style={[styles.input, styles.disabledInput]}
                value={userData.teacherCode}
                editable={false}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.buttonText}>Trocar Código</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.buttonText}>Adicionar Código</Text>
            </TouchableOpacity>
          )}
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* Modal para inserir código do professor */}
      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Digite o Código do Professor</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Insira o código"
              value={newCode}
              onChangeText={setNewCode}
            />
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, { backgroundColor: '#5C2E2E' }]}
                onPress={handleSaveCode}
              >
                <Text style={styles.buttonText}>Salvar</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, { backgroundColor: '#888' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
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
