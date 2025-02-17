import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function HistoryDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const goBack = () => {
    router.push("../history");
  };

  const getDirectDriveLink = (url: string) => {
    if (!url.includes("drive.google.com")) return url;

    const match = url.match(/[-\w]{25,}/);
    return match
      ? `https://lh3.googleusercontent.com/d/${match[0]}=s220`
      : url;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Ionicons name="arrow-back-circle-outline" size={28} color="#5C3D2E" />
      </TouchableOpacity>

      {/* Imagem principal */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: getDirectDriveLink(params.imageUrl as string) }}
          style={styles.historyImage}
        />
      </View>

      {/* Título */}
      <Text style={styles.title}>{params.name}</Text>

      {/* Descrição */}
      <Text style={styles.description}>{params.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FAE5D3",
    padding: 20,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 2,
  },
  imageContainer: {
    width: screenWidth * 0.8, // 80% da largura da tela
    height: screenWidth * 0.6, // Mantém proporção de 4:3 para imagens
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 60
  },
  historyImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Mantém imagem bem ajustada e proporcional
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5C3D2E",
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: "#5C3D2E",
    textAlign: "justify",
    lineHeight: 22,
    paddingHorizontal: 10,
  },
});
