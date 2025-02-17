import { removeToken } from "@/hooks/useSecureStorage";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { api } from "@/lib/axios";
import { useDecodedToken } from "@/hooks/useDecodeToken";

export default function ProfileScreen() {
  const router = useRouter();
  const { decoded, loading } = useDecodedToken();
  const [isEditing, setIsEditing] = useState(false);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [teacherCode, setTeacherCode] = useState(""); 
  const [modalVisible, setModalVisible] = useState(false)

  type UserData = {
    id: number;
    userType: string
    username: string;
    email: string;
    phone?: string;
    teacherCode?: string | null;
  };

  useEffect(() => {
    if (!decoded) return;

    async function fetchUserProfile() {
      try {
        const response = await api.post("/user", { id: decoded?.sub });
        setUserData(response.data);
        setTeacherCode(response.data.teacherCode)
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados do perfil.");
      }
    }

    fetchUserProfile();
  }, [decoded]);

  const handleUpdateProfile = async () => {
    if (!userData) return;

    try {
      const response = await api.patch("/users/update", {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
      });

      Alert.alert("Sucesso!", "Seus dados foram atualizados.");
      setIsEditing(false);
      setUserData(response.data); 
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      Alert.alert("Erro", "Não foi possível atualizar os dados.");
    }
  };


  const pickImage = async () => {
    Alert.alert("Selecionar Imagem", "Escolha uma opção", [
      { text: "Galeria", onPress: openGallery },
      { text: "Câmera", onPress: openCamera },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  const openGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permissão para acessar a galeria é necessária.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setUserImage(result.assets[0].uri); // Apenas no estado
    }
  };

  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert("Permissão para acessar a câmera é necessária.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setUserImage(result.assets[0].uri); // Apenas no estado
    }
  };

  const logout = async () => {
    await removeToken();
    router.push("../auth/login");
  };

  const goBack = () => {
    router.push("../welcome");
  };

  if (loading || !userData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>
          {loading ? "Carregando..." : "Usuário não encontrado!"}
        </Text>
      </View>
    );
  }

  const generateTeacherCode = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numbers = "0123456789"

    const randomLetters = Array.from({ length: 3 }, () =>
      letters.charAt(Math.floor(Math.random() * letters.length))
    ).join("");

    const randomNumbers = Array.from({ length: 4 }, () =>
      numbers.charAt(Math.floor(Math.random() * numbers.length))
    ).join("");

    return `${randomLetters}-${randomNumbers}`
  }

  const handleUpdateTeacherCode = async () => {
    if (!userData) return

    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja trocar seu código de professor?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sim",
          onPress: async () => {
            const newCode = generateTeacherCode()
            try {
              const response = await api.patch("/users/teacherCode", {
                id: userData.id,
                teacherCode: newCode,
              });

              setUserData({ ...userData, teacherCode: newCode });
              setTeacherCode(newCode)
              Alert.alert("Sucesso!", "Seu novo código de professor foi gerado.");
            } catch (error) {
              Alert.alert("Erro", "Não foi possível atualizar o código.");
            }
          },
        },
      ]
    );
  };

  const handleUpdateStudentTeacherCode = async () => {
    if (!userData) return

    if (teacherCode !== userData.teacherCode) {
      Alert.alert(
        "Confirmação",
        "Tem certeza que deseja trocar o código do professor?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Sim",
            onPress: async () => {
              try {
                const response = await api.patch("/users/teacherCode", {
                  id: userData.id,
                  teacherCode: teacherCode.toUpperCase(),
                });

                setUserData({ ...userData, teacherCode: teacherCode.toUpperCase() });
                Alert.alert("Sucesso!", "Código atualizado com sucesso.")
              } catch (error) {
                Alert.alert("Erro", "Não foi possível atualizar o código.")
              }
            },
          },
        ]
      )
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Botão de voltar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
      </View>

      {/* Foto de Perfil */}
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.iconContainer} onPress={pickImage}>
          {userImage ? (
            <Image source={{ uri: userImage }} style={styles.profileImage} />
          ) : (
            <Ionicons name="person-circle-outline" size={100} color="#6E4F3A" />
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={[styles.input, !isEditing && styles.disabledInput]}
        value={userData.username}
        editable={isEditing}
        onChangeText={(text) => setUserData({ ...userData, username: text })}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput style={[styles.input, styles.disabledInput]} value={userData.email} editable={false} />

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={[styles.input, !isEditing && styles.disabledInput]}
        value={userData.phone || ""}
        editable={isEditing}
        onChangeText={(text) => setUserData({ ...userData, phone: text })}
      />

      {userData.userType === "teacher" ? (
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Código de Professor</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Código do Professor</Text>
        </TouchableOpacity>
      )}

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Código do Professor</Text>

            <TextInput
              style={styles.input}
              value={teacherCode}
              editable={userData.userType === "student"} 
              onChangeText={(text) => setTeacherCode(text.toUpperCase())}
            />

            {userData.userType === "professor" ? (
              <TouchableOpacity style={styles.buttonUpdateTeacherCode} onPress={handleUpdateTeacherCode}>
                <Text style={styles.buttonText}>Gerar Novo Código</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.buttonUpdateTeacherCode} onPress={handleUpdateStudentTeacherCode}>
                <Text style={styles.buttonText}>Salvar Código</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.buttonClose} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      <TouchableOpacity
        style={styles.button}
        onPress={isEditing ? handleUpdateProfile : () => setIsEditing(true)}
      >
        <Text style={styles.buttonText}>{isEditing ? "Salvar" : "Editar"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: "#FDEAE2", padding: 20 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  backButton: { marginRight: 10 },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#6E4F3A" },
  profileContainer: { alignItems: "center", marginBottom: 20 },
  iconContainer: { borderRadius: 50, width: 100, height: 100, justifyContent: "center", alignItems: "center" },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  label: { fontSize: 16, fontWeight: "bold", color: "#6E4F3A", marginBottom: 5 },
  input: { backgroundColor: "#FFF", borderRadius: 10, height: 40, marginBottom: 10, borderWidth: 1, borderColor: "#DDD", paddingHorizontal: 10 },
  disabledInput: { backgroundColor: "#EED3C3" },
  button: { backgroundColor: "#5C2E2E", borderRadius: 10, height: 40, justifyContent: "center", alignItems: "center", marginVertical: 5 },
  buttonText: { color: "#FFF", fontWeight: "bold" },
  logoutButton: { backgroundColor: "#C0392B", borderRadius: 10, height: 40, justifyContent: "center", alignItems: "center", marginTop: 20 },
  logoutButtonText: { color: "#FFF", fontWeight: "bold" },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#FDEAE2",
    alignItems: "center",
    justifyContent: "center"
  },
  loadingText: {
    marginTop: 10,
    color: "#6E4F3A",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", 
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6E4F3A",
    marginBottom: 15,
  },
  teacherCode: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6E4F3A",
    marginVertical: 10,
  },
  generateButton: {
    backgroundColor: "#6E4F3A",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  generateButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonClose: {
    backgroundColor: "#C62828",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  buttonUpdateTeacherCode: { backgroundColor: "#5C2E2E", borderRadius: 10, height: 40, justifyContent: "center", alignItems: "center", marginVertical: 5, width: "100%" },
  closeButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
