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

type StepItem = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
};

export default function StepsScreen() {
  const router = useRouter();
  const [steps, setSteps] = useState<StepItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSteps() {
      try {
        const response = await api.get("/listSteps");
        console.log("Response: ", response);
        setSteps(response.data);
      } catch (error) {
        console.error("Erro ao carregar passos:", error);
        Alert.alert("Erro", "Não foi possível carregar os passos.");
      } finally {
        setLoading(false);
      }
    }

    fetchSteps();
  }, []);

  const goBack = () => {
    router.push("../welcome");
  };

  const goToStepDetails = (step: StepItem) => {
    router.push({
      pathname: `../steps/details`,
      params: {
        id: step.id,
        name: step.name,
        description: step.description,
        videoUrl: step.videoUrl, // Aqui passamos o vídeo para a tela de detalhes
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
          <Ionicons name="arrow-back-circle-outline" size={28} color="#6E4F3A" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Passos</Text>
        </View>
        <Image source={require("@/assets/images/logo_ballet_world.png")} style={styles.userImage} />
      </View>

      {/* Exibe indicador de carregamento */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6E4F3A" />
          <Text style={styles.loadingText}>Carregando passos...</Text>
        </View>
      ) : (
        <FlatList
          data={steps}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.scrollContent}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => goToStepDetails(item)}>
              <Image source={{ uri: getDirectDriveLink(item.imageUrl) }} style={styles.cardImage} />
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
  container: { flex: 1, backgroundColor: "#FDEAE2" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FDEAE2",
    paddingHorizontal: 10,
    paddingTop: 40,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EED3C3",
  },
  backButton: { marginRight: 10 },
  headerTitleContainer: { flex: 1 },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#6E4F3A" },
  userImage: { width: 40, height: 40, borderRadius: 20, resizeMode: "cover" },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: { marginTop: 10, color: "#6E4F3A" },
  scrollContent: { padding: 20 },
  card: {
    backgroundColor: "#EED3C3",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  cardImage: { width: 80, height: 80, resizeMode: "cover", borderRadius: 10 },
  cardTextContainer: { flex: 1, padding: 10 },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#6E4F3A" },
  cardDescription: {
    fontSize: 14,
    color: "#5C3D2E",
    textAlign: "justify",
  },
});
