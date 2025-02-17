import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { api } from "@/lib/axios";

export default function AlunoDetailScreen() {
  const router = useRouter();
  const { alunoId } = useLocalSearchParams();
  const [aluno, setAluno] = useState<{ name: string; progress: string }>({
    name: "",
    progress: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!alunoId) return;

    async function fetchAlunoDetails() {
      try {
        // 🔹 Buscar dados do aluno pelo ID
        const response = await api.post("/user", { id: alunoId });

        if (!response.data) {
          throw new Error("Aluno não encontrado.");
        }

        setAluno({
          name: response.data.name,
          progress: response.data.progress || "Sem progresso",
        });
      } catch (error) {
        console.error("Erro ao carregar detalhes do aluno:", error);
        Alert.alert("Erro", "Não foi possível carregar os detalhes do aluno.");
      } finally {
        setLoading(false);
      }
    }

    fetchAlunoDetails();
  }, [alunoId]);

  const goBack = () => {
    router.push("../student");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6E4F3A" />
        <Text style={styles.loadingText}>Carregando detalhes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Detalhes do Aluno</Text>
        <Image
          source={require("@/assets/images/logo_ballet_world.png")}
          style={styles.logo}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.alunoName}>{aluno.name}</Text>
        <Text style={styles.alunoProgress}>Nível: {aluno.progress}</Text>
        {/* Aqui podem ser adicionadas mais informações, como treinos concluídos */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDEAE2",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6E4F3A",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  alunoName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6E4F3A",
    marginBottom: 10,
  },
  alunoProgress: {
    fontSize: 16,
    color: "#6E4F3A",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#6E4F3A",
  },
});
