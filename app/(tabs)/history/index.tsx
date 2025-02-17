import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { api } from "@/lib/axios";

type HistoryItem = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

export default function HistoryScreen() {
  const router = useRouter();
  const [histories, setHistories] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistories() {
      try {
        const response = await api.get("/listHistories");
        setHistories(response.data);
      } catch (error) {
        console.error("Erro ao carregar histórias:", error);
        Alert.alert("Erro", "Não foi possível carregar as histórias.");
      } finally {
        setLoading(false);
      }
    }

    fetchHistories();
  }, []);

  const goBack = () => {
    router.push("../welcome");
  };

  const goToHistoryDetails = (history: HistoryItem) => {
    router.push({
      pathname: `../history/details`,
      params: {
        id: history.id,
        name: history.name,
        description: history.description,
        imageUrl: history.imageUrl,
      },
    });
  };

  const getDirectDriveLink = (url: string) => {
    if (!url.includes("drive.google.com")) return url;

    const match = url.match(/[-\w]{25,}/);
    return match
      ? `https://lh3.googleusercontent.com/d/${match[0]}=s220`
      : url;
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com botão de voltar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons
            name="arrow-back-circle-outline"
            size={30}
            color="#5C3D2E"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>História</Text>
        <Image
          source={require("@/assets/images/logo_ballet_world.png")}
          style={styles.userImage}
        />
      </View>

      {/* Exibe indicador de carregamento */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#5C3D2E" />
          <Text style={styles.loadingText}>Carregando histórias...</Text>
        </View>
      ) : (
        <FlatList
          data={histories}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.scrollContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => goToHistoryDetails(item)}
            >
              <Image
                source={{ uri: getDirectDriveLink(item.imageUrl) }}
                style={styles.cardImage}
              />
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardDescription} numberOfLines={3}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAE5D3", // Cor de fundo da tela
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAE5D3",
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#D8B59D",
  },
  backButton: { marginRight: 10 },
  headerTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: "bold",
    color: "#5C3D2E",
    textAlign: "center",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#5C3D2E",
  },
  scrollContent: {
    padding: 20,
  },
  card: {
    backgroundColor: "#EED3C3", // Fundo igual ao design do Figma
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Para Android
  },
  cardImage: {
    width: 90,
    height: 90,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    resizeMode: "cover",
  },
  cardTextContainer: {
    flex: 1,
    padding: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5C3D2E",
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: "#5C3D2E",
    textAlign: "justify",
  },
});
