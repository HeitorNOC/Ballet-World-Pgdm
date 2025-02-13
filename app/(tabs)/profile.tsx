import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCode, setNewCode] = useState("");

  type UserData = {
    name: string;
    email: string;
    phone: string;
    teacherCode: string | null;
    profileImage: string | null;
  }
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
    teacherCode: "",
    profileImage: null,
  })

  useEffect(() => {
    const mockData: UserData = {
      name: "Heitor Negromonte",
      email: "heitor@example.com",
      phone: "(11) 98765-4321",
      teacherCode: "QYA1821",
      profileImage: null,
    };

    setUserData(mockData);
  }, []);

  const toggleEditing = () => {
    if (isEditing) {
      Alert.alert("Sucesso", "Dados salvos com sucesso!")
    }
    setIsEditing(!isEditing)
  }

  const handleSaveCode = () => {
    setUserData({ ...userData, teacherCode: newCode });
    setModalVisible(false);
  };

  const pickImage = async () => {
    Alert.alert(
      "Selecionar Imagem",
      "Escolha uma opção",
      [
        { text: "Galeria", onPress: openGallery },
        { text: "Câmera", onPress: openCamera },
        { text: "Cancelar", style: "cancel" },
      ],
      { cancelable: true }
    );
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
      setUserData({ ...userData, profileImage: result.assets[0].uri });
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
      setUserData({ ...userData, profileImage: result.assets[0].uri });
    }
  };

  const logout = () => {
    router.replace("../auth/login");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={logout}>
          <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <Image
          source={require("@/assets/images/logo_ballet_world.png")}
          style={styles.logo}
        />
      </View>

      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.iconContainer} onPress={pickImage}>
          {userData.profileImage ? (
            <Image source={{ uri: userData.profileImage }} style={styles.profileImage} />
          ) : (
            <>
              <Text style={styles.iconText}>{userData.name.charAt(0)}</Text>
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

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={[styles.input, !isEditing && styles.disabledInput]}
        value={userData.name}
        editable={isEditing}
        onChangeText={(text) => setUserData({ ...userData, name: text })}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[styles.input, !isEditing && styles.disabledInput]}
        value={userData.email}
        editable={isEditing}
        onChangeText={(text) => setUserData({ ...userData, email: text })}
      />

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={[styles.input, !isEditing && styles.disabledInput]}
        value={userData.phone}
        editable={isEditing}
        onChangeText={(text) => setUserData({ ...userData, phone: text })}
      />

      <TouchableOpacity style={styles.button} onPress={toggleEditing}>
        <Text style={styles.buttonText}>{isEditing ? "Salvar" : "Editar"}</Text>
      </TouchableOpacity>


      <Text style={styles.label}>Código do Professor</Text>
      {userData.teacherCode ? (
        <>
          <TextInput style={[styles.input, styles.disabledInput]} value={userData.teacherCode} editable={false} />
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Trocar Código</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Adicionar Código</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
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
              <Pressable style={[styles.modalButton, { backgroundColor: "#5C2E2E" }]} onPress={handleSaveCode}>
                <Text style={styles.buttonText}>Salvar</Text>
              </Pressable>
              <Pressable style={[styles.modalButton, { backgroundColor: "#888" }]} onPress={() => setModalVisible(false)}>
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
  scrollContainer: { flexGrow: 1, backgroundColor: "#FDEAE2", padding: 20 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20, marginTop: 15 },
  backButton: { justifyContent: "center", alignItems: "center" },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#6E4F3A" },
  logo: { width: 40, height: 40, resizeMode: "contain" },
  profileContainer: { alignItems: "center", marginBottom: 20 },
  iconContainer: { backgroundColor: "#D1B7A1", borderRadius: 50, width: 100, height: 100, justifyContent: "center", alignItems: "center" },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  iconText: { fontSize: 40, color: "#FFF", fontWeight: "bold" },
  cameraIcon: { position: "absolute", bottom: 5, right: 5, backgroundColor: "rgba(0, 0, 0, 0.5)", borderRadius: 12, padding: 4 },
  label: { fontSize: 16, fontWeight: "bold", color: "#6E4F3A", marginBottom: 5 },
  input: { backgroundColor: "#FFF", borderRadius: 10, height: 40, marginBottom: 10, borderWidth: 1, borderColor: "#DDD", paddingHorizontal: 10 },
  disabledInput: { backgroundColor: "#EED3C3" },
  button: { backgroundColor: "#5C2E2E", borderRadius: 10, height: 40, justifyContent: "center", alignItems: "center", marginVertical: 5 },
  buttonText: { color: "#FFF", fontWeight: "bold" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
  modalContent: { width: "80%", backgroundColor: "#FFF", borderRadius: 10, padding: 20, alignItems: "center" },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: "#6E4F3A", marginBottom: 10 },
  modalInput: { width: "100%", borderWidth: 1, borderColor: "#DDD", borderRadius: 10, height: 40, marginBottom: 20, paddingHorizontal: 10 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  modalButton: { flex: 1, marginHorizontal: 5, justifyContent: "center", alignItems: "center", height: 40 },
});
